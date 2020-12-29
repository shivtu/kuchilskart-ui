import React, { useState } from "react";
import {
  Dialog,
  Button,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signUp } from "./shared/services/RestApiServices";
import Spinner from "./shared/common/Spinner";
import CONSTANTS from "../main/shared/Constants";

const useStyles = makeStyles((theme) => ({
  signUpForm: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 250,
  },
  spinner: {
    marginBottom: theme.spacing(4),
    marginLeft: 100,
    marginRight: 100,
  },
}));

function SignUp({ setSignUpVisible }) {
  const classes = useStyles();

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userAge, setUserAge] = useState("SELECT");
  const [userGender, setUserGender] = useState();
  const [userAddress, setUserAddress] = useState();
  const [userKYC, setUserKYC] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [userSocialMediaProfile, setUserSocialMediaProfile] = useState();
  const [spinner, setSpinner] = useState(false);
  const [failMsg, setFailMsg] = useState(false);

  function renderNameField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Name"
        variant="outlined"
        size="small"
        value={userName}
        onChange={handleUserNameInput}
      />
    );
  }

  function renderEmailField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Email"
        variant="outlined"
        size="small"
        value={userEmail}
        onChange={handleUserEmailInput}
      />
    );
  }

  function renderPasswordField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Password"
        variant="outlined"
        size="small"
        value={userPassword}
        type="password"
        onChange={handleUserPasswordInput}
      />
    );
  }

  function renderConfirmPasswordField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Confirm password"
        variant="outlined"
        size="small"
        value={confirmedPassword}
        type="password"
        onChange={handleUserPasswordConfirmInput}
      />
    );
  }

  function renderPhoneNumberField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Phone number"
        variant="outlined"
        size="small"
        value={userPhone}
        type="number"
        onChange={handleUserPhoneInput}
      />
    );
  }

  function renderuserAgeField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Age"
        variant="outlined"
        size="small"
        value={userAge}
        type="number"
        onChange={handleUserAgeInput}
      />
    );
  }

  function renderuserGenderSelect() {
    return (
      <FormControl
        className={classes.signUpForm}
        variant="outlined"
        size="small"
      >
        <InputLabel>Gender</InputLabel>
        <Select
          value={userGender}
          onChange={handleUserGenderSelect}
          label="Gender"
        >
          <MenuItem value="MALE">Male</MenuItem>
          <MenuItem value="FEMALE">Female</MenuItem>
          <MenuItem value="UNSPECIFIED">Unspecified</MenuItem>
        </Select>
      </FormControl>
    );
  }

  function renderuserAddressField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Address"
        variant="outlined"
        size="small"
        value={userAddress}
        onChange={handleuserAddressInput}
      />
    );
  }

  function renderUserSocailMediaInput() {
    return (
      <TextField
        className={classes.signUpForm}
        label="Social media link"
        variant="outlined"
        size="small"
        value={userSocialMediaProfile}
        onChange={handleusersocialMediaInput}
      />
    );
  }

  function renderKYCField() {
    return (
      <TextField
        className={classes.signUpForm}
        label="KYC number"
        variant="outlined"
        size="small"
        value={userKYC}
        onChange={handleUserKYC}
      />
    );
  }

  function handleClose() {
    setSignUpVisible(false);
  }

  function handleUserNameInput(_e) {
    setUserName(_e.target.value);
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

  function handleUserAgeInput(_e) {
    setUserAge(_e.target.value);
  }

  function handleUserGenderSelect(_e) {
    setUserGender(_e.target.value);
  }

  function handleuserAddressInput(_e) {
    setUserAddress(_e.target.value);
  }

  function handleusersocialMediaInput(_e) {
    setUserSocialMediaProfile(_e.target.value);
  }

  function handleUserKYC(_e) {
    setUserKYC(_e.target.value);
  }

  async function handleSignUp() {
    try {
      setSpinner(true);
      const signUpData = {
        userName: userEmail,
        password: userPassword,
        userProfile_GivenName: userName,
        userProfile_Age: userAge,
        userProfile_Gender: userGender,
        userProfile_PhoneNumber: userPhone,
        userProfile_Address: userAddress,
        userProfile_SocialMedia: [userSocialMediaProfile],
        userProfile_Kyc: userKYC,
        userProfile_Image: "",
      };
      const res = await signUp(signUpData);
      setSpinner(false);
      if (res.result.length) {
        setSignUpVisible(false);
      }
    } catch {
      setSpinner(false);
      setFailMsg(true);
    }
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="sign up"
      aria-describedby="sign up dialog"
    >
      <DialogTitle>Sign Up</DialogTitle>
      {spinner ? (
        <Grid className={classes.spinner}>
          <Spinner size={CONSTANTS.SPINNER_SIZE.MEDIUM} />
        </Grid>
      ) : (
        <>
          <DialogContent>
            <Grid container direction="row" justify="center">
              {renderNameField()}
              {renderEmailField()}
              {renderPasswordField()}
              {renderConfirmPasswordField()}
              {renderPhoneNumberField()}
              {renderuserAgeField()}
              {renderuserGenderSelect()}
              {renderuserAddressField()}
              {renderUserSocailMediaInput()}
              {renderKYCField()}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container justify="space-between" alignItems="center">
              {failMsg && (
                <span style={{ color: "red" }}>Sign up attempt failed</span>
              )}
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
            </Grid>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default SignUp;
