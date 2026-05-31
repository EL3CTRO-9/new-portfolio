import { useEffect, useState, useCallback, useRef } from "react";
import { Command } from "cmdk";

/* ------------------------------------------------------------------ */
/*  Data: pages, posts, external links, actions                       */
/* ------------------------------------------------------------------ */

const PAGES = [
  { id: "home", label: "Home", href: "/", keywords: "blog home index" },
  { id: "about", label: "About", href: "/about", keywords: "bio sahil" },
  { id: "archive", label: "Archive", href: "/archive", keywords: "posts all" },
  { id: "contact", label: "Contact", href: "/contact", keywords: "email message" },
];

const POSTS = [
  {
    slug: "building-an-isms-from-scratch",
    title: "Building an ISMS from Scratch",
    category: "SEC",
  },
  {
    slug: "androxgh0st-malware-analysis",
    title: "AndroxGh0st Malware Analysis",
    category: "RES",
  },
  {
    slug: "ot-security-assessment",
    title: "OT Security Assessment",
    category: "SEC",
  },
  {
    slug: "bug-bounties-field-guide",
    title: "Bug Bounties: A Field Guide",
    category: "WRI",
  },
  {
    slug: "phpunit-rce-deep-dive",
    title: "PHPUnit RCE Deep Dive",
    category: "RES",
  },
];

const EXTERNAL = [
  { id: "github", label: "GitHub", href: "https://github.com/sahilshaikh", icon: "GH" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/sahilshaikh", icon: "LI" },
  { id: "credly", label: "Credly", href: "https://www.credly.com/users/sahil-shaikh", icon: "CR" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K to toggle, Escape to close
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Don't fire when inside inputs/textareas (except our own)
      const tag = (e.target as HTMLElement)?.tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      // "/" to open (only when not in an input)
      if (e.key === "/" && !isInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
        return;
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const navigate = useCallback(
    (href: string, external?: boolean) => {
      setOpen(false);
      if (external) {
        window.open(href, "_blank", "noopener");
      } else {
        window.location.href = href;
      }
    },
    []
  );

  if (!open) return null;

  return (
    <div className="cmd-backdrop" onClick={() => setOpen(false)}>
      <div className="cmd-positioner" onClick={(e) => e.stopPropagation()}>
        <Command className="cmd-root" label="Command palette" loop>
          <div className="cmd-input-wrap">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Command.Input
              ref={inputRef}
              className="cmd-input"
              placeholder="Type a command or search..."
            />
            <kbd className="cmd-kbd">ESC</kbd>
          </div>

          <Command.List className="cmd-list">
            <Command.Empty className="cmd-empty">
              No results found.
            </Command.Empty>

            {/* Pages */}
            <Command.Group heading="Pages" className="cmd-group">
              {PAGES.map((page) => (
                <Command.Item
                  key={page.id}
                  value={`${page.label} ${page.keywords}`}
                  onSelect={() => navigate(page.href)}
                  className="cmd-item"
                >
                  <span className="cmd-item-icon">→</span>
                  <span>{page.label}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Posts */}
            <Command.Group heading="Posts" className="cmd-group">
              {POSTS.map((post) => (
                <Command.Item
                  key={post.slug}
                  value={`${post.title} ${post.category}`}
                  onSelect={() => navigate(`/posts/${post.slug}`)}
                  className="cmd-item"
                >
                  <span className="cmd-item-tag">{post.category}</span>
                  <span>{post.title}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* External */}
            <Command.Group heading="External" className="cmd-group">
              {EXTERNAL.map((link) => (
                <Command.Item
                  key={link.id}
                  value={`${link.label} external`}
                  onSelect={() => navigate(link.href, true)}
                  className="cmd-item"
                >
                  <span className="cmd-item-tag">{link.icon}</span>
                  <span>{link.label}</span>
                  <span className="cmd-item-external">↗</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Actions */}
            <Command.Group heading="Actions" className="cmd-group">
              <Command.Item
                value="keyboard shortcuts help"
                onSelect={() => {
                  setOpen(false);
                  window.dispatchEvent(new CustomEvent("open-shortcuts"));
                }}
                className="cmd-item"
              >
                <span className="cmd-item-icon">?</span>
                <span>Keyboard shortcuts</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
