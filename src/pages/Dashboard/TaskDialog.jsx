import { useParams } from 'react-router-dom';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { selectTasks } from '../../features/tasks/tasksSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function TaskDialog({ open, setOpenTask }) {
  const [taskFound, setTaskFound] = React.useState(null);
  const tasks = useSelector(selectTasks).tasks;
  const history = useNavigate();
  const { t } = useTranslation();
  const params = useParams();

  const closeDialog = () => {
    history('/dashboard');
    setOpenTask(false);
  };

  if (tasks.length > 0 && !taskFound) {
    const taskFound = tasks.find((task) => task.id === params.taskId);
    taskFound && setTaskFound(taskFound);
  }

  return (
    <div>
      <Dialog
        fullWidth={Boolean(true)}
        maxWidth='sm'
        open={open}
        onClose={() => closeDialog()}
      >
        <DialogTitle>{t('My task details:')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {taskFound && taskFound.taskMetadata.details}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>
            {t('Set as completed!')}
          </Button>
          <Button onClick={() => closeDialog()} autoFocus>
            {t('Share!')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
