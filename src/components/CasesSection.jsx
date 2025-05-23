import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import goaltimeScreen from "@assets/cases-images/goaltime.png";
import goaltimeScreen2 from "@assets/cases-images/goaltime_screen_2.png";
import lunaraliensScreen from "@assets/cases-images/lunaraliens_screen_1.png";
import lunaraliensScreen2 from "@assets/cases-images/lunaraliens_screen_2.png";
import { Link } from "react-router-dom";

const CasesSection = () => {
  const cases = [
    {
      id: 1,
      title: "GoalTime News Site",
      description:
        "A Ukrainian news site built on WordPress. With the help of automation, current news is posted there every day.",
      images: [goaltimeScreen, goaltimeScreen2],
      background: "/cases/ai-bg.jpg",
    },
    {
      id: 2,
      title: "Lunar Aliens Site",
      description:
        "The official website of the crypto game Lunar Aliens created on HTML/CSS/JavaScript, also the site of the pre-sale of their GRIT token on the Solana blockchain using React + TypeScript.",
      images: [lunaraliensScreen, lunaraliensScreen2],
      background: "/cases/ecom-bg.jpg",
    },
  ];

  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Для touch
  let startX = 0;
  let currentX = 0;

  const onTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    currentX = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = startX - currentX;
    if (diff > 50) {
      scrollToIndex(currentIndex + 1);
    } else if (diff < -50) {
      scrollToIndex(currentIndex - 1);
    }
  };

  // Для mouse drag scroll
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartX.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartX.current - dx;
  };

  const onMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      trackRef.current.style.cursor = "grab";
      updateCurrentIndex();
    }
  };

  // Обновляем currentIndex после скролла
  const updateCurrentIndex = () => {
    if (trackRef.current) {
      const width = trackRef.current.clientWidth;
      const scrolledIndex = Math.round(trackRef.current.scrollLeft / width);
      setCurrentIndex(scrolledIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (trackRef.current) {
      const width = trackRef.current.clientWidth;
      const newIndex = Math.min(Math.max(index, 0), cases.length - 1);
      setCurrentIndex(newIndex);
      trackRef.current.scrollTo({
        left: width * newIndex,
        behavior: "smooth",
      });
    }
  };

  return (
    <CasesContainer>
      <CasesTrack
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        style={{ cursor: "grab" }}
      >
        {cases.map((project) => (
          <Case key={project.id} background={project.background}>
            <CaseContent>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
              >
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <DeviceShowcase>
                  <DeviceContainer className="tablet-container">
                    <DeviceFrame type="tablet">
                      <DeviceScreen>
                        <img src={project.images[0]} alt="Tablet preview" />
                      </DeviceScreen>
                      <TabletHome />
                    </DeviceFrame>
                    <DeviceShadow type="tablet" className="tablet" />
                  </DeviceContainer>
                  
                  <DeviceContainer className="phone-container">
                    <DeviceFrame type="phone">
                      <DeviceScreen>
                        <img src={project.images[1]} alt="Phone preview" />
                      </DeviceScreen>
                      <PhoneHome />
                      <PhoneSpeaker />
                    </DeviceFrame>
                    <DeviceShadow type="phone" className="phone"/>
                  </DeviceContainer>
                </DeviceShowcase>

                <Link to={`/cases/${project.id}`}>
                  <LearnMoreButton>Learn More</LearnMoreButton>
                </Link>
              </motion.div>
            </CaseContent>
          </Case>
        ))}
      </CasesTrack>

      <NavButtonLeft
        disabled={currentIndex === 0}
        onClick={() => scrollToIndex(currentIndex - 1)}
        aria-label="Previous case"
      >
        ←
      </NavButtonLeft>

      <NavButtonRight
        disabled={currentIndex === cases.length - 1}
        onClick={() => scrollToIndex(currentIndex + 1)}
        aria-label="Next case"
      >
        →
      </NavButtonRight>

      <ScrollHint>Swipe or drag to scroll</ScrollHint>
    </CasesContainer>
  );
};

export default CasesSection;

const CasesContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 1000px;
`;

const CasesTrack = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-behavior: smooth;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Case = styled.div`
  flex: 0 0 100vw;
  height: 100%;
  background: ${({ background }) =>
    `url(${background}) center/cover no-repeat`};
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  position: relative;
`;

const CaseContent = styled.div`
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(15px);
  border-radius: 1.5rem;
  padding: 3rem;
  max-width: 900px;
  width: 90%;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-size: 2.8rem;
    margin-bottom: 1.2rem;
    background: linear-gradient(90deg, #00d2ff, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    opacity: 0.9;
  }
`;

const DeviceShowcase = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  margin-bottom: 2.5rem;

  .tablet-container {
    transform: translateX(-80px) rotateY(15deg) rotateX(2deg) scale(0.85);
    z-index: 1;
  }

  .phone-container {
    transform: translateX(60px) rotateY(-8deg) rotateX(-1deg) translateZ(30px);
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 300px;
    
    .tablet-container {
      transform: translateX(-40px) rotateY(10deg) scale(0.7);
    }
    
    .phone-container {
      transform: translateX(40px) rotateY(-5deg) translateZ(20px) scale(0.9);
    }
  }
`;

const DeviceContainer = styled.div`
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(-80px) rotateY(15deg) rotateX(2deg) scale(0.9) translateZ(10px);
  }

  &.phone-container:hover {
    transform: translateX(60px) rotateY(-8deg) rotateX(-1deg) translateZ(40px) scale(1.05);
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

const PhoneHome = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translate3d(-18px, -11px, 0px);
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  z-index: 4;
`;

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

const DeviceShadow = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: ${(props) => (props.type === "tablet" ? "300px" : "150px")};
  height: 20px;
  background: radial-gradient(ellipse, 
    rgba(0, 0, 0, 0.4) 0%, 
    rgba(0, 0, 0, 0.2) 50%, 
    transparent 100%);
  border-radius: 50%;
  filter: blur(8px);
  z-index: -1;
`;

const LearnMoreButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  color: white;
  font-weight: 600;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 210, 255, 0.3);

  &:hover {
    background: linear-gradient(135deg, #3a7bd5, #00d2ff);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 210, 255, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 2rem;
  padding: 0.8rem 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  user-select: none;
  pointer-events: none;
  z-index: 20;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavButtonLeft = styled(NavButton)`
  left: 2rem;
`;

const NavButtonRight = styled(NavButton)`
  right: 2rem;
`;