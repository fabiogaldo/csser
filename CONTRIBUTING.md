````md
# Como contribuir para o CSSer 🎨

Obrigado pelo interesse em contribuir com o **CSSer**!  
Toda ajuda é muito bem-vinda — seja corrigindo bugs, sugerindo melhorias ou criando novos templates CSS.

## 🚀 Fluxo para contribuir

1. Faça um **fork** do repositório
2. Crie uma branch para sua contribuição:
   ```bash
   git checkout -b feature/descricao-da-sua-contribuicao
````

3. Faça suas alterações 🛠️
4. Certifique-se de que tudo continua funcionando (build, rotas, etc.)
5. Realize o commit:

   ```bash
   git commit -m "feat: descrição curta da contribuição"
   ```

6. Envie para seu fork:

   ```bash
   git push origin feature/descricao-da-sua-contribuicao
   ```

7. Abra um **Pull Request** 🚩

---

## ✨ O que você pode contribuir

* Novos templates CSS (layouts, animações, interações, efeitos modernos)
* Melhorias no preview e controles
* Correções de bugs no frontend/backend
* Código do backend (novas rotas, otimizações, validações, testes)
* Documentação e exemplos
* Feedback de UX

---

## 📦 Estrutura do repositório

```
csser/
  backend/   # API Node.js + MongoDB
  frontend/  # Interface React com Preview em Shadow DOM
  docs/      # Documentação técnica e roadmap
```

---

## 🧑‍💻 Boas práticas de commits

O projeto segue o padrão **Conventional Commits**:

| Tipo        | Uso                                 |
| ----------- | ----------------------------------- |
| `feat:`     | Nova funcionalidade                 |
| `fix:`      | Correção de bug                     |
| `docs:`     | Alterações somente de documentação  |
| `refactor:` | Refatoração sem mudar comportamento |
| `style:`    | Formatação sem lógica               |
| `chore:`    | Tarefas de manutenção               |

Exemplos:

```
feat: adicionar template de card com animação
fix: corrigir erro 500 na rota GET /api/templates
docs: adicionar instruções de setup no backend README
```

---

## 🧠 Dicas gerais

* Mantenha o código limpo e padronizado (o repo usa `.editorconfig`)
* Prefira TypeScript para evitar problemas de tipagem
* Caso esteja criando um template novo:

  * Use CSS **moderno** (CSS vars, grid, flex, animações…)
  * Mantenha o HTML simples
  * Inclua parâmetros configuráveis, se fizer sentido
* Antes de começar algo grande, considere abrir uma **issue** para alinharmos

---

## 🤝 Comunicação

Se tiver dúvidas:

* Abra uma **Issue** no GitHub
* Descreva claramente sugestões ou problemas encontrados
* Anexe prints, logs ou exemplos quando possível

---

Obrigado novamente por ajudar a construir o **CSSer**!
Vamos evoluir o CSS juntos 🚀💙

```
