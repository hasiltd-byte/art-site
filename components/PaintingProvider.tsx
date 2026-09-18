"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LOCAL_STORAGE_KEY } from "@/lib/painting-repository";
import type { Painting } from "@/types/painting";

type PaintingContextValue = {
  paintings: Painting[];
  savePaintings: (paintings: Painting[]) => void;
  resetPaintings: () => void;
};

const PaintingContext = createContext<PaintingContextValue | null>(null);

export function PaintingProvider({
  initialPaintings,
  dataSource,
  children,
}: {
  initialPaintings: Painting[];
  dataSource?: string;
  children: React.ReactNode;
}) {
  const [paintings, setPaintings] = useState(initialPaintings);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (dataSource !== "mongodb" && cached) setPaintings(JSON.parse(cached));
    } catch {
      // Ignore malformed browser cache and keep server seed.
    }
  }, [dataSource]);

  const value = useMemo(
    () => ({
      paintings,
      savePaintings(next: Painting[]) {
        setPaintings(next);
        if (dataSource !== "mongodb") localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      },
      resetPaintings() {
        if (dataSource !== "mongodb") localStorage.removeItem(LOCAL_STORAGE_KEY);
        setPaintings(initialPaintings);
      },
    }),
    [paintings, initialPaintings, dataSource]
  );

  return <PaintingContext.Provider value={value}>{children}</PaintingContext.Provider>;
}

export function usePaintings() {
  const ctx = useContext(PaintingContext);
  if (!ctx) throw new Error("usePaintings must be used inside PaintingProvider");
  return ctx;
}
