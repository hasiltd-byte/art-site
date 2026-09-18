"use client";

import { usePaintings } from "@/components/PaintingProvider";
import { ArtworkCard } from "@/components/ArtworkCard";

export function WorksClient() {
  const { paintings } = usePaintings();
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {paintings.map((painting) => <ArtworkCard key={painting.slug} painting={painting} />)}
    </div>
  );
}
