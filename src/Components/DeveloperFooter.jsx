import { Linkedin, Instagram } from 'lucide-react';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/swarnava-ghosh-9336162ba/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/born2guitarist/', icon: Instagram },
];

export default function DeveloperFooter() {
  return (
    <footer className="px-6 pb-12 pt-16 sm:px-10 lg:px-16">
      <div className="border-t border-white/[0.06] pt-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/50">
              Designed & Built by
            </p>
            <p className="mt-1 font-body text-sm text-foreground/80">
              Swarnava Ghosh
            </p>
          </div>

          <div className="flex items-center gap-5">
            {LINKS.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={l.label}
                  className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors hover:text-terracotta/80"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.25} />
                  <span className="hidden sm:inline">{l.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/30">
          Uma Bodhon · 2026
        </p>
      </div>
    </footer>
  );
}