import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

const StickyTitle = styled(motion.h2)`
  position: sticky;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  z-index: 100;
  font-size: 4rem;
  font-weight: 500;
  color: #111;
  background: none;
  letter-spacing: -0.02em;
  text-align: center;
  white-space: nowrap;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,0.05));
  width: fit-content;

  @media (max-width: 1400px) {
    display: none;
  }

  @media (max-width: 1200px) {
    font-size: 3.5rem;
    left: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    left: 1.5rem;
    top: 2rem;
    transform: translateY(-50%);
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    left: 1rem;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Background = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  will-change: background, opacity;
`;

const ContentBlock = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20rem; /* Сдвигаем от центра правее */
  padding-right: 2rem;
  will-change: opacity, transform;

  @media (max-width: 1400px) {
    padding-left: 0rem;
    padding-right: 2rem;
    justify-content: center;
  }

  @media (max-width: 1200px) {
    padding-left: 0rem;
    padding-right: 2rem;
  }
  
  @media (max-width: 1024px) {
    padding-left: 0rem;
    justify-content: center;
  }

  @media (max-width: 900px) {
    padding-left: 0rem;
    padding-right: 2rem;
  }

  @media (max-width: 768px) {
    padding-left: 0rem;
    padding-right: 2rem;
    justify-content: center;
  }

  @media (max-width: 700px) {
    padding-left: 2.3rem;
    width: 85%;
  }

  @media (max-width: 600px) {
    padding-left: 3.6rem;
    width: 80%;
  }

  @media (max-width: 500px) {
    padding-left: 2.7rem;
    width: 80%;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 48rem;
  margin: 0;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 1.5rem;
  backdrop-filter: blur(24px);
  text-align: center;
  position: relative;
  overflow: hidden;
  will-change: transform, filter, box-shadow;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  will-change: transform, opacity, background-position;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: #e5e7eb;
  line-height: 1.75;
  max-width: 32rem;
  margin: 0 auto;
  will-change: transform, opacity;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ProgressIndicator = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  will-change: transform, opacity;
`;

const TransitionControl = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 50;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input[type="range"] {
    width: 12rem;
    margin: 0.5rem 0;
  }
  
  .value {
    color: #06b6d4;
    font-weight: bold;
  }
  
  .description {
    color: #9ca3af;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    line-height: 1.4;
  }
`;

const ParallaxElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
`;

const ParallaxElement1 = styled(ParallaxElement)`
  top: 10%;
  left: 10%;
  width: 6rem;
  height: 6rem;
  background: radial-gradient(circle, rgba(0,195,255,0.3) 0%, transparent 70%);
  opacity: 0.2;
`;

const ParallaxElement2 = styled(ParallaxElement)`
  top: 70%;
  right: 15%;
  width: 9rem;
  height: 9rem;
  background: radial-gradient(circle, rgba(255,255,28,0.2) 0%, transparent 70%);
  opacity: 0.15;
`;

const DecorativeElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  will-change: transform;
`;

const DecorativeElement1 = styled(DecorativeElement)`
  top: -2.5rem;
  right: -2.5rem;
  width: 5rem;
  height: 5rem;
  opacity: 0.2;
`;

const DecorativeElement2 = styled(DecorativeElement)`
  bottom: -2.5rem;
  left: -2.5rem;
  width: 4rem;
  height: 4rem;
  opacity: 0.15;
`;

const ProgressBar = styled(motion.div)`
  margin-top: 2rem;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  border-radius: 2px;
  transform-origin: left;
  will-change: transform;
`;

const industries = [
  {
    name: 'Artificial Intelligence',
    description: 'We build intelligent systems that automate, optimize, and predict to give your business a competitive edge.',
    color: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    accent: '#00c3ff',
  },
  {
    name: 'Blockchain',
    description: 'We develop secure, decentralized blockchain solutions for finance, identity, and transparency.',
    color: 'linear-gradient(135deg, #1d4350, #a43931, #8b2635)',
    accent: '#ffff1c',
  },
  {
    name: 'E-commerce',
    description: 'Custom platforms with fast performance and smooth UX that drive conversion and loyalty.',
    color: 'linear-gradient(135deg, #42275a, #734b6d, #734b6d)',
    accent: '#ff006e',
  },
  {
    name: 'Telegram Apps and Bots',
    description: 'We create custom Telegram bots and applications that enhance communication and engagement.',
    color: 'linear-gradient(135deg, #1a237e, #3949ab, #5c6bc0)',
    accent: '#64b5f6',
  }
];

const IndustriesSection = () => {
  const ref = useRef(null);
  const transitionSpeed = 0.24;
  
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ['start start', 'end end'] 
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    restDelta: 0.001
  });

  // Параллакс элементы
  const parallaxY1 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const parallaxY2 = useTransform(smoothProgress, [0, 1], [0, 150]);
  const parallaxRotate = useTransform(smoothProgress, [0, 1], [0, 180]);

  // Анимация интенсивности свечения заголовка на основе прогресса
  const titleGlowIntensity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.2, 1, 1.2, 1]
  );

  return (
    <section id="industries">
      <Container ref={ref} $count={industries.length}>
        <StickySection>
          {/* Фиксированный заголовок внутри секции */}
          <StickyTitle
            style={{
              filter: useTransform(
                titleGlowIntensity,
                [1, 1.2],
                [
                  'drop-shadow(0 4px 20px rgba(0,0,0,0.5))',
                  'drop-shadow(0 6px 30px rgba(0,195,255,0.4)) drop-shadow(0 0 40px rgba(255,255,28,0.3))'
                ]
              ),
            }}
          >
            Industries We Serve
          </StickyTitle>
          {/* Многослойные фоны */}
          {industries.map((industry, index) => {
            const sectionStart = index / industries.length;
            const sectionEnd = (index + 1) / industries.length;
            
            const bgFadeStart = Math.max(0, sectionStart - transitionSpeed * 0.5);
            const bgFadeEnd = Math.min(1, sectionEnd + transitionSpeed * 0.5);
            
            const bgOpacity = useTransform(
              smoothProgress,
              [bgFadeStart, sectionStart + 0.05, sectionEnd - 0.05, bgFadeEnd],
              [0, 1, 1, 0]
            );
            
            return (
              <Background
                key={`bg-${index}`}
                style={{
                  background: industry.color,
                  opacity: bgOpacity,
                }}
              />
            );
          })}

          {/* Параллакс элементы */}
          <ParallaxElement1
            style={{
              y: parallaxY1,
              rotate: parallaxRotate,
            }}
          />
          <ParallaxElement2
            style={{
              y: parallaxY2,
            }}
          />

          {/* Карточки контента */}
          {industries.map((industry, index) => {
            const sectionLength = 1 / industries.length;
            const sectionStart = index * sectionLength;
            const sectionEnd = (index + 1) * sectionLength;

            const cardFadeStart = sectionStart;
            const cardActiveStart = sectionStart + transitionSpeed;
            const cardActiveEnd = sectionEnd - transitionSpeed;
            const cardFadeEnd = sectionEnd;

            const sectionProgress = useTransform(
              smoothProgress,
              [cardFadeStart, cardActiveStart, cardActiveEnd, cardFadeEnd],
              [0, 1, 1, 0]
            );

            const opacity = useTransform(
              sectionProgress,
              [0, 0.3, 0.7, 1],
              [0, 1, 1, 0]
            );

            const cardY = useTransform(
              sectionProgress,
              [0, 0.2, 0.8, 1],
              [60, 0, 0, -60]
            );

            const scale = useTransform(
              sectionProgress,
              [0, 0.2, 0.8, 1],
              [0.95, 1, 1, 0.95]
            );

            const blur = useTransform(
              sectionProgress,
              [0, 0.15, 0.85, 1],
              [4, 0, 0, 4]
            );

            const titleY = useTransform(
              sectionProgress,
              [0, 0.3, 0.7, 1],
              [30, 0, 0, -30]
            );

            const titleOpacity = useTransform(
              sectionProgress,
              [0, 0.35, 0.65, 1],
              [0, 1, 1, 0]
            );

            const descY = useTransform(
              sectionProgress,
              [0, 0.4, 0.6, 1],
              [40, 0, 0, -40]
            );

            const descOpacity = useTransform(
              sectionProgress,
              [0, 0.45, 0.55, 1],
              [0, 1, 1, 0]
            );

            const glowIntensity = useTransform(
              sectionProgress,
              [0, 0.5, 1],
              [0, 1, 0]
            );

            const titleGradient = `linear-gradient(135deg, ${industry.accent}, #ffffff, ${industry.accent})`;

            return (
              <ContentBlock
                key={index}
                style={{
                  opacity,
                  y: cardY,
                  zIndex: Math.floor((sectionProgress.get && sectionProgress.get()) * 10) + 1,
                }}
              >
                <ContentWrapper
                  style={{
                    scale,
                    filter: useTransform(blur, (value) => `blur(${value}px)`),
                    boxShadow: useTransform(
                      glowIntensity,
                      [0, 1],
                      [
                        '0 12px 32px rgba(0, 0, 0, 0.3)',
                        `0 0 60px ${industry.accent}40, 0 0 120px ${industry.accent}20, 0 12px 32px rgba(0, 0, 0, 0.3)`
                      ]
                    ),
                  }}
                >
                  <DecorativeElement1
                    style={{
                      background: `radial-gradient(circle, ${industry.accent} 0%, transparent 70%)`,
                      scale: useTransform(glowIntensity, [0, 1], [0.5, 1.2]),
                    }}
                  />
                  <DecorativeElement2
                    style={{
                      background: `radial-gradient(circle, ${industry.accent} 0%, transparent 70%)`,
                      scale: useTransform(glowIntensity, [0, 1], [0.8, 1.5]),
                    }}
                  />
                  
                  <Title
                    style={{
                      y: titleY,
                      opacity: titleOpacity,
                      backgroundImage: titleGradient,
                      backgroundPosition: useTransform(
                        smoothProgress,
                        [0, 1],
                        ['0% 50%', '100% 50%']
                      ),
                    }}
                  >
                    {industry.name}
                  </Title>
                  
                  <Description
                    style={{
                      y: descY,
                      opacity: descOpacity,
                    }}
                  >
                    {industry.description}
                  </Description>

                  <ProgressBar
                    style={{ opacity: titleOpacity }}
                  >
                    <ProgressBarFill
                      style={{
                        backgroundColor: industry.accent,
                        scaleX: useTransform(
                          sectionProgress,
                          [0, 1],
                          [0, 1]
                        ),
                      }}
                    />
                  </ProgressBar>
                </ContentWrapper>
              </ContentBlock>
            );
          })}
        </StickySection>
      </Container>
    </section>
  );
};

export default IndustriesSection;




