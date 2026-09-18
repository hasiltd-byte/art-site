"use client";

import { useState } from "react";

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

export default function AdminPage() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!imageFile) {
      setMessage("Choose an image first.");
      return;
    }
    setSaving(true);
    setMessage("Uploading image to Cloudinary...");

    try {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      const uploadResponse = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadResult.error ?? "Could not upload image");

      setMessage("Image uploaded. Saving painting to MongoDB...");
      const response = await fetch("/api/paintings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl: uploadResult.url, imagePublicId: uploadResult.publicId, order: Number(form.order) || 0 }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not save painting");
      localStorage.removeItem("zvi-aharon-paintings-v1");
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview("");
      setMessage(`Saved “${result.title}” to MongoDB.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save painting.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-10">
      <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">MongoDB content editor</p>
      <h1 className="mt-3 font-serif text-5xl">Add a painting</h1>
      <p className="mt-4 text-sm leading-6 text-white/55">Upload an artwork image to Cloudinary, then save its URL and details to MongoDB.</p>
      <form onSubmit={save} className="mt-8 grid gap-5 md:grid-cols-2">
        {(["title", "slug", "titleHe", "medium", "dimensions", "availability", "quote", "order"] as const).map((field) => (
          <label key={field} className={field === "availability" ? "md:col-span-2" : ""}>
            <span className="text-[10px] uppercase tracking-[.18em] text-white/55">{field}</span>
            <input required={!["titleHe", "quote", "order"].includes(field)} type={field === "order" ? "number" : "text"} value={form[field]} onChange={(event) => updateField(field, event.target.value)} className="mt-2 w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#d7b16f]" />
          </label>
        ))}
        <label className="md:col-span-2">
          <span className="text-[10px] uppercase tracking-[.18em] text-white/55">Artwork image</span>
          <input required type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0] ?? null; setImageFile(file); setImagePreview(file ? URL.createObjectURL(file) : ""); }} className="mt-2 block w-full border border-white/10 bg-black px-4 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" />
          {imagePreview && <img src={imagePreview} alt="Selected artwork preview" className="mt-4 max-h-64 border border-white/10 object-contain" />}
        </label>
        <label className="md:col-span-2">
          <span className="text-[10px] uppercase tracking-[.18em] text-white/55">Description</span>
          <textarea required value={form.description} onChange={(event) => updateField("description", event.target.value)} className="mt-2 h-36 w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#d7b16f]" />
        </label>
        <button type="submit" disabled={saving} className="w-fit border border-[#d7b16f] px-5 py-3 text-xs uppercase tracking-[.15em] disabled:cursor-wait disabled:opacity-50">{saving ? "Saving..." : "Upload and save"}</button>
      </form>
      {message && <p className="mt-4 text-sm text-white/60">{message}</p>}
    </div>
  );
}
