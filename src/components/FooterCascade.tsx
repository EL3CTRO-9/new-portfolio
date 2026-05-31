import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import TileBand from "./TileBand";
import Tile from "./Tile";
import { TILES, type TileKey } from "../data/tiles";

const EASE = [0.34, 1.56, 0.64, 1] as const;
const STAGGER = 0.032; // 32ms per center-out step
const CELL_DUR = 0.2;

// Idle house-tile repeat size (larger than the post tiles, fully visible).
const HOUSE_REPEAT = 180;

interface FooterCascadeProps {
  /** Active post tile. Undefined = idle (no post selected). */
  tileKey?: TileKey;
  /** Optional idle background image (e.g. the house tile on home / about). */
  houseTile?: string;
}

/**
 * Reveals a new tile pattern as a staggered grid of square cells blooming from
 * the band's center outward. The previous (committed) pattern sits underneath
 * and is covered as cells fill in; once the cascade settles we commit the new
 * pattern as a single plain TileBand and unmount the animated cell layer.
 * Self-measuring, so it shares cleanly between the desktop and mobile footers.
 *
 * At idle (no post) the band shows the optional `houseTile` image tiled, or a
 * neutral/empty band when no house tile is provided. Selecting a post sets
 * `tileKey`, which takes precedence over the house tile and runs the cascade.
 */
export default function FooterCascade({ tileKey, houseTile }: FooterCascadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [committed, setCommitted] = useState<TileKey | null>(tileKey ?? null);
  const [incoming, setIncoming] = useState<TileKey | null>(null);

  // Measure the band; recompute square cells on resize.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    // Back to idle (e.g. post → home): drop straight to the house/neutral
    // background. No cascade — that only runs on post selection.
    if (tileKey == null) {
      setIncoming(null);
      setCommitted(null);
      return;
    }
    if (tileKey === committed) return;
    setIncoming(tileKey);
  }, [tileKey, committed]);

  const { w, h } = size;
  const ready = w > 0 && h > 0;

  // Square-cell grid (cell side ≈ band height), per the cascade math.
  const cell = h || 1;
  const cols = Math.max(4, Math.ceil(w / cell));
  const rows = Math.max(1, Math.round(h / cell));
  const cellW = w / cols;
  const cellH = h / rows;
  const centerC = (cols - 1) / 2;
  const centerR = (rows - 1) / 2;

  const inc = incoming;
  const incMeta = inc ? TILES[inc] : undefined;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Previous / idle pattern — covered as cells fill in, and the seamless
          final state once the cascade has settled. A committed post tile renders
          as a plain TileBand; with no post, the optional house tile fills the
          band (tiled, fully visible); otherwise the band is neutral/empty. */}
      {ready && committed && (
        <TileBand tileKey={committed} width={w} height={h} />
      )}
      {ready && !committed && houseTile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${houseTile})`,
            backgroundRepeat: "repeat",
            // ~180px repeat, height auto keeps the texture undistorted.
            backgroundSize: `${HOUSE_REPEAT}px`,
          }}
        />
      )}

      {/* Animated square-cell layer (remounts per tile to replay the cascade). */}
      {inc && ready && (
        <div key={inc} style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: rows }).flatMap((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              // Center-out: delay grows with distance from the band's center
              // cell. For a single row this reduces to |c - centerC|.
              const step = Math.hypot(c - centerC, r - centerR);
              // The corner cell finishes last — use it to commit + tear down.
              const isLast = r === 0 && c === 0;
              return (
                <motion.div
                  key={`${r}-${c}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.55 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={
                    reduce
                      ? { duration: 0.08 }
                      : { duration: CELL_DUR, delay: step * STAGGER, ease: EASE }
                  }
                  onAnimationComplete={
                    isLast
                      ? () => {
                          setCommitted(inc);
                          setIncoming(null);
                        }
                      : undefined
                  }
                  style={{
                    position: "absolute",
                    left: c * cellW,
                    top: r * cellH,
                    // ~0.5px bleed avoids hairline seam gaps between cells.
                    width: cellW + 0.5,
                    height: cellH + 0.5,
                    transformOrigin: "center",
                    overflow: "hidden",
                    ...(incMeta?.imageUrl
                      ? {
                          backgroundImage: `url(${incMeta.imageUrl})`,
                          // One complete stamp fills each cell.
                          backgroundSize: `${cellW + 0.5}px ${cellH + 0.5}px`,
                          backgroundRepeat: "no-repeat",
                        }
                      : null),
                  }}
                >
                  {/* SVG-pattern tiles have no image URL: stamp a single Tile. */}
                  {!incMeta?.imageUrl && (
                    <Tile
                      tileKey={inc}
                      size={Math.ceil(Math.max(cellW, cellH)) + 1}
                    />
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
