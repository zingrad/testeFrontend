# enContact Frontend Test

Aplicação desenvolvida para o teste prático de Front-end da **enContact**, com React, TypeScript, CSS Modules e consumo de API externa.

---

## Tecnologias

- **React 19**
- **TypeScript**
- **Vite**
- **CSS Modules** + **CSS Variables**
- **React Router v7**
- **i18next** + **react-i18next**
- **Fetch API** nativa

---

## Funcionalidades

- Login simples com `Admin / Admin`
- Rota protegida (`/` requer autenticação)
- Logout via menu dropdown do usuário
- Consumo da API de menus (`/menus`)
- Consumo da API de itens por submenu (`/items/{id}`)
- Listagem de atendimentos com dados reais
- Busca local por nome e assunto
- Seleção múltipla de cards com checkbox
- Arquivar itens selecionados localmente
- Tema **Light / Dark** com persistência no localStorage
- Troca de idioma **PT / EN** com persistência no localStorage
- Responsividade desktop e mobile
- Estados de loading (skeletons), erro e vazio
- Acessibilidade básica (aria-labels, roles, focus-visible)

---

## Funcionalidade extra

Foi implementado um **painel lateral redimensionável** em telas desktop, permitindo ao usuário ajustar a largura da sidebar arrastando a barra divisória entre o menu e o conteúdo.

A melhoria foi inspirada na proposta visual do desafio e melhora a usabilidade em listas com múltiplos menus, lembrando interfaces como o Outlook ou Gmail.

- Largura mínima: `220px`
- Largura máxima: `420px`
- Em mobile: a barra de redimensionamento é ocultada e o layout empilha verticalmente.

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse em: `http://localhost:5173`

---

## Credenciais de teste

| Campo   | Valor |
|---------|-------|
| Usuário | Admin |
| Senha   | Admin |

---

## Build de produção

```bash
npm run build
```

---

## Observação sobre API

A API utilizada é mockada/estática (`my-json-server.typicode.com`). Ações como "Arquivar" são aplicadas apenas localmente no estado da aplicação e não persistem após recarregar a página.

---

## Endpoints utilizados

| Recurso | URL |
|---------|-----|
| Menus | `https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/menus` |
| Itens | `https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items/{id}` |
