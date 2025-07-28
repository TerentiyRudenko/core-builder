import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import CasesSection from './components/CasesSection';
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  return (
    <>
    <Helmet>
      <title>Core Builder - Create your custom site</title>
      <meta name="description" content="Core Builder main page" />
      <link rel="icon" type="image/png" href="/core-builder-logo-new.png" />
    </Helmet>
    <Layout/>
    {/* <ToastContainer/> */}
    </>
  );
}

export default App;
