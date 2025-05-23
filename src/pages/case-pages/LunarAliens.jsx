// LunarAliens.jsx
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { HeroSection } from '../../components/cases/lunaraliens/HeroSection'
import { TechStack } from '../../components/cases/lunaraliens/TechStack'
import ProjectFeatures from '../../components/cases/lunaraliens/ProjectFeatures'
import ImageGallery from '../../components/cases/lunaraliens/ImageGallery'
import { ProjectStats } from '../../components/cases/lunaraliens/ProjectStats'
import Timeline from '../../components/cases/lunaraliens/Timeline'

const LunarAliens = () => {
  return (
    <Wrapper>
      <ParticleBackground />
      <HeroSection />
      <ProjectStats />
      <TechStack />
      <ProjectFeatures />
      <Timeline />
      <ImageGallery />
      <BackToHome>
        <BackButton to="/">
          <ArrowIcon>←</ArrowIcon>
          Back to Portfolio
        </BackButton>
      </BackToHome>
    </Wrapper>
  )
}

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(153, 69, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(153, 69, 255, 0.6); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`

const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(50px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`

// Styled Components
const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #16213e 100%);
  color: white;
  position: relative;
  overflow-x: hidden;
`

const ParticleBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(153, 69, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 106, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(0, 210, 255, 0.1) 0%, transparent 50%);
  z-index: -1;
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
`

const HeroOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 10, 46, 0.9) 100%);
  z-index: -1;
`

const HeroGrid = styled.div`
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
`

const HeroContent = styled.div`
  animation: ${slideUp} 1s ease-out;
`

const ProjectBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(153, 69, 255, 0.2);
  border: 1px solid rgba(153, 69, 255, 0.5);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`

const HeroTitle = styled.h1`
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
    animation: ${glow} 3s ease-in-out infinite;
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
`

const HeroDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  max-width: 600px;
`

const HeroActions = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`

const PrimaryButton = styled.button`
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
`

const SecondaryButton = styled.button`
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
`

const HeroVisual = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GlowingOrb = styled.div`
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(153, 69, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${glow} 4s ease-in-out infinite;
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
    animation: ${pulse} 2s ease-in-out infinite;
  }
`

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const FloatingCard = styled.div`
  position: absolute;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  font-weight: 600;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay};

  &:nth-child(1) { top: 20%; left: 10%; }
  &:nth-child(2) { top: 60%; right: 20%; }
  &:nth-child(3) { bottom: 20%; left: 30%; }
`

const StatsSection = styled.section`
  padding: 6rem 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(153, 69, 255, 0.2);
  }
`

const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #9945FF, #ff6a00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`

const TechSection = styled.section`
  padding: 8rem 0;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #9945FF, #ff6a00, #00d2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
`

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const TechCard = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(153, 69, 255, 0.5);
  }
`

const TechName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: white;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.level}%;
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}aa);
  border-radius: 4px;
  transition: width 1s ease-out;
`

const TechLevel = styled.div`
  text-align: right;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
`

const FeaturesSection = styled.section`
  padding: 8rem 0;
  background: rgba(0, 0, 0, 0.2);
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`

const FeatureCard = styled.div`
  position: relative;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: ${props => props.delay}s;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(153, 69, 255, 0.5);
  }
`

const FeatureGlow = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(153, 69, 255, 0.1) 0%, transparent 70%);
  transition: all 0.4s ease;
  transform: scale(0);
  
  ${FeatureCard}:hover & {
    transform: scale(1);
  }
`

const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`

const FeatureContent = styled.div`
  position: relative;
  z-index: 2;
`

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const TechTag = styled.span`
  padding: 0.3rem 0.8rem;
  background: rgba(153, 69, 255, 0.2);
  border: 1px solid rgba(153, 69, 255, 0.4);
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`

const TimelineSection = styled.section`
  padding: 8rem 0;
`

const TimelineContainer = styled.div`
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
`

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  
  &:nth-child(odd) {
    flex-direction: row;
    text-align: right;
    
    ${'' /* Content on left */}
    > div:last-child {
      margin-right: 4rem;
    }
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    text-align: left;
    
    ${'' /* Content on right */}
    > div:last-child {
      margin-left: 4rem;
    }
  }
`

const TimelineMarker = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#00ff88';
      case 'active': return '#ff6a00';
      case 'upcoming': return '#666';
      default: return '#666';
    }
  }};
  border: 4px solid #0a0a0a;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 20px ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(0, 255, 136, 0.5)';
      case 'active': return 'rgba(255, 106, 0, 0.5)';
      default: return 'transparent';
    }
  }};
`

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  max-width: 300px;
`

const TimelinePhase = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const TimelineTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: white;
`

const TimelineDate = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`

const GallerySection = styled.section`
  padding: 8rem 0;
  background: rgba(0, 0, 0, 0.3);
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`

const GalleryItem = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s ease;
  animation: ${slideUp} 0.8s ease-out;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateY(-10px) scale(1.02);
  }
`

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: all 0.4s ease;

  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`

const GalleryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem;
  transform: translateY(100%);
  transition: all 0.4s ease;

  ${GalleryItem}:hover & {
    transform: translateY(0);
  }
`

const GalleryTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
`

const BackToHome = styled.section`
  padding: 4rem 0;
  text-align: center;
`

const BackButton = styled(Link)`
display: inline-flex;
align-items: center;
gap: 1rem;
padding: 1rem 2rem;
background: rgba(255, 255, 255, 0.05);
border: 2px solid rgba(153, 69, 255, 0.5);
color: white;
text-decoration: none;
border-radius: 50px;
font-weight: 600;
font-size: 1.1rem;
transition: all 0.3s ease;
backdrop-filter: blur(20px);


&:hover {
  background: rgba(153, 69, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(153, 69, 255, 0);
}`

const ArrowIcon = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
`

export default LunarAliens
