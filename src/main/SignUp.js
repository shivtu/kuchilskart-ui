import React, { useState } from "react";
import {
  Dialog,
  Button,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  signUpForm: {
    marginBottom: theme.spacing(2),
  },
}));

function SignUp({ setSignUpVisible }) {
  const classes = useStyles();

  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userKYC, setUserKYC] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();

  function handleClose() {
    setSignUpVisible(false);
  }

  function handleUserEmailInput(_e) {
    setUserEmail(_e.target.value);
  }
  function handleUserPasswordInput(_e) {
    setUserPassword(_e.target.value);
  }

  function handleUserPasswordConfirmInput(_e) {
    setConfirmedPassword(_e.target.value);
  }

  function handleUserPhoneInput(_e) {
    setUserPhone(_e.target.value);
  }

  function handleUserKYC(_e) {
    setUserKYC(_e.target.value);
  }

  function handleSignUp(email, password) {
    // CALL SIGN UP API
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.signUpForm}
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          value={userEmail}
          onChange={handleUserEmailInput}
        />
        <TextField
          className={classes.signUpForm}
          fullWidth
          label="Password"
          variant="outlined"
          size="small"
          value={userPassword}
          type="password"
          onChange={handleUserPasswordInput}
        />
        <TextField
          className={classes.signUpForm}
          fullWidth
          label="Confirm assword"
          variant="outlined"
          size="small"
          value={confirmedPassword}
          type="password"
          onChange={handleUserPasswordConfirmInput}
        />
        <TextField
          className={classes.signUpForm}
          fullWidth
          label="Phone number"
          variant="outlined"
          size="small"
          value={userPhone}
          type="number"
          onChange={handleUserPhoneInput}
        />
        <TextField
          className={classes.signUpForm}
          fullWidth
          label="KYC number"
          variant="outlined"
          size="small"
          value={userKYC}
          onChange={handleUserKYC}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={
            !userEmail ||
            !userPassword ||
            !confirmedPassword ||
            !userPhone ||
            !userKYC
          }
          variant="outlined"
          onClick={handleSignUp}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignUp;
