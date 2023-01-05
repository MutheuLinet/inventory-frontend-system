import "./App.css";
import { useEffect, useState } from "react";
import { InventoryTable } from "./components/InventoryTable";
import { fetchInventoryProducts } from "./api/fetchInventoryProducts";
import { getProductsDisplayData } from "./helpers/getProductsDisplayData";
import { AddProductDialog } from "./components/AddProductDialog";

function App() {
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    getProductsData();
  }, []);
  //fetches products and sets them to state
  const getProductsData = async () => {
    const initialProducts = await fetchInventoryProducts();
    console.log(initialProducts);
    const displayProductsFormat = getProductsDisplayData(initialProducts);
    setProducts(displayProductsFormat);
  };
  //opens AddProductDialog
  const handleClickToOpen = () => {
    setShowDialog(true);
  };
  //closes AddProductDialog
  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="App">
      <h3>Inventory Management System</h3>
      <InventoryTable products={products} />
      <br />
      <button onClick={handleClickToOpen} style={{ marginBottom: "20px" }}>
        Add Product
      </button>
      <br />
      <AddProductDialog open={showDialog} toggle={handleClose} />
    </div>
  );
}

export default App;
