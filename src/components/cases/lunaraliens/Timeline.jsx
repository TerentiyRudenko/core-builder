import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, SectionHeader, SectionTitle, SectionSubtitle } from '../../../Styles';

// Styled Components with Motion
const TimelineSection = styled(motion.section)`
  padding: 8rem 0;
`;

const TimelineContainer = styled(motion.div)`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #9945FF, #ff6a00);
    transform: translateX(-50%);
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;

  &:nth-child(odd) {
    flex-direction: row;
    text-align: right;

    > div:last-child {
      margin-right: 4rem;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
    text-align: left;

    > div:last-child {
      margin-left: 4rem;
    }
  }
`;

const TimelineMarker = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => {
    switch (props.status) {
      case 'completed':
        return '#00ff88';
      case 'active':
        return '#ff6a00';
      case 'upcoming':
        return '#666';
      default:
        return '#666';
    }
  }};
  border: 4px solid #0a0a0a;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 20px ${(props) => {
    switch (props.status) {
      case 'completed':
        return 'rgba(0, 255, 136, 0.5)';
      case 'active':
        return 'rgba(255, 106, 0, 0.5)';
      default:
        return 'transparent';
    }
  }};
`;

const TimelineContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  max-width: 300px;
`;

const TimelinePhase = styled(motion.div)`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TimelineTitle = styled(motion.h4)`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: white;
`;

const TimelineDate = styled(motion.div)`
  font-size: 1rem;
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
      staggerChildren: 0.6, // Increased for sequential effect
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.6, // Stagger items sequentially
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? -50 : 50) }, // Odd: slide from left, Even: slide from right
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: index * 0.6, // Dynamic delay for sequential appearance
    },
  }),
};

const markerVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: 'easeOut',
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const phaseVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const dateVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Timeline = () => {
  const milestones = [
    { phase: 'Planning', title: 'Project Inception', status: 'completed', date: 'Q1 2024' },
    { phase: 'Development', title: 'Core Development', status: 'completed', date: 'Q2 2024' },
    { phase: 'Testing', title: 'Beta Testing', status: 'completed', date: 'Q3 2024' },
    { phase: 'Launch', title: 'Official Launch', status: 'active', date: 'Q4 2024' },
    { phase: 'Expansion', title: 'Multi-chain Support', status: 'upcoming', date: 'Q1 2025' },
  ];

  return (
    <TimelineSection
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <Container>
        <SectionHeader as={motion.div} variants={headerVariants}>
          <SectionTitle variants={headerVariants}>Development Timeline</SectionTitle>
          <SectionSubtitle variants={headerVariants}>Journey from concept to reality</SectionSubtitle>
        </SectionHeader>
        <TimelineContainer variants={containerVariants}>
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={index}
              status={milestone.status}
              variants={itemVariants}
              custom={index} // Pass index for dynamic delay
            >
              <TimelineMarker status={milestone.status} variants={markerVariants} />
              <TimelineContent variants={contentVariants}>
                <TimelinePhase variants={phaseVariants}>{milestone.phase}</TimelinePhase>
                <TimelineTitle variants={titleVariants}>{milestone.title}</TimelineTitle>
                <TimelineDate variants={dateVariants}>{milestone.date}</TimelineDate>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </TimelineSection>
  );
};

export default Timeline;