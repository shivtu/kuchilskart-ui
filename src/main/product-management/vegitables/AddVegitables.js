import React, { useState, useContext } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import { green, blue } from "@material-ui/core/colors";
import { Autocomplete } from "@material-ui/lab";
import { AppContext } from "../../Home";

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
    margin: theme.spacing(1),
    width: "316px",
  },
  cautionText: {
    color: blue[700],
  },
  createButton: {
    marginBottom: theme.spacing(10),
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function AddVegitables() {
  const appData = useContext(AppContext);
  const itemCategories = [
    { name: "Vegitables", id: "edible_products_vegitables" },
    { name: "Personal care", id: "edible_products_fruits" },
    { name: "Dairy products", id: "edible_products_spices" },
    { name: "Bakery", id: "edible_products_oil" },
    { name: "Snaks", id: "edible_products_grains" },
    { name: "Beverages", id: "edible_products_dal" },
    { name: "Household cleaning", id: "fmcg_toiletaries" },
  ];

  const classes = useStyles();

  const [itemCategorySelected, setItemCategorySelected] = useState("");
  const [isExistingDiscountApplied, setIsExistingDiscountApplied] = useState(
    true
  );
  const [measurementUnit, setMeasurementUnit] = useState("");

  function handleMeasurementUnitSelect(event) {
    setMeasurementUnit(event.target.value);
  }

  function handleisExistingDiscountApplied() {
    setIsExistingDiscountApplied(!isExistingDiscountApplied);
  }

  function handleExpiryDate(event) {
    console.log("event", Date.now());
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
          <Grid item className={classes.threeInARow}>
            <TextField
              label="Vegitable/Fruit name"
              variant="outlined"
              size="small"
              fullWidth
            />
            <FormHelperText className={classes.cautionText}>
              !Name will display as it is on mobile app
            </FormHelperText>
          </Grid>
          <Grid item className={classes.threeInARow}>
            <TextField
              label="Vegitable/Fruit variant"
              variant="outlined"
              size="small"
              fullWidth
            />
            <FormHelperText className={classes.cautionText}>
              !Variant will display as it is on mobile app
            </FormHelperText>
          </Grid>
          <Grid item className={classes.threeInARow}>
            <TextField
              label="Expiry date"
              type="date"
              defaultValue="2020-05-24"
              className={classes.textField}
              fullWidth
              variant="outlined"
              size="small"
              onChange={handleExpiryDate}
            />
            <FormHelperText>
              Expiry date must always be a future date
            </FormHelperText>
          </Grid>
          <Grid item className={classes.formComponent}>
            <TextField
              fullWidth
              label="Description of the Fruit/Vegitable"
              variant="outlined"
              size="small"
            />
            <FormHelperText className={classes.cautionText}>
              !Description will display as it is on mobile app
            </FormHelperText>
          </Grid>
          <Grid item className={classes.formComponent}>
            <TextField fullWidth variant="outlined" size="small" type="file" />
            <FormHelperText className={classes.cautionText}>
              !Image will display as it is on mobile app (Maximum size allowed
              30 KB)
            </FormHelperText>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item className={classes.formComponent}>
            <Autocomplete
              value={itemCategorySelected}
              fullWidth
              size="small"
              options={itemCategories}
              getOptionLabel={(option) => option.name || ""}
              getOptionSelected={(option) => option}
              onChange={(event, newValue) => {
                setItemCategorySelected(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product category name"
                  variant="outlined"
                />
              )}
            />
            <FormHelperText className={classes.cautionText}>
              !This item is used for bulk operations (also visible to the
              customer)
            </FormHelperText>
          </Grid>
          <Grid item className={classes.formComponent}>
            <TextField
              fullWidth
              label="Product sub category"
              helperText=""
              variant="outlined"
              size="small"
            />
            <FormHelperText className={classes.cautionText}>
              This value is displayed to the customer
            </FormHelperText>
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
              <Grid item className={classes.threeInARow}>
                <Autocomplete
                  fullWidth
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
              <Grid item className={classes.threeInARow}>
                <TextField
                  fullWidth
                  label="Discount%"
                  helperText="Absolute discount is calculated automatically"
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item className={classes.threeInARow}>
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox checked color="primary" />}
                  label="Show this discout to customer"
                  size="small"
                />
                <FormHelperText>
                  If you uncheck this box, customer will not avail this discount
                </FormHelperText>
              </Grid>
            </>
          ) : (
            <>
              <Grid item className={classes.formComponent}>
                <TextField
                  fullWidth
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
              options={[]}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Applicable tax"
                  helperText="This is displayed to the customer"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formComponent}
              label="Tax%"
              helperText="Absolute tax is calculated automatically"
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.createButton}>
        <Button variant="outlined">Create Product</Button>
      </Grid>
    </Grid>
  );
}

export default AddVegitables;
