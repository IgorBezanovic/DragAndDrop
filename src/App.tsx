import React, { useState } from 'react';
import './App.css';
import Routes from './common/routes'
import Login from "./components/Login/Login";

const App: React.FC = () => {
  const user = localStorage.getItem('token');

  if(!user) {
    return <Login />
  }

  return (
    <Routes/>
  );
}

export default App;
