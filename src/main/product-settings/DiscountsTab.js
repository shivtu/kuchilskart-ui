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
  FormHelperText,
} from "@material-ui/core";
import {
  createNewDiscount,
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
  cautionText: {
    color: "#0000FF",
  },
}));

export default function DiscountsTab() {
  const classes = useStyles();

  const { appData, setAppData } = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  const [discountName, setDiscountName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountActive, setDiscountActive] = useState(true);

  const [okButtonAlert, setOkButtonAlert] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  function renderAlertDialog(dialogTitle, dialogMsg) {
    setOkButtonAlert(true);
    setOkButtonAlertTitle(dialogTitle);
    setOkButtonAlertMessage(dialogMsg);
  }

  function handleDiscountActiveLabel() {
    setDiscountActive(!discountActive);
  }

  function resetForm() {
    setDiscountName("");
    setDiscountPercentage(0);
  }

  async function handleCreateNewDiscount() {
    setSpinner(true);
    try {
      if (!discountName || !discountPercentage) {
        renderAlertDialog(
          CONSTANTS.HELPER_TEXT.INVALID_INPUT,
          "Discount name and discount percentage are required fields"
        );
      } else {
        const data = { discountName, discountPercentage, discountActive };
        const res = await createNewDiscount(jwtToken, data);
        if (res.result) {
          resetForm();
          renderAlertDialog(
            "Discount created",
            `${res.result[0].discountName} created @ ${res.result[0].discountPercentage}% \n updating app data!`
          );
          const utilityData = await fetchUtilityData(jwtToken);
          if (utilityData.result) {
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
            Discounts created here can be applied to any product category
          </Typography>
          <Grid container justify="center">
            <Grid item className={classes.formComponent}>
              <TextField
                fullWidth
                label="Discount name"
                variant="outlined"
                size="small"
                value={discountName}
                onChange={(_e) => setDiscountName(_e.target.value)}
              />
              <FormHelperText className={classes.cautionText}>
                This information will be visible to the customer
              </FormHelperText>
            </Grid>
            <Grid item className={classes.formComponent}>
              <TextField
                label="Discount percentage"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                type="number"
                size="small"
                value={discountPercentage}
                onChange={(_e) => setDiscountPercentage(_e.target.value)}
              />
              <FormHelperText className={classes.cautionText}>
                This information will be visible to the customer
              </FormHelperText>
            </Grid>
          </Grid>

          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography className={classes.formComponent} variant="body1">
                When a discount is inactive, even if it is applied to the
                product, customer won't see the discount and no discounts will
                be calculated on the selling price.
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                className={classes.formComponent}
                value={discountActive}
                control={<Switch color="primary" checked={discountActive} />}
                label={discountActive ? "ACTIVE" : "INACTIVE"}
                labelPlacement="top"
                onChange={handleDiscountActiveLabel}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button variant="outlined" onClick={handleCreateNewDiscount}>
              {CONSTANTS.BUTTONS.SAVE}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
