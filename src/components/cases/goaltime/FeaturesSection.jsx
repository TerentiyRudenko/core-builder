import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const features = [
  {
    icon: 'automated',
    title: 'Automated Publication',
    description: 'Integration with systems for daily news publishing without manual input.'
  },
  {
    icon: 'seo',
    title: 'SEO Optimization',
    description: 'Structured content for high speed and ranking using modern technologies.'
  },
  {
    icon: 'responsive',
    title: 'Responsive Design',
    description: 'Perfectly adapts to all devices with a mobile-first layout.'
  }
]

const FeaturesSection = () => {
  return (
    <Section>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>Our Advantages</SectionTitle>
        <SectionSubtitle>Why Choose GoalTime News</SectionSubtitle>
      </SectionHeader>

      <FeaturesContainer>
        {features.map((feature, i) => (
          <FeatureCard
            key={i}
            as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{
              y: -10,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(135deg, rgba(31, 40, 51, 0.8) 0%, rgba(11, 12, 16, 0.9) 100%)"
            }}
          >
            <IconWrapper>
              <FeatureIcon icon={feature.icon} />
            </IconWrapper>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesContainer>

      <BackgroundGlow top="20%" left="10%" size="300px" color="rgba(79, 172, 254, 0.08)" />
      <BackgroundGlow top="70%" left="80%" size="250px" color="rgba(0, 242, 254, 0.06)" />
    </Section>
  )
}

const FeatureIcon = ({ icon }) => {
  switch(icon) {
    case 'automated':
      return (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9H21L16 13.5L18 21L12 17L6 21L8 13.5L3 9H9.5L12 2Z" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="gradient1" x1="3" y1="2" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4facfe"/>
              <stop offset="1" stopColor="#00f2fe"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case 'seo':
      return (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 3.05493C6.50005 3.55238 3 7.36745 3 12C3 16.9706 7.02944 21 12 21C16.6326 21 20.4476 17.5 20.9451 13H11V3.05493Z" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.4878 9H15V3.5123C17.5572 4.41613 19.5839 6.44284 20.4878 9Z" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="gradient2" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4facfe"/>
              <stop offset="1" stopColor="#00f2fe"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case 'responsive':
      return (
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 16H3V8H10" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="10" y="3" width="11" height="18" rx="2" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 17H14" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="gradient3" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4facfe"/>
              <stop offset="1" stopColor="#00f2fe"/>
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return null;
  }
}

export default FeaturesSection

const Section = styled.section`
  position: relative;
  background: linear-gradient(180deg, #0A0E1A 0%, #1A202C 100%);
  color: white;
  padding: 6rem 2rem;
  overflow: hidden;
`

const BackgroundGlow = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
`

const FeaturesContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  max-width: 1200px;
`

const FeatureCard = styled.div`
  background: linear-gradient(135deg, rgba(31, 40, 51, 0.5) 0%, rgba(11, 12, 16, 0.7) 100%);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 320px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const IconWrapper = styled.div`
  margin-bottom: 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
`