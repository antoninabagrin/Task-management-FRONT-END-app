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
import axios from '../utils/axios';

function Dashboard() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log('token', token);
    dispatch(getTasks(token));

    //   //   const axiosTasks = async () => {
    //   //     const response = await axios.get('http://localhost:3000/tasks', {
    //   //       headers: {
    //   //         Authorization: 'Bearer ' + token,
    //   //       },
    //   //     });
    //   //     setTasks(response.data);
    //   //   };
    //   //   axiosTasks();
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.tasks.map((task, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{task.title}</TableCell>
              <TableCell align="right">{task.description}</TableCell>
              <TableCell align="right">{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
