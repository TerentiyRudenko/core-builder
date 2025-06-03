import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";

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

// Правильные медиа-запросы
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px'
};

const mobile = (styles) => css`
  @media (max-width: ${breakpoints.mobile}) {
    ${styles}
  }
`;

const tablet = (styles) => css`
  @media (max-width: ${breakpoints.tablet}) {
    ${styles}
  }
`;

const desktop = (styles) => css`
  @media (max-width: ${breakpoints.desktop}) {
    ${styles}
  }
`;

// Стили
const StyledSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #0f0f1c;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 80px;

  ${desktop`
    min-height: auto;
    padding-top: 60px;
  `}

  ${tablet`
    padding-top: 40px;
    padding-bottom: 2rem;
  `}

  ${mobile`
    padding-top: 20px;
    padding-bottom: 1rem;
  `}
`;

const Header = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  ${tablet`
    padding: 1.5rem 1.5rem 0.5rem;
  `}

  ${mobile`
    padding: 1rem 1rem 0.5rem;
  `}
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #00c3ff, #ffff1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  line-height: 1.1;

  ${desktop`
    font-size: 3rem;
  `}

  ${tablet`
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  `}

  ${mobile`
    font-size: 2rem;
    margin-bottom: 0.3rem;
    line-height: 1.2;
  `}
`;

const Subtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.3;

  ${desktop`
    font-size: 1.8rem;
  `}

  ${tablet`
    font-size: 1.5rem;
  `}

  ${mobile`
    font-size: 1.2rem;
  `}
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 4rem;
  width: 100%;
  box-sizing: border-box;

  ${desktop`
    gap: 3rem;
    padding: 1.5rem;
  `}

  ${tablet`
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    text-align: center;
  `}

  ${mobile`
    gap: 1.5rem;
    padding: 0.75rem;
    margin: 0;
    width: 100%;
    min-width: 0;
  `}
`;

const TextContent = styled(motion.div)`
  flex: 1;
  z-index: 2;
  color: #cccccc;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${tablet`
    align-items: center;
    text-align: center;
  `}

  p {
    font-size: 1.6rem;
    line-height: 1.7;
    max-width: 600px;
    margin: 0;
    word-wrap: break-word;
    hyphens: auto;

    ${desktop`
      font-size: 1.4rem;
      max-width: 500px;
    `}

    ${tablet`
      font-size: 1.25rem;
      max-width: 100%;
      line-height: 1.6;
      padding: 0 1rem;
    `}

    ${mobile`
      font-size: 1.1rem;
      line-height: 1.5;
      padding: 0;
      max-width: 100%;
      word-break: break-word;
      overflow-wrap: break-word;
    `}
  }
`;

const AnimationContainer = styled(motion.div)`
  flex: 1;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;

  ${desktop`
    height: 400px;
    min-width: 350px;
  `}

  ${tablet`
    width: 100%;
    max-width: 400px;
    height: 350px;
    flex: none;
    min-width: auto;
    margin: 0 auto;
  `}

  ${mobile`
    max-width: 280px;
    height: 280px;
  `}
`;

const AnimatedShape = styled.div`
  position: absolute;
  border-radius: 50%;
`;

const MainOrb = styled(AnimatedShape)`
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #00c3ff, #ffff1c, #ff0080);
  background-size: 300% 300%;
  animation: ${rotate} 8s linear infinite, ${pulse} 3s ease-in-out infinite;
  filter: blur(1px);

  &::before {
    content: "";
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

  ${desktop`
    width: 200px;
    height: 200px;
  `}

  ${tablet`
    width: 180px;
    height: 180px;
  `}

  ${mobile`
    width: 130px;
    height: 130px;
    animation: ${rotate} 10s linear infinite, ${pulse} 4s ease-in-out infinite;
  `}
`;

const FloatingShape = styled(AnimatedShape)`
  width: ${(props) => props.size || "60px"};
  height: ${(props) => props.size || "60px"};
  background: ${(props) => props.bg || "rgba(0, 195, 255, 0.3)"};
  animation: ${float} ${(props) => props.duration || "4s"} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  top: ${(props) => props.top || "50%"};
  left: ${(props) => props.left || "50%"};
  transform: translate(-50%, -50%);

  ${tablet`
    width: ${props => props.mobileSize || props.size || "40px"};
    height: ${props => props.mobileSize || props.size || "40px"};
  `}

  ${mobile`
    width: ${props => props.mobileSize || "30px"};
    height: ${props => props.mobileSize || "30px"};
  `}
`;

const GeometricShape = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid rgba(255, 255, 28, 0.5);
  animation: ${rotate} 12s linear infinite;
  top: ${(props) => props.top || "50%"};
  left: ${(props) => props.left || "50%"};
  transform: translate(-50%, -50%);

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(255, 0, 128, 0.7);
    transform: translate(-50%, -50%) rotate(45deg);
  }

  ${tablet`
    width: 60px;
    height: 60px;
    
    &::before {
      width: 30px;
      height: 30px;
    }
  `}

  ${mobile`
    width: 40px;
    height: 40px;
    border-width: 1px;
    
    &::before {
      width: 20px;
      height: 20px;
      border-width: 1px;
    }
  `}
`;

const WaveBar = styled.div`
  position: absolute;
  width: 4px;
  background: linear-gradient(to top, transparent, #00c3ff, transparent);
  animation: ${wave} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  height: ${(props) => props.height || "100px"};
  top: ${(props) => props.top || "50%"};
  left: ${(props) => props.left || "50%"};
  transform: translate(-50%, -50%);

  ${tablet`
    height: ${props => `calc(${props.height || '100px'} * 0.7)`};
    width: 3px;
  `}

  ${mobile`
    height: ${props => `calc(${props.height || '100px'} * 0.5)`};
    width: 2px;
  `}
`;

const ParticleField = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 3px;
    height: 3px;
    background: #ffff1c;
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;

    ${tablet`
      width: 2px;
      height: 2px;
    `}

    ${mobile`
      width: 2px;
      height: 2px;
      animation: ${float} 8s ease-in-out infinite;
    `}
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
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth <= 480,
    isTablet: window.innerWidth <= 768,
    isDesktop: window.innerWidth <= 1024
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width <= 480,
        isTablet: width <= 768,
        isDesktop: width <= 1024
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="intro">
      <StyledSection>
        <Header>
          <Title>Create Your Unique Website</Title>
        </Header>
        <Container>
          <TextContent
            initial={{ opacity: 0, x: screenSize.isTablet ? 0 : -60, y: screenSize.isTablet ? -30 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p>
              Turn your imagination into reality with CoreBuilder. Our expert
              team with deep commercial experience brings your vision to life
              with modern, scalable, and bold design.
            </p>
          </TextContent>

          <AnimationContainer
            initial={{ opacity: 0, x: screenSize.isTablet ? 0 : 60, y: screenSize.isTablet ? 30 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ParticleField />
            <MainOrb />
            
            {/* Анимации теперь на всех устройствах */}
            <FloatingShape
              size="40px"
              mobileSize="25px"
              bg="rgba(255, 255, 28, 0.4)"
              duration="3s"
              delay="0s"
              top="20%"
              left="20%"
            />
            <FloatingShape
              size="60px"
              mobileSize="35px"
              bg="rgba(255, 0, 128, 0.3)"
              duration="5s"
              delay="1s"
              top="80%"
              left="30%"
            />
            <FloatingShape
              size="30px"
              mobileSize="20px"
              bg="rgba(0, 195, 255, 0.5)"
              duration="4s"
              delay="2s"
              top="30%"
              left="80%"
            />
            <FloatingShape
              size="50px"
              mobileSize="30px"
              bg="rgba(255, 255, 28, 0.2)"
              duration="6s"
              delay="0.5s"
              top="70%"
              left="75%"
            />
            
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