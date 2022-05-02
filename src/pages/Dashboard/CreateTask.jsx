import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Dialog, Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../features/tasks/getTasksSlice';

const steps = ['Create title', 'Create description', 'Overview'];

export default function CreateTask({ wizardOpen, setWizardOpen }) {
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDecriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNext = () => {
    //  activeStep === steps.length - 1 ? 'Finish' : 'Next'
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === steps.length - 1) {
      if (title && description) {
        axios.post('/tasks', { title, description });
      }
      dispatch(getTasks());
      resetAndCloseDialog();
    }
  };

  const resetAndCloseDialog = () => {
    setActiveStep(0);
    setWizardOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <Dialog fullWidth open={wizardOpen}>
      <Stepper style={{ marginTop: 10 }} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box component='form' noValidate onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <TextField
            margin='normal'
            fullWidth
            label={t('Title')}
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        )}
        {activeStep === 1 && (
          <TextField
            margin='normal'
            fullWidth
            label={t('Description')}
            id='description'
            value={description}
            onChange={handleDecriptionChange}
          />
        )}
        {activeStep === 2 && (
          <Grid
            item
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-around'}
            marginTop={'10px'}
          >
            <TextField disabled value={title} variant='filled' />
            <TextField disabled value={description} variant='filled' />
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          pt: 2,
        }}
      >
        <Button
          color='inherit'
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Dialog>
  );
}
