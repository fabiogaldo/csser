// src/components/ParameterControls.tsx
import type { Template, TemplateParam } from '../types/template';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ParameterControlsProps {
  template: Template;
  paramValues: Record<string, string | number | boolean>;
  onChange: (param: TemplateParam, value: string | number | boolean) => void;
  onReset: () => void;
}

export function ParameterControls({
  template,
  paramValues,
  onChange,
  onReset
}: ParameterControlsProps) {
  if (template.params.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-slate-950/70 p-3 text-xs text-muted-foreground">
        Este template ainda não possui parâmetros configuráveis.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">Parâmetros</span>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-border/80 px-2 py-[2px] text-[11px] text-muted-foreground hover:bg-slate-900/80 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {template.params.map((param) => {
          const value = paramValues[param.id];

          return (
            <div
              key={param.id}
               className="rounded-md bg-slate-950 px-2.5 py-2 text-xs flex flex-col gap-1.5 border border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[12px]">{param.label}</span>
                {param.cssVar && (
                  <span className="text-[10px] text-muted-foreground">
                    <code>{param.cssVar}</code>
                  </span>
                )}
              </div>

              {param.type === 'number' && (
                <div className="flex flex-col gap-1">
                  {typeof param.min === 'number' && typeof param.max === 'number' && (
                    <Slider
                      min={param.min}
                      max={param.max}
                      step={param.step ?? 1}
                      value={[typeof value === 'number' ? value : Number(value ?? 0)]}
                      onValueChange={([v]) => onChange(param, v)}
                    />
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      type="number"
                      className="h-7 w-[80px] text-[11px]"
                      value={typeof value === 'number' ? value : Number(value ?? 0)}
                      onChange={(e) => {
                        const num = Number(e.target.value);
                        onChange(param, Number.isNaN(num) ? 0 : num);
                      }}
                    />
                    {param.unit && (
                      <span className="text-[11px] text-muted-foreground">
                        {param.unit}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {param.type === 'color' && (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={typeof value === 'string' ? value : String(value ?? '#ffffff')}
                    onChange={(e) => onChange(param, e.target.value)}
                    className="h-6 w-10 cursor-pointer rounded border border-border bg-transparent p-0"
                  />
                  <Input
                    type="text"
                    className="h-7 text-[11px]"
                    value={typeof value === 'string' ? value : String(value ?? '')}
                    onChange={(e) => onChange(param, e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              )}

              {param.type === 'select' && (
                <select
                  value={String(value ?? '')}
                  onChange={(e) => onChange(param, e.target.value)}
                  className="h-7 rounded border border-border bg-slate-950/70 px-2 text-[11px] text-foreground"
                >
                  {(param.options ?? []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {param.type === 'boolean' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <Switch
                    checked={Boolean(value)}
                    onCheckedChange={(checked) => onChange(param, checked)}
                  />
                  <span className="text-[11px] text-muted-foreground">Ativar</span>
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
