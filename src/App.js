import logo from './logo.svg';
import './App.css';
import RegisterPage from './Components/RegisterAccount';
import React from 'react';
import ThreeScene from './Components/ThreeScene';

function App() {
  return (
    <div>
      <header>
        <h1 header className="app-title"> HỒ SƠ NGƯỜI DÙNG </h1>
      </header>
      <RegisterPage />
      <ThreeScene />

    </div>
  );
}

export default App;
