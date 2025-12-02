import { useEffect, useRef } from "react";

interface PreviewPanelProps {
  html: string | undefined;
  css: string | undefined;
  cssVars?: Record<string, string>; // no futuro: valores vindos dos parâmetros
}

export function PreviewPanel({ html, css, cssVars }: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    // Garante um único ShadowRoot
    const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });

    // Limpa conteúdo anterior
    while (shadow.firstChild) {
      shadow.removeChild(shadow.firstChild);
    }

    // Se não tiver template selecionado, não renderiza nada
    if (!html || !css) {
      return;
    }

    // Estilo base + variáveis CSS
    const styleEl = document.createElement("style");

    const varsBlock =
      cssVars && Object.keys(cssVars).length > 0
        ? `
.csser-preview-root {
${Object.entries(cssVars)
  .map(([name, value]) => `  ${name}: ${value};`)
  .join("\n")}
}
`
        : "";

    styleEl.textContent = `
/* CSS Base do Preview */
.csser-preview-root {
  color: #222;                   /* cor legível */
  font-family: system-ui, sans-serif;
  line-height: 1.4;
}

/* CSS do template */
${css}

/* Variáveis CSS aplicadas na raiz (opcional) */
${varsBlock}
`.trim();

    // Wrapper para injetar o HTML do template
    const wrapper = document.createElement("div");
    wrapper.className = "csser-preview-root";
    wrapper.innerHTML = html;

    shadow.appendChild(styleEl);
    shadow.appendChild(wrapper);
  }, [html, css, cssVars]);

  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid #1d2330",
        background: "#050811",
        padding: 12,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Preview</div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          borderRadius: 6,
          background: "#0b101a",
          padding: 16,
          overflow: "auto",
        }}
      />
    </div>
  );
}
