import React, { useState } from 'react';
import styled from 'styled-components';

const Device3DModels = ({ deviceType, imageUrl }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const rotateY = ((clientX - left) / width - 0.5) * 60; // max 30deg left/right
    const rotateX = ((clientY - top) / height - 0.5) * -60; // max 30deg up/down

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <DeviceShowcase
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <DeviceContainer
        className={`${deviceType}-container`}
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        {deviceType === 'phone' && (
          <>
            <DeviceFrame type="phone">
              <DeviceScreen><img src={imageUrl} alt="Phone preview" /></DeviceScreen>
              {/* <PhoneHome /> */}
              <PhoneSpeaker />
            </DeviceFrame>
            <DeviceShadow type="phone" />
          </>
        )}

        {deviceType === 'tablet' && (
          <>
            <DeviceFrame type="tablet">
              <DeviceScreen><img src={imageUrl} alt="Tablet preview" /></DeviceScreen>
              <TabletHome />
            </DeviceFrame>
            <DeviceShadow type="tablet" />
          </>
        )}

        {/* {deviceType === 'laptop' && (
          <>
            <LaptopDevice>
              <LaptopScreen>
                <DeviceScreen><img src={imageUrl} alt="Laptop preview" /></DeviceScreen>
              </LaptopScreen>
              <LaptopBase>
                <LaptopKeyboard />
                <LaptopTrackpad />
              </LaptopBase>
            </LaptopDevice>
            <DeviceShadow type="laptop" />
          </>
        )} */}
      </DeviceContainer>
    </DeviceShowcase>
  );
};

export default Device3DModels;

const DeviceShowcase = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const DeviceContainer = styled.div`
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  &.phone-container {
    transform: rotateY(-8deg) rotateX(-1deg);
    
    &:hover {
      transform: rotateY(-8deg) rotateX(-1deg) translateZ(40px) scale(1.05);
    }
  }

  &.tablet-container {
    transform: rotateY(15deg) rotateX(2deg) scale(0.85);
    
    &:hover {
      transform: rotateY(15deg) rotateX(2deg) scale(0.9) translateZ(10px);
    }
  }

  &.laptop-container {
    transform: rotateY(-5deg) rotateX(-5deg) scale(0.9);
    
    &:hover {
      transform: rotateY(-5deg) rotateX(-5deg) scale(0.95) translateZ(20px);
    }
  }
`;

const DeviceFrame = styled.div`
  position: relative;
  width: ${(props) => (props.type === "tablet" ? "380px" : "200px")};
  height: ${(props) => (props.type === "tablet" ? "280px" : "400px")};
  background: ${(props) => 
    props.type === "tablet" 
      ? "linear-gradient(145deg, #2a2a2a, #1a1a1a)"
      : "linear-gradient(145deg, #1f1f1f, #0f0f0f)"
  };
  border-radius: ${(props) => (props.type === "tablet" ? "1.5rem" : "2.5rem")};
  padding: ${(props) => (props.type === "tablet" ? "1.2rem" : "1rem")};
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 10px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transform: translate3d(0px, 50px, 0px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      transparent 50%, 
      rgba(0, 0, 0, 0.1) 100%);
    border-radius: inherit;
    pointer-events: none;
    z-index: 3;
  }
`;

const DeviceScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: ${(props) => props.type === "tablet" ? "0.8rem" : "1.8rem"};
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const TabletHome = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  z-index: 4;
`;

// const PhoneHome = styled.div`
//   position: absolute;
//   bottom: 8px;
//   left: 50%;
//   transform: translate3d(-18px, -11px, 0px);
//   width: 30px;
//   height: 30px;
//   border: 2px solid rgba(255, 255, 255, 0.3);
//   border-radius: 50%;
//   z-index: 4;
// `;

const PhoneSpeaker = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  z-index: 4;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 70px;
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
  }
`;

// Ноутбук стили
const LaptopDevice = styled.div`
  position: relative;
  transform-style: preserve-3d;
`;

const LaptopScreen = styled.div`
  width: 450px;
  height: 280px;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 1rem 1rem 0.5rem 0.5rem;
  padding: 1.2rem 1.2rem 0.8rem 1.2rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 10px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transform-origin: bottom;
  transform: rotateX(-10deg);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      transparent 50%, 
      rgba(0, 0, 0, 0.1) 100%);
    border-radius: inherit;
    pointer-events: none;
    z-index: 3;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    z-index: 4;
  }
`;

const LaptopBase = styled.div`
  width: 450px;
  height: 180px; /* увеличил высоту, чтобы вместить клавиатуру */
  background: linear-gradient(145deg, #1f1f1f, #0f0f0f);
  border-radius: 0 0 1rem 1rem;
  position: relative;
  margin-top: -2px;
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.03) 0%, 
      transparent 100%);
    border-radius: inherit;
    pointer-events: none;
  }
`;

const LaptopKeyboard = styled.div`
  position: absolute;
  top: 20px;  /* Поставил клавиатуру внизу базы, видно сверху */
  left: 20px;
  right: 20px;
  height: 120px;
  background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
  border-radius: 0.5rem;
  padding: 10px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 8px;
    background: repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0px,
      rgba(255, 255, 255, 0.1) 25px,
      transparent 25px,
      transparent 30px
    );
    border-radius: 2px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 25px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.05) 0px,
      rgba(255, 255, 255, 0.05) 10px,
      transparent 10px,
      transparent 15px
    );
    border-radius: 2px;
  }
`;

const LaptopTrackpad = styled.div`
  position: absolute;
  top: 150px; /* Немного ниже клавиатуры */
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 50px;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 0.5rem;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.4),
    0 1px 2px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DeviceShadow = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: ${(props) => {
    switch(props.type) {
      case 'tablet': return '300px';
      case 'phone': return '150px';
      case 'laptop': return '400px';
      default: return '200px';
    }
  }};
  height: 20px;
  background: radial-gradient(ellipse, 
    rgba(0, 0, 0, 0.4) 0%, 
    rgba(0, 0, 0, 0.2) 50%, 
    transparent 100%);
  border-radius: 50%;
  filter: blur(8px);
  z-index: -1;
`;
