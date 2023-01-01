import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles"; //, makeStyles
import { Button } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });

const InventoryTable = ({ products, handleEdit }) => {
  // const classes = useStyles();
  const link = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path d="M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z" />
    </svg>
  );

  const handleEditItem = (item) => {
    handleEdit(item);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell>
              <h4>Product Name </h4>
            </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell>
              {" "}
              <h4> Selling Price (GHS)</h4>
            </StyledTableCell>
            <StyledTableCell>
              <h4>Cost Price (GHS)</h4>
            </StyledTableCell>
            <StyledTableCell>
              <h4>Mutti Price (GHS)</h4>
            </StyledTableCell>
            <StyledTableCell>
              <h4>Insurance Price (GHS)</h4>
            </StyledTableCell>
            <StyledTableCell>
              <h4>How it's sold</h4>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products?.map((item) => (
              <StyledTableRow
                key={item.id}
                data-testid={`product-item-${item.id}`}
              >
                <StyledTableCell>
                  <Button onClick={() => handleEditItem(item)}>{link}</Button>
                </StyledTableCell>
                <StyledTableCell>{item.display_name}</StyledTableCell>
                <StyledTableCell>-</StyledTableCell>
                <StyledTableCell>{item.walk_in_selling_price}</StyledTableCell>
                <StyledTableCell>{item.cost_price}</StyledTableCell>
                <StyledTableCell>{item.mutti_selling_price}</StyledTableCell>
                <StyledTableCell>{item.insurance_unit_price}</StyledTableCell>
                <StyledTableCell>{item?.package?.form}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { InventoryTable };
