import { seedPaintings } from "@/data/paintings";
import type { Painting } from "@/types/painting";

export const LOCAL_STORAGE_KEY = "zvi-aharon-paintings-v1";

export function getSeedPaintings(): Painting[] {
  return [...seedPaintings].sort((a, b) => a.order - b.order);
}

export function getSeedPainting(slug: string): Painting | undefined {
  return seedPaintings.find((item) => item.slug === slug);
}
