import Link from "next/link";

const links = [
  ["Works", "/works"],
  ["About", "/about"],
  ["Collections", "/works#collections"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  return (
    <header className="relative z-50 border-b border-white/10 bg-[#090a0a]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8 px-5 py-4 md:px-10">
        <Link href="/" className="font-serif text-xl tracking-[.28em] text-[#f6f0e7] md:text-2xl">
          ZVI AHARON
        </Link>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[.18em] text-white/72 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[#d7b16f]">
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="border border-[#d7b16f]/70 px-4 py-2 text-[10px] uppercase tracking-[.2em] text-[#f3e3c0] transition hover:bg-[#d7b16f] hover:text-black"
        >
          Inquire →
        </Link>
      </div>
    </header>
  );
}
