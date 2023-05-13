import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Button from "@material-ui/core/Button";

const EditDeleteProductDialog = ({ open, toggle, onEdit, onDelete, item }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [muttiPrice, setMuttiPrice] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    setName(item?.display_name);
    setPrice(item?.walk_in_selling_price);
    setCost(item?.cost_price);
    setInsuranceCost(item?.insurance_unit_price);
    setMuttiPrice(item?.mutti_selling_price);
    setType(item?.package?.form);
  }, [item]);

  const toNumber = (value) => {
    if (typeof value === "number") return value;
    return parseInt(value.replace(/[^\d]+/g, ""));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-PY").format(toNumber(price));
  };
  const userProduct = {
    ...item,
    id: item.id,
    display_name: name,
    walk_in_selling_price: price,
    cost_price: cost,
    insurance_unit_price: insuranceCost,
    mutti_selling_price: muttiPrice,
    package: { form: type },
    deleted: false,
    price: [
      { cost_price: cost, timeStamp: moment(new Date()).format("YYYY-MM-DD") },
    ],
  };
  const handleEdit = () => {
    const product = userProduct;
    onEdit(product);
  };

  const handleDelete = () => {
    const product = userProduct;
    onDelete(product);
  };

  return (
    <div stlye={{}}>
      <Dialog open={open}>
        <DialogActions>
          <button
            className="custom-btn"
            variant="outlined"
            color="primary"
            onClick={toggle}
          >
            Close
          </button>
        </DialogActions>

        <DialogTitle>{`Edit Product`}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "10px",
              width: "500px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField style={{ display: "none" }} />
            <TextField
              value={name}
              type="input"
              id="standard-basic1"
              label="Product Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={price}
              type="number"
              id="standard-basic2"
              label="Selling Price (GHS)"
              variant="standard"
              onChange={(e) => {
                const numberValue = toNumber(e.target.value);
                setPrice(numberValue);
                e.target.value = formatPrice(numberValue);
              }}
            />
            <TextField
              value={cost}
              type="number"
              id="standard-basic3"
              label="Cost Price (GHS)"
              variant="standard"
              onChange={(e) => setCost(Number(e.target.value))}
            />
            <TextField
              value={muttiPrice}
              type="number"
              id="standard-basic4"
              label="Mutti Price (GHS)"
              variant="standard"
              onChange={(e) => setMuttiPrice(Number(e.target.value))}
            />
            <TextField
              value={insuranceCost}
              type="number"
              id="standard-basic5"
              label="Insurance Price (GHS)"
              variant="standard"
              onChange={(e) => setInsuranceCost(Number(e.target.value))}
            />
            <TextField
              value={type}
              type="text"
              id="standard-basic8"
              label="How it's sold"
              variant="standard"
              onChange={(e) => setType(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          {/* <button
            className="custom-btn"
            variant="outlined"
            color="primary"
            onClick={handleEdit}
          >
            Edit
          </button> */}
          <Button variant="outlined" color="primary" onClick={handleDelete}>
            Delete
          </Button>

          {/* <button
            className="custom-btn"
            variant="outlined"
            color="primary"
            onClick={handleDelete}
          >
            Delete
          </button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { EditDeleteProductDialog };
