import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, SectionHeader, SectionTitle, SectionSubtitle } from '../../../../src/Styles';

// Styled Components with Motion
const TechSection = styled(motion.section)`
  padding: 8rem 0;
`;

const TechGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TechCard = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(20px);
`;

const TechName = styled(motion.h3)`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: white;
`;

const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}aa);
  border-radius: 4px;
`;

const TechLevel = styled(motion.div)`
  text-align: right;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
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

const headerVariants = {
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

const nameVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: 'easeOut',
    },
  },
};

const progressBarVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};

const progressFillVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: {
      duration: 1,
      delay: 0.3,
      ease: 'easeOut',
    },
  }),
};

const levelVariants = {
  hidden: { opacity: 0, y: 10 },
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
    y: -5,
    borderColor: 'rgba(153, 69, 255, 0.5)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const TechStack = () => {
  const technologies = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'TypeScript', level: 90, color: '#3178C6' },
    { name: 'JavaScript', level: 85, color: '#FFD700' },
    { name: 'Solana', level: 85, color: '#9945FF' },
    { name: 'Node.js', level: 82, color: '#339933' },
    { name: 'Telegram API', level: 75, color: '#0088cc' },
  ];

  return (
    <TechSection
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <Container>
        <SectionHeader as={motion.div} variants={headerVariants}>
          <SectionTitle variants={headerVariants}>Technology Stack</SectionTitle>
          <SectionSubtitle variants={headerVariants}>
            Cutting-edge technologies powering the future
          </SectionSubtitle>
        </SectionHeader>
        <TechGrid variants={sectionVariants}>
          {technologies.map((tech, index) => (
            <TechCard
              key={index}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <TechName variants={nameVariants}>{tech.name}</TechName>
              <ProgressBar variants={progressBarVariants}>
                <ProgressFill
                  variants={progressFillVariants}
                  custom={tech.level}
                  color={tech.color}
                />
              </ProgressBar>
              <TechLevel variants={levelVariants}>{tech.level}%</TechLevel>
            </TechCard>
          ))}
        </TechGrid>
      </Container>
    </TechSection>
  );
};