// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import Layout from './layout/Layout';
import GoalTime from './pages/case-pages/Goaltime';
import LunarAliens from './pages/case-pages/LunarAliens';
import CasesSection from './components/CasesSection';
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  
      <BrowserRouter>
        {" "}
        {/* оберни App в BrowserRouter */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cases">
            <Route path="1" element={<GoalTime />} />
            <Route path="2" element={<LunarAliens />} />
          </Route>
        </Routes>
      </BrowserRouter>

  </React.StrictMode>
);
