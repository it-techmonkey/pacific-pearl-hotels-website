const email = "ariana@pacificpearlhotels.com";

type MailIntent = "career" | "partner" | "general";

const intentCopy: Record<MailIntent, { subject: string; body: string }> = {
  career: {
    subject: "Career Opportunity Inquiry",
    body:
      "Hello Pacific Pearl Hotels team,\n\nI would like to learn about career opportunities and upcoming roles.\n\nThank you,",
  },
  partner: {
    subject: "Partner with Us Inquiry",
    body:
      "Hello Pacific Pearl Hotels team,\n\nI am interested in partnering on a hospitality project and would like to connect.\n\nThank you,",
  },
  general: {
    subject: "General Inquiry",
    body:
      "Hello Pacific Pearl Hotels team,\n\nI would like to learn more about your hospitality management services.\n\nThank you,",
  },
};

export function buildMailto(intent: MailIntent) {
  const { subject, body } = intentCopy[intent];
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}
