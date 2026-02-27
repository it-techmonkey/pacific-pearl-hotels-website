# scraper.py

import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, parse_qs, unquote

ASSET_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico',
    '.mp4', '.webm', '.ogg', '.mp3', '.wav',
    '.css', '.js', '.mjs', '.map', '.json', '.txt', '.xml', '.webmanifest',
    '.woff', '.woff2', '.ttf', '.otf', '.eot'
}

CSS_URL_PATTERN = re.compile(r"url\((?:'|\")?(.*?)(?:'|\")?\)", re.IGNORECASE)
CSS_IMPORT_PATTERN = re.compile(r"@import\s+(?:url\()?['\"]?(.*?)['\"]?\)?", re.IGNORECASE)


def create_folder(folder):
    if not os.path.exists(folder):
        os.makedirs(folder)


def get_safe_filename(url):
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)

    if not filename or '.' not in filename:
        query_params = parse_qs(parsed.query)
        nested_url = query_params.get('url', [None])[0]
        if nested_url:
            filename = os.path.basename(unquote(urlparse(nested_url).path))

    if not filename:
        filename = 'downloaded_file'

    invalid_chars = '<>:"/\\|?*'
    filename = ''.join('_' if ch in invalid_chars else ch for ch in filename)
    return filename


def get_unique_file_path(folder, filename):
    base, extension = os.path.splitext(filename)
    candidate = os.path.join(folder, filename)
    index = 1

    while os.path.exists(candidate):
        candidate = os.path.join(folder, f"{base}_{index}{extension}")
        index += 1

    return candidate


def is_asset_url(url):
    parsed = urlparse(url)
    path = parsed.path.lower()

    if any(path.endswith(extension) for extension in ASSET_EXTENSIONS):
        return True

    query_params = parse_qs(parsed.query)
    nested_url = query_params.get('url', [None])[0]
    if nested_url:
        nested_path = urlparse(unquote(nested_url)).path.lower()
        if any(nested_path.endswith(extension) for extension in ASSET_EXTENSIONS):
            return True

    if '/_next/' in path:
        return True

    return False


def parse_srcset(srcset_value):
    urls = []
    for item in srcset_value.split(','):
        candidate = item.strip().split(' ')[0]
        if candidate:
            urls.append(candidate)
    return urls


def extract_html_asset_urls(soup, base_url):
    urls = []

    for tag in soup.find_all(True):
        for attribute in ['src', 'href', 'data-src', 'data-lazy-src', 'poster']:
            value = tag.get(attribute)
            if value:
                urls.append(urljoin(base_url, value))

        srcset_value = tag.get('srcset') or tag.get('data-srcset')
        if srcset_value:
            for srcset_url in parse_srcset(srcset_value):
                urls.append(urljoin(base_url, srcset_url))

        style_value = tag.get('style')
        if style_value:
            for css_url in CSS_URL_PATTERN.findall(style_value):
                cleaned = css_url.strip()
                if cleaned and not cleaned.startswith('data:'):
                    urls.append(urljoin(base_url, cleaned))

    for style_tag in soup.find_all('style'):
        css_text = style_tag.get_text() or ''
        for css_url in CSS_URL_PATTERN.findall(css_text):
            cleaned = css_url.strip()
            if cleaned and not cleaned.startswith('data:'):
                urls.append(urljoin(base_url, cleaned))

    filtered = [asset_url for asset_url in urls if is_asset_url(asset_url)]
    return list(dict.fromkeys(filtered))


def extract_css_asset_urls(css_text, css_url):
    urls = []

    for css_asset_url in CSS_URL_PATTERN.findall(css_text):
        cleaned = css_asset_url.strip()
        if cleaned and not cleaned.startswith('data:'):
            urls.append(urljoin(css_url, cleaned))

    for import_url in CSS_IMPORT_PATTERN.findall(css_text):
        cleaned = import_url.strip()
        if cleaned and not cleaned.startswith('data:'):
            urls.append(urljoin(css_url, cleaned))

    filtered = [asset_url for asset_url in urls if is_asset_url(asset_url)]
    return list(dict.fromkeys(filtered))


def download_asset(url, folder, session):
    try:
        response = session.get(url, timeout=30)
        response.raise_for_status()

        filename = get_safe_filename(url)
        file_path = get_unique_file_path(folder, filename)

        with open(file_path, 'wb') as downloaded_file:
            downloaded_file.write(response.content)

        print(f"Downloaded: {file_path}")
        return response
    except Exception as error:
        print(f"Error downloading {url}: {error}")
        return None


def collect_css_related_assets(initial_css_urls, folder, session, downloaded_urls):
    pending_css_urls = list(initial_css_urls)
    seen_css_urls = set()

    while pending_css_urls:
        css_url = pending_css_urls.pop(0)
        if css_url in seen_css_urls:
            continue

        seen_css_urls.add(css_url)
        if css_url in downloaded_urls:
            continue

        css_response = download_asset(css_url, folder, session)
        if not css_response:
            continue

        downloaded_urls.add(css_url)

        content_type = css_response.headers.get('content-type', '').lower()
        if 'text/css' in content_type or css_url.lower().endswith('.css'):
            css_assets = extract_css_asset_urls(css_response.text, css_url)
            for css_asset in css_assets:
                if css_asset.lower().endswith('.css'):
                    if css_asset not in seen_css_urls:
                        pending_css_urls.append(css_asset)
                elif css_asset not in downloaded_urls:
                    if download_asset(css_asset, folder, session):
                        downloaded_urls.add(css_asset)


def main():
    website_url = 'https://www.pacificpearlhotels.com/hotels'
    output_folder = 'downloaded_assets_27th'
    create_folder(output_folder)

    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0 Asset-Scraper'})

    response = session.get(website_url, timeout=30)
    if response.status_code != 200:
        print(f"Failed to retrieve the website. Status code: {response.status_code}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    all_asset_urls = extract_html_asset_urls(soup, website_url)

    downloaded_urls = set()
    css_urls = []

    for asset_url in all_asset_urls:
        if asset_url.lower().endswith('.css'):
            css_urls.append(asset_url)
            continue

        if asset_url not in downloaded_urls:
            if download_asset(asset_url, output_folder, session):
                downloaded_urls.add(asset_url)

    collect_css_related_assets(css_urls, output_folder, session, downloaded_urls)

    print(f"Asset download complete! Downloaded {len(downloaded_urls)} files to '{output_folder}'.")


if __name__ == '__main__':
    main()