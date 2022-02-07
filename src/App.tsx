import React from 'react';
import './App.css';
import Routes from './common/routes'
import Login from "./containers/Login/Login";

const App: React.FC = () => {
  const userId :string = localStorage.getItem('id')!;

  if(!userId) {
    return <Login />
  }

  return (
    <Routes/>
  );
}

export default App;
