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
import { setIsAuth } from './features/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    token && token.length > 0 && dispatch(setIsAuth(true));
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
