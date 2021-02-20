import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Grid,
  TextField,
  FormHelperText,
  Typography,
} from "@material-ui/core";

import {
  createNewDeliveryLocation,
  fetchUtilityData,
} from "../shared/services/RestApiServices";
import { AppContext } from "../Home";
import OkButtonDialog from "../shared/common/OkButtonDialog";
import Spinner from "../shared/common/Spinner";

import CONSTANTS from "../shared/Constants";

const useStyles = makeStyles((theme) => ({
  formComponent: {
    margin: theme.spacing(2),
    maxWidth: theme.spacing(60),
  },
  cautionText: {
    color: "#0000FF",
  },
}));

function DeliveryLocations() {
  const classes = useStyles();

  const { appData, setAppData } = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  const [areaName, setAreaName] = useState("");
  const [areaPinCode, setAreaPinCode] = useState("");
  const [defaultDeliveryCharge, setDefaultDeliveryCharge] = useState(0);

  const [okButtonAlert, setOkButtonAlert] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  function resetForm() {
    setAreaName("");
    setAreaPinCode("");
    setDefaultDeliveryCharge(0);
  }

  function renderAlertDialog(dialogTitle, dialogMsg) {
    setOkButtonAlertTitle(dialogTitle);
    setOkButtonAlertMessage(dialogMsg);
    setOkButtonAlert(true);
  }

  async function handleAddNewLocation() {
    try {
      setSpinner(true);
      const data = {
        areaName,
        areaPinCode,
        defaultDeliveryCharge,
      };

      const res = await createNewDeliveryLocation(jwtToken, data);

      if (res.statusCode === 201) {
        renderAlertDialog(
          "New location added",
          `Delivery location : ${areaName} with pin code ${areaPinCode} is now availabe for delivery`
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
          <Typography>
            Locations added here are the only ones which will be considered for
            delivery
          </Typography>
          <Grid container justify="center">
            <Grid item className={classes.formComponent}>
              <TextField
                fullWidth
                label="Area name"
                variant="outlined"
                size="small"
                value={areaName}
                onChange={(_e) => setAreaName(_e.target.value)}
              />
              <FormHelperText className={classes.cautionText}>
                This information will be visible to the customer
              </FormHelperText>
            </Grid>
            <Grid item className={classes.formComponent}>
              <TextField
                fullWidth
                label="Area pin code"
                variant="outlined"
                size="small"
                value={areaPinCode}
                onChange={(_e) => setAreaPinCode(_e.target.value)}
              />
              <FormHelperText className={classes.cautionText}>
                This information will be visible to the customer
              </FormHelperText>
            </Grid>
            <Grid item className={classes.formComponent}>
              <TextField
                fullWidth
                label="Default delivery charge"
                variant="outlined"
                size="small"
                value={defaultDeliveryCharge}
                onChange={(_e) => setDefaultDeliveryCharge(_e.target.value)}
              />
              <FormHelperText className={classes.cautionText}>
                This information will be visible to the customer
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button
              variant="outlined"
              onClick={handleAddNewLocation}
              disabled={!areaName || !areaPinCode}
            >
              {CONSTANTS.BUTTONS.SAVE}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default DeliveryLocations;
