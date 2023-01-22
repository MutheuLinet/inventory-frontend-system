import "./App.css";
import { useEffect, useState } from "react";
import { InventoryTable } from "./components/InventoryTable";
import { fetchInventoryProducts } from "./api/fetchInventoryProducts";
import { getProductsDisplayData } from "./helpers/getProductsDisplayData";
import { AddProductDialog } from "./components/AddProductDialog";
import { EditDeleteProductDialog } from "./components/EditDeleteProductDialog";

function App() {
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [activeItem, setActiveItem] = useState(undefined);

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

  //add product from AddProductDialog to products array
  const handleAddNewProduct = (product) => {
    setProducts([...products, product]);
  };

  const editDeleteItem = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="App">
      <h3>Inventory Management System</h3>
      <InventoryTable products={products} handleEdit={editDeleteItem} />
      <br />
      <button onClick={handleClickToOpen} style={{ marginBottom: "20px" }}>
        Add Product
      </button>
      <br />
      {activeItem && (
        <EditDeleteProductDialog open={activeItem} toggle={() => setActiveItem(undefined)} item={activeItem} onDelete={deleteProduct} onEdit={editProduct} />
      )}
      <AddProductDialog
        open={showDialog}
        toggle={handleClose}
        handleSubmit={handleAddNewProduct}
      />
    </div>
  );
}

export default App;
