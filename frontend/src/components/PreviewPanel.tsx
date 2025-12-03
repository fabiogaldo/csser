import { useEffect, useRef } from 'react';

interface PreviewPanelProps {
  html: string | undefined;
  css: string | undefined;
  cssVars?: Record<string, string>;
}

export function PreviewPanel({ html, css, cssVars }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const shadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    while (shadow.firstChild) {
      shadow.removeChild(shadow.firstChild);
    }

    if (!html || !css) return;

    const styleEl = document.createElement('style');

    const varsBlock =
      cssVars && Object.keys(cssVars).length > 0
        ? `
.csser-preview-root {
${Object.entries(cssVars)
  .map(([name, value]) => `  ${name}: ${value};`)
  .join('\n')}
}
`
        : '';

    styleEl.textContent = `
.csser-preview-root {
  color: #111827;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.4;
}

/* CSS do template */
${css}

/* Variáveis CSS aplicadas na raiz */
${varsBlock}
`.trim();

    const wrapper = document.createElement('div');
    wrapper.className = 'csser-preview-root';
    wrapper.innerHTML = html;

    shadow.appendChild(styleEl);
    shadow.appendChild(wrapper);
  }, [html, css, cssVars]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[260px] rounded-xl bg-slate-100 flex items-start justify-center p-8 overflow-auto"
    />
  );
}
