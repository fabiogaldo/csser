import type { Template } from '../types/template';
import { PreviewPanel } from './PreviewPanel';
import { useTemplateParams } from '../hooks/useTemplateParams';
import { ParameterControls } from './ParameterControls';
import { GeneratedCssPanel } from './GeneratedCssPanel';

interface TemplateDetailsProps {
  template: Template | null;
}

export function TemplateDetails({ template }: TemplateDetailsProps) {
  if (!template) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
        Selecione um template na lista à esquerda.
      </div>
    );
  }

  return <TemplateDetailsInner key={template._id} template={template} />;
}

function TemplateDetailsInner({ template }: { template: Template }) {
  const { paramValues, cssVars, handleChange, resetToDefaults } = useTemplateParams(template);

  return (
    <section className="flex flex-col gap-3 overflow-hidden">
      <div>
        <h2 className="text-[18px] font-semibold text-slate-50">{template.name}</h2>
        {template.description && (
          <p className="mt-1 text-sm text-slate-400">{template.description}</p>
        )}
      </div>

      <div className="grid grid-cols-[1.1fr_1.1fr_0.9fr] gap-3 min-h-[420px]">
        {/* Preview */}
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 flex flex-col gap-2 shadow-md">
          <div className="text-xs text-slate-400">Preview</div>
          <div className="flex-1 rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
            <PreviewPanel html={template.html} css={template.css} cssVars={cssVars} />
          </div>
        </div>

        {/* Código + CSS gerado */}
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 flex flex-col gap-2 shadow-md">
          <div className="text-xs text-slate-400">Código</div>
          <div className="flex-1 flex flex-col gap-3 overflow-auto">
            <div>
              <div className="text-[11px] text-slate-400 mb-1">HTML (template)</div>
              <pre className="m-0 text-[11px] leading-snug bg-slate-900 border border-slate-800 rounded-md p-2 whitespace-pre-wrap max-h-32 overflow-auto text-slate-100">
                {template.html}
              </pre>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 mb-1">CSS (original)</div>
              <pre className="m-0 text-[11px] leading-snug bg-slate-900 border border-slate-800 rounded-md p-2 whitespace-pre-wrap max-h-32 overflow-auto text-slate-100">
                {template.css}
              </pre>
            </div>

            <GeneratedCssPanel css={template.css} cssVars={cssVars} />
          </div>
        </div>

        {/* Parâmetros */}
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 flex flex-col shadow-md">
          <ParameterControls
            template={template}
            paramValues={paramValues}
            onChange={handleChange}
            onReset={resetToDefaults}
          />
        </div>
      </div>
    </section>
  );
}
