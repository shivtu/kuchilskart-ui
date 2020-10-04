import React, { useState } from "react";
import CONSTANTS from "../main/shared/Constants";
import OkButtonDialog from "./shared/common/OkButtonDialog";
import Spinner from "./shared/common/Spinner";
import { Button, Grid, Link, TextField, Typography } from "@material-ui/core";
import {
  authenticateUser,
  fetchUtilityData,
} from "./shared/services/RestApiServices";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formComponent: {
    margin: theme.spacing(2),
    width: theme.spacing(60),
  },
  LoginPageTitle: {
    margin: theme.spacing(8),
  },
  createButton: {
    margin: theme.spacing(2),
  },
  spinner: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(4),
  },
}));

function Login({ setAppData }) {
  const classes = useStyles();

  const [okButtonAlert, setOkButtonAlert] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");

  const [userIdText, setUserIdText] = useState("");
  const [userPasswordText, setUserPasswordText] = useState("");

  const [spinner, setSpinner] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState("");

  async function authenticate() {
    if (!userIdText || !userPasswordText) {
      setOkButtonAlert(true);
      setOkButtonAlertTitle("Invalid input");
      setOkButtonAlertMessage("Username/password are mandatory fields");
      return;
    }
    setSpinner(true);
    setSpinnerMessage("Authenticating");
    const token = await authenticateUser();
    if (!Boolean(token?.jwt)) {
      setOkButtonAlert(true);
      setOkButtonAlertTitle("Authentication failed");
      setOkButtonAlertMessage("Username/password mismatch, please try again");
      setSpinner(false);
      return;
    }
    setSpinnerMessage("Getting app data");
    const utility = await fetchUtilityData(token);
    if (utility.error) {
      setOkButtonAlert(true);
      setOkButtonAlertTitle(utility.error);
      setOkButtonAlertMessage(utility.message);
      setSpinner(false);
      return;
    }
    // TODO: handle utility api call failure
    setSpinner(false);
    setAppData({ token, utility });
  }

  function handleUserId(event) {
    setUserIdText(event.target.value);
  }

  function handleUserPasswordText(event) {
    setUserPasswordText(event.target.value);
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {spinner && (
        <Spinner size={CONSTANTS.SPINNER_SIZE.LARGE} message={spinnerMessage} />
      )}
      {okButtonAlert && (
        <OkButtonDialog
          setOkButtonAlert={setOkButtonAlert}
          title={okButtonAlertTitle}
          message={okButtonAlertMessage}
        />
      )}
      <Typography className={classes.LoginPageTitle} variant="h4">
        Kuchil's Kart Retailer Login
      </Typography>
      <Grid item className={classes.formComponent}>
        <TextField
          fullWidth
          label="User ID"
          variant="outlined"
          size="small"
          value={userIdText}
          onChange={handleUserId}
        />
      </Grid>
      <Grid item className={classes.formComponent}>
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          value={userPasswordText}
          onChange={handleUserPasswordText}
        />
      </Grid>
      <Grid item className={classes.createButton}>
        <Button variant="outlined" onClick={authenticate}>
          {CONSTANTS.BUTTONS.LOGIN}
        </Button>
      </Grid>
      <Link href="#">Sign up</Link>
      <Link href="#">Forgot password</Link>
    </Grid>
  );
}

export default Login;
