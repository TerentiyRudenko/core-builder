// components/ImageGallery.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, SectionHeader, SectionTitle, SectionSubtitle } from "../../../Styles";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ImageGallery = () => {
  const images = [
    { src: "/assets/cases-images/lunaraliens_screen_1.png", title: "Landing Page" },
    { src: "/assets/cases-images/lunaraliens_screen_2.png", title: "Token Presale" },
    { src: "/cases/ecom-2.jpg", title: "Gaming Interface" },
    { src: "/cases/ecom-bg.jpg", title: "Mobile App" }
  ];

  return (
    <GallerySection>
      <Container>
        <SectionHeader>
          <SectionTitle>Project Gallery</SectionTitle>
          <SectionSubtitle>Visual showcase of the final product</SectionSubtitle>
        </SectionHeader>
        <Gallery>
          {images.map((image, index) => (
            <GalleryItem key={index} delay={index * 0.1}>
              <GalleryImage src={image.src} alt={image.title} />
              <GalleryOverlay>
                <GalleryTitle>{image.title}</GalleryTitle>
              </GalleryOverlay>
            </GalleryItem>
          ))}
        </Gallery>
      </Container>
    </GallerySection>
  );
};

export default ImageGallery;

const GallerySection = styled.section`
  padding: 8rem 0;
  background: rgba(0, 0, 0, 0.3);
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

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
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: all 0.4s ease;

  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`;

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
`;

const GalleryTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
`;
