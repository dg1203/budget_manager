import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getAvailableJars } from "../../services";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { transferResources } from "../../actions/stateActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransferDialog = ({ open, openDialog, resource, jarId }) => {
  const dispatch = useDispatch();
  const { jars } = useSelector(state => state);
  const [targetId, setTargetId] = useState("");
  const availableJars = resource ? getAvailableJars(jars, resource, jarId) : [];
  const onSave = () => {
    if (targetId !== '') {
      dispatch(transferResources({
        resource,
        jarId,
        targetId
      }));
      openDialog(false);
    }
  };
  return (
    open &&
    resource && (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => openDialog(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Transfer środków
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Wybierz słoik do którego chcesz przenieść wybrane środki. Poniżej
              lista dostępnych słoików dla tej operacji.
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Tutuł operacji: {resource.title}
              <br />
              Kwota: {resource.amount}
            </DialogContentText>
            {availableJars.length === 0 ? (
              <h1>Brak</h1>
            ) : (
              <FormControl margin="normal" fullWidth variant="outlined">
                <InputLabel>Waluta</InputLabel>
                <Select
                  value={targetId}
                  onChange={event => setTargetId(event.target.value)}
                  required
                >
                  {availableJars.map(jar => (
                    <MenuItem value={jar.id}>{jar.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={onSave} color="primary">
              Zapisz
            </Button>
            <Button onClick={() => openDialog(false)} color="primary">
              Anuluj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};

TransferDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  jarId: PropTypes.string.isRequired
};

export default TransferDialog;
