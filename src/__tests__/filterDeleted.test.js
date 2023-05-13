import { setDeletedProductToArray } from "../helpers/setDeletedProductToArray";
import { productItems, markedDeletedProduct } from "../__mock__/productsItems";
import { filterDeleted } from "../helpers/filterDeleted";

describe("function replaces a marked deleted product in an array with the initial item before deletion", () => {
  it("swaps deleted item", () => {
    const updatedProducts = setDeletedProductToArray(
      markedDeletedProduct,
      productItems
    );
    const filtered = filterDeleted(updatedProducts);
    expect(filtered).toEqual([
      {
        id: 318185,
        manufacturer: null,
        category: null,
        deleted: false,
      },
      {
        id: 318186,
        manufacturer: null,
        category: null,
        deleted: false,
      },
    ]);
  });
});
