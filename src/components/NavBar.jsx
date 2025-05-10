// src/components/NavBar.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  width: auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #0d1b2a, #1b263b);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  perspective: 1000px;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e0e1dd;
  cursor: pointer;
  transform-style: preserve-3d;
  
`;

const Menu = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: 500;
  color: #e0e1dd;
`;

const menuItems = ['Home', 'Features', 'Pricing', 'Contact'];

export const NavBar = () => (
  <Nav>
    <Logo>
      CoreBuilder
    </Logo>
    <Menu>
      {menuItems.map(item => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.2, rotateX: 20 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {item}
        </motion.div>
      ))}
    </Menu>
  </Nav>
);