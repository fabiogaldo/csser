import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-pink-500 shadow-[0_0_20px_rgba(56,189,248,0.8)]" />
          <span className="font-semibold tracking-wide">CSSer</span>
          <span className="text-xs text-slate-400">CSS playground</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Node · Mongo · React · Tailwind · shadcn/ui
        </div>
      </header>

      <main className="flex-1 flex justify-center px-4 py-4">
        <div className="w-full max-w-6xl grid grid-cols-[260px_minmax(0,1fr)] gap-4">
          {children}
        </div>
      </main>
    </div>
  );
}
