import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './pages/SignUp';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Header from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { handleLogin, handleLogout, setIsAuth } from './features/userSlice';
import jwt_decode from 'jwt-decode';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const jwtTokenDecoded = jwt_decode(token, { header: true });
    const { exp } = jwt_decode(token);
    const expirationTime = +exp;

    token && token.length > 0 && dispatch(setIsAuth(true));

    if (expirationTime > Date.now()) {
      localStorage.removeItem('jwt');
      dispatch(handleLogout());
    } else {
      dispatch(handleLogin(token));
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
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
