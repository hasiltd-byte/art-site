export default async function ContactPage({ searchParams }: { searchParams: Promise<{ artwork?: string }> }) {
  const { artwork } = await searchParams;
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-10">
      <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">Private inquiry</p>
      <h1 className="mt-4 font-serif text-6xl">Contact</h1>
      <p className="mt-6 text-white/60">For originals, Fine Art editions, exhibitions, collaborations and art for spaces.</p>
      {artwork && <p className="mt-4 border-l border-[#d7b16f] pl-4 text-sm text-white/70">Artwork: {artwork}</p>}
      <div className="mt-10 grid gap-4 text-sm text-white/70">
        <a href="mailto:hasiltd@gmail.com" className="border border-white/10 p-5 transition hover:border-[#d7b16f]/60">hasiltd@gmail.com</a>
        <a href="https://wa.me/972504453592" className="border border-white/10 p-5 transition hover:border-[#d7b16f]/60">WhatsApp: +972 50 445 3592</a>
      </div>
    </div>
  );
}
