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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, selectTasks } from '../features/tasks/tasksSlice';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid item xs={12} md={8} style={{ height: '100%' }}>
        <TableContainer component={Paper} sx={{ marginTop: 5 }}>
          <Table sx={{ minWidth: '580px' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: '700' }} align='center'>
                  {t('Title')}
                </TableCell>
                <TableCell sx={{ fontWeight: '700' }} align='center'>
                  {t('Description')}
                </TableCell>
                <TableCell sx={{ fontWeight: '700' }} align='center'>
                  {t('Status')}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{task.title}</TableCell>
                  <TableCell align='center'>{task.description}</TableCell>
                  <TableCell align='center'>{task.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
