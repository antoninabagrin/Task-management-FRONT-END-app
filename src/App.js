import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Header from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { handleLogin, handleLogout, setUser } from './features/user/userSlice';
import jwt_decode from 'jwt-decode';
import SignUp from './pages/SignUp/SignUp';
import UserSettings from './pages/UserSettings';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      const { exp, user } = jwt_decode(token);
      if (exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt');
        dispatch(handleLogout());
      } else {
        dispatch(handleLogin());
        dispatch(setUser(user));
      }
    }
  }, [dispatch]);

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
