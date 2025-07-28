import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
  z-index: 1001;
`;

const Menu = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: 500;

  @media (max-width: 770px) {
    display: none;
  }
`;

const MenuItem = styled(motion.a)`
  color: #e0e1dd;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #ffff1c;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 1001;

  @media (max-width: 770px) {
    display: flex;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #e0e1dd;
    border-radius: 10px;
    transition: all 0.3s linear;
    transform-origin: 1px;
  }
`;

const MobileMenuWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: linear-gradient(135deg, #0d1b2a, #1b263b);
  z-index: 1000;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MobileMenuItem = styled(motion.a)`
  color: #e0e1dd;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 0;
  cursor: pointer;
  display: block;

  &:hover {
    color: #ffff1c;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Container = styled.div`
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const menuItems = [
  { label: 'Home', target: 'hero' },
  { label: 'Technologies', target: 'tech' },
  { label: 'Industries', target: 'industries' },
  { label: 'Our cases', target: 'cases' },
  { label: 'Contact', target: 'contact' }
];

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 770);
      if (window.innerWidth > 770) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (target) => {
    setIsOpen(false);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Nav>
      <Container>
        <Logo
          whileHover={{ rotateY: 15 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => {
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          CoreBuilder
        </Logo>

        {/* Десктопное меню */}
        {!isMobile && (
          <Menu>
            {menuItems.map(({ label, target }) => (
              <MenuItem
                key={label}
                href={`#${target}`}
                whileHover={{ scale: 1.1, rotateX: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(target);
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        )}

        {/* Кнопка мобильного меню */}
        {isMobile && (
          <MobileMenuButton onClick={toggleMenu} aria-label="Menu">
            <motion.div
              animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.div
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </MobileMenuButton>
        )}

        {/* Мобильное меню с анимацией */}
        <AnimatePresence>
          {isMobile && isOpen && (
            <>
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
              />
              <MobileMenuWrapper
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {menuItems.map(({ label, target }) => (
                  <MobileMenuItem
                    key={label}
                    href={`#${target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuItemClick(target);
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {label}
                  </MobileMenuItem>
                ))}
              </MobileMenuWrapper>
            </>
          )}
        </AnimatePresence>
      </Container>
    </Nav>
  );
};