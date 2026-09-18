"use client";

import Link from "next/link";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const isSignup = mode === "signup";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Authentication failed.");
      window.location.href = result.user.role === "admin" ? "/admin" : "/works";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20 md:px-10">
      <p className="text-[10px] uppercase tracking-[.25em] text-[#d7b16f]">{isSignup ? "Create account" : "Welcome back"}</p>
      <h1 className="mt-3 font-serif text-5xl">{isSignup ? "Sign up" : "Log in"}</h1>
      <form onSubmit={submit} className="mt-10 space-y-5">
        {isSignup && <label className="block"><span className="text-[10px] uppercase tracking-[.18em] text-white/55">Name</span><input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-[#d7b16f]" /></label>}
        <label className="block"><span className="text-[10px] uppercase tracking-[.18em] text-white/55">Email</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-[#d7b16f]" /></label>
        <label className="block"><span className="text-[10px] uppercase tracking-[.18em] text-white/55">Password</span><input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-white/10 bg-black px-4 py-3 text-sm outline-none focus:border-[#d7b16f]" /></label>
        <button disabled={saving} className="border border-[#d7b16f] px-5 py-3 text-xs uppercase tracking-[.15em] disabled:opacity-50">{saving ? "Please wait..." : isSignup ? "Create account" : "Log in"}</button>
      </form>
      {message && <p className="mt-5 text-sm text-red-300">{message}</p>}
      <p className="mt-8 text-sm text-white/50">{isSignup ? "Already have an account? " : "Need an account? "}<Link href={isSignup ? "/login" : "/signup"} className="text-[#d7b16f]">{isSignup ? "Log in" : "Sign up"}</Link></p>
    </div>
  );
}