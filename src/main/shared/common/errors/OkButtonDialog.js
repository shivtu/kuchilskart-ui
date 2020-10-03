import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function OkButtonDialog({ onOkButtonAlert, title, message }) {
  return (
    <div>
      <Dialog
        fullWidth
        open
        onClose={() => onOkButtonAlert(false)}
        aria-labelledby="authentication failed"
        aria-describedby="authentication failed"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onOkButtonAlert(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OkButtonDialog;
