// components/ImageGallery.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import {
  Container,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "../../../Styles";
import Device3DModels from "../../../Device3DModels";
import lunaraliensScreen_phone from "@assets/cases-images/lunaraliens_phone_screen.png";
import lunaraliensScreen_tablet from "@assets/cases-images/lunaraliens_tablet_screen.png";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState("tablet");
  const images = [
    {
      src: lunaraliensScreen_tablet,
      title: "Token Presale",
      device: "tablet",
    },
    { 
        src: lunaraliensScreen_phone,
        title: "Mobile App",
        device: "phone"
    },
    // { src: "/cases/ecom-2.jpg", title: "Gaming Interface" },
  ];

  const handleDeviceChange = (device) => {
    setSelectedDevice(device);
    // Можно добавить дополнительную логику при смене устройства
  };

  // Определяем какое изображение показывать на каждом устройстве
  const tabletImage =
    images.find((img) => img.device === "tablet")?.src || images[0].src;
  const phoneImage =
    images.find((img) => img.device === "phone")?.src || images[1].src;

  return (
    <GallerySection>
      <Container>
        <SectionHeader>
          <SectionTitle>Project Gallery</SectionTitle>
          <SectionSubtitle>
            Visual showcase of the final product
          </SectionSubtitle>
          <DevicesContainer>
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
            <Device3DContainer>
            <Device3DModels
                deviceType={selectedDevice}
                imageUrl={selectedDevice === "tablet" ? tabletImage : phoneImage}
            />
            </Device3DContainer>
            <InfoCard>
                <InfoTitle>
                {selectedDevice === "tablet"
                    ? "$GRIT Token Presale"
                    : "Lunar Aliens Telegram App"}
                </InfoTitle>
            </InfoCard>
          </DevicesContainer>
        </SectionHeader>
        {/* <Gallery>
          {images.map((image, index) => (
            <GalleryItem key={index} delay={index * 0.1}>
              <GalleryImage src={image.src} alt={image.title} />
              <GalleryOverlay>
                <GalleryTitle>{image.title}</GalleryTitle>
              </GalleryOverlay>
            </GalleryItem>
          ))}
        </Gallery> */}
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
  animation-delay: ${(props) => props.delay}s;

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
  height: 100%;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // Добавляем центрирование по горизонтали
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  max-width: 600px;
  margin: 0 auto; // Центрируем карточку по горизонтали
  text-align: center; // Центрируем текст внутри

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    width: 90%; // Добавляем отступы по бокам на мобильных
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