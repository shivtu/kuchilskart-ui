import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
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

export default function TaxesTab() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography className={classes.helpText} variant="body1" gutterBottom>
        Taxes created here can be applied to any product category
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <TextField
          className={classes.formComponent}
          label="Tax name"
          helperText="This information will be visible to the customer"
          variant="outlined"
          size="small"
        />
        <TextField
          className={classes.formComponent}
          label="Tax percentaged"
          helperText="This information will be visible to the customer"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          size="small"
        />
      </Grid>
      <Grid item>
        <TextField
          className={classes.descField}
          label="Tax description"
          helperText="This information is not visible to the customer"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item>
        <Button variant="outlined">Create tax</Button>
      </Grid>
    </Grid>
  );
}
