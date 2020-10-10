import React from "react";
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

export default function DeliveryChargesTab({
  overrideDeliveryChargesLabel,
  overrideDeliveryCharges,
  handleDeliveryChargesOverride,
}) {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Typography className={classes.helpText} variant="body1" gutterBottom>
        Delivery charges help you create a rule ( for selling price range) that
        decides the delivery charges to be levied on the order
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
            size="small"
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
          />
        </Grid>
      </Grid>

      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography className={classes.formComponent} variant="body1">
            When you override the rule, delivery charges can be custom set for
            the order. If not set it will be 0 INR
          </Typography>
        </Grid>
        <Grid item>
          <FormControlLabel
            className={classes.formComponent}
            value={overrideDeliveryCharges}
            control={<Switch color="secondary" />}
            label={overrideDeliveryChargesLabel}
            labelPlacement="top"
            onChange={handleDeliveryChargesOverride}
          />
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Button variant="outlined">{CONSTANTS.BUTTONS.SAVE}</Button>
      </Grid>
    </Grid>
  );
}
