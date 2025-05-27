import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Анимации для фона
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scanline = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
`;

const glitch = keyframes`
  0%, 100% { transform: translate(0); }
  10% { transform: translate(-2px, 2px); }
  20% { transform: translate(2px, -2px); }
  30% { transform: translate(-2px, -2px); }
  40% { transform: translate(2px, 2px); }
  50% { transform: translate(-2px, 2px); }
  60% { transform: translate(2px, -2px); }
  70% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 2px); }
  90% { transform: translate(-2px, 2px); }
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(0, 255, 127, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;
  perspective: 1000px;
  padding: 1rem;

  @media (max-width: 768px) {
    min-height: 100svh;
    padding: 0.5rem;
    perspective: 500px;
  }

  @media (max-width: 480px) {
    min-height: 100svh;
    padding: 0.25rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 98px,
        rgba(0, 255, 255, 0.02) 100px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(255, 0, 255, 0.02) 100px
      );
    animation: ${pulse} 4s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 255, 255, 0.8),
      transparent
    );
    animation: ${scanline} 3s linear infinite;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 2px solid ${props => props.color};
  border-radius: ${props => props.rounded ? '50%' : '0'};
  background: ${props => `linear-gradient(45deg, ${props.color}20, transparent)`};
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  backdrop-filter: blur(1px);
  box-shadow: 0 0 20px ${props => props.color}40;

  @media (max-width: 768px) {
    width: ${props => Math.max(props.size * 0.7, 30)}px;
    height: ${props => Math.max(props.size * 0.7, 30)}px;
    box-shadow: 0 0 15px ${props => props.color}30;
  }

  @media (max-width: 480px) {
    width: ${props => Math.max(props.size * 0.5, 20)}px;
    height: ${props => Math.max(props.size * 0.5, 20)}px;
    box-shadow: 0 0 10px ${props => props.color}20;
    animation-duration: ${props => props.duration * 1.5}s;
  }
`;

const RotatingRing = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid #00ffff;
  animation: ${rotate} 20s linear infinite;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  transform: translateZ(50px);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    transform: translateZ(30px);
    animation-duration: 25s;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    transform: translateZ(20px);
    animation-duration: 30s;
    opacity: 0.6;
  }
`;

const HexGrid = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 1;

  @media (max-width: 768px) {
    opacity: 0.06;
  }

  @media (max-width: 480px) {
    opacity: 0.04;
    display: none; /* Скрываем на очень маленьких экранах для производительности */
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
    transform-style: flat; /* Упрощаем 3D на планшетах */
  }

  @media (max-width: 480px) {
    max-width: 95%;
    transform-style: flat;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(
    45deg,
    #00ffff,
    #ff00ff,
    #00ff7f,
    #00ffff
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${pulse} 3s ease-in-out infinite;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.5),
    0 0 20px rgba(0, 255, 255, 0.3),
    0 0 30px rgba(0, 255, 255, 0.2);
  filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
  transform: translateZ(50px);
  line-height: 1.1;
  
  &:hover {
    animation: ${glitch} 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 7vw, 4rem);
    transform: translateZ(30px);
    text-shadow: 
      0 0 8px rgba(0, 255, 255, 0.4),
      0 0 15px rgba(0, 255, 255, 0.2);
    filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.4));
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
    transform: none;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
    filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3));
    margin-bottom: 0.5rem;
    line-height: 1.2;
    
    &:hover {
      animation: none; /* Отключаем глитч на мобильных */
    }
  }

  @media (max-width: 320px) {
    font-size: clamp(1.2rem, 9vw, 2rem);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.8rem);
  max-width: 800px;
  margin-bottom: 3rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  transform: translateZ(30px) translateX(220px);
  font-weight: 300;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    transform: translateZ(30px);
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 3rem;
  font-size: 1.1rem;
  border: 2px solid transparent;
  border-radius: 50px;
  background: 
    linear-gradient(#0a0a0a, #0a0a0a) padding-box,
    linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f) border-box;
  color: #00ffff;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  transform: translateZ(40px);
  backdrop-filter: blur(10px);
  min-width: 200px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    box-shadow: 
      0 0 20px rgba(0, 255, 255, 0.6),
      inset 0 0 20px rgba(0, 255, 255, 0.1);
    transform: translateZ(50px) translateY(-2px);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateZ(45px) translateY(1px);
  }

  @media (max-width: 768px) {
    padding: 0.9rem 2.5rem;
    font-size: 1rem;
    letter-spacing: 1.5px;
    transform: translateZ(25px);
    margin-bottom: 2.5rem;
    min-width: 180px;

    &:hover {
      transform: translateZ(30px) translateY(-1px);
    }

    &:active {
      transform: translateZ(25px) translateY(0px);
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
    letter-spacing: 1px;
    transform: none;
    margin-bottom: 2rem;
    min-width: 160px;
    backdrop-filter: blur(5px);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 
        0 0 15px rgba(0, 255, 255, 0.5),
        inset 0 0 15px rgba(0, 255, 255, 0.1);
    }

    &:active {
      transform: translateY(0px);
    }
  }

  @media (max-width: 320px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.8rem;
    min-width: 140px;
  }

  /* Улучшенная поддержка touch-устройств */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: translateZ(40px);
      box-shadow: 
        0 0 15px rgba(0, 255, 255, 0.4),
        inset 0 0 15px rgba(0, 255, 255, 0.1);
    }
  }
`;

const ArrowDown = styled(motion.div)`
  position: absolute;
  bottom: -10px;
  left: 48.3%;
  font-size: 2.5rem;
  cursor: pointer;
  color: #00ffff;
  z-index: 10;
  filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
  
  &:hover {
    animation: ${glitch} 0.2s ease-in-out;
  }
`;

const ParticleSystem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${props => props.color};
  border-radius: 50%;
  box-shadow: 0 0 10px ${props => props.color};
`;

const Hero = () => {
  const fullText = 'Build. Innovate. Dominate.';
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [particles, setParticles] = useState([]);

  // Создание частиц с адаптацией под размер экрана
  useEffect(() => {
    const getParticleCount = () => {
      if (window.innerWidth < 480) return 20; // Меньше частиц на мобильных
      if (window.innerWidth < 768) return 35; // Средне для планшетов
      return 50; // Полное количество для десктопа
    };

    const newParticles = [];
    const particleCount = getParticleCount();
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: ['#00ffff', '#ff00ff', '#00ff7f'][Math.floor(Math.random() * 3)],
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      });
    }
    setParticles(newParticles);

    // Обновляем частицы при изменении размера окна
    const handleResize = () => {
      const newCount = getParticleCount();
      if (newCount !== particles.length) {
        const updatedParticles = [];
        for (let i = 0; i < newCount; i++) {
          updatedParticles.push({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            color: ['#00ffff', '#ff00ff', '#00ff7f'][Math.floor(Math.random() * 3)],
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4
          });
        }
        setParticles(updatedParticles);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleClick = () => {
    scrollToSection('intro');
  };

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Создание шестиугольной сетки с адаптацией
  const createHexPattern = () => {
    const hexagons = [];
    
    // Адаптивные параметры сетки
    const getGridParams = () => {
      if (window.innerWidth < 480) {
        return { rows: 4, cols: 6, hexSize: 20 };
      }
      if (window.innerWidth < 768) {
        return { rows: 6, cols: 8, hexSize: 25 };
      }
      return { rows: 8, cols: 12, hexSize: 30 };
    };

    const { rows, cols, hexSize } = getGridParams();
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
        const y = row * hexSize * 0.87;
        
        hexagons.push(
          <motion.polygon
            key={`${row}-${col}`}
            points={`${hexSize},0 ${hexSize*0.75},${hexSize*0.42} ${hexSize*0.25},${hexSize*0.42} 0,0 ${hexSize*0.25},${-hexSize*0.42} ${hexSize*0.75},${-hexSize*0.42}`}
            fill="none"
            stroke="rgba(0, 255, 255, 0.3)"
            strokeWidth="0.5"
            transform={`translate(${x}, ${y})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4,
              delay: (row + col) * 0.1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        );
      }
    }
    
    return hexagons;
  };

  return (
    <section id='hero'>
      <HeroSection>
        <BackgroundElements>
          <HexGrid>
            {createHexPattern()}
          </HexGrid>
          
          <ParticleSystem>
            {particles.map(particle => (
              <Particle
                key={particle.id}
                color={particle.color}
                initial={{ 
                  x: particle.x, 
                  y: particle.y, 
                  opacity: 0,
                  scale: 0 
                }}
                animate={{ 
                  y: particle.y - 200,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </ParticleSystem>

          <FloatingShape 
            size={60} 
            color="#00ffff" 
            duration={6} 
            delay={0}
            style={{top: '20%', left: '10%'}}
          />
          <FloatingShape 
            size={40} 
            color="#ff00ff" 
            duration={8} 
            delay={1}
            rounded
            style={{top: '70%', right: '15%'}}
          />
          <FloatingShape 
            size={80} 
            color="#00ff7f" 
            duration={10} 
            delay={2}
            style={{top: '40%', right: '20%'}}
          />
          
          <RotatingRing top={15} left={75} />
          <RotatingRing top={65} left={5} />
        </BackgroundElements>

        <ContentWrapper>
          <Title
            initial={{ opacity: 0, y: 50, rotateY: -180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {typedText}
          </Title>
          
          {index === fullText.length && (
            <>
              <Subtitle
                initial={{ opacity: 0, /*y: 30, z: -100*/ }}
                animate={{ opacity: 1, /*y: 0, z: 0*/ }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                CoreBuilder transforms your digital presence with cutting-edge, bespoke websites that transcend reality and enter the digital metaverse.
              </Subtitle>
              
              <Button
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  rotateY: -5,
                  transition: { duration: 0.1 }
                }}
                onClick={handleClick}
              >
                Initialize System
              </Button>
              
              <ArrowDown
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={handleClick}
              >
                ⟱
              </ArrowDown>
            </>
          )}
        </ContentWrapper>
      </HeroSection>
    </section>
  );
};

export default Hero;