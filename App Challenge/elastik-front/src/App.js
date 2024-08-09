import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Routes } from "react-router-dom";

export default function App() {
  //let isLoggedIn = false;

  /*return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );*/
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
