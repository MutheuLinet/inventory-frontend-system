import { editProductInArray } from "../helpers/editProductInArray";
import { productsToEdit, editedProduct } from "../__mock__/productsItems";

describe("function edits a product in an array", () => {
  it("sets edited product in array", () => {
    const editedArray = editProductInArray(editedProduct, productsToEdit);
    expect(editedArray).toContainEqual(editedProduct);
  });
});
