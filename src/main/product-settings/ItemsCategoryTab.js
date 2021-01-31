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
import Spinner from "../shared/common/Spinner";
import { createNewCategory } from "../shared/services/RestApiServices";
import { AppContext } from "../Home";
import { fetchUtilityData } from "../shared/services/RestApiServices";

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

  const { appData, setAppData } = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  const [itemCategory, setItemCategory] = useState("");
  const [itemSubCategory, setItemSubCategory] = useState("");
  const [itemCategoryInfo, setItemCategoryInfo] = useState("");

  const [okButtonAlert, setOkButtonAlert] = useState(false);
  const [okButtonAlertTitle, setOkButtonAlertTitle] = useState("");
  const [okButtonAlertMessage, setOkButtonAlertMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  function resetForm() {
    setItemCategory("");
    setItemSubCategory("");
    setItemCategoryInfo("");
  }

  function renderAlertDialog(dialogTitle, dialogMsg) {
    setOkButtonAlertTitle(dialogTitle);
    setOkButtonAlertMessage(dialogMsg);
    setOkButtonAlert(true);
  }

  async function handleCreateNewItemCategory() {
    setSpinner(true);
    try {
      if (!itemCategory || !itemSubCategory || !itemCategoryInfo) {
        renderAlertDialog(
          CONSTANTS.HELPER_TEXT.INVALID_INPUT,
          "All fields are mandatory"
        );
      } else {
        const data = { itemCategory, itemSubCategory, itemCategoryInfo };
        const res = await createNewCategory(jwtToken, data);
        if (res.statusCode === 201) {
          renderAlertDialog(
            "Category created",
            `${res.result[0].itemCategory} created with sub category ${res.result[0].itemSubCategory}`
          );
          const utilityData = await fetchUtilityData(jwtToken);
          if (utilityData.result) {
            setAppData({ jwtToken, utilityData });
          } else {
            renderAlertDialog(
              CONSTANTS.HELPER_TEXT.ERROR,
              "Unable to update app data, please re-login to fix this"
            );
          }
        }
      }
      setSpinner(false);
      resetForm();
    } catch (err) {
      setSpinner(false);
      renderAlertDialog(CONSTANTS.HELPER_TEXT.ERROR, err);
    }
  }

  return (
    <>
      {spinner ? (
        <Grid container justify="center" alignItems="center">
          <Spinner size={CONSTANTS.SPINNER_SIZE.LARGE} />
        </Grid>
      ) : (
        okButtonAlert && (
          <OkButtonDialog
            setOkButtonAlert={setOkButtonAlert}
            title={okButtonAlertTitle}
            message={okButtonAlertMessage}
          />
        )
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
