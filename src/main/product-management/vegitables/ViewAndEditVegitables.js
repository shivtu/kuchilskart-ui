import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import UnknownError from "../../shared/common/errors/UnknownError";
import EditVegitable from "./EditVegitable";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: 300,
  },
}));

function ViewAndEditVegitables({ vegitables }) {
  const classes = useStyles();

  const tableHeader = [
    "#",
    "Vegitable/Fruit name",
    "Variant",
    "Quantity",
    "Selling price",
    "Discount name",
    "Discounted price",
    "Taxed price",
    "Available",
    "Edit",
  ];

  const [unknownError, setUnknownError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [vegitableToEdit, setVegitableToEdit] = useState("");

  function openEditMenu(subId) {
    try {
      const rowToEdit = vegitables.find(
        (vegitable) => vegitable.vegitableSubId === subId
      );
      setVegitableToEdit(rowToEdit);
      setOpen(true);
    } catch {
      setUnknownError(!unknownError);
    }
  }

  function handleTableSearch(_e) {
    // handle table search
  }

  function renderTable() {
    return (
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {tableHeader.map((head, i) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vegitables.result.map((v, i) => (
            <TableRow key={v.vegitableTableId}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{v.vegitable.vegitableName}</TableCell>
              <TableCell>{v.vegitable.vegitableVariant}</TableCell>
              <TableCell>{v.vegitable.vegitableQuantity}</TableCell>
              <TableCell>{v.vegitable.vegitableSellingPrice}</TableCell>
              <TableCell>{v.vegitable.vegitableOfferedDiscountName}</TableCell>
              <TableCell>{v.vegitable.vegitableDiscountedPrice}</TableCell>
              <TableCell>{v.vegitable.vegitableTaxedPrice}</TableCell>
              <TableCell>{String(v.vegitable.vegitableAvailable)}</TableCell>
              <TableCell>
                {
                  <Button onClick={() => openEditMenu(v.vegitableSubId)}>
                    <EditIcon />
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      {open && (
        <EditVegitable setOpen={setOpen} vegitableToEdit={vegitableToEdit} />
      )}
      {
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField
              className={classes.searchInput}
              id="input-with-icon-grid"
              label="Search by vegitable/fruit name"
              onChange={handleTableSearch}
            />
          </Grid>
        </Grid>
      }
      {renderTable()}
      {unknownError && <UnknownError />}
    </>
  );
}

export default ViewAndEditVegitables;
