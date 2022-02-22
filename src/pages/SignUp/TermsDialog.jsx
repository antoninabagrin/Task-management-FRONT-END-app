import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';

export default function TermsDialog({ open, setOpen }) {
  const handleSubmit = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quo
          corporis cupiditate voluptates sapiente exercitationem doloremque
          quibusdam assumenda iste! Id fuga earum saepe eligendi labore maiores
          nesciunt ipsam iusto sequi.
        </DialogContentText>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => handleSubmit()} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
