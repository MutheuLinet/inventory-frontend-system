import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { EditDeleteProductDialog } from "../components/EditDeleteProductDialog";
import { data } from "../__mock__/apiData";

describe("EditDeleteProductDialog", () => {
  afterEach(cleanup);

  it("should open dialog with item present to edit product", () => {
    render(
      <EditDeleteProductDialog //render with passed props and item in data array
        open={true}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        item={data[0]}
      />
    );
    expect(screen.getByText("Edit Product")).toBeTruthy();
    expect(screen.getByText("Product Name")).toBeTruthy();
    expect(screen.getByLabelText("Product Name")).toHaveValue(
      "3CP ANTISEPTIC LIQUID 100ML x1"
    );
    expect(screen.getByLabelText("Selling Price (GHS)")).toHaveValue(501.0);
    expect(screen.getByRole("button", { name: "Close" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Edit" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy();
  });

  it("should have initial empty state values if no item is passed", () => {
    render(
      <EditDeleteProductDialog
        open={true}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        item={{}}
      />
    );
    expect(screen.getByLabelText("Product Name")).toHaveValue("");
    expect(screen.getByLabelText("Selling Price (GHS)")).toHaveValue(0);
  });
  describe("EditDeleteProductDialog", () => {
    afterEach(cleanup);
    it("close dialog on toggle of a product", async () => {
      const handleToggleMock = jest.fn();

      render(
        <EditDeleteProductDialog
          open={true}
          toggle={handleToggleMock}
          item={{}}
        />
      );

      await userEvent.click(screen.getByText("Close"));
      expect(handleToggleMock).toBeCalledTimes(1);
    });
  });
  describe("EditDeleteProductDialog", () => {
    afterEach(cleanup);
    it("edit and delete for a product", async () => {
      const handleEditMock = jest.fn();
      const handleDeleteMock = jest.fn();

      render(
        <EditDeleteProductDialog
          open={true}
          toggle={jest.fn()}
          item={{}}
          onEdit={handleEditMock}
          onDelete={handleDeleteMock}
        />
      );

      await userEvent.click(screen.getByText("Edit"));
      expect(handleEditMock).toBeCalledTimes(1);
      await userEvent.click(screen.getByText("Delete"));
      expect(handleDeleteMock).toBeCalledTimes(1);
    });
  });
  describe("", () => {
    it("fill out all textinputs", () => {
      const { getByLabelText } = render(
        <EditDeleteProductDialog open={true} toggle={jest.fn()} item={{}} />
      );

      userEvent.type(screen.getByLabelText("Product Name"), "Asprin");
      expect(screen.getByLabelText("Product Name")).toHaveValue("Asprin");

      userEvent.type(screen.getByLabelText("Selling Price (GHS)"), "100");
      expect(screen.getByLabelText("Selling Price (GHS)")).toHaveValue(100);

      userEvent.type(screen.getByLabelText("Cost Price (GHS)"), "50");
      expect(screen.getByLabelText("Cost Price (GHS)")).toHaveValue(50);

      userEvent.type(screen.getByLabelText("Mutti Price (GHS)"), "5");
      expect(screen.getByLabelText("Mutti Price (GHS)")).toHaveValue(5);

      userEvent.type(screen.getByLabelText("Insurance Price (GHS)"), "25");
      expect(screen.getByLabelText("Insurance Price (GHS)")).toHaveValue(25);

      userEvent.type(screen.getByLabelText("How it's sold"), "tablet");
      expect(screen.getByLabelText("How it's sold")).toHaveValue("tablet");
    });
  });
});
