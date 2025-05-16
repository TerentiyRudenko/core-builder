import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const words = ["News", "Events", "Analytics", "Ukraine"]

  return (
    <Section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <BackgroundParticles />

      <HeroContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ y: scrollY * 0.2 }}
      >
        <LogoWrapper>
          <Logo
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            GoalTime
          </Logo>
        </LogoWrapper>
        <Headline
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Ukrainian News Platform
        </Headline>

        <WordCarousel>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="carousel-word"
            >
              {word}
            </motion.span>
          ))}
        </WordCarousel>

        <Description
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Up-to-date news with daily updates.<br />
          Created by CoreBuider for people, optimized for all devices.
        </Description>
        <ButtonGroup>
          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Explore
          </PrimaryButton>

          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            Go to GoalTime
          </SecondaryButton>
        </ButtonGroup>

        <ScrollIndicator
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            y: { repeat: Infinity, duration: 1.5 },
            opacity: { repeat: Infinity, duration: 1.5 }
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ScrollIndicator>
      </HeroContent>
    </Section>
  )
}

const BackgroundParticles = () => {
  return (
    <ParticlesContainer>
      {[...Array(20)].map((_, i) => (
        <Particle
          key={i}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 5 + 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </ParticlesContainer>
  )
}

export default HeroSection

const Section = styled(motion.section)`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0A0E1A 0%, #1C2331 100%);
`

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`

const Particle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), rgba(79, 172, 254, 0.1));
  pointer-events: none;
`

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1000px;
  padding: 0 2rem;
`

const LogoWrapper = styled.div`
  margin-bottom: 1.5rem;
`

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    backdrop-filter: blur(4px);
    z-index: -1;
  }
`

const Headline = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const WordCarousel = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  .carousel-word {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    padding: 0.5rem 1rem;
    border-radius: 30px;

    &:nth-child(1) {
      background: rgba(79, 172, 254, 0.2);
    }

    &:nth-child(2) {
      background: rgba(0, 242, 254, 0.2);
    }

    &:nth-child(3) {
      background: rgba(79, 172, 254, 0.2);
    }

    &:nth-child(4) {
      background: rgba(0, 242, 254, 0.2);
    }
  }
`

const Description = styled(motion.p)`
  font-size: 1.4rem;
  max-width: 700px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const PrimaryButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.5);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

const SecondaryButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: transparent;
  color: white;
  border: 2px solid rgba(79, 172, 254, 0.6);
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(79, 172, 254, 0.1);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`