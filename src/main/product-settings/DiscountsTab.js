import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
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
}));

export default function DiscountsTab({
  isDiscountActiveLabel,
  isDiscountActive,
  handleDiscountState,
}) {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography className={classes.helpText} variant="body1" gutterBottom>
        Discounts created here can be applied to any product category
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className={classes.formComponent}>
          <TextField
            fullWidth
            label="Discount name"
            variant="outlined"
            size="small"
          />
          <FormHelperText className={classes.cautionText}>
            This information will be visible to the customer
          </FormHelperText>
        </Grid>
        <Grid item className={classes.formComponent}>
          <TextField
            fullWidth
            label="Discount percentaged"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            size="small"
          />
          <FormHelperText className={classes.cautionText}>
            This information will be visible to the customer
          </FormHelperText>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography
              className={classes.formComponent}
              variant="body1"
              // style={{ maxWidth: "300px" }}
            >
              When a discount is inactive, even if it is applied to the product,
              customer won't see the discount and no discounts will be
              calculated on the selling price.
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.formComponent}
              value={isDiscountActive}
              control={<Switch color="primary" />}
              label={isDiscountActiveLabel}
              labelPlacement="top"
              onChange={handleDiscountState}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="outlined">Create Discount</Button>
      </Grid>
    </Grid>
  );
}
