import React from "react";
import App from "../App";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { data } from "../__mock__/apiData";

const defaultStore = { inventory: { products: [data], loading: false } };

function renderComponent() {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const customStore = mockStore({
    ...defaultStore,
  });
  return render(
    <Provider store={customStore}>
      <App />
    </Provider>
  );
}
describe("App Component", () => {
  afterEach(cleanup);

  it("should display header and button to add products", () => {
    renderComponent();
    expect(screen.getByText("Inventory Management System")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Add Product" })).toBeTruthy();
    expect(screen.queryByText("Add a Product")).toBe(null);
  });

  it("should display Add Product modal when add product button is clicked", () => {
    renderComponent();
    userEvent.click(screen.getByRole("button", { name: "Add Product" }));
    expect(screen.queryByText("Submit")).toBeTruthy();
    expect(screen.queryByText("Add a Product")).toBeTruthy();
  });
});

test("loads items eventually", async () => {
  renderComponent();
  // Wait for page to update with query text
  const items = await screen.queryByTestId(/product-item-/);
  expect(screen.queryByTestId(/product-item-/)).toBeTruthy();
  // expect(items).toHaveLength(25);
});
