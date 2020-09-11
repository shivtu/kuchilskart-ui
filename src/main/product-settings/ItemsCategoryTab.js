import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";

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

export default function ItemsCategoryTab() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography className={classes.helpText} variant="body1" gutterBottom>
        Item category is a mandatory field while creating a product. The item
        category created here will be associated with the new products you
        create for the inventory
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <TextField
            className={classes.formComponent}
            label="Item classification"
            helperText="This is for admin use only. Customer never sees this information"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.formComponent}
            label="Item classification information"
            helperText="This is for admin use only. Customer never sees this information"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid item>
        <Button variant="outlined">Create Category</Button>
      </Grid>
    </Grid>
  );
}
