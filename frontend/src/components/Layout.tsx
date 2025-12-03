import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-pink-500 shadow-[0_0_18px_rgba(56,189,248,0.7)]" />
          <span className="font-semibold tracking-wide text-slate-900">CSSer</span>
          <span className="hidden sm:inline text-xs text-slate-500">CSS playground</span>
        </div>
        <div className="hidden sm:block text-[11px] text-slate-500">
          React · Node · Mongo · Tailwind · shadcn/ui
        </div>
      </header>

      <main className="flex-1 flex justify-center px-3 md:px-6 py-4">
        <div
          className="
            w-full max-w-6xl
            grid gap-4
            grid-cols-1
            md:grid-cols-[260px_minmax(0,1fr)]
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
}
