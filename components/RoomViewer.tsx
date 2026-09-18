"use client";

import Image from "next/image";
import { useState } from "react";

const rooms = [
  { id: "living", label: "Living Room", src: "/mockups/living-room.jpg", frame: { left: 23.8, top: 10.7, width: 61.8, height: 29.3 } },
  { id: "bedroom", label: "Bedroom", src: "/mockups/bedroom.jpg", frame: { left: 24.6, top: 11.5, width: 50.5, height: 24.7 } },
  { id: "office", label: "Office", src: "/mockups/office.jpg", frame: { left: 21.1, top: 10.5, width: 61.4, height: 30.3 } },
  { id: "gallery", label: "Gallery", src: "/mockups/gallery.jpg", frame: { left: 22.2, top: 19.5, width: 70.8, height: 33.1 } },
] as const;

export function RoomViewer({ artworkUrl, title }: { artworkUrl: string; title: string }) {
  const [active, setActive] = useState<(typeof rooms)[number]>(rooms[0]);

  return (
    <section className="border-t border-white/10 py-12">
      <div className="mb-7 flex items-end justify-between gap-5">
        <div>
          <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">See it on your wall</p>
          <h2 className="mt-2 font-serif text-4xl text-[#f4eee4]">View in Space</h2>
        </div>
        <p className="hidden max-w-md text-right text-xs leading-5 text-white/45 md:block">Room previews are visual scale references. The original dimensions remain listed above.</p>
      </div>

      <div className="relative overflow-hidden border border-white/10 bg-black" style={{ aspectRatio: "4 / 5" }}>
        <Image src={active.src} alt={`${active.label} mockup`} fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" />
        <div
          className="absolute flex items-center justify-center border border-[#23180e] bg-[#111] p-[0.35%] shadow-[0_15px_35px_rgba(0,0,0,.35)]"
          style={{ left: `${active.frame.left}%`, top: `${active.frame.top}%`, width: `${active.frame.width}%`, height: `${active.frame.height}%` }}
        >
          <div className="relative h-full w-full bg-black">
            <Image src={artworkUrl} alt={`${title} in ${active.label}`} fill sizes="50vw" className="object-contain" />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {rooms.map((room) => (
          <button key={room.id} onClick={() => setActive(room)} className={`relative overflow-hidden border text-left transition ${active.id === room.id ? "border-[#d7b16f]" : "border-white/10 hover:border-white/30"}`}>
            <div className="relative aspect-[4/3]">
              <Image src={room.src} alt="" fill sizes="25vw" className="object-cover" />
            </div>
            <span className="block px-3 py-2 text-[10px] uppercase tracking-[.18em] text-white/70">{room.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
