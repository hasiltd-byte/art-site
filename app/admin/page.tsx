"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

const emptyForm = {
  slug: "",
  title: "",
  titleHe: "",
  imageUrl: "",
  medium: "",
  dimensions: "",
  availability: "Original available · Private inquiry",
  description: "",
  quote: "",
  order: "0",
};

type AdminPainting = { slug: string; title: string; imageUrl?: string; imagePublicId?: string };

export default function AdminPage() {
  const [user, setUser] = useState<{ name?: string; email: string; role: string } | null | undefined>(undefined);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [paintings, setPaintings] = useState<AdminPainting[]>([]);

  useEffect(() => {
    fetch("/api/auth/me").then((response) => response.json()).then((result) => setUser(result.user ?? null)).catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (user?.role !== "admin") return;
    fetch("/api/paintings").then((response) => response.json()).then((result) => setPaintings(Array.isArray(result) ? result : [])).catch(() => setPaintings([]));
  }, [user]);

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(imageFile ? "Uploading image to Cloudinary..." : "Saving painting to MongoDB...");

    try {
      let imageData: { url?: string; publicId?: string } = {};
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        const uploadResponse = await fetch("/api/upload", { method: "POST", body: uploadData });
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.error ?? "Could not upload image");
        imageData = uploadResult;
        setMessage("Image uploaded. Saving painting to MongoDB...");
      }

      const response = await fetch("/api/paintings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl: imageData.url, imagePublicId: imageData.publicId, order: Number(form.order) || 0 }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not save painting");
      localStorage.removeItem("zvi-aharon-paintings-v1");
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview("");
      setPaintings((current) => [...current, result]);
      setMessage(`Saved “${result.title}” to MongoDB.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save painting.");
    } finally {
      setSaving(false);
    }
  }

  async function removePainting(painting: AdminPainting) {
    if (!window.confirm(`Remove “${painting.title}” from the collection?`)) return;
    setMessage(`Removing “${painting.title}”...`);
    try {
      const response = await fetch(`/api/paintings/${encodeURIComponent(painting.slug)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not remove painting");
      setPaintings((current) => current.filter((item) => item.slug !== painting.slug));
      setMessage(result.cloudinaryDeleted ? "Painting and Cloudinary image removed." : "Painting removed. Add Cloudinary API credentials to also delete its image asset.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not remove painting.");
    }
  }

  return (
    user === undefined ? <div className="mx-auto max-w-5xl px-5 py-16 text-sm text-white/50 md:px-10">Checking access...</div> : !user ? <div className="mx-auto max-w-5xl px-5 py-16 md:px-10"><h1 className="font-serif text-5xl">Admin access</h1><p className="mt-4 text-white/55">Log in with an admin account to manage paintings.</p><Link href="/login" className="mt-7 inline-flex border border-[#d7b16f] px-5 py-3 text-xs uppercase tracking-[.15em]">Log in</Link></div> : user.role !== "admin" ? <div className="mx-auto max-w-5xl px-5 py-16 md:px-10"><h1 className="font-serif text-5xl">Admin access required</h1><p className="mt-4 text-white/55">Your account is signed in, but it does not have the admin role.</p></div> : (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-10">
      <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">MongoDB content editor</p>
      <h1 className="mt-3 font-serif text-5xl">Add a painting</h1>
      <p className="mt-4 text-sm leading-6 text-white/55">Upload an artwork image to Cloudinary, then save its URL and details to MongoDB.</p>
      <form onSubmit={save} className="mt-8 grid gap-5 md:grid-cols-2">
        {(["title", "slug", "titleHe", "medium", "dimensions", "availability", "quote", "order"] as const).map((field) => (
          <label key={field} className={field === "availability" ? "md:col-span-2" : ""}>
            <span className="text-[10px] uppercase tracking-[.18em] text-white/55">{field}</span>
              <input required={field === "title"} type={field === "order" ? "number" : "text"} value={form[field]} onChange={(event) => updateField(field, event.target.value)} className="mt-2 w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#d7b16f]" />
          </label>
        ))}
        <label className="md:col-span-2">
          <span className="text-[10px] uppercase tracking-[.18em] text-white/55">Artwork image</span>
          <input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0] ?? null; setImageFile(file); setImagePreview(file ? URL.createObjectURL(file) : ""); }} className="mt-2 block w-full border border-white/10 bg-black px-4 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" />
          {imagePreview && <img src={imagePreview} alt="Selected artwork preview" className="mt-4 max-h-64 border border-white/10 object-contain" />}
        </label>
        <label className="md:col-span-2">
          <span className="text-[10px] uppercase tracking-[.18em] text-white/55">Description</span>
          <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} className="mt-2 h-36 w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#d7b16f]" />
        </label>
        <button type="submit" disabled={saving} className="w-fit border border-[#d7b16f] px-5 py-3 text-xs uppercase tracking-[.15em] disabled:cursor-wait disabled:opacity-50">{saving ? "Saving..." : "Upload and save"}</button>
      </form>
      {message && <p className="mt-4 text-sm text-white/60">{message}</p>}
      <section className="mt-16 border-t border-white/10 pt-10">
        <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">Collection</p>
        <h2 className="mt-3 font-serif text-4xl">Manage paintings</h2>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {paintings.map((painting) => (
            <div key={painting.slug} className="flex items-center justify-between gap-4 py-4">
              <div className="min-w-0"><p className="truncate font-serif text-xl text-white/85">{painting.title}</p><p className="truncate text-xs text-white/40">{painting.slug}</p></div>
              <button type="button" onClick={() => removePainting(painting)} className="shrink-0 border border-red-300/50 px-3 py-2 text-[10px] uppercase tracking-[.15em] text-red-200 hover:bg-red-300/10">Remove</button>
            </div>
          ))}
          {!paintings.length && <p className="py-6 text-sm text-white/45">No paintings found.</p>}
        </div>
      </section>
    </div>
    )
  );
}
