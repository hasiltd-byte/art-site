export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090a0a]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-7 text-[10px] uppercase tracking-[.24em] text-white/50 md:flex-row md:items-center md:justify-between md:px-10">
        <span>Zvi Aharon</span>
        <span>Art for a more human tomorrow</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
