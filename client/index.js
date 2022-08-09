// Before
// import { render } from 'react-dom';
// const container = document.getElementById('root');
// render(<App tab="home" />, container);

// After
import React from 'react'
import { createRoot } from 'react-dom/client';
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./css/styles.scss";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Router>
    <App/>
  </Router>
);