import React, { useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Title</TableCell>
            <TableCell align='center'>Description</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.tasks.map((task, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>{task.title}</TableCell>
              <TableCell align='center'>{task.description}</TableCell>
              <TableCell align='center'>{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
