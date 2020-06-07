import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Slide,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getAvailableJars } from "../../services";
import FormControl from "@material-ui/core/FormControl";
import { transferResources } from "../../actions/stateActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransferDialog = ({ open, openDialog, currency, amount, jarId }) => {
  const dispatch = useDispatch();
  const { jars } = useSelector(state => state);
  const [targetId, setTargetId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const availableJars = currency ? getAvailableJars(jars, currency, jarId) : [];
  const onSave = () => {
    if (targetId !== "") {
      dispatch(
        transferResources({
          jarId,
          targetId,
          currency,
          amount: paymentAmount
        })
      );
      openDialog(false);
    }
  };
  return (
    open && (
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
            {availableJars.length === 0 ? (
              <Typography variant="h5" component="h5">
                Brak słoików dla których można wykonać operację
              </Typography>
            ) : (
              <>
                <FormControl margin="normal" fullWidth variant="outlined">
                  <TextField
                    value={paymentAmount}
                    onChange={event =>
                      setPaymentAmount(
                        parseFloat(event.target.value) > 0 &&
                          parseFloat(event.target.value) <= parseFloat(amount)
                          ? event.target.value
                          : paymentAmount
                      )
                    }
                    label="Kwota"
                    variant="outlined"
                    type="number"
                    required
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth variant="outlined">
                  <InputLabel>Docelowy słoik</InputLabel>
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
              </>
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
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  jarId: PropTypes.string.isRequired
};

export default TransferDialog;
