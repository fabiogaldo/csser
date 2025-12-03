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
        <h2 className="text-[18px] font-semibold text-slate-900">{template.name}</h2>
        {template.description && (
          <p className="mt-1 text-sm text-slate-500">{template.description}</p>
        )}
      </div>

      <div
        className="
          grid gap-3 min-h-[420px]
          grid-cols-1
          lg:grid-cols-[1.1fr_1.1fr_0.9fr]
        "
      >
        {/* Preview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col gap-3 shadow-sm">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Preview
          </div>
          <div className="flex-1 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
            <PreviewPanel html={template.html} css={template.css} cssVars={cssVars} />
          </div>
        </div>

        {/* Código + CSS gerado */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col gap-3 shadow-sm">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Código
          </div>
          <div className="flex-1 flex flex-col gap-3 overflow-auto">
            <div>
              <div className="text-[11px] text-slate-500 mb-1">HTML (template)</div>
              <pre className="m-0 text-[12px] leading-snug bg-slate-900 text-slate-100 border border-slate-900 rounded-md p-2 whitespace-pre-wrap max-h-32 overflow-auto">
                {template.html}
              </pre>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 mb-1">CSS (original)</div>
              <pre className="m-0 text-[12px] leading-snug bg-slate-900 text-slate-100 border border-slate-900 rounded-md p-2 whitespace-pre-wrap max-h-32 overflow-auto">
                {template.css}
              </pre>
            </div>

            <GeneratedCssPanel css={template.css} cssVars={cssVars} />
          </div>
        </div>

        {/* Parâmetros */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col shadow-sm">
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
