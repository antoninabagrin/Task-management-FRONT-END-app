import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './pages/SignUp';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Header from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import GetAllTasks from './pages/GetAllTasks';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setIsAuth } from './features/userSlice';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    token && token.length > 0 && dispatch(setIsAuth(true));
  }, []);

  // const handleLogin = async (accessToken) => {
  //   setIsAuthenticated(true);
  //   localStorage.setItem('jwt', accessToken);
  // };

  // const handleLogout = async () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('jwt');
  // };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <GetAllTasks />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
