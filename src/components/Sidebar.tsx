import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Tile from "./Tile";
import type { PostData } from "./types";
import type { TileKey } from "../data/tiles";

const CATEGORIES = [
  { key: "ALL", label: "ALL" },
  { key: "SEC", label: "SEC" },
  { key: "RES", label: "RES" },
  { key: "FIN", label: "FIN" },
  { key: "WRI", label: "WRI" },
  { key: "NOT", label: "NOT" },
];

interface SidebarProps {
  posts: PostData[];
  activeSlug: string;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onSelect: (slug: string) => void;
}

export default function Sidebar({
  posts,
  activeSlug,
  activeCategory,
  onCategoryChange,
  onSelect,
}: SidebarProps) {
  const reduced = useReducedMotion();
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [popSlug, setPopSlug] = useState<string | null>(null);

  const visiblePosts =
    activeCategory === "ALL"
      ? posts
      : posts.filter((p) => p.category.toUpperCase().startsWith(activeCategory));

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      {/* Left: INDEX header + post list */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
            padding: "14px 14px 8px",
          }}
        >
          INDEX
        </div>

        {visiblePosts.map((post, i) => {
          const isActive = post.slug === activeSlug;

          return (
            <div key={post.slug}>
              <button
                onClick={() => {
                  setPopSlug(post.slug);
                  onSelect(post.slug);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  cursor: "pointer",
                  border: "none",
                  background: isActive
                    ? "rgba(212, 40, 14, 0.06)"
                    : "transparent",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <motion.div
                  animate={
                    !reduced && popSlug === post.slug
                      ? { scale: [1, 1.08, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: isActive
                      ? "0 1px 3px rgba(0,0,0,0.15)"
                      : "none",
                  }}
                >
                  <Tile tileKey={post.tileKey as TileKey} size={32} />
                </motion.div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: isActive ? "#d4280e" : "var(--muted)",
                      lineHeight: 1,
                      marginBottom: 3,
                    }}
                  >
                    {post.category} ·{" "}
                    {new Date(post.date)
                      .toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                      .toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      fontWeight: 400,
                      fontVariationSettings: "'opsz' 16",
                      color: "var(--ink)",
                      lineHeight: 1.25,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.title}
                  </div>
                </div>
              </button>

              {i < visiblePosts.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background: "var(--divider)",
                    marginLeft: 14,
                    marginRight: 14,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Right: vertical category tabs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: "none",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          const isHovered = hoveredCat === cat.key;
          return (
            <div
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              onMouseEnter={() => setHoveredCat(cat.key)}
              onMouseLeave={() => setHoveredCat(null)}
              style={{
                flex: 1,
                width: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s ease",
                background: isActive ? "var(--red)" : "transparent",
                borderBottom:
                  "1px solid " +
                  (isActive ? "var(--red)" : "var(--divider)"),
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: isActive
                    ? "#fff"
                    : isHovered
                      ? "var(--ink)"
                      : "var(--muted)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transition: "color 0.12s ease",
                }}
              >
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
