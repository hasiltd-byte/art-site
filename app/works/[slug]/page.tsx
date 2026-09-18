import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArtworkDetailClient } from "@/components/ArtworkDetailClient";
import { getServerPainting, getServerPaintings } from "@/lib/server-paintings";

export async function generateStaticParams() {
  const paintings = await getServerPaintings();
  return paintings.map((painting) => ({ slug: painting.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const painting = await getServerPainting(slug);
  return painting ? { title: painting.title, description: painting.description } : {};
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const painting = await getServerPainting(slug);
  if (!painting) notFound();
  return <div className="mx-auto max-w-[1600px] px-5 md:px-10"><ArtworkDetailClient fallback={JSON.parse(JSON.stringify(painting))} /></div>;
}
