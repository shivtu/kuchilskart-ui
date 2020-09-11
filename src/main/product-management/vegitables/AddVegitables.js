import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formComponent: {
    margin: theme.spacing(2),
    width: theme.spacing(60),
  },
  descField: {
    margin: theme.spacing(2),
    width: theme.spacing(125),
  },
  threeInARow: {
    margin: theme.spacing(2),
    width: theme.spacing(50),
  },
}));

function AddVegitables() {
  const itemCategories = [
    { name: "edible_products_vegitables", id: "edible_products_vegitables" },
    { name: "edible_products_fruits", id: "edible_products_fruits" },
    { name: "edible_products_spices", id: "edible_products_spices" },
    { name: "edible_products_oil", id: "edible_products_oil" },
    { name: "edible_products_grains", id: "edible_products_grains" },
    { name: "edible_products_dal", id: "edible_products_dal" },
    { name: "fmcg_toiletaries", id: "fmcg_toiletaries" },
    { name: "fmcg_kitchen_care", id: "fmcg_kitchen_care" },
    { name: "fmcg_body_care", id: "fmcg_body_care" },
  ];

  const classes = useStyles();

  const [itemCategorySelected, setItemCategorySelected] = useState("");
  const [isExistingDiscountApplied, setIsExistingDiscountApplied] = useState(
    true
  );
  const [measurementUnit, setMeasurementUnit] = useState("");

  function handleMeasurementUnitSelect(event) {
    console.log(">>>>>>>>", event.target.value);
    setMeasurementUnit(event.target.value);
  }

  function handleisExistingDiscountApplied() {
    setIsExistingDiscountApplied(!isExistingDiscountApplied);
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <TextField
              className={classes.formComponent}
              label="Product name"
              helperText="Product name will display as it is on mobile app"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formComponent}
              label="Product variant"
              helperText="Product variant will display as it is on mobile app"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <Autocomplete
              className={classes.formComponent}
              size="small"
              options={itemCategories}
              getOptionLabel={(option) => option.id}
              getOptionSelected={(option) =>
                itemCategories.filter(
                  (itemCategory) => itemCategory.id === option.id
                )
              }
              onChange={(event, newValue) => {
                setItemCategorySelected(newValue.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product category code"
                  helperText="This item is used for bulk operations (not visible to the customer)"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formComponent}
              label="Product Category name"
              helperText="This value is displayed to the customer"
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <TextField
              className={classes.formComponent}
              label="Net Quantity"
              helperText="This is the total quantity brought to the warehouse"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.formComponent}
              size="small"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Measurement unit
              </InputLabel>
              <Select
                value={measurementUnit}
                onChange={handleMeasurementUnitSelect}
                label="Measurement unit"
              >
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="GRAMS">Gms</MenuItem>
                <MenuItem value="KILOGRAMS">Kg</MenuItem>
                <MenuItem value="TON">Ton</MenuItem>
                <MenuItem value="DOZEN">Dozen</MenuItem>
                <MenuItem value="PEICE">Peice</MenuItem>
              </Select>
              <FormHelperText>
                Cost is spread as per measurement unit
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>
            <TextField
              className={classes.formComponent}
              label="Net cost price"
              helperText="This value is not visible to the user (for internal user only)"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formComponent}
              label="Fixed cost"
              helperText="This value is not visible to the user (for internal user only)"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel
            value="top"
            control={
              <Checkbox
                color="primary"
                checked={isExistingDiscountApplied}
                onChange={handleisExistingDiscountApplied}
              />
            }
            label="Apply existing discount"
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          {isExistingDiscountApplied ? (
            <>
              <Grid item>
                <Autocomplete
                  className={classes.formComponent}
                  size="small"
                  options={[]}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Discount name"
                      helperText="This is displayed to the customer"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.formComponent}
                  label="Discount%"
                  helperText="Absolute discount is calculated automatically"
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item>
                <TextField
                  className={classes.formComponent}
                  label="Discount name"
                  helperText="Visible on app (This discount is not saved to the existing list)"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.formComponent}
                  label="Discount%"
                  helperText="Absolute discount is calculated automatically"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="outlined">Create Product</Button>
      </Grid>
    </Grid>
  );
}

export default AddVegitables;
