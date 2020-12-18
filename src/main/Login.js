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
import SignUp from "./SignUp";

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
  const [signUpVisible, setSignUpVisible] = useState(false);

  async function authenticate() {
    try {
      if (!userIdText || !userPasswordText) {
        setOkButtonAlert(true);
        setOkButtonAlertTitle("Invalid input");
        setOkButtonAlertMessage("Username/password are mandatory fields");
        return;
      }
      setSpinner(true);
      setSpinnerMessage("Authenticating");
      const authRes = await authenticateUser(userIdText, userPasswordText);

      const jwtToken = authRes.jwt;
      if (!Boolean(jwtToken)) {
        setOkButtonAlert(true);
        setOkButtonAlertTitle("Authentication failed");
        setOkButtonAlertMessage("Username/password mismatch, please try again");
        setSpinner(false);
        return;
      }
      setSpinnerMessage("Getting app data");
      const utilityData = await fetchUtilityData(jwtToken);

      if (utilityData.error) {
        setOkButtonAlert(true);
        setOkButtonAlertTitle(utilityData.error);
        setOkButtonAlertMessage(utilityData.message);
        setSpinner(false);
        return;
      }
      // TODO: handle utility api call failure
      setSpinner(false);
      setAppData({ jwtToken, utilityData });
    } catch (err) {
      setSpinner(false);
      setOkButtonAlert(true);
      setOkButtonAlertTitle("Error");
      setOkButtonAlertMessage(err.message || "An unknown error occured!");
    }
  }

  function handleSignUpModal() {
    setSignUpVisible(true);
  }

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        {spinner && (
          <Spinner
            size={CONSTANTS.SPINNER_SIZE.LARGE}
            message={spinnerMessage}
          />
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
            onChange={(_e) => setUserIdText(_e.target.value)}
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
            onChange={(_e) => setUserPasswordText(_e.target.value)}
          />
        </Grid>
        <Grid item className={classes.createButton}>
          <Button variant="outlined" onClick={authenticate}>
            {CONSTANTS.BUTTONS.LOGIN}
          </Button>
        </Grid>
        <Link href="#" onClick={handleSignUpModal}>
          Sign up
        </Link>
        <Link href="#">Forgot password</Link>
      </Grid>
      {signUpVisible && <SignUp setSignUpVisible={setSignUpVisible} />}
    </>
  );
}

export default Login;
