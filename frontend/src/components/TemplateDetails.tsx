import type { Template } from '../types/template';
import { PreviewPanel } from './PreviewPanel';
import { useTemplateParams } from '../hooks/useTemplateParams';
import { ParameterControls } from './ParameterControls';

interface TemplateDetailsProps {
  template: Template | null;
}

export function TemplateDetails({ template }: TemplateDetailsProps) {
  if (!template) {
    return (
      <div style={{ padding: 16, fontSize: 14, opacity: 0.7 }}>
        Selecione um template na lista à esquerda para visualizar detalhes.
      </div>
    );
  }

  // A key garante que, ao trocar de template, o componente interno
  // é remontado, reinicializando o estado baseado no novo template
  return <TemplateDetailsInner key={template._id} template={template} />;
}

function TemplateDetailsInner({ template }: { template: Template }) {
  const { paramValues, cssVars, handleChange, resetToDefaults } = useTemplateParams(template);

  return (
    <section
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflow: 'hidden'
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: 16 }}>{template.name}</h2>
        {template.description && (
          <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.8 }}>
            {template.description}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.1fr 0.9fr',
          gap: '12px',
          marginTop: 8,
          height: '100%',
          minHeight: 0
        }}
      >
        {/* Preview ao vivo com CSS vars aplicadas */}
        <PreviewPanel html={template.html} css={template.css} cssVars={cssVars} />

        {/* Código HTML/CSS */}
        <div
          style={{
            borderRadius: 8,
            border: '1px solid #1d2330',
            padding: 12,
            background: '#0f141f',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}
        >
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>HTML</div>
            <pre
              style={{
                margin: 0,
                fontSize: 12,
                background: '#050811',
                padding: 8,
                borderRadius: 6,
                whiteSpace: 'pre-wrap'
              }}
            >
              {template.html}
            </pre>
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>CSS</div>
            <pre
              style={{
                margin: 0,
                fontSize: 12,
                background: '#050811',
                padding: 8,
                borderRadius: 6,
                whiteSpace: 'pre-wrap'
              }}
            >
              {template.css}
            </pre>
          </div>
        </div>

        {/* Controles de parâmetros */}
        <ParameterControls
          template={template}
          paramValues={paramValues}
          onChange={handleChange}
          onReset={resetToDefaults}
        />
      </div>
    </section>
  );
}
