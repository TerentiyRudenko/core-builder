import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaChartLine, FaCogs } from 'react-icons/fa';

// Анимации
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(5px) rotate(240deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const Section = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a0b2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  padding: 8rem 2rem;
`;

// Анимированные частицы на фоне
const BackgroundParticles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00c3ff;
  border-radius: 50%;
  opacity: 0.6;
  animation: ${float} ${props => 3 + Math.random() * 4}s ease-in-out infinite;
  animation-delay: ${props => Math.random() * 2}s;
`;

// Светящиеся орбы
const GlowOrb = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  animation: ${pulse} 4s ease-in-out infinite;
  
  &.orb-1 {
    top: 5%;
    left: 10%;
    background: linear-gradient(135deg, #00c3ff, #0099cc);
  }
  
  &.orb-2 {
    bottom: 10%;
    right: 10%;
    background: linear-gradient(135deg, #ff006e, #8338ec);
    animation-delay: 2s;
  }
  
  &.orb-3 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #3a86ff, #06ffa5);
    animation-delay: 1s;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(3rem, 8vw, 7rem);
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #00c3ff 0%, #8338ec 50%, #ff006e 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  display: block;
`;

const TitleUnderline = styled(motion.div)`
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, #00c3ff, #8338ec, #ff006e);
  margin: 1rem auto 3rem;
  border-radius: 2px;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${props => props.gradientStart} 0%, 
      ${props => props.gradientEnd} 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, 
      ${props => props.gradientStart}, 
      ${props => props.gradientEnd});
    border-radius: 26px;
    z-index: -2;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3),
                0 0 40px rgba(${props => props.glowColor}, 0.3);
    
    &::before {
      opacity: 0.1;
    }
    
    &::after {
      opacity: 1;
    }
  }
`;

const IconWrapper = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: linear-gradient(135deg, 
    ${props => props.gradientStart}, 
    ${props => props.gradientEnd});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: white;
  font-size: 2.5rem;
  box-shadow: 0 15px 35px rgba(${props => props.glowColor}, 0.4);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, 
      ${props => props.gradientStart}, 
      ${props => props.gradientEnd});
    border-radius: 22px;
    z-index: -1;
    filter: blur(10px);
    opacity: 0.7;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-weight: 700;
  line-height: 1.3;
`;

const CardText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const CardAccent = styled(motion.div)`
  height: 3px;
  background: linear-gradient(90deg, 
    ${props => props.gradientStart}, 
    ${props => props.gradientEnd});
  border-radius: 2px;
  transform-origin: left;
`;

const CornerAccent = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  opacity: 0.8;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -15px;
    width: 4px;
    height: 4px;
    background: ${props => props.secondaryColor};
    border-radius: 50%;
    opacity: 0.6;
  }
`;

const CTAButton = styled(motion.button)`
  margin-top: 4rem;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #00c3ff, #8338ec);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #8338ec, #ff006e);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(131, 56, 236, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  span {
    position: relative;
    z-index: 1;
  }
`;

const AIIntegration = () => {
  const features = [
    {
      icon: <FaRobot />,
      title: "AI-Powered Automation",
      text: "Implement intelligent automation to streamline repetitive tasks and processes, saving time and reducing human error.",
      gradientStart: "rgba(0, 195, 255, 0.8)",
      gradientEnd: "rgba(0, 123, 255, 0.8)",
      glowColor: "0, 195, 255",
      accentColor: "#00c3ff",
      secondaryColor: "#0099cc"
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning Models",
      text: "Custom ML models trained on your data to provide predictive analytics and intelligent decision-making capabilities.",
      gradientStart: "rgba(131, 56, 236, 0.8)",
      gradientEnd: "rgba(255, 0, 110, 0.8)",
      glowColor: "131, 56, 236",
      accentColor: "#8338ec",
      secondaryColor: "#ff006e"
    },
    {
      icon: <FaChartLine />,
      title: "Data Analysis & Insights",
      text: "Advanced AI algorithms that analyze complex datasets to uncover hidden patterns and actionable business insights.",
      gradientStart: "rgba(6, 255, 165, 0.8)",
      gradientEnd: "rgba(58, 134, 255, 0.8)",
      glowColor: "6, 255, 165",
      accentColor: "#06ffa5",
      secondaryColor: "#3a86ff"
    },
    {
      icon: <FaCogs />,
      title: "Smart System Integration",
      text: "Seamless integration of AI components with your existing infrastructure for enhanced functionality.",
      gradientStart: "rgba(255, 159, 67, 0.8)",
      gradientEnd: "rgba(255, 107, 107, 0.8)",
      glowColor: "255, 159, 67",
      accentColor: "#ff9f43",
      secondaryColor: "#ff6b6b"
    }
  ];

  // Создаем частицы
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const accentVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section id="ai-integration">
      {/* Анимированный фон */}
      <BackgroundParticles>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </BackgroundParticles>

      {/* Светящиеся орбы */}
      <GlowOrb className="orb-1" />
      <GlowOrb className="orb-2" />
      <GlowOrb className="orb-3" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionTitle variants={titleVariants}>
            AI Integration
          </SectionTitle>
          
          <TitleUnderline 
            variants={titleVariants}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
          
          <Subtitle variants={titleVariants}>
            Transform your business with cutting-edge artificial intelligence solutions 
            designed for the future
          </Subtitle>
        </motion.div>

        <Grid>
          {features.map((feature, index) => (
            <Card
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              gradientStart={feature.gradientStart}
              gradientEnd={feature.gradientEnd}
              glowColor={feature.glowColor}
              transition={{ delay: index * 0.1 }}
            >
              <IconWrapper
                variants={iconVariants}
                gradientStart={feature.gradientStart}
                gradientEnd={feature.gradientEnd}
                glowColor={feature.glowColor}
              >
                {feature.icon}
              </IconWrapper>

              <CardTitle>{feature.title}</CardTitle>
              <CardText>{feature.text}</CardText>
              
              <CardAccent
                variants={accentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                gradientStart={feature.gradientStart}
                gradientEnd={feature.gradientEnd}
              />

              <CornerAccent 
                color={feature.accentColor}
                secondaryColor={feature.secondaryColor}
              />
            </Card>
          ))}
        </Grid>

        <CTAButton
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Explore AI Solutions</span>
        </CTAButton>
      </Container>
    </Section>
  );
};

export default AIIntegration;