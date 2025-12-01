import type { Template } from '../types/template';

interface TemplateListProps {
  templates: Template[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TemplateList({ templates, selectedId, onSelect }: TemplateListProps) {
  return (
    <aside
      style={{
        width: '260px',
        borderRight: '1px solid #1d2330',
        paddingRight: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflow: 'auto'
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Templates</div>
      {templates.map((tpl) => {
        const active = tpl._id === selectedId;
        return (
          <button
            key={tpl._id}
            onClick={() => onSelect(tpl._id)}
            style={{
              textAlign: 'left',
              borderRadius: 6,
              padding: '6px 8px',
              border: 'none',
              cursor: 'pointer',
              background: active ? '#202938' : 'transparent',
              color: '#f5f5f5',
              fontSize: 13
            }}
          >
            <div style={{ fontWeight: 500 }}>{tpl.name}</div>
            {tpl.description && (
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{tpl.description}</div>
            )}
          </button>
        );
      })}

      {templates.length === 0 && (
        <div style={{ fontSize: 12, opacity: 0.7 }}>Nenhum template encontrado.</div>
      )}
    </aside>
  );
}
