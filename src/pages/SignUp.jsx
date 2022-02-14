import React from 'react';
import {
  FormControlLabel,
  TextField,
  Box,
  Button,
  Avatar,
  Checkbox,
  Grid,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

export function SignUp() {
  const history = useNavigate();
  const res = (allData) => {
    axios
      .post('/auth/signup', {
        firstName: allData.firstName,
        lastName: allData.lastName,
        email: allData.email,
        password: allData.password,
        username: allData.username,
      })
      .then(function (response) {
        if (response.data === 'USER_CREATED' && response.status === 201) {
          console.log(history);
          history('/signin');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const allData = {
      email: data.get('email'),
      lastName: data.get('lastName'),
      firstName: data.get('firstName'),
      password: data.get('password'),
      passwordConform: data.get('passwordConfirm'),
      username: data.get('username'),
    };
    if (
      allData.email &&
      allData.firstName &&
      allData.lastName &&
      allData.password &&
      allData.passwordConform &&
      allData.username
    ) {
      if (allData.password === allData.passwordConform) {
        res(allData);
      } else {
        alert('Password and confirm password doesnt match');
      }
    } else {
      alert('You should fill every field ');
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar></Avatar>
        <Typography component='h1' variant='h5' margin='5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='term' color='primary' />}
                label=' I accept the terms and conditions.'
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained'>
            Join
          </Button>
          <Grid container justifyContent='flex-end'>
            <Link href='#' variant='body2'>
              <Grid item>Already have an account? Sign in</Grid>
            </Link>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
