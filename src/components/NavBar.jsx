// src/components/NavBar.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  width: 100%;
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
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e0e1dd;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: 500;
`;

const MenuItem = styled(motion.a)`
  color: #e0e1dd;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #ffff1c;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


// Названия и соответствующие id секций
const menuItems = [
  { label: 'Home', target: 'hero' },
  { label: 'Our cases', target: 'cases' },
  { label: 'Industries', target: 'industries' },
  { label: 'Technologies', target: 'tech' },
  { label: 'Contact', target: 'contact' }
];

export const NavBar = () => (
  <Nav>
    <Container>
      <Logo
        whileHover={{ rotateY: 15 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        CoreBuilder
      </Logo>
      <Menu>
        {menuItems.map(({ label, target }) => (
          <MenuItem
            key={label}
            href={`#${target}`}
            whileHover={{ scale: 1.1, rotateX: 15 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  </Nav>
);
