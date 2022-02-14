import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../features/userSlice';

export default function Header() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(setIsAuth(false));
    localStorage.removeItem('jwt');
    navigate('/home');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {!isAuth && (
            <Link
              to='/signin'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button variant='text' color='inherit'>
                Sign In
              </Button>
            </Link>
          )}
          {isAuth && (
            <Button onClick={() => Logout()} color='inherit'>
              Sign Out
            </Button>
          )}
          {!isAuth && (
            <Link
              to='/dashboard'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button color='inherit'>Dashboard</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
