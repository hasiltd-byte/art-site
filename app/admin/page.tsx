"use client";

import { useState } from "react";
import { usePaintings } from "@/components/PaintingProvider";
import type { Painting } from "@/types/painting";

export default function AdminPage() {
  const { paintings, savePaintings, resetPaintings } = usePaintings();
  const [draft, setDraft] = useState(JSON.stringify(paintings, null, 2));
  const [message, setMessage] = useState("");

  function save() {
    try {
      const parsed = JSON.parse(draft) as Painting[];
      savePaintings(parsed);
      setMessage("Saved to this browser's localStorage.");
    } catch {
      setMessage("Invalid JSON.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-10">
      <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">Local content editor</p>
      <h1 className="mt-3 font-serif text-5xl">Paintings JSON</h1>
      <p className="mt-4 text-sm leading-6 text-white/55">Temporary browser-only editor. Image fields are URLs. When MongoDB is enabled, use the included API routes/model instead.</p>
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} className="mt-8 h-[60vh] w-full border border-white/10 bg-black p-5 font-mono text-xs leading-5 text-white/75 outline-none focus:border-[#d7b16f]" />
      <div className="mt-4 flex flex-wrap gap-3"><button onClick={save} className="border border-[#d7b16f] px-5 py-3 text-xs uppercase tracking-[.15em]">Save localStorage</button><button onClick={() => { resetPaintings(); setDraft(JSON.stringify(paintings, null, 2)); }} className="border border-white/20 px-5 py-3 text-xs uppercase tracking-[.15em]">Reset</button></div>
      {message && <p className="mt-4 text-sm text-white/60">{message}</p>}
    </div>
  );
}
