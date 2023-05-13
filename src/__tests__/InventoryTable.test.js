import { render, screen, within } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { InventoryTable } from "../components/InventoryTable";
import { data } from "../__mock__/apiData";

describe("InventoryTable", () => {
  it("should display products list provided", () => {
    render(<InventoryTable products={data} handleEdit={jest.fn()} />);

    expect(screen.getByText("Mutti Price (GHS)")).toBeInTheDocument();
    expect(screen.getByText("Cost Price (GHS)")).toBeInTheDocument();
    expect(screen.getByText("BENDROFLUAZIDE 2.5MG x500")).toBeInTheDocument();
    expect(screen.getAllByTestId(/product-item-/)).not.toBeNull();
  });
  it("should not display any products when none are provided", () => {
    render(<InventoryTable products={[]} handleEdit={jest.fn()} />);

    expect(screen.getByText("Mutti Price (GHS)")).toBeInTheDocument();
    expect(screen.getByText("Cost Price (GHS)")).toBeInTheDocument();
    expect(screen.queryByTestId(/product-item-/)).toBeNull();
  });
  it("should let user select a specific product", async () => {
    const handleEditMock = jest.fn();
    render(<InventoryTable products={data} handleEdit={handleEditMock} />);

    await userEvent.click(
      within(screen.queryByTestId(/product-item-318184/)).getByRole("button")
    );

    expect(handleEditMock).toBeCalledTimes(1);
    expect(handleEditMock).toBeCalledWith(data[0]);
  });
});
