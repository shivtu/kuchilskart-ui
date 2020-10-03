import React, { useState } from "react";

import CONSTANTS from "../main/shared/Constants";

import NavigationMenu from "./navigation-menu/NavigationMenu";

import Spinner from "../main/shared/common/Spinner";

import OkButtonDialog from "./shared/common/errors/OkButtonDialog";

import {
  Button,
  Grid,
  TextField,
  FormHelperText,
  Typography,
} from "@material-ui/core";
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
    marginBottom: theme.spacing(10),
  },
  spinner: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(4),
  },
}));

const Home = () => {
  const classes = useStyles();

  const [authToken, setAuthToken] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");
  const [okButtonAlert, onOkButtonAlert] = useState(false);
  const [userIdText, setUserIdText] = useState("");
  const [userPasswordText, setUserPasswordText] = useState("");

  function authenticate() {
    if (!Boolean(userIdText) || !Boolean(userPasswordText)) {
      onOkButtonAlert(!okButtonAlert);
      setOkButtonAlertTitle("Invalid input");
      setOkButtonAlertMessage(
        <Typography gutterBottom>Username/password cannot be blank</Typography>
      );
      return;
    }
    setSpinner(true);
    setTimeout(() => {
      setAuthToken({ jwt: "qwerty" });
      setSpinner(false);
      onOkButtonAlert(!okButtonAlert);
      setOkButtonAlertTitle("Authentication status");
      setOkButtonAlertMessage(
        <>
          <Typography gutterBottom>Wrong username/password</Typography>
          <Typography>Please try again</Typography>
        </>
      );
    }, 1000);
  }

  function handleUserId(event) {
    setUserIdText(event.target.value);
  }

  function handleUserPasswordText(event) {
    setUserPasswordText(event.target.value);
  }

  function renderLogin() {
    return !spinner ? (
      <Grid container direction="column" justify="center" alignItems="center">
        {okButtonAlert && (
          <OkButtonDialog
            onOkButtonAlert={onOkButtonAlert}
            title={okButtonAlertTitle}
            message={okButtonAlertMessage}
          />
        )}
        <Typography className={classes.LoginPageTitle} variant="h4">
          {CONSTANTS.LOGIN.TITLE}
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
          <FormHelperText className={classes.cautionText}>
            user email id
          </FormHelperText>
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
          <FormHelperText className={classes.cautionText}>
            user password
          </FormHelperText>
        </Grid>
        <Grid item className={classes.createButton}>
          <Button variant="outlined" onClick={authenticate}>
            {CONSTANTS.LOGIN.LOGIN_BTN}
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.spinner}
      >
        {
          <Spinner
            size={CONSTANTS.SPINNER.LARGE}
            message={CONSTANTS.LOGIN.SPINNER_MESSAGE}
          />
        }
      </Grid>
    );
  }

  function isUserLoggedIn() {
    if (Boolean(authToken?.jwt)) {
      return false;
    }
    return false;
  }

  return (
    <>
      {isUserLoggedIn() ? (
        <NavigationMenu authToken={authToken} />
      ) : (
        renderLogin()
      )}
    </>
  );
};

export default Home;
