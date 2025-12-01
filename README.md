# **CSSer**

> The playground where CSSers evolve.

CSSer é uma aplicação web voltada para quem quer **experimentar, aprender e dominar CSS moderno**.
Com uma interface intuitiva e responsiva, você pode testar propriedades, brincar com parâmetros visuais e descobrir como a **cascata**, **variáveis**, **layouts**, **animações** e outras funcionalidades se comportam — tudo **em tempo real**.

O objetivo é ser uma ferramenta rápida para estudo, prototipagem e demonstrações de CSS.

---

## ✨ Funcionalidades (MVP)

* 🧩 Lista de templates com exemplos de CSS moderno
* 🎚️ Ajuste de parâmetros do estilo (CSS Custom Properties)
* 🔍 Preview ao vivo com isolamento visual
* 🔌 API Node/Express para buscar templates (MongoDB)
* 🧪 Ideal para estudos e criação de snippets CSS

> Futuras evoluções podem incluir criação de snippets, login e compartilhamento de links.

---

## 🧱 Arquitetura

O projeto está organizado como **monorepo**, com backend e frontend independentes:

```
csser/
  backend/    # Node.js + Express + MongoDB
  frontend/   # React (Shadow DOM preview)
  docs/       # Documentação adicional (roadmap, arquitetura, etc.)
  README.md   # Você está aqui
```

---

## 🛠️ Tecnologias

### Backend

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* Dotenv + Cors
* Postman para testes

### Frontend (em breve)

* React + TypeScript
* Shadow DOM para isolamento de estilos
* Fetch API para consumo da API
* (possível) Vite ou Next.js

---

## 🚀 Executando o projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/fabiogaldo/csser.git
cd csser
```

---

### 2️⃣ Backend

```bash
cd backend
cp .env.example .env   # configure a variável MONGO_URI, se necessário
npm install
npm run seed           # popula o banco com templates iniciais
npm run dev            # inicia o servidor local
```

A API estará disponível em:

👉 `http://localhost:3001/api/templates`

---

### 3️⃣ Teste no Postman

Endpoints iniciais:

| Método | Rota                 | Descrição               |
| ------ | -------------------- | ----------------------- |
| GET    | `/api/templates`     | Lista templates         |
| GET    | `/api/templates/:id` | Detalhes de um template |
| POST   | `/api/templates`     | Criar template          |
| PUT    | `/api/templates/:id` | Atualizar template      |

---

## 📌 Roadmap

* [x] Estrutura do backend
* [x] Seed de templates
* [ ] UI com lista de templates
* [ ] Controles de parâmetros
* [ ] Preview isolado com Shadow DOM
* [ ] Opção de ver/copy o CSS gerado
* [ ] Deploy full (front + API)

> Este projeto será evoluído regularmente enquanto componho meu portfólio profissional.

---

## 👨‍💻 Autor

**Fabio Galdo** — Frontend Engineer
Entusiasta de CSS, UI e desenvolvimento web moderno.
