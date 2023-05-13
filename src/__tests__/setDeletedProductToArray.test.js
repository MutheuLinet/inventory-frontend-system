import { setDeletedProductToArray } from "../helpers/setDeletedProductToArray";
import { productItems, markedDeletedProduct } from "../__mock__/productsItems";

describe("function sets a deleted product to an array with the item before deletion", () => {
  it("swaps deleted item", () => {
    const updatedProducts = setDeletedProductToArray(
      markedDeletedProduct,
      productItems
    );
    expect(updatedProducts).toContain(markedDeletedProduct);
  });
});
