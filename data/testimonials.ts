export type Testimonial = {
  id: string;
  name: string;
  /** Role and/or company, e.g. "Founder, Acme Co." or "Client via Upwork". */
  role: string;
  /** Verbatim quote — not run through the site's EN/RU/UZ translation system,
   * since translating a client's own words would mean showing something they
   * didn't actually say. Shown as-is regardless of the site's active locale. */
  quote: string;
  /** Optional link to the source (an Upwork/Fiverr review, LinkedIn post, etc.). */
  link?: string;
  /**
   * True for scaffold/placeholder entries. Testimonials.tsx filters these out,
   * so the section renders nothing at all until real content replaces them —
   * this can never accidentally ship fake-looking quotes to production.
   * Remove this flag (and fill in the real name/role/quote) once real
   * testimonial text is supplied.
   */
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    name: "Client name",
    role: "Role, Company",
    quote: "Real testimonial text goes here — confirm with Javohir before publishing.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    name: "Client name",
    role: "Role, Company",
    quote: "Real testimonial text goes here — confirm with Javohir before publishing.",
    isPlaceholder: true,
  },
];
