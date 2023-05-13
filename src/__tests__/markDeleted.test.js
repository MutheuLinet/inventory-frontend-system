import { markDeleted } from "../helpers/markDeleted";

describe("function sets deleted to true", () => {
  it("set deleted to true", () => {
    const sampleProduct = {
      id: 1,
      display_name: "Hedex",
      walk_in_selling_price: 50,
      cost_price: 9,
      insurance_unit_price: 300,
      deleted: false,
    };

    const updatedProduct = markDeleted(sampleProduct);

    expect(updatedProduct).toEqual({
      id: 1,
      display_name: "Hedex",
      walk_in_selling_price: 50,
      cost_price: 9,
      insurance_unit_price: 300,
      deleted: true,
    });
  });
});
