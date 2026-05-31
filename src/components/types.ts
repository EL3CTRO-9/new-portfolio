import type { TileKey } from "../data/tiles";

export interface PostData {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  tileKey: TileKey;
  htmlContent: string;
  endDog?: string;
  dogCaption?: string;
}
