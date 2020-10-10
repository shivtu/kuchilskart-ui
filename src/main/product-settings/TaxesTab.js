import React from "react";
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
  return (
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
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            size="small"
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
          />
          <FormHelperText>For internal reference only</FormHelperText>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Button variant="outlined">{CONSTANTS.BUTTONS.SAVE}</Button>
      </Grid>
    </Grid>
  );
}
