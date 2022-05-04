import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { handleLogin, setIsAuth } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    setUsername(data.get('username'));
    setPassword(data.get('password'));

    if (username && password) {
      const res = await axios.post('/auth/signin', { username, password });
      const token = res.data.accessToken;

      if (token) {
        localStorage.setItem('jwt', token);
        dispatch(setIsAuth(true));
        navigate(from, { replace: true });
      }
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
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('Sign in')}
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label={t('Username')}
            name='username'
            autoComplete='username'
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label={t('Password')}
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label={t('Remember me')}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            onClick={handleLogin}
          >
            {t('Sign In')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                {t('Forgot password?')}
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {t("Don't have an account? Sign Up")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
