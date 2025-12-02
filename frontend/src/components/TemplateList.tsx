import type { Template } from '../types/template';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TemplateListProps {
  templates: Template[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TemplateList({ templates, selectedId, onSelect }: TemplateListProps) {
  return (
    <aside className="border-r border-slate-800 pr-3 flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-slate-400">
        <span>Templates</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-[2px] text-[10px] text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <span>{templates.length}</span>
          <span>disp.</span>
        </span>
      </div>

      <ScrollArea className="flex-1 pr-1">
        <div className="flex flex-col gap-1.5 pb-2">
          {templates.map((tpl) => {
            const active = tpl._id === selectedId;
            return (
              <button
                key={tpl._id}
                onClick={() => onSelect(tpl._id)}
                className={[
                  'w-full text-left rounded-md px-3 py-2 text-sm flex flex-col gap-0.5 transition-all border',
                  active
                    ? 'bg-slate-900 border-slate-600 shadow-md'
                    : 'bg-slate-950 border-transparent hover:bg-slate-900 hover:border-slate-700'
                ].join(' ')}
              >
                <span className="font-medium text-slate-50">{tpl.name}</span>
                {tpl.description && (
                  <span className="text-[11px] text-slate-400 line-clamp-2">
                    {tpl.description}
                  </span>
                )}
              </button>
            );
          })}

          {templates.length === 0 && (
            <div className="text-xs text-slate-400 mt-2">
              Nenhum template encontrado.
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
