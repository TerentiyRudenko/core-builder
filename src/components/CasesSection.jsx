import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import goaltimeScreen from "@assets/cases-images/goaltime.png";
import lunaraliensScreen from "@assets/cases-images/lunaraliens-case.png";
import { Link } from "react-router-dom";

const CasesSection = () => {
  const cases = [
    {
      id: 1,
      title: "GoalTime News Site",
      description:
        "A Ukrainian news site built on WordPress. With the help of automation, current news is posted there every day.",
      images: [goaltimeScreen, "/cases/ai-2.jpg"],
      background: "/cases/ai-bg.jpg",
    },
    {
      id: 2,
      title: "Lunar Aliens Site",
      description:
        "The official website of the crypto game Lunar Aliens created on HTML/CSS/JavaScript, also the site of the pre-sale of their GRIT token on the Solana blockchain using React + TypeScript.",
      images: [lunaraliensScreen, "/cases/ecom-2.jpg"],
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

// Внутри компонента CasesSection, после кнопок навигации:
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
              viewport={{ once: false }}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <Gallery>
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  draggable={false}
                />
              ))}
            </Gallery>
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
  height: 100vh;
`;

const CasesTrack = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-behavior: smooth;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Case = styled.div`
  flex: 0 0 100vw;
  height: 100%;
  background: ${({ background }) => `url(${background}) center/cover no-repeat`};
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  position: relative;
`;

const CaseContent = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 3rem;
  max-width: 800px;
  width: 90%;
  text-align: center;
  color: white;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(90deg, #00d2ff, #3a7bd5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const Gallery = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  img {
    max-width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    user-select: none;
  }
`;

const LearnMoreButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  color: white;
  font-weight: bold;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #3a7bd5, #00d2ff);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  transition: background 0.3s ease;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.25rem 1rem;
  border-radius: 999px;
  user-select: none;
  pointer-events: none; /* чтобы не мешала кликам */
  z-index: 20;
`;


const NavButtonLeft = styled(NavButton)`
  left: 1rem;
`;

const NavButtonRight = styled(NavButton)`
  right: 1rem;
`;
