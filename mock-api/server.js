import http from 'node:http';

const produtos = [
  { id: 1, nome: 'Teclado mecânico', preco: 249.9, categoria: 'Periféricos', descricao: 'Teclado com conexão USB.' },
  { id: 2, nome: 'Mouse sem fio', preco: 89.9, categoria: 'Periféricos', descricao: 'Mouse compacto e ergonômico.' },
  { id: 3, nome: 'Monitor 24 polegadas', preco: 799, categoria: 'Monitores', descricao: 'Monitor Full HD.' },
  { id: 4, nome: 'Webcam HD', preco: 159, categoria: 'Acessórios', descricao: 'Webcam para videoconferências.' }
];

const send = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(body));
};

http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  if (pathname === '/produtos') return send(res, 200, produtos);
  const m = pathname.match(/^\/produtos\/(\d+)$/);
  if (m) {
    const p = produtos.find((x) => x.id === Number(m[1]));
    return p ? send(res, 200, p) : send(res, 404, { erro: 'Não encontrado' });
  }
  send(res, 404, { erro: 'Rota inexistente' });
}).listen(3000, () => console.log('API de teste em http://localhost:3000'));
