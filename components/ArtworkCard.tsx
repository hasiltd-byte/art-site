import Image from "next/image";
import Link from "next/link";
import type { Painting } from "@/types/painting";

export function ArtworkCard({ painting }: { painting: Painting }) {
  return (
    <Link href={`/works/${painting.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-black">
        {painting.imageUrl ? <Image src={painting.imageUrl} alt={painting.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-3 transition duration-700 group-hover:scale-[1.015]" /> : <div className="flex h-full items-center justify-center p-8 text-center font-serif text-2xl text-white/35">Image coming soon</div>}
      </div>
      <h3 className="mt-4 font-serif text-xl text-[#f5eee4]">{painting.title}</h3>
      <p className="mt-1 text-[10px] uppercase tracking-[.17em] text-white/45">{painting.medium} · {painting.dimensions}</p>
    </Link>
  );
}
