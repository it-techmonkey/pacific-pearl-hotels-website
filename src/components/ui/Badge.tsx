type BadgeProps = {
  label: string;
  tone?: "dark" | "light";
};

export function Badge({ label, tone = "dark" }: BadgeProps) {
  const toneClass = tone === "dark" ? "bg-ink text-sand" : "bg-sand text-ink";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ${toneClass}`} style={{ width: 'fit-content', minWidth: 0 }}>
      {label}
    </span>
  );
}
