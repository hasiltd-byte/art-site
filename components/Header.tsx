"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  ["Works", "/works"],
  ["About", "/about"],
  ["Collections", "/works#collections"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((response) => response.json()).then((result) => setUser(result.user ?? null)).catch(() => setUser(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMenuOpen(false);
  }

  const displayName = user?.name || user?.email.split("@")[0] || "User";
  const mobileLinks = user
    ? [...links, ...(user.role === "admin" ? [["Admin", "/admin"]] : []), [displayName, "#logout"]]
    : [...links, ["Log in", "/login"], ["Sign up", "/signup"]];

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
        {user ? <div className="hidden items-center gap-3 lg:flex">
          {user.role === "admin" && <Link href="/admin" className="text-[10px] uppercase tracking-[.18em] text-[#d7b16f]">Admin</Link>}
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7b16f] text-xs uppercase text-[#d7b16f]" title={user.email}>{displayName.charAt(0)}</span>
          <button type="button" onClick={logout} className="text-[10px] uppercase tracking-[.18em] text-white/60 hover:text-white">Log out</button>
        </div> : <Link
          href="/login"
          className="hidden border border-[#d7b16f]/70 px-4 py-2 text-[10px] uppercase tracking-[.2em] text-[#f3e3c0] transition hover:bg-[#d7b16f] hover:text-black lg:inline-flex"
        >
          Log in →
        </Link>}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/15 lg:hidden"
        >
          <span className="h-px w-5 bg-white/80" />
          <span className="h-px w-5 bg-white/80" />
          <span className="h-px w-5 bg-white/80" />
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#090a0a] px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-[1600px] gap-1 md:px-5">
            {mobileLinks.map(([label, href]) => href === "#logout" ? (
              <button key={href} type="button" onClick={logout} className="border-b border-white/10 py-4 text-left text-xs uppercase tracking-[.18em] text-white/75 transition hover:text-[#d7b16f]">Log out</button>
            ) : (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4 text-xs uppercase tracking-[.18em] text-white/75 transition hover:text-[#d7b16f]">
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
