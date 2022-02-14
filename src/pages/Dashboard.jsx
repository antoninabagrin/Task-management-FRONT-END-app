import React, { useEffect } from 'react';
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, selectTasks } from '../features/tasks/tasksSlice';

export default function Dashboard() {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <TableContainer style={{ width: '100%' }} component={Paper}>
      <TableRow
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        <TableCell sx={{ fontWeight: '700' }} align='center'>
          Title
        </TableCell>
        <TableCell sx={{ fontWeight: '700' }} align='center'>
          Description
        </TableCell>
        <TableCell sx={{ fontWeight: '700' }} align='center'>
          Status
        </TableCell>
      </TableRow>
      <TableBody
        sx={{
          display: 'grid',
        }}
      >
        {tasks.tasks.map((task, index) => (
          <TableRow
            sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
            key={index}
          >
            <TableCell align='center'>{task.title}</TableCell>
            <TableCell align='center'>{task.description}</TableCell>
            <TableCell align='center'>{task.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
