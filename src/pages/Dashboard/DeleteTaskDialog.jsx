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
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTasks } from '../../features/tasks/tasksSlice';
import axios from '../../utils/axios';

export default function AlertDialog({ open, setOpen, selectedTaskId }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const deleteTask = async () => {
    await axios.delete(`/tasks/${selectedTaskId}`);
    dispatch(getTasks());
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{t('Delete task')}</DialogTitle>

      <Divider />
      <DialogContent>
        <DialogContentText>
          {t('Are you sure you want to delete the task with id:')}
          {selectedTaskId} ?
        </DialogContentText>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={() => setOpen(false)}>{t('Disagree')}</Button>
        <Button onClick={() => deleteTask()} autoFocus>
          {t('Agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
