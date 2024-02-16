import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Tasks from './pages/Tasks'
import ErrorPage from "./pages/ErrorPage";
import MePage from "./pages/MePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/me" element={<MePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
