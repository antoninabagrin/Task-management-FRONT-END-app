import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
  TablePagination,
} from '@mui/material';
import Grow from '@mui/material/Grow';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from './DeleteTaskDialog';
import { getTasks, selectTasks } from '../../features/tasks/tasksSlice';
import AddTask from './AddTask';
import { TransitionGroup } from 'react-transition-group';

export default function Dashboard({ deleted }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { t } = useTranslation();
  const tasks = useSelector(selectTasks);
  const headerWeight = { fontWeight: '700' };

  useEffect(() => {
    dispatch(getTasks());
    setChecked((prev) => !prev);
  }, [dispatch]);

  const handleDeleteTask = async (taskId) => {
    setSelectedTaskId(taskId);

    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        selectedTaskId={selectedTaskId}
      />

      <Grid item xs={12} md={8} style={{ height: '100%' }}>
        <Grow
          in={checked}
          style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table sx={{ minWidth: '580px' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={headerWeight} align='center'>
                    {t('Title')}
                  </TableCell>
                  <TableCell sx={headerWeight} align='center'>
                    {t('Description')}
                  </TableCell>
                  <TableCell sx={headerWeight} align='center'>
                    {t('Status')}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                <TransitionGroup>
                  {tasks.tasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, index) => (
                      <Collapse in={deleted} key={index}>
                        <TableRow key={index}>
                          <TableCell align='center'>{task.title}</TableCell>
                          <TableCell align='center'>
                            {task.description}
                          </TableCell>
                          <TableCell align='center'>{task.status}</TableCell>
                          <TableCell align='center'></TableCell>

                          <IconButton
                            size='large'
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableRow>
                      </Collapse>
                    ))}
                </TransitionGroup>
              </TableBody>
            </Table>
          </TableContainer>
        </Grow>
        <TablePagination
          component='div'
          count={tasks.tasks.length}
          onPageChange={handleChangePage}
          page={page}
          rowsPerPageOptions={[10, 25, 50]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddTask></AddTask>
      </Grid>
    </Grid>
  );
}
