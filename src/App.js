import "./App.css";
import { useEffect, useState } from "react";
import { InventoryTable } from "./components/InventoryTable";
import { fetchInventoryProducts } from "./api/fetchInventoryProducts";
import { getProductsDisplayData } from "./helpers/getProductsDisplayData";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    const initialProducts = await fetchInventoryProducts();
    console.log(initialProducts);
    const displayProductsFormat = getProductsDisplayData(initialProducts);
    setProducts(displayProductsFormat);
  };

  return (
    <div className="App">
      <h3>Inventory Management System</h3>
      <InventoryTable products={products} />
    </div>
  );
}

export default App;
