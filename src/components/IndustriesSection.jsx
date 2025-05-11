import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const Container = styled.div`
  height: ${({ $count }) => `calc(100vh * ${$count})`};
  position: relative;
`;

const StickySection = styled.section`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  transition: background-color 1.2s ease-in-out;
`;

const ContentBlock = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: opacity, transform;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 800px;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 1.5rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  text-align: center;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 2.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #00c3ff, #ffff1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #e0e0e0;
  line-height: 1.7;
`;

const industries = [
  {
    name: 'Artificial Intelligence',
    description: 'We build intelligent systems that automate, optimize, and predict to give your business a competitive edge.',
    color: '#0f2027',
  },
  {
    name: 'Blockchain',
    description: 'We develop secure, decentralized blockchain solutions for finance, identity, and transparency.',
    color: '#1d4350',
  },
  {
    name: 'E-commerce',
    description: 'Custom platforms with fast performance and smooth UX that drive conversion and loyalty.',
    color: '#42275a',
  },
];

const IndustriesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ['start start', 'end end'] 
  });

  // Создаем более плавные переходы между цветами фона
  const inputRange = [];
  const outputRange = [];
  
  industries.forEach((industry, i) => {
    const position = i / (industries.length);
    
    // Добавляем промежуточные точки для более плавного перехода
    if (i > 0) {
      inputRange.push(position - 0.05);
      outputRange.push(industries[i-1].color);
    }
    
    inputRange.push(position);
    outputRange.push(industry.color);
  });
  
  // Добавляем конечную точку
  inputRange.push(1);
  outputRange.push(industries[industries.length - 1].color);
  
  const backgroundColor = useTransform(scrollYProgress, inputRange, outputRange);

  return (
    <Container ref={ref} $count={industries.length}>
      <StickySection>
        <Background style={{ backgroundColor }} />

        {industries.map((industry, index) => {
          // Расширяем диапазоны перекрытия между секциями для более плавного перехода
          const sectionLength = 1 / industries.length;
          const start = Math.max(0, (index * sectionLength) - 0.1);
          const peak = index * sectionLength + (sectionLength / 2);
          const end = Math.min(1, ((index + 1) * sectionLength) + 0.1);
          
          // Создаем более сложные кривые анимации для плавности
          const localProgress = useTransform(
            scrollYProgress, 
            [start, peak, end], 
            [0, 1, 0]
          );
          
          // Используем более плавные кривые для opacity без custom ease
          const opacity = useTransform(
            localProgress, 
            [0, 0.2, 0.8, 1], 
            [0, 1, 1, 0]
          );
          
          // Анимация смещения с более плавными переходами
          const y = useTransform(
            localProgress, 
            [0, 0.5, 1], 
            [70, 0, -70]
          );
          
          // Добавляем масштабирование для более интересного эффекта
          const scale = useTransform(
            localProgress,
            [0, 0.2, 0.8, 1],
            [0.8, 1, 1, 0.8]
          );

          return (
            <ContentBlock 
              key={index} 
              style={{ opacity, y }}
            >
              <ContentWrapper
                style={{ scale }}
                initial={false}
                transition={{ duration: 0.5 }}
              >
                <Title
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {industry.name}
                </Title>
                <Description 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {industry.description}
                </Description>
              </ContentWrapper>
            </ContentBlock>
          );
        })}
      </StickySection>
    </Container>
  );
};

export default IndustriesSection;