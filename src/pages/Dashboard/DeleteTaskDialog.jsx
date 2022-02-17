import * as React from 'react';
import {
  Button,
  Dialog,
  Typography,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { getTasks } from '../../features/tasks/tasksSlice';
import axios from '../../utils/axios';

export default function AlertDialog({ open, setOpen, selectedTaskId }) {
  const dispatch = useDispatch();

  const deleteTask = async () => {
    await axios.delete(`/tasks/${selectedTaskId}`);
    dispatch(getTasks());
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Delete task</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the task with id: {selectedTaskId} ?
        </DialogContentText>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Disagree</Button>
        <Button onClick={() => deleteTask()} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
