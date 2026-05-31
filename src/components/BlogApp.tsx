import { useState, useEffect, useRef, useCallback } from "react";
import { motion, MotionConfig } from "motion/react";
import BlogViewer from "./BlogViewer";
import Sidebar from "./Sidebar";
import FooterStrip from "./FooterStrip";
import IntroContent from "./IntroContent";
import MobileLayout from "./MobileLayout";
import type { PostData } from "./types";
import type { TileKey } from "../data/tiles";
import { SIDEBAR_W, TOP_BAR_H } from "../lib/constants";

interface BlogAppProps {
  posts: PostData[];
  initialSlug?: string;
}

export default function BlogApp({ posts: initialPosts, initialSlug }: BlogAppProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [introExiting, setIntroExiting] = useState(false);
  const [postExiting, setPostExiting] = useState(false);
  const [hasEverSelected, setHasEverSelected] = useState(false);
  // Slug being transitioned to from the intro state. Drives the footer cascade
  // immediately while the intro fades out and the post view mounts.
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const isInitialMount = useRef(true);

  // Mark initial mount complete after first render
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  // Check sessionStorage for hint flag
  useEffect(() => {
    setHasEverSelected(sessionStorage.getItem("selected_a_post") === "1");
  }, []);

  // Sync URL on slug change
  useEffect(() => {
    const expectedPath = activeSlug ? `/posts/${activeSlug}` : "/";
    if (window.location.pathname !== expectedPath) {
      window.history.pushState({ slug: activeSlug }, "", expectedPath);
    }
  }, [activeSlug]);

  // Handle browser back/forward
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const state = e.state;
      if (state && "slug" in state) {
        setActiveSlug(state.slug);
      } else {
        const match = window.location.pathname.match(/^\/posts\/(.+)$/);
        setActiveSlug(match ? match[1] : null);
      }
      setIntroExiting(false);
      setPostExiting(false);
    };
    window.addEventListener("popstate", onPop);
    const currentPath = activeSlug ? `/posts/${activeSlug}` : "/";
    window.history.replaceState({ slug: activeSlug }, "", currentPath);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Hydrate content from SSR
  useEffect(() => {
    function hydrateContent() {
      const contentMap = (window as any).__POST_CONTENT__ as
        | Record<string, string>
        | undefined;
      if (contentMap) {
        setPosts((prev) =>
          prev.map((p) => ({
            ...p,
            htmlContent: contentMap[p.slug] || p.htmlContent,
          }))
        );
      }
    }
    hydrateContent();
    window.addEventListener("postcontent:ready", hydrateContent);
    return () => window.removeEventListener("postcontent:ready", hydrateContent);
  }, []);

  const activePost = activeSlug
    ? posts.find((p) => p.slug === activeSlug) || null
    : null;

  // Handle chip selection
  const handleSelect = useCallback(
    (slug: string) => {
      if (slug === activeSlug || slug === pendingSlug) return;
      if (postExiting) return;

      // Mark first selection in session
      setHasEverSelected(true);
      try {
        sessionStorage.setItem("selected_a_post", "1");
      } catch {}

      if (activeSlug === null) {
        // From intro: cascade the footer immediately, fade the intro out, then
        // swap in the post view (which runs its own fade-up on mount).
        setIntroExiting(true);
        setPendingSlug(slug);
        window.setTimeout(() => {
          setActiveSlug(slug);
          setPendingSlug(null);
          setIntroExiting(false);
        }, 400);
      } else {
        // Post → post: content swaps in place, footer cascades to the new tile.
        setActiveSlug(slug);
      }
    },
    [activeSlug, pendingSlug, postExiting]
  );

  // Handle home click (name in top-left or footer INDEX)
  const handleHomeClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (activeSlug === null || postExiting) return;
      setPostExiting(true);
      setTimeout(() => {
        setActiveSlug(null);
        setPostExiting(false);
        setIntroExiting(false);
      }, 400);
    },
    [activeSlug, postExiting]
  );

  const footerSlug = pendingSlug ?? activeSlug;
  const footerPost = footerSlug
    ? posts.find((p) => p.slug === footerSlug) || null
    : null;
  // Idle (no post) = the home route inside this app → show the house tile.
  const footerTileKey = footerPost
    ? (footerPost.tileKey as TileKey)
    : undefined;

  return (
    <MotionConfig reducedMotion="user">
    <div
      className="home-desktop"
      style={{
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--wall)",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          height: TOP_BAR_H,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid var(--ink)",
        }}
      >
        <a
          href="/"
          onClick={handleHomeClick}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          Sahil Shaikh
        </a>
        <nav aria-label="Primary" style={{ display: "flex", gap: 16 }}>
          {[
            { label: "About", href: "/about" },
            { label: "Archive", href: "/archive" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Main area */}
      <main style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Reading / intro column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Intro state */}
          {activeSlug === null && (
            <motion.div
              initial={isInitialMount.current ? false : { opacity: 0, y: 12 }}
              animate={{
                opacity: introExiting ? 0 : 1,
                y: introExiting ? -12 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: introExiting
                  ? [0.4, 0, 1, 1]
                  : [0.16, 1, 0.3, 1],
              }}
              style={{
                height: "100%",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              <IntroContent />
            </motion.div>
          )}

          {/* Post state */}
          {activeSlug !== null && activePost && (
            <motion.div
              key="post-view"
              initial={isInitialMount.current ? false : { opacity: 0, y: 12 }}
              animate={{
                opacity: postExiting ? 0 : 1,
                y: postExiting ? -12 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ height: "100%" }}
            >
              <BlogViewer post={activePost} />
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div
          style={{
            width: SIDEBAR_W,
            flexShrink: 0,
            borderLeft: "1px solid var(--divider)",
          }}
        >
          <Sidebar
            posts={posts}
            activeSlug={activeSlug ?? ""}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onSelect={handleSelect}
          />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ flexShrink: 0 }}>
        <FooterStrip
          tileKey={footerTileKey}
          houseTile="/tiles/house.png"
          onHomeClick={handleHomeClick}
        />
      </footer>
    </div>

    {/* Mobile layout (≤640px) — shares the same filter state */}
    <div className="home-mobile">
      <MobileLayout
        posts={posts}
        activeSlug={activeSlug}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
    </div>
    </MotionConfig>
  );
}
