export function AnnouncementBar() {
  return (
    <div className="bg-[oklch(0.32_0.11_18)] text-xs text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-2 text-center">
        <span>
          Experimente o fluxo com <strong>R$ 15 OFF</strong> acima de R$ 99
        </span>
        <span className="rounded bg-white/15 px-2 py-0.5 font-mono text-xs tracking-widest">
          DEMO15
        </span>
      </div>
    </div>
  );
}
