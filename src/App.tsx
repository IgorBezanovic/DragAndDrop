import React from 'react';
import './App.css';
import Routes from './common/routes'
import Login from "./containers/Login/Login";

const App: React.FC = () => {
  const user :string | null = localStorage.getItem('name');

  if(!user) {
    return <Login />
  }

  return (
    <Routes/>
  );
}

export default App;
