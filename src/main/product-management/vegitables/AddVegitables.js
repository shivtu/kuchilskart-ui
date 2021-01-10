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
import CONSTANTS from "../../shared/Constants";
import { createNewVegitable } from "../../shared/services/RestApiServices";

import { getItemCategories } from "./VegitableUtils";

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
  saveAndResetButtons: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
}));

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);

function AddVegitables() {
  const appData = useContext(AppContext);

  const itemCategories = getItemCategories(appData);

  const taxes = appData.utilityData.result.taxes;
  const customerOrderDiscount =
    appData.utilityData.result.customerOrderDiscount;
  const jwtToken = appData.jwtToken;

  const classes = useStyles();

  const [vegitableName, setVegitableName] = useState("");
  const [vegitableVariant, setVegitableVariant] = useState("");
  const [vegitablesInventoryExpiry, setVegitablesInventoryExpiry] = useState(
    ""
  );
  const [vegitableDescp, setVegitableDescp] = useState("");
  const [itemCategorySelected, setItemCategorySelected] = useState([]);
  const [itemSubCategories, setItemSubCategories] = useState([]);
  const [itemSubCategorySelected, setItemSubCategorySelected] = useState([]);
  const [vegitableQuantity, setVegitableQuantity] = useState(0);
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [
    vegitableInventoryFixedCost,
    setVegitableInventoryFixedCost,
  ] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [isExistingDiscountApplied, setIsExistingDiscountApplied] = useState(
    true
  );
  const [discountNameSelected, setDiscountNameSelected] = useState("");
  const [showDiscount, setShowDiscount] = useState(true);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxName, setTaxName] = useState("");
  const [taxPercent, setTaxPercent] = useState(0);

  function shouldDisableSave() {
    return Boolean(
      vegitableName &&
        vegitableVariant &&
        vegitableDescp &&
        vegitableQuantity &&
        itemCategorySelected &&
        itemSubCategorySelected &&
        vegitableQuantity &&
        measurementUnit
    );
  }

  async function handleSave() {
    try {
      const data = new FormData();
      data.append("vegitableName", vegitableName);
      data.append("vegitableVariant", vegitableVariant);
      data.append("vegitableDescp", vegitableDescp);
      data.append("vegitableApplicableTaxes", taxName);
      data.append("vegitableSellingPrice", sellingPrice);
      data.append("vegitableOfferedDiscount", discountPercentage);
      data.append("vegitableShowDiscount", showDiscount);
      data.append("vegitableQuantity", vegitableQuantity);
      data.append("vegitableAvailable", "true");
      data.append("vegitableMeasureMentUnit", measurementUnit);
      data.append("vegitableInventoryCostPrice", costPrice);
      data.append("vegitableInventoryExpiry", vegitablesInventoryExpiry);
      data.append("vegitableInventoryFixedCost", vegitableInventoryFixedCost);
      // data.append("[vegitableRecepie][recipeName]", "Onion pakodas");
      // data.append("[vegitableRecepie][recipeGuide]", "youtube/recepie");
      // data.append("[vegitableRecepie][recipeComponents]", '["component"]');
      data.append("vegitableOfferedDiscountName", discountNameSelected);
      data.append("itemCategory", itemCategorySelected.itemCategory);
      data.append("itemSubCategory", itemSubCategorySelected.itemSubCategory);
      const res = await createNewVegitable(jwtToken, data);
      console.log("Vegitable", res[0].vegitable);
      console.log("VegitableInventory", res[0].vegitableInventory);
    } catch (err) {
      console.log("err", err);
    }
  }

  function renderFirstRow() {
    return (
      <Grid
        container
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
            value={vegitableName}
            onChange={(_e) => setVegitableName(_e.target.value)}
          />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
          </FormHelperText>
        </Grid>
        <Grid item className={classes.threeInARow}>
          <TextField
            label="Vegitable/Fruit variant"
            variant="outlined"
            size="small"
            fullWidth
            value={vegitableVariant}
            onChange={(_e) => setVegitableVariant(_e.target.value)}
          />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
          </FormHelperText>
        </Grid>
        <Grid item className={classes.threeInARow}>
          <TextField
            label="Expiry date"
            type="date"
            defaultValue="2021-05-24"
            className={classes.textField}
            fullWidth
            variant="outlined"
            size="small"
            onChange={(_e) => setVegitablesInventoryExpiry(_e.target.value)}
          />
          <FormHelperText>
            Expiry date must always be a future date
          </FormHelperText>
        </Grid>
      </Grid>
    );
  }

  function renderSecondRow() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item className={classes.formComponent}>
          <TextField
            fullWidth
            label="Description of the Fruit/Vegitable"
            variant="outlined"
            size="small"
            value={vegitableDescp}
            onChange={(_e) => setVegitableDescp(_e.target.value)}
          />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
          </FormHelperText>
        </Grid>
        <Grid item className={classes.formComponent}>
          <TextField fullWidth variant="outlined" size="small" type="file" />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP} (Maximum size allowed 30 KB)
          </FormHelperText>
        </Grid>
      </Grid>
    );
  }

  function renderThirdRow() {
    return (
      <Grid
        container
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
            getOptionLabel={(option) => option.itemCategory || ""}
            getOptionSelected={(option) => option}
            onChange={(event, newValue) => {
              setItemSubCategories(
                appData.utilityData.result.itemCategories.filter(
                  (category) => category.itemCategory === newValue?.itemCategory
                )
              );
              setItemCategorySelected(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product category"
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
          <Autocomplete
            value={itemSubCategorySelected}
            fullWidth
            size="small"
            options={itemSubCategories}
            getOptionLabel={(option) => option.itemSubCategory || ""}
            getOptionSelected={(option) => option}
            onChange={(event, newValue) => {
              setItemSubCategorySelected(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product sub-category"
                variant="outlined"
              />
            )}
          />
          <FormHelperText className={classes.cautionText}>
            !This item is used for bulk operations (also visible to the
            customer)
          </FormHelperText>
        </Grid>
      </Grid>
    );
  }

  function renderFourthRow() {
    return (
      <Grid
        container
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
            type="number"
            value={vegitableQuantity}
            onChange={(_e) => setVegitableQuantity(_e.target.value)}
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
              onChange={(_e) => setMeasurementUnit(_e.target.value)}
              label="Measurement unit"
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              <MenuItem value="Grams">Grams</MenuItem>
              <MenuItem value="KG">Kilogram(s)</MenuItem>
              <MenuItem value="Ltrs">Liter(s)</MenuItem>
              <MenuItem value="Ml">Mililiter(s)</MenuItem>
              <MenuItem value="TON">Ton(s)</MenuItem>
              <MenuItem value="DOZEN">Dozen</MenuItem>
              <MenuItem value="PEICE">Peice</MenuItem>
              <MenuItem value="UNIT">Unit</MenuItem>
              <MenuItem value="PACK">Pack</MenuItem>
            </Select>
            <FormHelperText>
              Cost is spread as per measurement unit
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }

  function renderFifthRow() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item className={classes.threeInARow}>
          <TextField
            label="Cost price"
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            value={costPrice}
            onChange={(_e) => setCostPrice(_e.target.value)}
          />
          <FormHelperText>
            This value is not visible to the user(internal use only)
          </FormHelperText>
        </Grid>
        <Grid item className={classes.threeInARow}>
          <TextField
            label="Fixed cost"
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            value={vegitableInventoryFixedCost}
            onChange={(_e) => setVegitableInventoryFixedCost(_e.target.value)}
          />
          <FormHelperText>
            This value is not visible to the user(internal use only)
          </FormHelperText>
        </Grid>

        <Grid item className={classes.threeInARow}>
          <TextField
            label="Selling price"
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            value={sellingPrice}
            onChange={(_e) => setSellingPrice(_e.target.value)}
          />
          <FormHelperText>This value is visible to the user</FormHelperText>
        </Grid>
      </Grid>
    );
  }

  function renderSixthRow() {
    return (
      <Grid
        container
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
                options={customerOrderDiscount}
                getOptionLabel={(option) =>
                  `${option.discountName} (${
                    option.discountActive ? "Active" : "In-Active"
                  })`
                }
                getOptionSelected={(option) => option}
                onChange={(event, newValue) => {
                  setDiscountNameSelected(newValue.discountName);
                  setDiscountPercentage(newValue?.discountPercentage);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Discount name"
                    helperText={CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
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
                value={`${discountPercentage || 0} %`}
              />
            </Grid>
            <Grid item className={classes.threeInARow}>
              <FormControlLabel
                labelPlacement="end"
                control={<Checkbox checked={showDiscount} color="primary" />}
                label="Show this discout to customer"
                size="small"
                onClick={() => setShowDiscount(!showDiscount)}
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
                type="number"
              />
            </Grid>
          </>
        )}
      </Grid>
    );
  }

  function renderSeventhRow() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Autocomplete
          className={classes.formComponent}
          size="small"
          options={taxes}
          getOptionLabel={(option) => option.taxName || ""}
          getOptionSelected={(option) => option}
          onChange={(event, newValue) => {
            setTaxName(newValue.taxName);
            setTaxPercent(newValue?.taxPercent);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Applicable tax"
              helperText={CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
              variant="outlined"
            />
          )}
        />

        <TextField
          className={classes.formComponent}
          label="Tax%"
          helperText="Absolute tax is calculated automatically"
          variant="outlined"
          size="small"
          disabled
          value={`${taxPercent || 0} %`}
        />
      </Grid>
    );
  }

  function renderSaveButton() {
    return (
      <Grid
        container
        justify="space-around"
        alignItems="center"
        className={classes.saveAndResetButtons}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={!shouldDisableSave()}
          onClick={handleSave}
        >
          {CONSTANTS.BUTTONS.SAVE}
        </Button>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" className={classes.root}>
      {renderFirstRow()}
      {renderSecondRow()}
      {renderThirdRow()}
      {renderFourthRow()}
      {renderFifthRow()}

      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <FormControlLabel
          value="top"
          control={
            <Checkbox
              color="primary"
              checked={isExistingDiscountApplied}
              onChange={() =>
                setIsExistingDiscountApplied(!isExistingDiscountApplied)
              }
            />
          }
          label="Apply existing discount"
        />
      </Grid>
      {renderSixthRow()}
      {renderSeventhRow()}
      {renderSaveButton()}
    </Grid>
  );
}

export default AddVegitables;
