# Evidências dos testes manuais

Antes de começar: configure `VITE_API_URL` (API do Render ou local) e faça login em `http://localhost:5173/login` (veja o README).

Preencha cada item após executar o teste e anexe os prints em `docs/img/` (nomes sugeridos abaixo).

| #   | Teste                      | Como executar                                         | Resultado esperado                                                                                                                  | Status | Evidência             |
| --- | -------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------- |
| 1   | Abre sem erros no console  | `npm run dev`, abrir o navegador e o console (F12)    | Nenhum erro vermelho                                                                                                                | [X]    | `img/01-console.png`  |
| 2   | Produtos carregados da API | Abrir a aba Rede (Network)                            | Requisição `GET /produtos` com status 200 e cartões na tela                                                                         | [X]    | `img/02-lista.png`    |
| 3   | Busca por nome             | Digitar `mouse` (ou parte da descrição de um produto) | Só os produtos correspondentes; contador atualizado                                                                                 | [X]    | `img/03-busca.png`    |
| 4   | Lista vazia                | Digitar `xyz`                                         | Mensagem "Nenhum produto encontrado." e "0 produto(s)"                                                                              | [X]    | `img/04-vazio.png`    |
| 5   | Falha na API               | Parar o servidor e recarregar a página                | Mensagem de erro em vermelho (ex.: "Erro HTTP 500"); sem login, aparece "Não autenticado. Faça login na API e recarregue a página." | [X]    | `img/05-erro.png`     |
| 6   | Ver detalhes               | Clicar em "Ver detalhes"                              | Requisição `GET /produtos/:id` na aba Rede; painel com descrição, categoria, estoque e preço                                        | [X]    | `img/06-detalhes.png` |
| 7   | Fechar detalhes            | Clicar em "Fechar detalhes"                           | Painel desaparece                                                                                                                   | [X]    | `img/07-fechar.png`   |
| 8   | Sem recarregar a página    | Repetir 3, 6 e 7 observando a aba Rede                | Nenhuma navegação de documento (apenas fetch)                                                                                       | [X]    | `img/08-spa.png`      |

Marque `[x]` quando o teste passar.

## Perguntas de discussão (respostas)

- **Onde estão os estados?** Todos em `App`.
- **Por que a pesquisa é controlada por `App`?** O texto filtra a lista, que é dada a `ProductList`. Como `ProductSearch` e `ProductList` são irmãos, o estado fica no pai comum.
- **Como `ProductCard` provoca atualização em `ProductDetails`?** O cartão chama `onViewDetails(id)`, que atualiza `selectedId` em `App`; o efeito busca o produto e o resultado desce por props.
- **props x useState x useEffect:** props são entradas somente leitura vindas do pai; `useState` guarda dados que mudam e re-renderiza; `useEffect` sincroniza o componente com sistemas externos (API).
