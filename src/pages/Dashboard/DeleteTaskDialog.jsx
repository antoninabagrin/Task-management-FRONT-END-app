import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../features/tasks/tasksSlice';
import axios from '../../utils/axios';
import { useTranslation } from 'react-i18next';
import '../styling/Box.scss';

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
      <div className='myBox'></div>
      <DialogTitle>Delete task</DialogTitle>

      <Divider />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the task with id: {selectedTaskId} ?
        </DialogContentText>
      </DialogContent>

      <Divider />

      <DialogActions>
        <a href='#' className='myButton' onClick={() => setOpen(false)}>
          {t(' Disagree')}
        </a>
        <a href='#' className='myButton' onClick={() => deleteTask()}>
          {t('Agree')}
        </a>
        {/* <Button onClick={() => setOpen(false)}>Disagree</Button>
        <Button onClick={() => deleteTask()} autoFocus>
          Agree
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
