import "./App.css";
import { InventoryTable } from "./components/InventoryTable";
import { useEffect, useState } from "react";
import { AddProductDialog } from "./components/AddProductDialog";
import { fetchInventoryProducts } from "./api/fetchInventoryProducts";
import { EditDeleteProductDialog } from "./components/EditDeleteProductDialog";
import { markDeleted } from "./helpers/markDeleted";
import { setDeletedProductToArray } from "./helpers/setDeletedProductToArray";
import { filterDeleted } from "./helpers/filterDeleted";
import { getProductsDisplayData } from "./helpers/getProductsDisplayData";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  setProduct,
  addProduct,
  editProducts,
  deleteProducts,
} from "./features/inventory/inventorySlice";
import { PlusIcon } from "../src/images/PlusIcon.js";
import { db } from "./app/db";

const App = () => {
  const productsInState = useSelector((state) => state.inventory.products);
  const products = [...productsInState]; //fix type error can not assign to read only properties
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [activeItem, setActiveItem] = useState(undefined); //undefined or null initially
  const [status, setStatus] = useState("");

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      addProductsArrayToIDB(products);
    }, [3000]);
  }, [products]);

  const handleClickToOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleAddNewProduct = (product) => {
    dispatch(addProduct(product));
  };

  const getProductsData = async () => {
    const initialProducts = await fetchInventoryProducts();
    const displayProductsFormat = getProductsDisplayData(initialProducts);
    dispatch(setProduct(displayProductsFormat));
  };

  const deleteProduct = (product) => {
    const markedProduct = markDeleted(product);
    const allProducts = setDeletedProductToArray(markedProduct, products);
    const filteredProducts = filterDeleted(allProducts);
    dispatch(deleteProducts(filteredProducts));
    setActiveItem(undefined);
  };

  async function addProductsArrayToIDB(products) {
    try {
      // Add the products!
      await db.products.bulkAdd([products]);
      console.log("successfully added fetched products array to IDB", status);
      setStatus(`Products array successfully added`);
    } catch (error) {
      console.log(error, status);
      setStatus(`Failed to add products`);
    }
  }
  const editProduct = (product) => {
    const allProducts = [...products];
    const updatedProducts = allProducts.map((obj, index) => {
      if (obj.id === product.id) {
        return {
          ...product,
          id: product.id,
          display_name: product.display_name,
          walk_in_selling_price: product.walk_in_selling_price,
          cost_price: product.cost_price,
          insurance_unit_price: product.insurance_unit_price,
          mutti_selling_price: product.mutti_selling_price,
          package: { form: product.package.form },
          price: obj.price.concat([
            {
              cost_price: product.cost_price,
              timeStamp: moment(new Date()).format("YYYY-MM-DD"),
            },
          ]),
        };
      }
      return obj;
    });
    dispatch(editProducts(updatedProducts));
    setActiveItem(undefined);
  };

  const editDeleteItem = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="App">
        <h3>Inventory Management System</h3>

        <div
          style={{
            margin: "20px 0px -55px 0px",
            float: "right",
          }}
        >
          <button onClick={handleClickToOpen} className="custom-btn">
            <PlusIcon />
            Add Product
          </button>
        </div>
        <InventoryTable products={products} handleEdit={editDeleteItem} />
        {activeItem && (
          <EditDeleteProductDialog
            open={activeItem}
            toggle={() => setActiveItem(undefined)}
            item={activeItem}
            onDelete={deleteProduct}
            onEdit={editProduct}
          />
        )}
        <AddProductDialog
          open={showDialog}
          toggle={handleClose}
          handleSubmit={handleAddNewProduct}
        />
      </div>
    </>
  );
};

export default App;
