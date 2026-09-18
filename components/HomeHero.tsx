import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#090a0a]">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/photos/tree-in-mist.jpg" alt="" fill priority className="object-cover object-left opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,8,.92)_0%,rgba(7,8,8,.82)_35%,rgba(7,8,8,.2)_65%,rgba(7,8,8,.9)_100%)]" />
        <div className="absolute -left-24 top-16 h-[1px] w-[55%] rotate-[18deg] bg-gradient-to-r from-transparent via-[#f0c978]/70 to-transparent shadow-[0_0_20px_rgba(240,201,120,.55)]" />
        <div className="absolute -left-24 bottom-24 h-[1px] w-[65%] -rotate-[9deg] bg-gradient-to-r from-transparent via-[#d7a956]/60 to-transparent shadow-[0_0_26px_rgba(215,169,86,.4)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] items-stretch lg:grid-cols-[34%_66%]">
        <div className="flex min-h-[560px] flex-col justify-center px-6 py-16 md:px-12 lg:min-h-[690px] lg:py-10">
          <p className="mb-5 text-[10px] uppercase tracking-[.34em] text-[#e0c38d]/75">Paintings for a larger life</p>
          <h1 className="font-serif text-[clamp(4.6rem,8vw,8.5rem)] leading-[.72] tracking-[-.04em] text-[#f4eee6]">
            Zvi<br />Aharon
          </h1>
          <p className="mt-8 max-w-md text-sm leading-6 text-white/70 md:text-[15px]">
            An Israeli contemporary artist exploring what lives beneath the surface — emotion, transformation, intimacy and the human spirit.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/works" className="border border-[#d7b16f]/80 px-6 py-3 text-[10px] uppercase tracking-[.2em] text-[#f4e2bb] transition hover:bg-[#d7b16f] hover:text-black">
              Explore the works →
            </Link>
          </div>
          <blockquote className="mt-9 border-t border-white/10 pt-6 font-serif text-xl italic leading-7 text-white/72">
            “I do not paint reality — I reveal what exists beneath it.”
          </blockquote>
        </div>

        <div className="relative min-h-[460px] border-l border-white/8 lg:min-h-[690px]">
          <Image
            src="/artworks/birth-of-the-phoenix.jpg"
            alt="Birth of the Phoenix by Zvi Aharon"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-contain p-4 md:p-6"
          />
          <div className="absolute bottom-6 right-8 text-right text-[9px] uppercase tracking-[.2em] text-white/70">
            <p>Birth of the Phoenix</p>
            <p className="mt-1 text-white/40">Acrylic on watercolor paper · 30 × 50 cm</p>
          </div>
        </div>
      </div>
    </section>
  );
}
