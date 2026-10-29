# Catálogo de Produtos (React + Vite)

SPA em React que lista produtos de uma API REST, permite pesquisar por nome e consultar os detalhes de um produto sem recarregar a página.

## Repositório

https://github.com/maria-brito15/atividade-react-diaw

```bash
git clone https://github.com/maria-brito15/atividade-react-diaw.git
cd atividade-react-diaw
```

## Como executar

Pré-requisito: Node.js compatível com a versão atual do Vite.

A rota `/produtos` da API exige autenticação (JWT em cookie `httpOnly`). Por isso o login é feito pelo próprio endereço do front-end (`http://localhost:5173`), que encaminha as requisições para a API por meio de um proxy configurado em `vite.config.js`. O back-end não foi alterado.

### Opção A: usando a API publicada (Render)

```bash
npm install
cp .env.example .env
```

Edite o `.env`:

```
VITE_API_URL=https://diaw-restfulapi-nodejs.onrender.com
```

Depois:

```bash
npm run dev
```

1. Abra `http://localhost:5173/register` e crie um usuário (só na primeira vez; a API publicada pode ter o cadastro de usuários reiniciado após ficar inativa).
2. Ou, se já tiver conta, abra `http://localhost:5173/login` e entre.
3. Acesse `http://localhost:5173` para usar o catálogo.

> **Atenção:** a API publicada no plano gratuito do Render "dorme" após um período sem uso e pode levar cerca de **1 minuto** para responder na primeira requisição. Nesse intervalo a tela pode ficar em "Carregando produtos..." ou exibir **"Erro HTTP 502"** (ou outro erro de conexão). Isso não é um defeito do front-end: aguarde cerca de 1 minuto e recarregue a página. As requisições seguintes respondem normalmente.

### Opção B: usando a API local

Na pasta da API (DIAW-RESTfulAPI-NodeJS), com um `.env` contendo `PORT=3000` e `SECRET_KEY` definida:

```bash
npm install
npm start
```

No projeto React, mantenha `VITE_API_URL=http://localhost:3000` no `.env`, rode `npm run dev` e siga os mesmos passos de registro/login acima.

Se a mensagem "Não autenticado" aparecer, faça login em `http://localhost:5173/login` e recarregue a página. Reinicie `npm run dev` sempre que alterar o `.env`.

## Configuração da API

O endereço da API é lido da variável `VITE_API_URL` no arquivo `.env` (mesmo nível do `package.json`).

O front-end chama `/produtos` no próprio endereço do Vite, e o servidor de desenvolvimento encaminha a requisição para `VITE_API_URL`. Para o cookie de login funcionar em `localhost`, o proxy remove o atributo `Secure` do cookie enviado pela API publicada (HTTPS). Assim o navegador trata as chamadas como de mesma origem, o cookie é enviado e não há erro de CORS.

Contrato usado:

| Método | Rota            | Resposta                        |
| ------ | --------------- | ------------------------------- |
| GET    | `/produtos`     | array de produtos               |
| GET    | `/produtos/:id` | um produto (404 se não existir) |

Campos de cada produto: `id`, `descricao`, `preco`, `categoria`, `estoque`. A API não possui o campo `nome`; a `descricao` é usada como nome do produto na interface e na pesquisa.

## Diagrama da árvore de componentes

```
App  (estados: products, search, loading, error,
      selectedId, selectedProduct, detailsLoading, detailsError)
├── Header
├── ProductSearch                (props: value, onSearchChange)
├── ProductList                  (props: products, onViewDetails)
│   └── ProductCard (x N)        (props: product, onViewDetails)
└── ProductDetails (condicional) (props: product, loading, error, onClose)
```

## Fluxo de dados

Todo o estado da aplicação fica no componente `App`, que também é o único que conversa com a API. Quando a página abre, o `App` pede a lista de produtos (`GET /produtos`) e guarda a resposta em `products`, junto com os estados de carregamento e de erro.

Quando o usuário digita no campo de pesquisa, o `ProductSearch` não guarda o texto: ele avisa o `App` chamando a função `onSearchChange`, que recebeu por props, e o `App` atualiza o estado `search`. Com o novo texto, o `App` filtra a lista e entrega ao `ProductList` apenas os produtos que combinam; o `ProductList` percorre essa lista com `map` e cria um `ProductCard` para cada produto, usando o `id` como `key`.

Quando o usuário clica em "Ver detalhes", o `ProductCard` chama `onViewDetails` com o `id` do produto. Essa função veio do `App`, passando pelo `ProductList`, e atualiza `selectedId`. Como o `App` observa esse valor em um `useEffect`, ele busca `GET /produtos/:id` e guarda o resultado, que volta por props para o `ProductDetails` mostrar o produto, o carregamento ou o erro. Ao clicar em "Fechar detalhes", o `ProductDetails` chama `onClose` e o `App` limpa esses estados.

Em resumo: os dados descem por props, os eventos sobem por funções recebidas por props, e a comunicação com a API acontece em `useEffect` dentro do `App`.

## Estrutura

```
src/
├── main.jsx
├── App.jsx
├── App.css
├── components/  Header, ProductSearch, ProductList, ProductCard, ProductDetails
├── services/    productsApi.js
└── data/        products.js   (dados locais da Parte 1)
vite.config.js
docs/TESTES.md
```

## Testes manuais

Veja [`docs/TESTES.md`](docs/TESTES.md).
