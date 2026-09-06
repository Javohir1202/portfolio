"use client";

import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { useLocale } from "@/lib/i18n/LanguageContext";
import { dictionaries } from "@/lib/i18n/dictionaries";

const secondaryLinks = [
  { href: site.links.github, label: "GitHub", icon: Github },
  { href: site.links.upwork, label: "Upwork", icon: ArrowUpRight },
  { href: site.links.fiverr, label: "Fiverr", icon: ArrowUpRight },
  { href: site.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: site.links.instagram, label: "Instagram", icon: Instagram },
  { href: site.links.telegram, label: "Telegram", icon: Send },
].filter((l) => l.href);

export function Contact() {
  const { locale } = useLocale();
  const dict = dictionaries[locale];

  return (
    <section id="contact" className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-content px-6 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{dict.contact.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {dict.contact.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ink-muted">{dict.contact.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
            {dict.contact.startProject}
          </p>
          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {secondaryLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
                  >
                    <Icon size={14} aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
                >
                  <Mail size={14} aria-hidden />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
