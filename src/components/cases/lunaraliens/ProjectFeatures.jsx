import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, SectionHeader, SectionTitle, SectionSubtitle } from '../../../Styles';

// Styled Components with Motion
const FeaturesSection = styled(motion.section)`
  padding: 8rem 0;
  background: rgba(0, 0, 0, 0.2);
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  overflow: hidden;
`;

const FeatureGlow = styled(motion.div)`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(153, 69, 255, 0.1) 0%, transparent 70%);
`;

const FeatureIcon = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const FeatureContent = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const FeatureTitle = styled(motion.h3)`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const TechTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled(motion.span)`
  padding: 0.3rem 0.8rem;
  background: rgba(153, 69, 255, 0.2);
  border: 1px solid rgba(153, 69, 255, 0.4);
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
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
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: index * 0.6,
    },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
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

const descriptionVariants = {
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

const tagsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const hoverVariants = {
  hover: {
    y: -10,
    borderColor: 'rgba(153, 69, 255, 0.5)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const glowVariants = {
  initial: { scale: 0, opacity: 0 },
  hover: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const ProjectFeatures = () => {
  const features = [
    {
      title: 'Web3 Integration',
      description: 'Seamless wallet connection with Phantom, Solflare, and other major Solana wallets',
      icon: '🔐',
      tech: ['Solana Web3.js', 'Wallet Adapter'],
    },
    {
      title: 'Token Presale Platform',
      description: 'Advanced presale mechanism with vesting schedules and anti-bot protection',
      icon: '💰',
      tech: ['Smart Contracts', 'Rust', 'Anchor'],
    },
    {
      title: 'Telegram Ecosystem',
      description: 'Native Telegram integration for gaming and community management',
      icon: '📱',
      tech: ['Telegram Bot API', 'TON Integration'],
    },
    {
      title: 'Cross-Chain Bridge',
      description: 'Multi-blockchain support enabling asset transfers between networks',
      icon: '🌉',
      tech: ['Solana', 'TON', 'Bridge Protocol'],
    },
  ];

  return (
    <FeaturesSection
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <Container>
        <SectionHeader as={motion.div} variants={headerVariants}>
          <SectionTitle variants={headerVariants}>Key Features</SectionTitle>
          <SectionSubtitle variants={headerVariants}>Innovation meets functionality</SectionSubtitle>
        </SectionHeader>
        <FeaturesGrid
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.4,
              },
            },
          }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
            >
              <FeatureIcon variants={iconVariants}>{feature.icon}</FeatureIcon>
              <FeatureContent variants={contentVariants}>
                <FeatureTitle variants={titleVariants}>{feature.title}</FeatureTitle>
                <FeatureDescription variants={descriptionVariants}>
                  {feature.description}
                </FeatureDescription>
                <TechTags variants={tagsVariants}>
                  {feature.tech.map((tech, i) => (
                    <TechTag key={i} variants={tagVariants}>
                      {tech}
                    </TechTag>
                  ))}
                </TechTags>
              </FeatureContent>
              <FeatureGlow variants={glowVariants} />
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default ProjectFeatures;
