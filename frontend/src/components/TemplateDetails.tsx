import type { Template } from '../types/template';

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

  return (
    <section style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 16 }}>{template.name}</h2>
        {template.description && (
          <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.8 }}>{template.description}</p>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '12px',
          marginTop: 8,
          height: '100%'
        }}
      >
        <div
          style={{
            borderRadius: 8,
            border: '1px solid #1d2330',
            padding: 12,
            background: '#0f141f',
            overflow: 'auto'
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>HTML</div>
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

          <div style={{ fontSize: 12, opacity: 0.7, margin: '10px 0 6px' }}>CSS</div>
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

        <div
          style={{
            borderRadius: 8,
            border: '1px solid #1d2330',
            padding: 12,
            background: '#0f141f',
            overflow: 'auto'
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Parâmetros</div>
          {template.params.length === 0 && (
            <div style={{ fontSize: 12, opacity: 0.7 }}>Este template ainda não possui parâmetros.</div>
          )}
          {template.params.map((param) => (
            <div
              key={param.id}
              style={{
                fontSize: 12,
                padding: '6px 8px',
                borderRadius: 6,
                background: '#050811',
                marginBottom: 4
              }}
            >
              <div style={{ fontWeight: 500 }}>{param.label}</div>
              <div style={{ opacity: 0.7 }}>
                tipo: <code>{param.type}</code>{' '}
                {param.cssVar && (
                  <>
                    • var: <code>{param.cssVar}</code>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
