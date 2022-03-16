import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Avatar, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../features/user/userSlice';
import languages from '../utils/languages/languagesData';
import { useTranslation } from 'react-i18next';
import { Settings } from '@mui/icons-material';

export default function Header() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const [languageMenu, setLanguageMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const anchorRef = React.useRef(null);

  const Logout = () => {
    dispatch(setIsAuth(false));
    localStorage.removeItem('jwt');
    navigate('/home');
  };

  const handleOpenLanguageMenu = (event) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleCloseLanguageMenu = (language) => {
    i18n.changeLanguage(language);
    setLanguageMenu(false);
  };

  const handleOpenUserMenu = () => {
    setUserMenu(true);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(false);
  };

  const handleSettings = (token) => {
    if (token) {
      localStorage.setItem('jwt', token);
      dispatch(setIsAuth(true));
      navigate('/usersettings');
    }
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
            {t('News')}
          </Typography>
          {!isAuth && (
            <Link
              to='/signin'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button variant='text' color='inherit'>
                {t('Sign In')}
              </Button>
            </Link>
          )}
          {isAuth && (
            <Box>
              <IconButton onClick={() => handleOpenUserMenu()}>
                <Avatar
                  alt='Avatar'
                  src='/static/avatar.jpeg'
                  ref={anchorRef}
                />
              </IconButton>
              <Menu
                anchorEl={anchorRef.current}
                open={Boolean(userMenu)}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
              >
                {userMenu && (
                  <MenuItem onClick={() => handleSettings()}>
                    <ListItemIcon>
                      <Settings fontSize='small' />
                    </ListItemIcon>
                    <Link
                      to='/usersettings'
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      <Button color='primary'>{t('Settings')}</Button>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
              <Button onClick={() => Logout()} color='inherit'>
                {t('Sign Out')}
              </Button>
            </Box>
          )}
          {!isAuth && (
            <Link
              to='/dashboard'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Button color='inherit'>{t('Dashboard')}</Button>
            </Link>
          )}
          <Box>
            <IconButton onClick={handleOpenLanguageMenu}>
              <LanguageIcon style={{ color: 'white' }}></LanguageIcon>
            </IconButton>
            <Menu
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              onClose={handleCloseLanguageMenu}
            >
              {languages.map((languages) => (
                <MenuItem
                  key={languages.id}
                  onClick={() => handleCloseLanguageMenu(languages.language)}
                >
                  <Typography textAlign='center'>
                    {t(languages.name)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
