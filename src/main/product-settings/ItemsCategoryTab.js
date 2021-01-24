import React, { useState, useContext } from "react";
import CONSTANTS from "../shared/Constants";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import OkButtonDialog from "../shared/common/OkButtonDialog";
import { createNewCategory } from "../shared/services/RestApiServices";
import { AppContext } from "../Home";

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

  const appData = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  const [itemCategory, setItemCategory] = useState("");
  const [itemSubCategory, setItemSubCategory] = useState("");
  const [itemCategoryInfo, setItemCategoryInfo] = useState("");

  const [okButtonAlert, setOkButtonAlert] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");

  async function handleCreateNewItemCategory() {
    if (!itemCategory || !itemSubCategory || !itemCategoryInfo) {
      setOkButtonAlert(true);
      setOkButtonAlertTitle(CONSTANTS.HELPER_TEXT.INVALID_INPUT);
      setOkButtonAlertMessage("All fields are mandatory");
    } else {
      const data = { itemCategory, itemSubCategory, itemCategoryInfo };
      const res = await createNewCategory(jwtToken, data);
      console.log("res>>>>>>>", res.result);
    }
  }

  return (
    <>
      {okButtonAlert && (
        <OkButtonDialog
          setOkButtonAlert={setOkButtonAlert}
          title={okButtonAlertTitle}
          message={okButtonAlertMessage}
        />
      )}
      <Grid container direction="column">
        <Typography className={classes.helpText} variant="body1" gutterBottom>
          Item categories created here can be applied to any product
        </Typography>
        <Grid container justify="center">
          <Grid item className={classes.formComponent}>
            <TextField
              fullWidth
              label="item category"
              variant="outlined"
              size="small"
              value={itemCategory}
              onChange={(_e) => setItemCategory(_e.target.value)}
            />
            <FormHelperText>
              This is for admin use only. Customer never sees this information
            </FormHelperText>
          </Grid>
          <Grid item className={classes.formComponent}>
            <TextField
              fullWidth
              label="Item sub category"
              variant="outlined"
              size="small"
              value={itemSubCategory}
              onChange={(_e) => setItemSubCategory(_e.target.value)}
            />
            <FormHelperText className={classes.cautionText}>
              {CONSTANTS.HELPER_TEXT.VISIBLE_ON_APP}
            </FormHelperText>
          </Grid>
          <Grid item className={classes.formComponent}>
            <TextField
              fullWidth
              label="Item category information"
              helperText=""
              variant="outlined"
              size="small"
              value={itemCategoryInfo}
              onChange={(_e) => setItemCategoryInfo(_e.target.value)}
            />
            <FormHelperText>
              This is for admin use only. Customer never sees this information
            </FormHelperText>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button variant="outlined" onClick={handleCreateNewItemCategory}>
            {CONSTANTS.BUTTONS.SAVE}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
