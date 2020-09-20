import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
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

export default function ItemsCategoryTab() {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography className={classes.helpText} variant="body1" gutterBottom>
        Item categories created here can be applied to any product
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className={classes.formComponent}>
          <TextField
            fullWidth
            label="item classification code"
            variant="outlined"
            size="small"
          />
          <FormHelperText>
            This is for admin use only. Customer never sees this information
          </FormHelperText>
        </Grid>
        <Grid item className={classes.formComponent}>
          <TextField
            fullWidth
            label="Item classification name"
            variant="outlined"
            size="small"
          />
          <FormHelperText className={classes.cautionText}>
            This information is visible to customer on the mobile app
          </FormHelperText>
        </Grid>
        <Grid item className={classes.formComponent}>
          <TextField
            fullWidth
            label="Item classification information"
            helperText=""
            variant="outlined"
            size="small"
          />
          <FormHelperText>
            This is for admin use only. Customer never sees this information
          </FormHelperText>
        </Grid>
      </Grid>
      <Grid item className={classes.createButton}>
        <Button variant="outlined">Create category</Button>
      </Grid>
    </Grid>
  );
}
