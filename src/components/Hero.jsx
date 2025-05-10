// Hero.jsx
// src/components/Hero.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 700px;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  color: #0f2027;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 2rem;

  &:hover {
    background: #ddd;
    animation: animateButton 2s ease-in-out infinite;
  }

  @keyframes animateButton {
    0% { background: black; color: white; }
    50% { background: white; color: black; }
    100% { color: white; background: black; }
  }
`;

const ArrowDown = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 2rem;
  cursor: pointer;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
`;

const Hero = ({ scrollTargetRef }) => {
  const fullText = 'Build. Innovate. Dominate.';
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const handleScroll = () => {
    scrollTargetRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroSection>
      <Title>{typedText}</Title>
      {index === fullText.length && (
        <>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            CoreBuilder transforms your digital presence with cutting-edge, bespoke websites that set you apart.
          </Subtitle>
          <Button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScroll}
          >
            Get Started
          </Button>
          <ArrowDown onClick={handleScroll}>↓</ArrowDown>
        </>
      )}
    </HeroSection>
  );
};

export default Hero;
