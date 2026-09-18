"use client";

import Image from "next/image";
import Link from "next/link";
import { usePaintings } from "@/components/PaintingProvider";
import { RoomViewer } from "@/components/RoomViewer";
import type { Painting } from "@/types/painting";

export function ArtworkDetailClient({ fallback }: { fallback: Painting }) {
  const { paintings } = usePaintings();
  const painting = paintings.find((item) => item.slug === fallback.slug) ?? fallback;
  const related = paintings.filter((item) => item.slug !== painting.slug).slice(0, 2);
  const aspectRatio = painting.imageWidth && painting.imageHeight ? `${painting.imageWidth} / ${painting.imageHeight}` : "4 / 5";

  return (
    <>
      <section className="grid gap-10 py-10 lg:grid-cols-[62%_38%] lg:gap-0 lg:py-16">
        <div className="relative w-full self-start overflow-hidden border border-white/10 bg-black" style={{ aspectRatio }}>
          {painting.imageUrl ? <Image unoptimized={painting.imageUrl.startsWith("https://res.cloudinary.com/")} src={painting.imageUrl} alt={painting.title} fill priority sizes="(max-width: 1024px) 100vw, 62vw" className="object-contain p-4 md:p-8" /> : <div className="flex h-full items-center justify-center p-8 text-center font-serif text-4xl text-white/35">Image coming soon</div>}
        </div>
        <div className="flex flex-col justify-center px-0 py-8 lg:px-12 lg:py-0">
          <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">Original artwork</p>
          <h1 className="mt-5 font-serif text-5xl leading-[.9] text-[#f6efe6] md:text-7xl">{painting.title}</h1>
          <div className="mt-7 h-px w-10 bg-[#d7b16f]" />
          <dl className="mt-7 grid grid-cols-[110px_1fr] gap-y-3 border-b border-white/10 pb-7 text-sm">
            <dt className="text-[10px] uppercase tracking-[.18em] text-white/40">Medium</dt><dd className="text-white/75">{painting.medium}</dd>
            <dt className="text-[10px] uppercase tracking-[.18em] text-white/40">Dimensions</dt><dd className="text-white/75">{painting.dimensions}</dd>
            <dt className="text-[10px] uppercase tracking-[.18em] text-white/40">Availability</dt><dd className="text-white/75">{painting.availability}</dd>
          </dl>
          <p className="mt-7 font-serif text-lg italic leading-8 text-white/72">{painting.description}</p>
          <Link href={`/contact?artwork=${encodeURIComponent(painting.title)}`} className="mt-8 inline-flex w-fit border border-[#d7b16f] bg-[#9e7740]/25 px-6 py-4 text-[10px] uppercase tracking-[.2em] text-[#f3dfba] transition hover:bg-[#d7b16f] hover:text-black">
            Inquire about this work →
          </Link>
        </div>
      </section>

      <RoomViewer artworkUrl={painting.imageUrl} title={painting.title} />

      <section className="border-t border-white/10 py-12">
        <h2 className="font-serif text-3xl text-[#f4eee4]">Related Works</h2>
        <div className="mt-7 grid gap-8 md:grid-cols-2">
          {related.map((item) => (
            <Link key={item.slug} href={`/works/${item.slug}`} className="group grid grid-cols-[150px_1fr] gap-5 border border-white/10 p-4 transition hover:border-[#d7b16f]/40">
              <div className="relative aspect-square bg-black">{item.imageUrl ? <Image unoptimized={item.imageUrl.startsWith("https://res.cloudinary.com/")} src={item.imageUrl} alt={item.title} fill className="object-contain" /> : <div className="flex h-full items-center justify-center p-4 text-center text-xs text-white/35">Image coming soon</div>}</div>
              <div className="self-center"><h3 className="font-serif text-2xl text-[#f5eee4]">{item.title}</h3><p className="mt-2 text-xs text-white/40">{item.medium}</p></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
