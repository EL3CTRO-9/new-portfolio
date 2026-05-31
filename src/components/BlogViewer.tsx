import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Lenis from "lenis";
import SSTag from "./SSTag";
import PostContent from "./PostContent";
import EndDog from "./EndDog";
import type { PostData } from "./types";

interface BlogViewerProps {
  post: PostData;
}

export default function BlogViewer({ post }: BlogViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current.firstElementChild as HTMLElement,
      smoothWheel: true,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [post.slug]);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      ref={scrollRef}
      style={{
        height: "100%",
        overflowY: "auto",
        scrollbarWidth: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          minHeight: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: "56px 96px 40px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#d4280e",
              marginBottom: 14,
            }}
          >
            {post.category} · {formattedDate}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            {post.title}
          </h1>

          <PostContent htmlContent={post.htmlContent} />
        </motion.div>

        {/* End-of-post dog silhouette — pushed to the bottom so it hugs the footer */}
        {post.endDog && (
          <div style={{ marginTop: "auto" }}>
            <EndDog src={post.endDog} caption={post.dogCaption} />
          </div>
        )}

        {/* SS Tag — spray-painted signature */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 36,
            transform: "rotate(-4deg)",
            zIndex: 2,
          }}
        >
          <SSTag size={64} />
        </div>

        {/* Banksy mascot — fill via MJ later */}
      </div>
    </div>
  );
}
