"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { navigation, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/components/motion/useHydrated";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isHydrated = useHydrated();
  const shouldReduceMotion = isHydrated && Boolean(prefersReducedMotion);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 16);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setIsOpen(false);
    };

    closeOnDesktop(desktopQuery);
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);
        if (activeEntry) setActiveSection(activeEntry.target.id);
      },
      { rootMargin: "-35% 0px -58% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = [...menuRef.current.querySelectorAll<HTMLElement>("a, button")];
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary navigation"
        className={cn(
          "page-container flex h-16 items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5",
          isScrolled || isOpen
            ? "border-white/12 bg-canvas-deep/78 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-white/6 bg-canvas-deep/36 backdrop-blur-md"
        )}
      >
        <a href="#home" className="relative z-50 text-lg font-extrabold tracking-[-0.04em] text-ink">
          {siteConfig.shortName}
          <span className="accent-text">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const section = item.href.slice(1);
            const isActive = activeSection === section;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-navigation"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/8"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
          className="relative z-50 grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-ink transition-colors hover:border-white/20 hover:bg-white/10 lg:hidden"
        >
          {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 grid place-items-center bg-canvas-deep/94 px-6 backdrop-blur-2xl lg:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="grid w-full max-w-sm gap-3">
              {navigation.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.li
                    key={item.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.08 + index * 0.04 }}
                  >
                    <a
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border px-5 py-4 text-2xl font-bold transition-colors",
                        isActive
                          ? "border-accent/45 bg-accent/10 text-ink"
                          : "border-white/8 bg-white/4 text-muted hover:border-white/16 hover:text-ink"
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-accent">0{index + 1}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
