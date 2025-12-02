import type { Template, TemplateParam } from '../types/template';

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
      <div
        style={{
          borderRadius: 8,
          border: '1px solid #1d2330',
          padding: 12,
          background: '#0f141f',
          fontSize: 12,
          opacity: 0.8
        }}
      >
        Este template ainda não possui parâmetros configuráveis.
      </div>
    );
  }

  return (
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.7 }}>Parâmetros</div>
        <button
          type="button"
          onClick={onReset}
          style={{
            borderRadius: 999,
            border: '1px solid #2b3448',
            padding: '2px 8px',
            background: 'transparent',
            color: '#f5f5f5',
            fontSize: 11,
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      {template.params.map((param) => {
        const value = paramValues[param.id];

        return (
          <div
            key={param.id}
            style={{
              padding: '6px 8px',
              borderRadius: 6,
              background: '#050811',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              fontSize: 12
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontWeight: 500 }}>{param.label}</span>
              {param.cssVar && (
                <span style={{ opacity: 0.6 }}>
                  <code>{param.cssVar}</code>
                </span>
              )}
            </div>

            {param.type === 'number' && (
              <>
                {typeof param.min === 'number' && typeof param.max === 'number' ? (
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={param.step ?? 1}
                    value={typeof value === 'number' ? value : Number(value ?? 0)}
                    onChange={(e) =>
                      onChange(param, Number(e.target.value))
                    }
                  />
                ) : null}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <input
                    type="number"
                    value={typeof value === 'number' ? value : Number(value ?? 0)}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      onChange(param, Number.isNaN(num) ? 0 : num);
                    }}
                    style={{
                      width: '80px',
                      background: '#020409',
                      borderRadius: 4,
                      border: '1px solid #2b3448',
                      color: '#f5f5f5',
                      padding: '2px 4px',
                      fontSize: 12
                    }}
                  />
                  {param.unit && (
                    <span style={{ opacity: 0.7, marginLeft: 4 }}>{param.unit}</span>
                  )}
                </div>
              </>
            )}

            {param.type === 'color' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="color"
                  value={typeof value === 'string' ? value : String(value ?? '#ffffff')}
                  onChange={(e) => onChange(param, e.target.value)}
                  style={{
                    width: 32,
                    height: 20,
                    padding: 0,
                    borderRadius: 4,
                    border: '1px solid #2b3448',
                    background: 'transparent'
                  }}
                />
                <input
                  type="text"
                  value={typeof value === 'string' ? value : String(value ?? '')}
                  onChange={(e) => onChange(param, e.target.value)}
                  style={{
                    flex: 1,
                    background: '#020409',
                    borderRadius: 4,
                    border: '1px solid #2b3448',
                    color: '#f5f5f5',
                    padding: '2px 4px',
                    fontSize: 12
                  }}
                  placeholder="#ffffff"
                />
              </div>
            )}

            {param.type === 'select' && (
              <select
                value={String(value ?? '')}
                onChange={(e) => onChange(param, e.target.value)}
                style={{
                  background: '#020409',
                  borderRadius: 4,
                  border: '1px solid #2b3448',
                  color: '#f5f5f5',
                  padding: '2px 4px',
                  fontSize: 12
                }}
              >
                {(param.options ?? []).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {param.type === 'boolean' && (
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(e) => onChange(param, e.target.checked)}
                />
                <span style={{ opacity: 0.8 }}>Ativar</span>
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
}
