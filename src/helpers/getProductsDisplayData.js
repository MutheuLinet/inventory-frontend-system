import moment from "moment";

export function getProductsDisplayData(products = []) {
  const displayProductsFormat = products.map((obj) => ({
    ...obj,
    deleted: false,
    price: [
      {
        cost_price: obj.cost_price,
        timeStamp: moment(new Date()).format("YYYY-MM-DD"),
      },
    ],
  }));
  return displayProductsFormat;
}
