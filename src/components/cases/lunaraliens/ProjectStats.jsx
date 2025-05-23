import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../../../src/Styles';

// Styled Components with Motion
const StatsSection = styled(motion.section)`
  padding: 6rem 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px);
`;

const StatIcon = styled(motion.div)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StatNumber = styled(motion.div)`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #9945FF, #ff6a00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled(motion.div)`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
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

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};

const numberVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: 'easeOut',
    },
  },
};

const labelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: 'easeOut',
    },
  },
};

const hoverVariants = {
  hover: {
    y: -10,
    boxShadow: '0 20px 40px rgba(153, 69, 255, 0.2)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const ProjectStats = () => {
  const stats = [
    { number: '50K+', label: 'Active Users', icon: '👥' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' },
    { number: '5', label: 'Blockchains', icon: '🔗' },
    { number: '24/7', label: 'Support', icon: '🛡️' },
  ];

  return (
    <StatsSection
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, duration: 0.5 }}
    >
      <Container>
        <StatsGrid variants={sectionVariants}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <StatIcon variants={iconVariants}>{stat.icon}</StatIcon>
              <StatNumber variants={numberVariants}>{stat.number}</StatNumber>
              <StatLabel variants={labelVariants}>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};