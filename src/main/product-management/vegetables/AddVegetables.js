import React, { useState, useContext } from "react";

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
import { blue } from "@material-ui/core/colors";
import { Autocomplete } from "@material-ui/lab";
import { AppContext } from "../../Home";
import CONSTANTS from "../../shared/Constants";
import { createNewVegetable } from "../../shared/services/RestApiServices";
import OkButtonDialog from "../../shared/common/OkButtonDialog";

import { getItemCategories } from "./VegetableUtils";

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

function AddVegetables({ findAllVegetables }) {
  const { appData } = useContext(AppContext);

  const itemCategories = getItemCategories(appData);

  const taxes = appData.utilityData.result.taxes;
  const customerOrderDiscount =
    appData.utilityData.result.customerOrderDiscount;
  const jwtToken = appData.jwtToken;

  const classes = useStyles();

  const [vegetableName, setVegetableName] = useState("");
  const [vegetableVariant, setVegetableVariant] = useState("");
  const [vegetablesInventoryExpiry, setVegetablesInventoryExpiry] =
    useState("2021-05-24");
  const [vegetableDescp, setVegetableDescp] = useState("");
  const [itemCategorySelected, setItemCategorySelected] = useState([]);
  const [itemSubCategories, setItemSubCategories] = useState([]);
  const [itemSubCategorySelected, setItemSubCategorySelected] = useState([]);
  const [vegetableQuantity, setVegetableQuantity] = useState(0);
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [vegetableInventoryFixedCost, setVegetableInventoryFixedCost] =
    useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [isExistingDiscountApplied, setIsExistingDiscountApplied] =
    useState(true);
  const [discountNameSelected, setDiscountNameSelected] = useState("");
  const [showDiscount, setShowDiscount] = useState(true);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxName, setTaxName] = useState("");
  const [taxPercent, setTaxPercent] = useState(0);
  const [alertDialogMessage, setAlertDialogMessage] = useState("");
  const [okButtonAlert, setOkButtonAlert] = useState(false);

  function shouldDisableSave() {
    return Boolean(
      vegetableName &&
        vegetableVariant &&
        vegetableDescp &&
        vegetableQuantity &&
        itemCategorySelected &&
        itemSubCategorySelected &&
        vegetableQuantity &&
        measurementUnit
    );
  }

  async function handleSave() {
    try {
      const data = new FormData();
      data.append("vegetableName", vegetableName);
      data.append("vegetableVariant", vegetableVariant);
      data.append("vegetableDescp", vegetableDescp);
      data.append("vegetableApplicableTaxes", taxName);
      data.append("vegetableSellingPrice", sellingPrice);
      data.append("vegetableOfferedDiscount", discountPercentage);
      data.append("vegetableShowDiscount", showDiscount);
      data.append("vegetableQuantity", vegetableQuantity);
      data.append("vegetableAvailable", "true");
      data.append("vegetableMeasureMentUnit", measurementUnit);
      data.append("vegetableInventoryCostPrice", costPrice);
      data.append("vegetableInventoryExpiry", vegetablesInventoryExpiry);
      data.append("vegetableInventoryFixedCost", vegetableInventoryFixedCost);
      data.append("vegetableOfferedDiscountName", discountNameSelected);
      data.append("itemCategory", itemCategorySelected.itemCategory);
      data.append("itemSubCategory", itemSubCategorySelected.itemSubCategory);
      const res = await createNewVegetable(jwtToken, data);
      if (res.statusCode !== 201) {
        setOkButtonAlert(true);
        setAlertDialogMessage(res.statusMessage || "An unknown error occured");
        return;
      }
      setOkButtonAlert(true);
      setAlertDialogMessage(
        `${res.result[0].vegetable.vegetableName} created!`
      );
      findAllVegetables(jwtToken);
    } catch (err) {
      setOkButtonAlert(true);
      setAlertDialogMessage(err.message || "An unknown error occured");
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
            label="Vegetable/Fruit name"
            variant="outlined"
            size="small"
            fullWidth
            value={vegetableName}
            onChange={(_e) => setVegetableName(_e.target.value)}
          />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
          </FormHelperText>
        </Grid>
        <Grid item className={classes.threeInARow}>
          <TextField
            label="Vegetable/Fruit variant"
            variant="outlined"
            size="small"
            fullWidth
            value={vegetableVariant}
            onChange={(_e) => setVegetableVariant(_e.target.value)}
          />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
          </FormHelperText>
        </Grid>
        <Grid item className={classes.threeInARow}>
          <TextField
            label="Expiry date"
            type="date"
            value={vegetablesInventoryExpiry}
            className={classes.textField}
            fullWidth
            variant="outlined"
            size="small"
            onChange={(_e) => setVegetablesInventoryExpiry(_e.target.value)}
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
            label="Description of the Fruit/Vegetable"
            variant="outlined"
            size="small"
            value={vegetableDescp}
            onChange={(_e) => setVegetableDescp(_e.target.value)}
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
            value={vegetableQuantity}
            onChange={(_e) => setVegetableQuantity(_e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControl
            variant="outlined"
            className={classes.formComponent}
            size="small"
          >
            <InputLabel>Measurement unit</InputLabel>
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
            value={vegetableInventoryFixedCost}
            onChange={(_e) => setVegetableInventoryFixedCost(_e.target.value)}
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
      {okButtonAlert && (
        <OkButtonDialog
          setOkButtonAlert={setOkButtonAlert}
          title="Network error"
          message={alertDialogMessage}
        />
      )}
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

export default AddVegetables;
