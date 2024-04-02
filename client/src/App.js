import React from 'react';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Home from './Pages/HomePage/Home';
import Login from './Pages/LoginPage/login';
import Profile from './Pages/ProfilePage/profile';
import {useMemo} from "react";
import {  useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { Toaster } from 'react-hot-toast';



const App = () => {

  const mode =  useSelector((state)=> state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); 
  const isAuth = Boolean(useSelector((state) => state.token));

  return (

    <div>
     
  
  <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        
        </ThemeProvider>
      </BrowserRouter>

    </div>
  )
}

export default App
