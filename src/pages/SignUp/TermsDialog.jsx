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
import { useTranslation } from 'react-i18next';

export default function TermsDialog({ open, setOpen, setIsAgree }) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{t('Terms and Conditions</DialogTitle')}/</DialogTitle>
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
        <Button onClick={() => setOpen(false)}>{t('Cancel')}</Button>
        <Button
          onClick={() => {
            setIsAgree(true);
            setOpen(false);
          }}
          autoFocus
        >
          {t(' Agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
