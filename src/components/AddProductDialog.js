import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import moment from "moment/moment";

function AddProductDialog({ open, toggle, handleSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [muttiPrice, setMuttiPrice] = useState(0);
  const [type, setType] = useState("");

  const id = Math.random().toString();

  const clearAddProductInputs = () => {
    setName("");
    setCost(0);
    setPrice(0);
    setInsuranceCost(0);
    setMuttiPrice(0);
    setType("");
  };

  const saveProduct = () => {
    const product = {
      id,
      display_name: name,
      walk_in_selling_price: Number(price),
      cost_price: Number(cost),
      insurance_unit_price: Number(insuranceCost),
      mutti_selling_price: Number(muttiPrice),
      package: { form: type },
      deleted: false,
      price: [
        {
          cost_price: cost,
          timeStamp: moment(new Date()).format("YYYY-MM-DD"),
        },
      ],
    };
    console.log(product);
    handleSubmit(product);
    toggle();
    clearAddProductInputs();
  };

  return (
    <div stlye={{}}>
      <Dialog open={open}>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={toggle}>
            Close
          </Button>
        </DialogActions>
        <DialogTitle>{"Add a Product"}</DialogTitle>
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
              placeholder="Product Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={price}
              type="number"
              id="standard-basic2"
              label="Selling Price (GHS)"
              placeholder="Selling Price (GHS)"
              variant="standard"
              data-testid="sprice"
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              value={cost}
              type="number"
              id="standard-basic3"
              label="Cost Price (GHS)"
              placeholder="Cost Price (GHS)"
              variant="standard"
              onChange={(e) => setCost(e.target.value)}
            />
            <TextField
              value={muttiPrice}
              type="number"
              id="standard-basic4"
              label="Mutti Price (GHS)"
              placeholder="Mutti Price (GHS)"
              variant="standard"
              onChange={(e) => setMuttiPrice(e.target.value)}
            />
            <TextField
              value={insuranceCost}
              type="number"
              id="standard-basic5"
              label="Insurance Price (GHS)"
              placeholder="Insurance Price (GHS)"
              variant="standard"
              onChange={(e) => setInsuranceCost(e.target.value)}
            />
            <TextField
              value={type}
              type="text"
              id="standard-basic6"
              label="How it's sold"
              placeholder="How it's sold"
              variant="standard"
              onChange={(e) => setType(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={saveProduct}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { AddProductDialog };
