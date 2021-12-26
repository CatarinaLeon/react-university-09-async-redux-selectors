import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { ThemeContext, themes } from 'context/themeContext';
import 'react-toastify/dist/ReactToastify.css';
// import React, { Component } from 'react'

import './App.css';

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () =>
    setTheme(prevTheme =>
      prevTheme === themes.light ? themes.dark : themes.light,
    );

  return (
    <div className="main-container">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Sidebar />
        <Main />
      </ThemeContext.Provider>

      <ToastContainer theme="colored" />
    </div>
  );
};

export default App;
