import { useMemo, useState } from 'react';

interface GeneratedCssPanelProps {
  css: string;
  cssVars: Record<string, string>;
}

export function GeneratedCssPanel({ css, cssVars }: GeneratedCssPanelProps) {
  const [copied, setCopied] = useState(false);

  const hasVars = Object.keys(cssVars).length > 0;

  const generatedCss = useMemo(() => {
    if (!hasVars) return css.trim();

    const varsLines = Object.entries(cssVars)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');

    return [
      `.csser-preview-root {`,
      varsLines,
      `}`,
      '',
      css.trim()
    ].join('\n');
  }, [css, cssVars, hasVars]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Erro ao copiar CSS', err);
    }
  }

  return (
    <div className="mt-2 rounded-md border border-slate-700 bg-slate-900 p-2 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-300">
          CSS gerado <span className="text-slate-500">(com variáveis)</span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-slate-600 px-2 py-[2px] text-[11px] text-slate-100 hover:bg-slate-800"
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      <pre className="m-0 text-[11px] leading-snug bg-slate-950 border border-slate-800 rounded-md p-2 whitespace-pre-wrap max-h-40 overflow-auto text-slate-100">
        {generatedCss}
      </pre>
    </div>
  );
}
