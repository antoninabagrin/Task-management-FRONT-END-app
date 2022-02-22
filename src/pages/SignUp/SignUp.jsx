import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TermsDialog from './TermsDialog';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const history = useNavigate();
  const errorStyle = { color: 'red' };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Required'),
      username: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .required('Required'),
      password: Yup.string().required('Password is required'),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match',
      ),
      acceptTerms: Yup.bool().oneOf(
        [true],
        'You have to agree with our Terms and Conditions!',
      ),
    }),
    onSubmit: async (values) => {
      console.log('values', values);
      await axios
        .post('/auth/signup', {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          username: values.username,
        })
        .then(function (response) {
          if (response.data === 'USER_CREATED' && response.status === 201) {
            history('/signin');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  const handleDialog = () => {
    setOpen(true);
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <TermsDialog open={open} setOpen={setOpen} />
      <Container maxWidth='sm'>
        <Box
          sx={{
            margin: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar />
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' onSubmit={formik.handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              autoFocus
              label='Email Address'
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={errorStyle}>{formik.errors.email}</div>
            ) : null}
            <TextField
              margin='normal'
              required
              fullWidth
              autoFocus
              label='Username'
              id='username'
              name='username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={errorStyle}>{formik.errors.username}</div>
            ) : null}
            <TextField
              margin='normal'
              required
              fullWidth
              autoFocus
              label='Password'
              id='password'
              type='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={errorStyle}>{formik.errors.password}</div>
            ) : null}
            <TextField
              margin='normal'
              required
              fullWidth
              autoFocus
              label='Confirm password'
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div style={errorStyle}>{formik.errors.confirmPassword}</div>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => handleDialog()}
                  value='term'
                  color='primary'
                />
              }
              label=' I accept the terms and conditions.'
            />
            {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
              <div style={errorStyle}>{formik.errors.acceptTerms}</div>
            ) : null}

            <Button type='submit' fullWidth variant='contained'>
              Join
            </Button>
            <Grid container justifyContent={'flex-end'}>
              <Link href='/signin' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
