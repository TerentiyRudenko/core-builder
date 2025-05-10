// src/layout/Layout.jsx
import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import TechnologiesSection from '../components/TechnologiesSection';
import Footer from './Footer';

const Main = styled.main`
  padding-top: 67px;
  `

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Hero />
      <IntroSection />
      <TechnologiesSection />
      <Footer />
    </>
  );
};

export default Layout;