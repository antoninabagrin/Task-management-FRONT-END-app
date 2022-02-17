import React, { useEffect } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from './DeleteTaskDialog';

import { useDispatch, useSelector } from 'react-redux';
import { getTasks, selectTasks } from '../../features/tasks/tasksSlice';
import AddTask from './AddTask';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);

  const tasks = useSelector(selectTasks);
  const headerWeight = { fontWeight: '700' };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDeleteTask = async (taskId) => {
    setSelectedTaskId(taskId);
    setOpen(true);
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        selectedTaskId={selectedTaskId}
      />

      <Grid item xs={12} md={8} style={{ height: '100%' }}>
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
          <Table sx={{ minWidth: '580px' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={headerWeight} align='center'>
                  Title
                </TableCell>
                <TableCell sx={headerWeight} align='center'>
                  Description
                </TableCell>
                <TableCell sx={headerWeight} align='center'>
                  Status
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{task.title}</TableCell>
                  <TableCell align='center'>{task.description}</TableCell>
                  <TableCell align='center'>{task.status}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      size='large'
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddTask></AddTask>
      </Grid>
    </Grid>
  );
}
