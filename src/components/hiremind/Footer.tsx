export function Footer() {
  return (
    <footer className="relative py-20 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="font-display text-6xl md:text-8xl text-balance text-muted-foreground/40 mb-12">
          Prepared minds, <span className="italic text-primary">earn offers</span>.
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 HireMind AI · Built for prepared candidates.</div>
          <div className="flex gap-6">
            <a className="hover:text-foreground" href="#">Privacy</a>
            <a className="hover:text-foreground" href="#">Security</a>
            <a className="hover:text-foreground" href="#">Manifesto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
