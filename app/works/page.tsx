import type { Metadata } from "next";
import { WorksClient } from "@/components/WorksClient";

export const metadata: Metadata = { title: "Works" };
export const dynamic = "force-dynamic";

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 lg:py-20">
      <p className="text-[10px] uppercase tracking-[.28em] text-[#d7b16f]">Selected paintings</p>
      <h1 className="mt-3 font-serif text-6xl text-[#f4eee4]">Works</h1>
      <p className="mt-5 max-w-xl text-sm leading-6 text-white/55">A growing body of intuitive figurative expressionist works on paper.</p>
      <div className="mt-12"><WorksClient /></div>
    </div>
  );
}
