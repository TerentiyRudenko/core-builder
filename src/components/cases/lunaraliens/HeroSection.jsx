import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../../../src/Styles'; // Assuming this is a styled container

// Styled Components (CSS remains the same, animations removed)
const Hero = styled(motion.section)`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const BackgroundImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
`;

const HeroOverlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 10, 46, 0.9) 100%);
  z-index: -1;
`;

const HeroGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  /* Animation removed, handled by Framer Motion */
`;

const ProjectBadge = styled(motion.div)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(153, 69, 255, 0.2);
  border: 1px solid rgba(153, 69, 255, 0.5);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.1;

  .gradient {
    display: block;
    background: linear-gradient(135deg, #9945FF, #ff6a00, #00d2ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
  }

  .subtitle {
    display: block;
    font-size: 1.5rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  max-width: 600px;
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #9945FF, #ff6a00);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(153, 69, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(153, 69, 255, 0.5);
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: #9945FF;
    background: rgba(153, 69, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlowingOrb = styled(motion.div)`
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(153, 69, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #9945FF, #ff6a00);
    border-radius: 50%;
    opacity: 0.7;
  }
`;

const FloatingElements = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  font-weight: 600;

  &:nth-child(1) { top: 20%; left: 10%; }
  &:nth-child(2) { top: 60%; right: 20%; }
  &:nth-child(3) { bottom: 20%; left: 30%; }
`;

// Framer Motion Animation Variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: 'easeOut',
    },
  },
};

const orbVariants = {
  hidden: { scale: 0.8, opacity: 0.5 },
  visible: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.7, 0.5],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: 'easeInOut',
    },
  },
};

const floatingCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: [-10, 10, -10], // Floating effect
    transition: {
      y: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
        delay: i * 0.5, // Stagger each card
      },
      opacity: {
        duration: 0.5,
        delay: i * 0.5,
      },
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const HeroSection = () => {
  return (
    <Hero
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      <BackgroundImage
        src="/cases/ecom-bg.jpg"
        alt="Lunar Aliens Background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <HeroOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <HeroGrid>
        <HeroContent variants={contentVariants}>
          <ProjectBadge variants={contentVariants}>
            Web3 Gaming Project
          </ProjectBadge>
          <HeroTitle variants={contentVariants}>
            <span className="gradient">Lunar Aliens</span>
            <span className="subtitle">Crypto Gaming Ecosystem</span>
          </HeroTitle>
          <HeroDescription variants={contentVariants}>
            Revolutionary crypto game built on Solana blockchain with integrated 
            token presale platform. Features advanced Web3 integration, Telegram 
            ecosystem, and cross-chain compatibility with TON network.
          </HeroDescription>
          <HeroActions variants={contentVariants}>
            <PrimaryButton variants={buttonVariants}>
              View Live Project
            </PrimaryButton>
            <SecondaryButton variants={buttonVariants}>
              Technical Details
            </SecondaryButton>
          </HeroActions>
        </HeroContent>
        <HeroVisual variants={visualVariants}>
          <GlowingOrb variants={orbVariants} />
          <FloatingElements>
            {['React + TS', 'Solana', 'Web3'].map((text, index) => (
              <FloatingCard
                key={text}
                custom={index}
                variants={floatingCardVariants}
                initial="hidden"
                animate="visible"
              >
                {text}
              </FloatingCard>
            ))}
          </FloatingElements>
        </HeroVisual>
      </HeroGrid>
    </Hero>
  );
};