# **CSSer — Backend**

API REST em **Node.js + Express + MongoDB** para servir os templates de CSS utilizados pela aplicação CSSer.

A API permite listar, buscar e cadastrar templates — cada template contém HTML, CSS e metadados necessários para montar o preview e os controles na interface.

---

## 🛠️ Tecnologias

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* CORS + dotenv
* Seed de dados com ts-node-dev
* Arquitetura simples e direta, focada em escalabilidade futura

---

## 📂 Estrutura do projeto

```
backend/
  src/
    index.ts          # Ponto de entrada do servidor
    db.ts             # Conexão com o MongoDB
    routes/
      templates.ts    # Rotas /api/templates
    models/
      Template.ts     # Mongoose schema/model
    types/
      template.ts     # Tipagem compartilhada
    seed/
      seedTemplates.ts # Script seed do banco
  .env.example
  tsconfig.json
  README.md
```

---

## ⚙️ Configuração

### 1️⃣ Instalação

```bash
cd backend
npm install
```

### 2️⃣ Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Editar se necessário:

```
MONGO_URI=mongodb://localhost:27017/css_sandbox
PORT=3001
```

Você pode usar MongoDB local ou no Atlas.

---

## 🧪 Populando o banco com templates iniciais

```bash
npm run seed
```

Isso limpa e recria os templates básicos no banco.

---

## ▶️ Rodando o servidor

```bash
npm run dev
```

A API estará disponível em:

> **[http://localhost:3001/api/templates](http://localhost:3001/api/templates)**

---

## 🔌 Endpoints

### Templates

| Método | Rota                 | Descrição                          |
| ------ | -------------------- | ---------------------------------- |
| `GET`  | `/api/templates`     | Lista templates                    |
| `GET`  | `/api/templates/:id` | Busca um template específico       |
| `POST` | `/api/templates`     | Cria um novo template (admin/demo) |
| `PUT`  | `/api/templates/:id` | Atualiza um template existente     |

### Filtros suportados

| Query param | Tipo   | Exemplo                        | Resultado                         |
| ----------- | ------ | ------------------------------ | --------------------------------- |
| `category`  | string | `/api/templates?category=card` | Templates da categoria `card`     |
| `search`    | string | `/api/templates?search=sombra` | Busca por nome, descrição ou tags |

---

## 📌 Modelo de dados

Documento `Template`:

```ts
{
  _id: string;            // slug
  name: string;
  description?: string;
  category: "card" | "button" | "layout" | "animation" | "misc";
  html: string;
  css: string;
  params: TemplateParam[];
  tags?: string[];
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

> `params` permite configurar controles de UI para gerar o CSS dinamicamente.

---

## 📎 Referências

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

---

## 👨‍💻 Autor

**Fabio Galdo** — Frontend Engineer
Criador do CSSer.

---