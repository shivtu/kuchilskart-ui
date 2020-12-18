import React, { useState } from "react";
import {
  Dialog,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import CONSTANTS from "../../shared/Constants";

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

function EditVegitable({ setOpen, vegitableToEdit }) {
  const classes = useStyles();

  const [itemCategorySelected, setItemCategorySelected] = useState("");
  const [isExistingDiscountApplied, setIsExistingDiscountApplied] = useState(
    true
  );
  const [measurementUnit, setMeasurementUnit] = useState("");

  const itemCategories = [
    { name: "Vegitables", id: "edible_products_vegitables" },
    { name: "Personal care", id: "edible_products_fruits" },
    { name: "Dairy products", id: "edible_products_spices" },
    { name: "Bakery", id: "edible_products_oil" },
    { name: "Snaks", id: "edible_products_grains" },
    { name: "Beverages", id: "edible_products_dal" },
    { name: "Household cleaning", id: "fmcg_toiletaries" },
  ];

  function handleMeasurementUnitSelect(event) {
    setMeasurementUnit(event.target.value);
  }

  function handleisExistingDiscountApplied() {
    setIsExistingDiscountApplied(!isExistingDiscountApplied);
  }

  function handleExpiryDate(event) {
    console.log("event", Date.now());
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
            value={vegitableToEdit.vegitableName}
            disabled
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
            value={vegitableToEdit.vegitableVariant}
            disabled
          />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
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
            value={vegitableToEdit.vegitableDescp}
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
          <TextField
            fullWidth
            size="small"
            label="Product category name"
            variant="outlined"
            value={vegitableToEdit.itemCategory}
            disabled
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
            variant="outlined"
            size="small"
            value={vegitableToEdit.itemSubCategory}
            disabled
          />
          <FormHelperText className={classes.cautionText}>
            {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
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
        <Grid item className={classes.formComponent}>
          <TextField
            fullWidth
            label="Measurement unit"
            variant="outlined"
            size="small"
            value={vegitableToEdit.vegitableMeasureMentUnit}
            disabled
          />
          <FormHelperText className={classes.cautionText}>
            Cost is spread as per measurement unit
          </FormHelperText>
        </Grid>
        <Grid item className={classes.formComponent}>
          <TextField
            label="Net Quantity"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
          />
          <FormHelperText>
            Cost is spread as per measurement unit
          </FormHelperText>
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
        <TextField
          className={classes.formComponent}
          label="Net cost price"
          helperText="This value is not visible to the user (for internal user only)"
          variant="outlined"
          size="small"
        />

        <TextField
          className={classes.formComponent}
          label="Fixed cost"
          helperText="This value is not visible to the user (for internal user only)"
          variant="outlined"
          size="small"
        />
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
                options={[]}
                getOptionLabel={(option) => option.title}
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
          options={[]}
          getOptionLabel={(option) => option.title}
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
        <Button variant="contained" color="primary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={closeModal}>
          {CONSTANTS.BUTTONS.SAVE}
        </Button>
      </Grid>
    );
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <Dialog fullScreen open>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography className={classes.formComponent} variant="body1">
            Some of the fields that are disabled cannot be edited, if you need
            new values for those fields create a new vegitable/fruit
          </Typography>
        </Grid>
      </Grid>
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
                onChange={handleisExistingDiscountApplied}
              />
            }
            label="Apply existing discount"
          />
        </Grid>
        {renderSixthRow()}
        {renderSeventhRow()}
        {renderSaveButton()}
      </Grid>
    </Dialog>
  );
}

export default EditVegitable;
