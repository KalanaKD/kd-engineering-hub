import { useEffect, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { MagneticButton, MagneticLink } from "@/components/ui/magnetic-button";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/kd-logo.png.asset.json";

const NAV = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-[color-mix(in_oklab,var(--background)_75%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <button
            onClick={() => smoothScrollTo("hero")}
            className="flex items-center gap-2 font-display text-base tracking-tight"
            aria-label="KD — home"
          >
            <img src={logoAsset.url} alt="" className="h-7 w-7 object-contain" />
            <span className="hidden sm:inline">KD</span>
          </button>

          <nav className="hidden items-center md:flex">
            <LayoutGroup id="nav">
              <ul className="flex items-center gap-1">
                {NAV.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => smoothScrollTo(item.id)}
                        className={cn(
                          "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-[var(--surface)] ring-1 ring-border"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MagneticLink
              href="/resume.pdf"
              download
              data-cursor="link"
              variant="secondary"
              className="hidden h-9 px-4 text-xs md:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              Resume
            </MagneticLink>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[var(--surface)] md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-[var(--background)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex h-16 items-center justify-between">
              <span className="font-display text-base">Menu</span>
            </div>
            <nav className="container-page flex flex-1 flex-col justify-center gap-2 pb-24">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  onClick={() => {
                    smoothScrollTo(item.id);
                    setOpen(false);
                  }}
                  className="border-b border-border py-4 text-left font-display text-3xl"
                >
                  {item.label}
                </motion.button>
              ))}
              <a
                href="/resume.pdf"
                download
                className="mt-8"
              >
                <MagneticButton variant="primary" className="w-full">
                  <FileDown className="h-4 w-4" />
                  Download Resume
                </MagneticButton>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
