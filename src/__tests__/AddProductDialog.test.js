import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { AddProductDialog } from "../components/AddProductDialog";

describe("AddProductDialog", () => {
  afterEach(cleanup);

  it("should open empty dialog to add product", () => {
    render(
      <AddProductDialog open={true} close={false} handleSubmit={jest.fn()} />
    );
    expect(screen.getByText("Add a Product")).toBeTruthy();
    expect(screen.getByText("Product Name")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Close" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Submit" })).toBeTruthy();
  });
  describe("AddProductDialog", () => {
    afterEach(cleanup);
    it("not open empty dialog to add product", () => {
      render(
        <AddProductDialog open={false} close={true} handleSubmit={jest.fn()} />
      );

      expect(screen.queryByText("Add a Product")).toBeNull();
      expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
      expect(screen.queryByRole("button", { name: "Submit" })).toBeNull();
    });
  });
  describe("AddProductDialog", () => {
    afterEach(cleanup);
    it("close dialog on submit of a product", async () => {
      const handleSubmitMock = jest.fn();

      render(
        <AddProductDialog
          open={true}
          toggle={jest.fn()}
          handleSubmit={handleSubmitMock}
        />
      );

      await userEvent.click(screen.getByText("Submit"));
      expect(handleSubmitMock).toBeCalledTimes(1);
    });
  });
  describe("", () => {
    it("fill out all textinputs", () => {
      const { getByPlaceholderText } = render(
        <AddProductDialog
          open={true}
          toggle={jest.fn()}
          handleSubmit={jest.fn()}
        />
      );

      userEvent.type(screen.getByPlaceholderText("Product Name"), "Asprin");
      expect(screen.getByPlaceholderText("Product Name")).toHaveValue("Asprin");
      userEvent.type(screen.getByPlaceholderText("Selling Price (GHS)"), "100");
      expect(screen.getByPlaceholderText("Selling Price (GHS)")).toHaveValue(
        100
      );
      userEvent.type(screen.getByPlaceholderText("Cost Price (GHS)"), "50");
      expect(screen.getByPlaceholderText("Cost Price (GHS)")).toHaveValue(50);
      userEvent.type(screen.getByPlaceholderText("Mutti Price (GHS)"), "5");
      expect(screen.getByPlaceholderText("Mutti Price (GHS)")).toHaveValue(5);
      userEvent.type(
        screen.getByPlaceholderText("Insurance Price (GHS)"),
        "25"
      );
      expect(screen.getByPlaceholderText("Insurance Price (GHS)")).toHaveValue(
        25
      );
      userEvent.type(screen.getByPlaceholderText("How it's sold"), "tablet");
      expect(screen.getByPlaceholderText("How it's sold")).toHaveValue(
        "tablet"
      );
    });
  });
});
