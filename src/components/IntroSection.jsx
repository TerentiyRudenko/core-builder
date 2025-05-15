// src/components/IntroSection.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledSection = styled.section`
  position: relative;
  width: 100%;
  height: 600px;
  background: #0f0f1c;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1000px;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #00c3ff, #ffff1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  color: #cccccc;
  max-width: 800px;
  margin: 0 auto;
`;

const IntroSection = () => {
  return (
    <StyledSection>
      <Content
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false, amount: 1 }}
      >
        <Title>Create Your Unique Website</Title>
        <Description>
          Turn your imagination into reality with CoreBuilder.
          Our expert team with deep commercial experience brings your vision to life with modern, scalable, and bold design.
        </Description>
      </Content>
    </StyledSection>
  );
};

export default IntroSection;
