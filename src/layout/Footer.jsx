// src/layout/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  padding: 1rem;
  text-align: center;
  background: #0d1b2a;
  color: #e0e1dd;
`;

const Footer = () => (
  <Foot>
    © {new Date().getFullYear()} CoreBuilder. All rights reserved.
  </Foot>
);

export default Footer;