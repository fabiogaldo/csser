```md
# Arquitetura — CSSer 🧩

> Uma aplicação para aprender, testar e dominar CSS moderno  
> **The playground where CSSers evolve**

Este documento descreve a arquitetura, principais decisões técnicas e fluxo do CSSer.

---

## 📐 Visão Geral da Arquitetura

O projeto segue uma arquitetura simples e escalável baseada em **Front-End + API + Banco de Dados**:

```

┌─────────────┐        HTTP/JSON        ┌──────────────┐
│   Frontend  │  <------------------>  │    Backend    │
│ (React App) │                        │ (Node + API)  │
└───────▲─────┘                        └───────▲──────┘
│                                  │
│ (HTML + CSS via API)             │ (CRUD)
│                                  │
│                              ┌───┴──────────┐
│                              │   MongoDB    │
│                              └──────────────┘
│
Render
▼
┌──────────────────┐
│ Preview (Shadow) │
│  CSS + HTML Live │
└──────────────────┘

````

---

## 🧱 Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Frontend | React + TypeScript |
| Preview CSS | Shadow DOM para isolamento |
| API Backend | Node.js + Express |
| Banco | MongoDB + Mongoose |
| Infra | Local / MongoDB Atlas |
| Documentação | Git + Markdown |

---

## 📦 Modelagem de Templates

Os templates são armazenados como documentos MongoDB:

```ts
{
  _id: string; // slug
  name: string;
  category: "card" | "button" | "layout" | ...
  html: string;
  css: string;
  params: TemplateParam[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
````

`params` controla os inputs do usuário no frontend:

```ts
{
  id: string;
  label: string;
  type: "number" | "color" | "select" | "boolean";
  defaultValue: any;
  cssVar?: string; // exemplo: "--card-radius"
}
```

Isso permite:

* **UI de controles dinâmica**
* **Geração de CSS real-time**
* **Expansão fácil com novos templates**

---

## 🔌 Endpoints da API

| Método | Rota                 | Função                      |
| ------ | -------------------- | --------------------------- |
| `GET`  | `/api/templates`     | Lista templates com filtros |
| `GET`  | `/api/templates/:id` | Busca template por slug     |
| `POST` | `/api/templates`     | Cria template (admin)       |
| `PUT`  | `/api/templates/:id` | Atualiza template           |

---

## 🎨 Renderização do Preview

O preview CSS roda **isolado do resto da aplicação** usando:

### Shadow DOM

```tsx
const shadow = containerRef.current.attachShadow({ mode: "open" });

shadow.innerHTML = `
  <style>${cssGerado}</style>
  ${htmlDoTemplate}
`;
```

Benefícios:

* Estilos do usuário **não afetam o app**
* Estilos do app **não vazam para o preview**
* Leve e sem sandbox de navegação

Caso o usuário edite HTML/JS no futuro, podemos migrar para:

➡ Iframe com sandbox (`allow-same-origin`, scripts restritos)

---

## 🗂 Organização do código

```
csser/
  backend/
    src/
      routes/      # /api/templates
      models/      # Mongoose
      types/       # Tipagem compartilhada
      seed/        # Templates iniciais
      index.ts     # App Express
  frontend/
    src/
      api/         # fetch API
      components/  # UI
      preview/     # Shadow DOM Renderer
      hooks/       # Estado de parâmetros
  docs/
    architecture.md
```

---

## 🧪 Fluxos principais

### 🔼 Carregamento de templates

1. Front faz `GET /api/templates`
2. Renderiza lista de opções
3. Ao selecionar, faz `GET /api/templates/:id`
4. UI constrói controles baseado em `params`

### 🎚️ Atualização de parâmetros

1. Usuário altera um controle (ex: border-radius)
2. JS altera CSS custom properties
3. Preview atualiza instantaneamente

---

## 🚀 Roadmap Técnico

| Status | Item                       |
| ------ | -------------------------- |
| ✔      | API Backend com MongoDB    |
| ✔      | Seed de templates          |
| ⏳      | UI básica com preview      |
| ⏳      | Controles dinâmicos de CSS |
| ⏳      | Shadow DOM isolado         |
| ⏳      | Filtros avançados e busca  |
| ❌      | Autenticação               |
| ❌      | Salvar snippets do usuário |
| ❌      | Deploy Pipeline (CI/CD)    |

---

## 📝 Decisões de Arquitetura

| Tema        | Decisão                                     |
| ----------- | ------------------------------------------- |
| Banco       | MongoDB por flexibilidade do schema         |
| Preview     | Shadow DOM para isolamento e performance    |
| Repositório | Monorepo simples (`backend/` + `frontend/`) |
| API         | REST por simplicidade e clareza             |
| Tecnologias | TS para consistência no stack               |

---

## 💡 Possíveis expansões futuras

* Modo “Desafios”
* Compartilhar snippets via URL curta
* Likes e favoritos
* Playground para animações
* Editor HTML/CSS completo (com iframe sandbox)
* Deploy multi-ambiente (Prod/Dev)
* Internacionalização (i18n)

---

## 🏁 Conclusão

O CSSer foi desenhado para ser:

* **Educacional**
* **Modernamente arquitetado**
* **Evolutivo**
* **Excelente para portfólio e entrevistas**

A base já está sólida para crescer com novas features e contribuições da comunidade 💙

---

> “Where CSSers evolve.” — Let’s code! 🎨🚀

```