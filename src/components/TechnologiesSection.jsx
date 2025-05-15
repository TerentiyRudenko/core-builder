// src/components/TechnologiesSection.jsx

import React from 'react';
import styled from 'styled-components';
import { motion, scale } from 'framer-motion';
import ReactIcon from "@assets/react.svg";
import NodeIcon from "@assets/node.svg";
import JavaScriptIcon from "@assets/javascript.png";
import TypeScriptIcon from "@assets/typescript.png"; 
import WordPressIcon from "@assets/wordpress.png";
import nextjsIcon from "@assets/next-js.svg";
import framerMotionIcon from "@assets/framerMotion.svg";
import cssIcon from "@assets/css.png";

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
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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
  {
    name: "WordPress",
    image: WordPressIcon,
    description: "A content management system (CMS) that allows you to create and manage websites easily.",
  },
  {
    name: 'Next.js',
    image: nextjsIcon,
    description: 'A React framework for server-side rendering and static site generation.',
  },
  {
    name: 'Tailwind CSS',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png',
    description: 'A utility-first CSS framework for rapid UI development.',
  },
  {
    name: 'Framer Motion',
    image: framerMotionIcon,
    description: 'A production-ready motion library for React.',
  },
  {
    name: 'HTML',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
    description: 'The standard markup language for creating web pages.',
  },
  {
    name: 'CSS',
    image: cssIcon,
    description: 'A style sheet language used for describing the presentation of a document written in HTML.',
  },
  {
    name: 'SQL',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/MySQL.svg/1200px-MySQL.svg.png',
    description: 'A standard language for managing and manipulating databases.',
  }
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
            viewport={{ once: false }}
          >
            <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 0 }}
            whileInView={{ x: 0, y: 5, scale: 1.1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}>
            <Icon src={tech.image} alt={tech.name} />
            </motion.div>
            <TechName>{tech.name}</TechName>
            <Description>{tech.description}</Description>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default TechnologiesSection;
