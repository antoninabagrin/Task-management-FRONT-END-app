import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileSaver from 'file-saver';

export default function TermsDialog({ open, setOpen, setFieldValue }) {
  const { t } = useTranslation();

  const handleDownload = (event) => {
    event.preventDefault();
    const terms = new Blob(
      [
        t(
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quocorporis cupiditate voluptates sapiente exercitationem doloremque quibusdam assumenda iste! Id fuga earum saepe eligendi labore maiores nesciunt ipsam iusto sequi.',
        ),
      ],
      { type: 'text/plain;charset=utf-8' },
    );
    FileSaver.saveAs(terms, 'Terms.txt');
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{t('Terms and Conditions')}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {t(
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quocorporis cupiditate voluptates sapiente exercitationem doloremque quibusdam assumenda iste! Id fuga earum saepe eligendi labore maiores nesciunt ipsam iusto sequi.',
          )}
        </DialogContentText>
        <IconButton onClick={handleDownload}>
          <FileDownloadIcon></FileDownloadIcon>
        </IconButton>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
            setFieldValue('acceptTerms', false);
          }}
        >
          {t('Cancel')}
        </Button>
        <Button
          onClick={() => {
            setFieldValue('acceptTerms', true);
            setOpen(false);
          }}
          autoFocus
        >
          {t('Agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
