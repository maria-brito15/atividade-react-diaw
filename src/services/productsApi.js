async function request(path, options = {}) {
  const response = await fetch(path, { credentials: 'include', ...options });

  if (response.status === 401) {
    throw new Error('Não autenticado. Faça login na API e recarregue a página.');
  }

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

export function getProducts({ signal } = {}) {
  return request('/produtos', { signal });
}

export function getProductById(id, { signal } = {}) {
  return request(`/produtos/${encodeURIComponent(id)}`, { signal });
}
