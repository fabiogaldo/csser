import type { Template } from '../types/template';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TemplateListProps {
  templates: Template[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TemplateList({ templates, selectedId, onSelect }: TemplateListProps) {
  return (
    <aside className="md:border-r border-slate-200 md:pr-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-slate-500">
        <span>Templates</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-[2px] text-[10px] text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
                  'w-full text-left rounded-lg px-3 py-2 text-sm flex flex-col gap-0.5 transition-all border',
                  active
                    ? 'bg-sky-50 border-sky-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                ].join(' ')}
              >
                <span className="font-medium text-slate-900">{tpl.name}</span>
                {tpl.description && (
                  <span className="text-[11px] text-slate-500 line-clamp-2">
                    {tpl.description}
                  </span>
                )}
              </button>
            );
          })}

          {templates.length === 0 && (
            <div className="text-xs text-slate-500 mt-2">
              Nenhum template encontrado.
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
