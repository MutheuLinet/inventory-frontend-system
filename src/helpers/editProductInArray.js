export function editProductInArray(product, products = []) {
  const spreadProducts = [...products];
  spreadProducts.map((obj, index) => {
    if (obj.id === product.id) {
      obj = {
        ...product,
        id: product.id,
        display_name: product.display_name,
        // walk_in_selling_price: Number(product.walk_in_selling_price).toFixed(2),
        cost_price: Number(product.cost_price).toFixed(2),
        // insurance_unit_price: Number(product.insurance_unit_price).toFixed(2),
        // mutti_selling_price: Number(product.mutti_selling_price).toFixed(2),
        // package: { form: product.package.form },
        // price: obj.price.concat([
        //   { cost_price: product.cost_price, timeStamp: new Date() },
        // ]),
      };
      spreadProducts[index] = obj;
    }
    return obj;
  });

  return spreadProducts;
}
