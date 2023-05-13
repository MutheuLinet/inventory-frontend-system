export function filterDeleted(products = []) {
  return products.filter(checkDeleted);
  function checkDeleted(product) {
    return product.deleted !== true;
  }
}
