// GallerySection.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Device3DModels from "../../../Device3DModels"; // Путь к нашему компоненту

import goaltimeScreen from "@assets/cases-images/goaltime.png";
import mobileScreen from "@assets/cases-images/goaltime.png";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState("tablet");

  const images = [
    {
      src: goaltimeScreen,
      alt: "GoalTime Homepage",
      title: "News Feed",
      description:
        "Modern interface with a focus on readability and content accessibility.",
      device: "tablet",
    },
    {
      src: mobileScreen,
      alt: "GoalTime Mobile Version",
      title: "Mobile Interface",
      description: "Responsive design for comfortable reading on any device.",
      device: "phone",
    },
  ];

  const imageVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0,0,0,0.3), 0 0 30px rgba(79,172,254,0.3)",
      transition: { duration: 0.3 },
    },
  };

  const handleImageClick = (i) => {
    const clickedImage = images[i];
    setSelectedImage(selectedImage === i ? null : i);

    // Автоматически переключаем 3D модель на соответствующее устройство
    if (clickedImage.device) {
      setSelectedDevice(clickedImage.device);
    }
  };

  const handleDeviceChange = (device) => {
    setSelectedDevice(device);
    // Можно добавить дополнительную логику при смене устройства
  };

  // Определяем какое изображение показывать на каждом устройстве
  const laptopImage =
    images.find((img) => img.device === "laptop")?.src || images[0].src;
  const phoneImage =
    images.find((img) => img.device === "phone")?.src || images[1].src;

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

      <ContentWrapper>
        {/* <ImagesContainer>
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
              className={`
                ${selectedImage === i ? "expanded" : ""}
                ${selectedDevice === image.device ? "device-active" : ""}
              `}
            >
              <ImageOverlay>
                <ImageTitle>{image.title}</ImageTitle>
                <ImageDescription>{image.description}</ImageDescription>
                <DeviceIndicator device={image.device}>
                  {image.device === "laptop" ? "💻" : "📱"}
                </DeviceIndicator>
              </ImageOverlay>
              <StyledImage src={image.src} alt={image.alt} />
              <GlowEffect />
            </ImageWrapper>
          ))}
        </ImagesContainer> */}

        <DevicesContainer>
          {/* <DevicesHeader
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <DevicesTitle>Interactive 3D Preview</DevicesTitle>
            <DevicesSubtitle>
              Click on screenshots above or switch devices to see how your
              design looks in real devices
            </DevicesSubtitle>
          </DevicesHeader> */}

          <DeviceSwitcher>
            {["tablet", "phone"].map((device) => (
              <SwitchButton
                key={device}
                onClick={() => handleDeviceChange(device)}
                className={selectedDevice === device ? "active" : ""}
              >
                {device === "tablet" ? "📟 Tablet" : "📱 Phone"}
              </SwitchButton>
            ))}
          </DeviceSwitcher>

          <Device3DContainer
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Device3DModels
              deviceType={selectedDevice}
              imageUrl={selectedDevice === "laptop" ? laptopImage : phoneImage}
            />
          </Device3DContainer>

          {/* <DeviceInfo
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <InfoCard>
              <InfoIcon>{selectedDevice === "laptop" ? "💻" : "📱"}</InfoIcon>
              <InfoContent>
                <InfoTitle>
                  {selectedDevice === "laptop"
                    ? "Desktop Experience"
                    : "Mobile Experience"}
                </InfoTitle>
                <InfoDescription>
                  {selectedDevice === "laptop"
                    ? "Full-featured interface optimized for desktop and laptop screens with enhanced functionality and detailed layouts."
                    : "Streamlined mobile interface designed for touch interaction with intuitive navigation and optimized performance."}
                </InfoDescription>
              </InfoContent>
            </InfoCard>
          </DeviceInfo> */}
        </DevicesContainer>
      </ContentWrapper>

      <BackgroundGlow
        top="20%"
        left="10%"
        size="400px"
        color="rgba(79, 172, 254, 0.08)"
      />
      <BackgroundGlow
        top="70%"
        left="80%"
        size="350px"
        color="rgba(0, 242, 254, 0.06)"
      />
      <BackgroundGlow
        top="40%"
        left="60%"
        size="300px"
        color="rgba(139, 92, 246, 0.05)"
      />
    </Section>
  );
};

export default GallerySection;

// Styled Components

const Section = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #1a202c 0%, #0a0e1a 100%);
  overflow: hidden;
  min-height: 100vh;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/9;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid transparent;

  &.expanded {
    transform: scale(1.05);
    z-index: 10;
    border-color: rgba(79, 172, 254, 0.5);

    &::after {
      opacity: 0;
    }
  }

  &.device-active {
    border-color: rgba(79, 172, 254, 0.7);
    box-shadow: 0 0 30px rgba(79, 172, 254, 0.3);
  }

  &::after {
    content: "";
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

  @media (max-width: 768px) {
    &.expanded {
      transform: scale(1.02);
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

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

  ${ImageWrapper}.device-active & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ImageTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const ImageDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const DeviceIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.25rem 0.75rem;
  background: rgba(79, 172, 254, 0.2);
  border-radius: 20px;
  border: 1px solid rgba(79, 172, 254, 0.3);
  backdrop-filter: blur(10px);
`;

const GlowEffect = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 10px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(79, 172, 254, 0.7),
    transparent
  );
  filter: blur(8px);
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageWrapper}:hover &,
  ${ImageWrapper}.device-active & {
    opacity: 1;
  }
`;

const DeviceSwitcher = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SwitchButton = styled.button`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &.active {
    background: rgba(79, 172, 254, 0.3);
    border-color: rgba(79, 172, 254, 0.6);
    box-shadow: 0 0 10px rgba(79, 172, 254, 0.4);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;


const DevicesContainer = styled.div`
  position: relative;
  height: 500px;
`;

const DevicesHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const DevicesTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const DevicesSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0 1rem;
  }
`;

const Device3DContainer = styled(motion.div)`
  margin-bottom: 3rem;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

const DeviceInfo = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  max-width: 600px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  }
`;

const InfoIcon = styled.div`
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.5));
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const InfoDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: ${(props) => props.color};
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;
