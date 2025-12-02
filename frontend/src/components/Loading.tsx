// src/components/Loading.tsx
export function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
        <span>Carregando templates...</span>
      </div>
    </div>
  );
}
