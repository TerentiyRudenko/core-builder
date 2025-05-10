// Header.jsx
// src/layout/Header.jsx

import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f2027;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;

  li {
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #00c3ff;
    }
  }
`;

const Header = () => {
  return (
    <Nav>
      <Logo>CoreBuilder</Logo>
      <Menu>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Contact</li>
      </Menu>
    </Nav>
  );
};

export default Header;
