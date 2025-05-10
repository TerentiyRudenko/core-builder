// src/components/TechnologiesSection.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactIcon from "@assets/react.svg";
import NodeIcon from "@assets/node.svg";
import JavaScriptIcon from "@assets/javascript.png";
import TypeScriptIcon from "@assets/typescript.png"; 

const Section = styled.section`
  padding: 4rem 2rem;
  background: #1a1a2e;
  color: #fff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(to right, #00c3ff, #ffff1c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  justify-items: center;
`;

const Card = styled(motion.div)`
  background: #222240;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 260px;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-8px);
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
`;

const TechName = styled.h3`
  font-size: 1.5rem;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #ccc;
`;

const technologies = [
  {
    name: 'React.js',
    image: ReactIcon,
    description: 'A declarative, component-based library for building user interfaces.',
  },
  {
    name: 'Node.js',
    image: NodeIcon,
    description: 'A JavaScript runtime built on Chrome’s V8 engine for backend development.',
  },
  {
    name: 'JavaScript',
    image: JavaScriptIcon,
    description: 'A versatile scripting language that powers the dynamic behavior on websites.',
  },
  {
    name: 'TypeScript',
    image: TypeScriptIcon,
    description: 'A strongly typed programming language that builds on JavaScript.',
  },
];

const TechnologiesSection = () => {
  return (
    <Section>
      <Title>Technologies We Use</Title>
      <Grid>
        {technologies.map((tech, index) => (
          <Card
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Icon src={tech.image} alt={tech.name} />
            <TechName>{tech.name}</TechName>
            <Description>{tech.description}</Description>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default TechnologiesSection;
