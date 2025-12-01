// src/App.tsx
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { TemplateList } from './components/TemplateList';
import { TemplateDetails } from './components/TemplateDetails';
import { Loading } from './components/Loading';
import type { Template } from './types/template';
import { fetchTemplates } from './api/templates';

function App() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchTemplates();
        setTemplates(data);
        if (data.length > 0) {
          setSelectedId(data[0]._id);
        }
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os templates.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedTemplate = templates.find((t) => t._id === selectedId) ?? null;

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : error ? (
        <div style={{ color: '#ff6b6b', fontSize: 14 }}>{error}</div>
      ) : (
        <>
          <TemplateList
            templates={templates}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
          />
          <TemplateDetails template={selectedTemplate} />
        </>
      )}
    </Layout>
  );
}

export default App;
