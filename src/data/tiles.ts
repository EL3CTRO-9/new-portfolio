export type TileKey =
  | "victorian_plum"
  | "red_oxide"
  | "indigo_cross"
  | "royal_blue"
  | "emerald"
  | "plum_vine"
  | "burgundy"
  | "ochre";

export type TilePattern =
  | "cross"
  | "vine"
  | "floral"
  | "mandala"
  | "star"
  | "lattice";

export interface TileMeta {
  key: string;
  name: string;
  color: string;
  accent: string;
  pattern: TilePattern;
  imageUrl?: string;
}

export const TILES: Record<string, TileMeta> = {
  victorian_plum: {
    key: "victorian_plum",
    name: "Victorian Plum",
    color: "#3a1828",
    accent: "#d4a878",
    pattern: "mandala",
    imageUrl: "/tiles/img2.png",
  },
  red_oxide: {
    key: "red_oxide",
    name: "Red Oxide",
    color: "#8b3a2a",
    accent: "#f4d9b8",
    pattern: "floral",
    imageUrl: "/tiles/img1.png",
  },
  indigo_cross: {
    key: "indigo_cross",
    name: "Indigo Cross",
    color: "#1a2d6b",
    accent: "#d4c89a",
    pattern: "cross",
  },
  royal_blue: {
    key: "royal_blue",
    name: "Royal Blue",
    color: "#1a3a8b",
    accent: "#e8d4a0",
    pattern: "star",
    imageUrl: "/tiles/img3.png",
  },
  emerald: {
    key: "emerald",
    name: "Emerald Lattice",
    color: "#0a3a28",
    accent: "#e8d4a0",
    pattern: "lattice",
  },
  plum_vine: {
    key: "plum_vine",
    name: "Plum Vine",
    color: "#4a1a3a",
    accent: "#e8b8c4",
    pattern: "vine",
  },
  burgundy: {
    key: "burgundy",
    name: "Burgundy",
    color: "#4a1414",
    accent: "#d4b878",
    pattern: "mandala",
    imageUrl: "/tiles/img4.png",
  },
  ochre: {
    key: "ochre",
    name: "Ochre",
    color: "#8b6a1a",
    accent: "#1a2d4a",
    pattern: "vine",
  },

  // ── Tile image library (img1–img60) ──────────────────────────────────────
  // Drop a square photo named imgN.png into /public/tiles, then UNCOMMENT its
  // line below to activate that tile. While commented out a slot does nothing
  // (it won't be random-picked for the footer and won't show a broken image).
  // The color/accent/pattern values are only a fallback if the photo is absent.
  // NOTE: img1–img4 are already used above by the named tiles (red_oxide etc.).
  //
  // img1:  { key: "img1",  name: "Tile 1",  color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img1.png" },
  // img2:  { key: "img2",  name: "Tile 2",  color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img2.png" },
  // img3:  { key: "img3",  name: "Tile 3",  color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img3.png" },
  // img4:  { key: "img4",  name: "Tile 4",  color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img4.png" },
  // img5:  { key: "img5",  name: "Tile 5",  color: "#0a3a28", accent: "#e8d4a0", pattern: "lattice", imageUrl: "/tiles/img5.png" },
  // img6:  { key: "img6",  name: "Tile 6",  color: "#4a1a3a", accent: "#e8b8c4", pattern: "vine",    imageUrl: "/tiles/img6.png" },
  // img7:  { key: "img7",  name: "Tile 7",  color: "#4a1414", accent: "#d4b878", pattern: "mandala", imageUrl: "/tiles/img7.png" },
  // img8:  { key: "img8",  name: "Tile 8",  color: "#8b6a1a", accent: "#1a2d4a", pattern: "vine",    imageUrl: "/tiles/img8.png" },
  // img9:  { key: "img9",  name: "Tile 9",  color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img9.png" },
  // img10: { key: "img10", name: "Tile 10", color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img10.png" },
  // img11: { key: "img11", name: "Tile 11", color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img11.png" },
  // img12: { key: "img12", name: "Tile 12", color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img12.png" },
  // img13: { key: "img13", name: "Tile 13", color: "#0a3a28", accent: "#e8d4a0", pattern: "lattice", imageUrl: "/tiles/img13.png" },
  // img14: { key: "img14", name: "Tile 14", color: "#4a1a3a", accent: "#e8b8c4", pattern: "vine",    imageUrl: "/tiles/img14.png" },
  // img15: { key: "img15", name: "Tile 15", color: "#4a1414", accent: "#d4b878", pattern: "mandala", imageUrl: "/tiles/img15.png" },
  // img16: { key: "img16", name: "Tile 16", color: "#8b6a1a", accent: "#1a2d4a", pattern: "vine",    imageUrl: "/tiles/img16.png" },
  // img17: { key: "img17", name: "Tile 17", color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img17.png" },
  // img18: { key: "img18", name: "Tile 18", color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img18.png" },
  // img19: { key: "img19", name: "Tile 19", color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img19.png" },
  // img20: { key: "img20", name: "Tile 20", color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img20.png" },
  // img21: { key: "img21", name: "Tile 21", color: "#0a3a28", accent: "#e8d4a0", pattern: "lattice", imageUrl: "/tiles/img21.png" },
  // img22: { key: "img22", name: "Tile 22", color: "#4a1a3a", accent: "#e8b8c4", pattern: "vine",    imageUrl: "/tiles/img22.png" },
  // img23: { key: "img23", name: "Tile 23", color: "#4a1414", accent: "#d4b878", pattern: "mandala", imageUrl: "/tiles/img23.png" },
  // img24: { key: "img24", name: "Tile 24", color: "#8b6a1a", accent: "#1a2d4a", pattern: "vine",    imageUrl: "/tiles/img24.png" },
  // img25: { key: "img25", name: "Tile 25", color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img25.png" },
  // img26: { key: "img26", name: "Tile 26", color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img26.png" },
  // img27: { key: "img27", name: "Tile 27", color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img27.png" },
  // img28: { key: "img28", name: "Tile 28", color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img28.png" },
  // img29: { key: "img29", name: "Tile 29", color: "#0a3a28", accent: "#e8d4a0", pattern: "lattice", imageUrl: "/tiles/img29.png" },
  // img30: { key: "img30", name: "Tile 30", color: "#4a1a3a", accent: "#e8b8c4", pattern: "vine",    imageUrl: "/tiles/img30.png" },
  // img31: { key: "img31", name: "Tile 31", color: "#4a1414", accent: "#d4b878", pattern: "mandala", imageUrl: "/tiles/img31.png" },
  // img32: { key: "img32", name: "Tile 32", color: "#8b6a1a", accent: "#1a2d4a", pattern: "vine",    imageUrl: "/tiles/img32.png" },
  // img33: { key: "img33", name: "Tile 33", color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img33.png" },
  // img34: { key: "img34", name: "Tile 34", color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img34.png" },
  // img35: { key: "img35", name: "Tile 35", color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img35.png" },
  // img36: { key: "img36", name: "Tile 36", color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img36.png" },
  // img37: { key: "img37", name: "Tile 37", color: "#0a3a28", accent: "#e8d4a0", pattern: "lattice", imageUrl: "/tiles/img37.png" },
  // img38: { key: "img38", name: "Tile 38", color: "#4a1a3a", accent: "#e8b8c4", pattern: "vine",    imageUrl: "/tiles/img38.png" },
  // img39: { key: "img39", name: "Tile 39", color: "#4a1414", accent: "#d4b878", pattern: "mandala", imageUrl: "/tiles/img39.png" },
  // img40: { key: "img40", name: "Tile 40", color: "#8b6a1a", accent: "#1a2d4a", pattern: "vine",    imageUrl: "/tiles/img40.png" },
  // img41: { key: "img41", name: "Tile 41", color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img41.png" },
  // img42: { key: "img42", name: "Tile 42", color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img42.png" },
  // img43: { key: "img43", name: "Tile 43", color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img43.png" },
  // img44: { key: "img44", name: "Tile 44", color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img44.png" },
  // img45: { key: "img45", name: "Tile 45", color: "#0a3a28", accent: "#e8d4a0", pattern: "lattice", imageUrl: "/tiles/img45.png" },
  // img46: { key: "img46", name: "Tile 46", color: "#4a1a3a", accent: "#e8b8c4", pattern: "vine",    imageUrl: "/tiles/img46.png" },
  // img47: { key: "img47", name: "Tile 47", color: "#4a1414", accent: "#d4b878", pattern: "mandala", imageUrl: "/tiles/img47.png" },
  // img48: { key: "img48", name: "Tile 48", color: "#8b6a1a", accent: "#1a2d4a", pattern: "vine",    imageUrl: "/tiles/img48.png" },
  // img49: { key: "img49", name: "Tile 49", color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img49.png" },
  // img50: { key: "img50", name: "Tile 50", color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img50.png" },
  // img51: { key: "img51", name: "Tile 51", color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img51.png" },
  // img52: { key: "img52", name: "Tile 52", color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img52.png" },
  // img53: { key: "img53", name: "Tile 53", color: "#0a3a28", accent: "#e8d4a0", pattern: "lattice", imageUrl: "/tiles/img53.png" },
  // img54: { key: "img54", name: "Tile 54", color: "#4a1a3a", accent: "#e8b8c4", pattern: "vine",    imageUrl: "/tiles/img54.png" },
  // img55: { key: "img55", name: "Tile 55", color: "#4a1414", accent: "#d4b878", pattern: "mandala", imageUrl: "/tiles/img55.png" },
  // img56: { key: "img56", name: "Tile 56", color: "#8b6a1a", accent: "#1a2d4a", pattern: "vine",    imageUrl: "/tiles/img56.png" },
  // img57: { key: "img57", name: "Tile 57", color: "#3a1828", accent: "#d4a878", pattern: "mandala", imageUrl: "/tiles/img57.png" },
  // img58: { key: "img58", name: "Tile 58", color: "#8b3a2a", accent: "#f4d9b8", pattern: "floral",  imageUrl: "/tiles/img58.png" },
  // img59: { key: "img59", name: "Tile 59", color: "#1a2d6b", accent: "#d4c89a", pattern: "cross",   imageUrl: "/tiles/img59.png" },
  // img60: { key: "img60", name: "Tile 60", color: "#1a3a8b", accent: "#e8d4a0", pattern: "star",    imageUrl: "/tiles/img60.png" },
};
