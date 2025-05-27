// src/components/IntroSection.jsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Анимации
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const wave = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
`;

// Стили
const StyledSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #0f0f1c;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 2rem 2rem 0 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #00c3ff, #ffff1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 3rem;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled(motion.div)`
  flex: 1;
  z-index: 2;
  color: #cccccc;

  p {
    font-size: 1.7rem;
    line-height: 1.8;
    max-width: 500px;
    margin: 0 auto;

    @media (max-width: 1024px) {
      max-width: 100%;
    }
  }
`;

const AnimationContainer = styled(motion.div)`
  flex: 1.2;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimatedShape = styled.div`
  position: absolute;
  border-radius: 50%;
`;

const MainOrb = styled(AnimatedShape)`
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #00c3ff, #ffff1c, #ff0080);
  background-size: 300% 300%;
  animation: ${rotate} 8s linear infinite, ${pulse} 3s ease-in-out infinite;
  filter: blur(1px);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00c3ff, #ffff1c, #ff0080, #00c3ff);
    border-radius: 50%;
    z-index: -1;
    animation: ${rotate} 4s linear infinite reverse;
  }
`;

const FloatingShape = styled(AnimatedShape)`
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  background: ${props => props.bg || 'rgba(0, 195, 255, 0.3)'};
  animation: ${float} ${props => props.duration || '4s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  transform: translate(-50%, -50%);
`;

const GeometricShape = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid rgba(255, 255, 28, 0.5);
  animation: ${rotate} 12s linear infinite;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  transform: translate(-50%, -50%);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(255, 0, 128, 0.7);
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const WaveBar = styled.div`
  position: absolute;
  width: 4px;
  background: linear-gradient(to top, transparent, #00c3ff, transparent);
  animation: ${wave} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  height: ${props => props.height || '100px'};
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  transform: translate(-50%, -50%);
`;

const ParticleField = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: #ffff1c;
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
  }

  &::before {
    top: 20%;
    left: 20%;
    animation-delay: -2s;
  }

  &::after {
    top: 80%;
    left: 80%;
    animation-delay: -4s;
  }
`;

// Компонент
const IntroSection = () => {
  return (
    <section id="intro">
    <StyledSection>
      <Header>
        <Title>Create Your Unique Website</Title>
        <Subtitle>Transform Ideas Into Digital Reality</Subtitle>
      </Header>
      <Container>
        <TextContent
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <p>
            Turn your imagination into reality with CoreBuilder.
            Our expert team with deep commercial experience brings your vision to life with modern, scalable, and bold design.
          </p>
        </TextContent>

        <AnimationContainer
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <ParticleField />
          <MainOrb />
          <FloatingShape size="40px" bg="rgba(255, 255, 28, 0.4)" duration="3s" delay="0s" top="20%" left="20%" />
          <FloatingShape size="60px" bg="rgba(255, 0, 128, 0.3)" duration="5s" delay="1s" top="80%" left="30%" />
          <FloatingShape size="30px" bg="rgba(0, 195, 255, 0.5)" duration="4s" delay="2s" top="30%" left="80%" />
          <FloatingShape size="50px" bg="rgba(255, 255, 28, 0.2)" duration="6s" delay="0.5s" top="70%" left="75%" />
          <GeometricShape top="25%" left="70%" />
          <GeometricShape top="75%" left="25%" />
          <WaveBar height="120px" top="40%" left="15%" delay="0s" />
          <WaveBar height="80px" top="60%" left="25%" delay="0.5s" />
          <WaveBar height="100px" top="35%" left="35%" delay="1s" />
          <WaveBar height="90px" top="65%" left="85%" delay="0.3s" />
          <WaveBar height="110px" top="45%" left="90%" delay="0.8s" />
        </AnimationContainer>
      </Container>
    </StyledSection>
    </section>
  );
};

export default IntroSection;
