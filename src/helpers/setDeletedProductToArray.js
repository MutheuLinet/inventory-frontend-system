export function setDeletedProductToArray(product, products = []) {
  const newArray = products;
  newArray.map((item, index) => {
    if (item.id === product.id) {
      newArray[index] = product;
    }
  });
  return newArray;
}
