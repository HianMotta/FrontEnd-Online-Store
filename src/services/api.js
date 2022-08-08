export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDPOINT2 = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(ENDPOINT2);
  const data = await response.json();
  return data;
}

export async function getQuery(query) {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
}

export async function getCategory(CATEGORY_ID) {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
}
