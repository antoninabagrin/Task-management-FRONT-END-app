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
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [isAgree, setIsAgree] = React.useState(false);
  const { t } = useTranslation();
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
    validationSchema: Yup.object({
      email: Yup.string().email(t('Invalid email')).required(t('Required')),
      username: Yup.string()
        .max(10, t('Must be 10 characters or less'))
        .required(t('Required')),
      password: Yup.string().required(t('Password is required')),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        t('Passwords must match'),
      ),
    }),
    onSubmit: (values) => {
      console.log('values', values);
      axios
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

  const checkDisableJoinButton = () => {
    return !isAgree;
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <TermsDialog open={open} setOpen={setOpen} setIsAgree={setIsAgree} />
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
            {t('Sign up')}
          </Typography>
          <Box component='form' onSubmit={formik.handleSubmit}>
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              label={t('Email Address')}
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
              fullWidth
              autoFocus
              label={t('Username')}
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
              fullWidth
              autoFocus
              label={t('Password')}
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
              fullWidth
              autoFocus
              label={t('Confirm password')}
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
                  onClick={() => setOpen(true)}
                  value='term'
                  color='primary'
                />
              }
              label={t('I accept the terms and conditions.')}
            />
            {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
              <div style={errorStyle}>{formik.errors.acceptTerms}</div>
            ) : null}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={checkDisableJoinButton()}
            >
              {t('Join')}
            </Button>

            <Grid container justifyContent={'flex-end'}>
              <Link href='/signin' variant='body2'>
                {t('Already have an account? Sign in!')}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
