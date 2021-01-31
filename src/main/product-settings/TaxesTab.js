import React, { useState, useContext } from "react";
import CONSTANTS from "../shared/Constants";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  FormHelperText,
} from "@material-ui/core";
import Spinner from "../shared/common/Spinner";
import { AppContext } from "../Home";
import {
  createNewTax,
  fetchUtilityData,
} from "../shared/services/RestApiServices";
import OkButtonDialog from "../shared/common/OkButtonDialog";

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
  createButton: {
    marginBottom: theme.spacing(10),
  },
}));

export default function TaxesTab() {
  const classes = useStyles();

  const [taxName, setTaxName] = useState("");
  const [taxPercent, setTaxPercent] = useState(0);
  const [additionalTaxInfo, setAdditionalTaxInfo] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [okButtonAlert, setOkButtonAlert] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");

  const { appData, setAppData } = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  function renderAlertDialog(dialogTitle, dialogMsg) {
    setOkButtonAlert(true);
    setOkButtonAlertTitle(dialogTitle);
    setOkButtonAlertMessage(dialogMsg);
  }

  function resetForm() {
    setTaxName("");
    setTaxPercent(0);
    setAdditionalTaxInfo("");
  }

  async function handleCreateNewTax() {
    try {
      setSpinner(true);
      if (taxName) {
        const data = { taxName, taxPercent, additionalTaxInfo };
        const res = await createNewTax(jwtToken, data);
        renderAlertDialog(
          "Tax created!",
          `${res.result[0].taxName} created @ ${res.result[0].taxPercent}%`
        );
        const utilityData = await fetchUtilityData(jwtToken);
        if (utilityData.result) {
          setAppData({ jwtToken, utilityData });
        }
        resetForm();
      } else {
        renderAlertDialog(
          CONSTANTS.HELPER_TEXT.INVALID_INPUT,
          "Tax name is required"
        );
      }
      setSpinner(false);
    } catch (err) {
      setSpinner(false);
      renderAlertDialog("Tax created!", `Network request failed : ${err}`);
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
        <Grid container justify="center" alignItems="center">
          <Spinner size={CONSTANTS.SPINNER_SIZE.LARGE} />
        </Grid>
      ) : (
        <Grid container direction="column">
          <Typography className={classes.helpText} variant="body1" gutterBottom>
            Taxes created here can be applied to any product category
          </Typography>
          <Grid container justify="center">
            <Grid item className={classes.formComponent}>
              <TextField
                label="Tax name"
                fullWidth
                variant="outlined"
                size="small"
                value={taxName}
                onChange={(_e) => setTaxName(_e.target.value)}
              />
              <FormHelperText className={classes.cautionText}>
                This information is displayed on the app
              </FormHelperText>
            </Grid>
            <Grid item className={classes.formComponent}>
              <TextField
                label="Tax percentaged"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                size="small"
                value={taxPercent}
                onChange={(_e) => setTaxPercent(_e.target.value)}
              />
              <FormHelperText className={classes.cautionText}>
                This information is displayed on the app
              </FormHelperText>
            </Grid>
            <Grid item className={classes.descField}>
              <TextField
                fullWidth
                label="Tax description"
                variant="outlined"
                size="small"
                value={additionalTaxInfo}
                onChange={(_e) => setAdditionalTaxInfo(_e.target.value)}
              />
              <FormHelperText>For internal reference only</FormHelperText>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button variant="outlined" onClick={handleCreateNewTax}>
              {CONSTANTS.BUTTONS.SAVE}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
