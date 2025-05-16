import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import goaltimeScreen from '@assets/cases-images/goaltime.png'

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [
    {
      src: goaltimeScreen,
      alt: "GoalTime Homepage",
      title: "News Feed",
      description: "Modern interface with a focus on readability and content accessibility."
    },
    {
      src: "/cases/ai-2.jpg",
      alt: "GoalTime Mobile Version",
      title: "Mobile Interface",
      description: "Responsive design for comfortable reading on any device."
    }
  ];

  const imageVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(79, 172, 254, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  return (
    <Section>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>Project Gallery</SectionTitle>
        <SectionSubtitle>Seeing is Believing</SectionSubtitle>
      </SectionHeader>

      <ImagesContainer>
        {images.map((image, i) => (
          <ImageWrapper
            key={i}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            variants={imageVariants}
            onClick={() => handleImageClick(i)}
            className={selectedImage === i ? 'expanded' : ''}
          >
            <ImageOverlay>
              <ImageTitle>{image.title}</ImageTitle>
              <ImageDescription>{image.description}</ImageDescription>
            </ImageOverlay>
            <StyledImage src={image.src} alt={image.alt} />
            <GlowEffect />
          </ImageWrapper>
        ))}
      </ImagesContainer>

      <BackgroundGlow top="30%" left="20%" size="300px" color="rgba(79, 172, 254, 0.06)" />
      <BackgroundGlow top="60%" left="70%" size="350px" color="rgba(0, 242, 254, 0.05)" />
    </Section>
  )
}

export default GallerySection

const Section = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #1A202C 0%, #0A0E1A 100%);
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
  filter: blur(70px);
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

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
`

const ImageWrapper = styled(motion.div)`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  max-width: 500px;
  width: 100%;
  aspect-ratio: 16/9;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.expanded {
    transform: scale(1.05);
    z-index: 10;

    &::after {
      opacity: 0;
    }

    ${props => props.theme.breakpoints && props.theme.breakpoints.md} {
      transform: scale(1.1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(10, 14, 26, 0.2) 0%,
      rgba(10, 14, 26, 0.8) 100%
    );
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 0.6;
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`

const ImageTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`

const ImageDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
`

const GlowEffect = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 10px;
  background: linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.7), transparent);
  filter: blur(8px);
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`