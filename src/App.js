import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Header from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleLogin, handleLogout, setUser } from './features/user/userSlice';
import jwt_decode from 'jwt-decode';
import SignUp from './pages/SignUp/SignUp';
import UserSettings from './pages/UserSettings';
import store from './store';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt');
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (token) {
      const { exp, user } = jwt_decode(token, { complete: true });
      dispatch(setUser(user));
      if (exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt');
        dispatch(handleLogout());
      } else {
        dispatch(handleLogin());
      }
    }
  }, [dispatch, token, isAuth]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route
          path='/protected'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path='usersettings' element={<UserSettings />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </ThemeProvider>
  );
}
export default App;
