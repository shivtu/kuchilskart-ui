import React, { useState, useContext } from "react";
import CONSTANTS from "../shared/Constants";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
  Button,
} from "@material-ui/core";
import {
  createNewDeliveryCharge,
  fetchUtilityData,
} from "../shared/services/RestApiServices";
import { AppContext } from "../Home";
import OkButtonDialog from "../shared/common/OkButtonDialog";
import Spinner from "../shared/common/Spinner";

const useStyles = makeStyles((theme) => ({
  formComponent: {
    margin: theme.spacing(2),
    maxWidth: theme.spacing(60),
  },
  descField: {
    margin: theme.spacing(2),
    maxWidth: theme.spacing(125),
  },
  helpText: {
    margin: theme.spacing(3),
  },
}));

export default function DeliveryChargesTab() {
  const classes = useStyles();

  const { appData, setAppData } = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  const [salesAmountGreaterThan, setSalesAmountGreaterThan] = useState(0);
  const [salesAmountLessThan, setSalesAmountLessThan] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [
    overrideDeliveryConstraints,
    setOverrideDeliveryConstraints,
  ] = useState(true);

  const [okButtonAlert, setOkButtonAlert] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  function resetForm() {
    setSalesAmountGreaterThan(0);
    setSalesAmountLessThan(0);
    setDeliveryCharge(0);
    setOverrideDeliveryConstraints(true);
  }

  function renderAlertDialog(dialogTitle, dialogMsg) {
    setOkButtonAlertTitle(dialogTitle);
    setOkButtonAlertMessage(dialogMsg);
    setOkButtonAlert(true);
  }

  async function handleCreateNewDeliveryCharge() {
    try {
      if (
        !salesAmountGreaterThan ||
        !salesAmountLessThan ||
        salesAmountGreaterThan >= salesAmountLessThan
      ) {
        renderAlertDialog(
          CONSTANTS.HELPER_TEXT.INVALID_INPUT,
          `Both "Sales amount greater than" and "Sales amount less than" fields are required also "Sales amount greater than" field cannot be less than "Sales amount less" than field`
        );
      } else {
        setSpinner(true);
        const data = {
          salesAmountGreaterThan,
          salesAmountLessThan,
          deliveryCharge,
          overrideDeliveryConstraints,
        };
        const res = await createNewDeliveryCharge(jwtToken, data);
        if (res.statusCode === 201) {
          renderAlertDialog(
            "New Delivery charge rule created",
            `Sales amount between ${salesAmountGreaterThan} and ${salesAmountLessThan} will be charged delivery @ ${deliveryCharge} INR`
          );
          const utilityData = await fetchUtilityData(jwtToken);
          if (utilityData.statusCode === 200) {
            setAppData({ jwtToken, utilityData });
          } else {
            renderAlertDialog(
              CONSTANTS.HELPER_TEXT.ERROR,
              "Unable to update app data, please re-login to fix this"
            );
          }
        }
      }
      setSpinner(false);
      resetForm();
    } catch (err) {
      setSpinner(false);
      renderAlertDialog(CONSTANTS.HELPER_TEXT.ERROR, err);
    }
  }

  return (
    <>
      {okButtonAlert && (
        <OkButtonDialog
          setOkButtonAlert={setOkButtonAlert}
          title={okButtonAlertTitle}
          message={okButtonAlertMessage}
        />
      )}
      {spinner ? (
        <Spinner size={CONSTANTS.SPINNER_SIZE.LARGE} />
      ) : (
        <Grid container direction="column">
          <Typography className={classes.helpText} variant="body1" gutterBottom>
            Delivery charges help you create a rule ( for selling price range)
            that decides the delivery charges to be levied on the order
          </Typography>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <TextField
                className={classes.formComponent}
                label="Sales amount greater than"
                helperText="This information will be visible to the customer"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">INR</InputAdornment>
                  ),
                }}
                type="number"
                size="small"
                value={salesAmountGreaterThan}
                onChange={(_e) => setSalesAmountGreaterThan(_e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.formComponent}
                label="Sales amount less than"
                helperText="This information will be visible to the customer"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">INR</InputAdornment>
                  ),
                }}
                size="small"
                type="number"
                value={salesAmountLessThan}
                onChange={(_e) => setSalesAmountLessThan(_e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.formComponent}
                label="Delivery charge to be levied"
                helperText="This information will be visible to the customer"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">INR</InputAdornment>
                  ),
                }}
                size="small"
                type="number"
                value={deliveryCharge}
                onChange={(_e) => setDeliveryCharge(_e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography className={classes.formComponent} variant="body1">
                When you override the rule, delivery charges can be custom set
                for the order. If not set it will be 0 INR
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                className={classes.formComponent}
                control={
                  <Switch
                    color="primary"
                    checked={overrideDeliveryConstraints}
                  />
                }
                label={overrideDeliveryConstraints ? "APPLIED" : "OVERRIDDEN"}
                labelPlacement="top"
                onChange={() =>
                  setOverrideDeliveryConstraints(!overrideDeliveryConstraints)
                }
              />
            </Grid>
          </Grid>

          <Grid container justify="center">
            <Button variant="outlined" onClick={handleCreateNewDeliveryCharge}>
              {CONSTANTS.BUTTONS.SAVE}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
