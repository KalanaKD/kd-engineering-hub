import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  User,
  Briefcase,
  FlaskConical,
  Mail,
  Github,
  Linkedin,
  FileDown,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => () => {
    fn();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[18vh]"
      onClick={() => setOpen(false)}
      data-lenis-prevent
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        aria-hidden
      />
      <Command
        label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-[var(--surface)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Command.Input
            placeholder="Search sections, links, actions…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
            No results.
          </Command.Empty>

          <Command.Group heading="Navigate" className="px-2 pt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Item icon={<User className="h-4 w-4" />} label="About" onSelect={run(() => smoothScrollTo("about"))} />
            <Item icon={<Briefcase className="h-4 w-4" />} label="Projects" onSelect={run(() => smoothScrollTo("projects"))} />
            <Item icon={<FlaskConical className="h-4 w-4" />} label="Research" onSelect={run(() => smoothScrollTo("research"))} />
            <Item icon={<Mail className="h-4 w-4" />} label="Contact" onSelect={run(() => smoothScrollTo("contact"))} />
          </Command.Group>

          <Command.Group heading="Actions" className="px-2 pt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Item
              icon={<FileDown className="h-4 w-4" />}
              label="Download Resume"
              onSelect={run(() => {
                const a = document.createElement("a");
                a.href = "/resume.pdf";
                a.download = "kalana-dilshan-resume.pdf";
                a.click();
              })}
            />
            <Item
              icon={theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onSelect={run(toggle)}
            />
          </Command.Group>

          <Command.Group heading="External" className="px-2 pt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Item icon={<Github className="h-4 w-4" />} label="GitHub" onSelect={run(() => window.open("https://github.com/", "_blank"))} />
            <Item icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" onSelect={run(() => window.open("https://linkedin.com/", "_blank"))} />
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span>↑↓ to navigate</span>
          <span>⌘K to toggle</span>
        </div>
      </Command>
    </div>
  );
}

function Item({
  icon,
  label,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground/90 aria-selected:bg-[color-mix(in_oklab,var(--accent-primary)_12%,transparent)] aria-selected:text-foreground"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}</span>
    </Command.Item>
  );
}
