import React from "react";
import CONSTANTS from "../Constants";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function OkButtonDialog({ setOkButtonAlert, title, message }) {
  return (
    <Dialog fullWidth open onClose={() => setOkButtonAlert(false)}>
      <DialogTitle>{title || ""}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message || ""}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOkButtonAlert(false)} color="primary">
          {CONSTANTS.BUTTONS.OK}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OkButtonDialog;
