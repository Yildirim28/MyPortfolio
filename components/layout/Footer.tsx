import { ArrowUp } from "lucide-react";

import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-canvas-deep/80">
      <div className="page-container flex min-h-24 flex-col items-center justify-center gap-3 py-6 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>© 2026 {siteConfig.name}</p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 font-semibold text-muted transition-colors hover:text-ink"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-1" />
        </a>
      </div>
    </footer>
  );
}
