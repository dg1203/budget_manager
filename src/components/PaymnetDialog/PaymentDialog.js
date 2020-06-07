import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Slide,
  TextField
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import { removeResource } from "../../actions/stateActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentDialog = ({ currency, amount, jarId, open, openDialog }) => {
  const dispatch = useDispatch();
  const [paymentAmount, setPaymentAmount] = useState(0);
  const onSave = () => {
    dispatch(
      removeResource({
        currency,
        jarId,
        amount: paymentAmount
      })
    );
    setPaymentAmount(0);
    openDialog(false);
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
            Wypłata środków {currency}
          </DialogTitle>
          <DialogContent>
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

PaymentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  jarId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
};

export default PaymentDialog;
