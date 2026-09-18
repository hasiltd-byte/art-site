"use client";

import Image from "next/image";
import Link from "next/link";
import { usePaintings } from "@/components/PaintingProvider";

export function SelectedWorks() {
  const { paintings } = usePaintings();
  const selected = paintings.filter((item) => item.featured).slice(0, 3);

  return (
    <section className="border-t border-white/10 px-5 py-14 md:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[250px_1fr]">
        <div>
          <div className="mb-4 h-px w-8 bg-[#d7b16f]" />
          <h2 className="font-serif text-4xl uppercase leading-[.9] tracking-[.08em] text-[#f4eee4] md:text-5xl">
            Selected<br />Works
          </h2>
          <p className="mt-6 max-w-[20rem] text-sm leading-6 text-white/56">
            Intuitive paintings moving between emotion, transformation and human connection.
          </p>
          <Link href="/works" className="mt-7 inline-flex border border-[#d7b16f]/70 px-5 py-3 text-[10px] uppercase tracking-[.18em] text-[#f4e2bb]">
            View all works →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {selected.map((painting) => (
            <Link key={painting.slug} href={`/works/${painting.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#d7b16f]/25 bg-black shadow-[0_0_35px_rgba(215,177,111,.08)]">
                {painting.imageUrl && <Image
                    src={painting.imageUrl}
                    alt={painting.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />}
              </div>
              <h3 className="mt-4 font-serif text-lg uppercase tracking-[.08em] text-[#f7efe3]">{painting.title}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[.18em] text-white/45">{painting.medium}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
