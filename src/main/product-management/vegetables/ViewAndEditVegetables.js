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
import EditVegetable from "./EditVegetable";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: 300,
  },
}));

function ViewAndEditVegetables({ vegetables }) {
  const classes = useStyles();

  const tableHeader = [
    "#",
    "Vegetable/Fruit name",
    "Variant",
    "Quantity",
    "Selling price",
    "Discount name",
    "Discounted price",
    "Taxed price",
    "Available",
    "Edit",
  ];

  const [isUnknownError, setIsUnknownError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [vegetableToEdit, setVegetableToEdit] = useState("");

  function openEditMenu(subId) {
    try {
      const rowToEdit = vegetables.find(
        (vegetable) => vegetable.vegetableSubId === subId
      );
      setVegetableToEdit(rowToEdit);
      setOpen(true);
    } catch {
      setIsUnknownError(!isUnknownError);
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
          {vegetables.map((v, i) => (
            <TableRow key={v.vegetableTableId}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{v.vegetable.vegetableName}</TableCell>
              <TableCell>{v.vegetable.vegetableVariant}</TableCell>
              <TableCell>{v.vegetable.vegetableQuantity}</TableCell>
              <TableCell>{v.vegetable.vegetableSellingPrice}</TableCell>
              <TableCell>{v.vegetable.vegetableOfferedDiscountName}</TableCell>
              <TableCell>{v.vegetable.vegetableDiscountedPrice}</TableCell>
              <TableCell>{v.vegetable.vegetableTaxedPrice}</TableCell>
              <TableCell>{String(v.vegetable.vegetableAvailable)}</TableCell>
              <TableCell>
                {
                  <Button onClick={() => openEditMenu(v.vegetableSubId)}>
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
        <EditVegetable setOpen={setOpen} vegetableToEdit={vegetableToEdit} />
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
              label="Search by vegetable/fruit name"
              onChange={handleTableSearch}
            />
          </Grid>
        </Grid>
      }
      {renderTable()}
      {isUnknownError && <UnknownError />}
    </>
  );
}

export default ViewAndEditVegetables;
