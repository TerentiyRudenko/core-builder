import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import goaltime_tablet from "@assets/cases-images/goaltime.png";
import goaltime_phone from "@assets/cases-images/goaltime_screen_2.png";
import lunaraliens_tablet from "@assets/cases-images/lunaraliens_screen_1.png";
import lunaraliens_phone from "@assets/cases-images/lunaraliens_screen_2.png";
import { ComingSoonButton } from "../ComingSoonButton";

// Breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px',
  xlarge: '1400px'
};

// Media queries helper
const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  large: `@media (min-width: ${breakpoints.large})`,
  xlarge: `@media (min-width: ${breakpoints.xlarge})`
};

// Оптимизированные анимации с уменьшенной интенсивностью
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(0, 210, 255, 0.2); }
  50% { box-shadow: 0 0 25px rgba(58, 123, 213, 0.4); }
`;

const scanline = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200vw); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

// Основной контейнер
const CasesSectionContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #0a0a0f 0%,
    #1a0b2e 30%,
    #16213e 70%,
    #0f1419 100%
  );
  overflow: hidden;
  padding: 2rem 0;

  ${media.mobile} {
    padding: 1rem 0;
    min-height: auto;
  }

  ${media.tablet} {
    padding: 1.5rem 0;
  }

  ${media.xlarge} {
    padding: 4rem 0;
  }
`;

// Упрощенный фон
const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(0, 255, 255, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(255, 0, 128, 0.03) 0%,
      transparent 50%
    );
  pointer-events: none;

  ${media.mobile} {
    background: radial-gradient(
      circle at 50% 50%,
      rgba(0, 255, 255, 0.02) 0%,
      transparent 40%
    );
  }
`;

// Облегченная сканирующая линия
const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: -100px;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: ${scanline} 15s linear infinite;
  z-index: 1;
  will-change: transform;

  ${media.mobile} {
    display: none;
  }
`;

// Контейнер для частиц
const ParticleField = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  ${media.mobile} {
    display: none;
  }
`;

// Оптимизированные частицы
const Particle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${(props) => props.color || "#00ffff"};
  border-radius: 50%;
  opacity: 0.5;
  animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  will-change: transform;

  &::after {
    content: "";
    position: absolute;
    inset: -1px;
    background: inherit;
    border-radius: 50%;
    filter: blur(1px);
    opacity: 0.3;
  }

  ${media.tablet} {
    width: 1.5px;
    height: 1.5px;
  }
`;

// Заголовок секции
const SectionHeader = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem 2rem;
  position: relative;
  z-index: 10;

  ${media.mobile} {
    padding: 2rem 1rem 1.5rem;
  }

  ${media.tablet} {
    padding: 3rem 1.5rem 2rem;
  }

  ${media.xlarge} {
    padding: 5rem 2rem 3rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 900;
  background: linear-gradient(135deg, #00ffff 0%, #ff0080 50%, #3a7bd5 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  line-height: 1.1;

  ${media.mobile} {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
    margin-bottom: 0.5rem;
  }

  ${media.xlarge} {
    font-size: clamp(3rem, 5vw, 5rem);
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;

  ${media.mobile} {
    font-size: clamp(0.9rem, 3vw, 1rem);
    margin-bottom: 2rem;
    padding: 0 1rem;
  }

  ${media.tablet} {
    margin-bottom: 2.5rem;
  }

  ${media.xlarge} {
    max-width: 800px;
    font-size: 1.3rem;
  }
`;

// Контейнер слайдера
const CasesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;

  ${media.mobile} {
    height: 500px;
  }

  ${media.tablet} {
    height: 600px;
  }

  ${media.xlarge} {
    height: 800px;
  }
`;

const CasesTrack = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  scroll-behavior: smooth;
  cursor: grab;
  -ms-overflow-style: none;
  scrollbar-width: none;
  will-change: scroll-position;

  &::-webkit-scrollbar {
    display: none;
  }

  &:active {
    cursor: grabbing;
  }

  ${media.mobile} {
    cursor: default;
  }
`;

// Отдельный кейс
const Case = styled(motion.div)`
  flex: 0 0 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  position: relative;
  padding: 0 1rem;

  ${media.mobile} {
    padding: 0 0.5rem;
  }

  ${media.xlarge} {
    padding: 0 2rem;
  }
`;

// Контент кейса - упрощенный
const CaseContent = styled(motion.div)`
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(15px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  max-width: 900px;
  width: 90%;
  height: 100%;
  text-align: center;
  color: white;
  border: 1px solid rgba(0, 255, 255, 0.15);
  position: relative;
  z-index: 5;

  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      45deg,
      rgba(0, 255, 255, 0.1),
      rgba(255, 0, 128, 0.1),
      rgba(58, 123, 213, 0.1)
    );
    border-radius: inherit;
    z-index: -1;
    opacity: 0.6;
    filter: blur(2px);
  }

  ${media.mobile} {
    padding: 1.5rem;
    border-radius: 1rem;
    width: 95%;
    backdrop-filter: blur(10px);
  }

  ${media.tablet} {
    padding: 2rem;
    width: 92%;
  }

  ${media.xlarge} {
    padding: 3rem;
    max-width: 1100px;
    border-radius: 2rem;
  }
`;

const CaseTitle = styled(motion.h3)`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #00ffff, #ff0080, #3a7bd5);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  position: relative;
  line-height: 1.2;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, #00ffff, #ff0080);
    border-radius: 1px;
  }

  ${media.mobile} {
    font-size: clamp(1.3rem, 5vw, 1.8rem);
    margin-bottom: 1rem;
    
    &::after {
      width: 60px;
      height: 1.5px;
      bottom: -6px;
    }
  }

  ${media.xlarge} {
    font-size: clamp(2rem, 3vw, 2.8rem);
    margin-bottom: 2rem;
    
    &::after {
      width: 120px;
      height: 3px;
      bottom: -12px;
    }
  }
`;

const CaseDescription = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.85);

  ${media.mobile} {
    font-size: clamp(0.9rem, 3vw, 1rem);
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  ${media.tablet} {
    margin-bottom: 2rem;
  }

  ${media.xlarge} {
    font-size: 1.2rem;
    margin-bottom: 3rem;
    line-height: 1.7;
  }
`;

// Витрина устройств - оптимизированная
const DeviceShowcase = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 350px;
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
    transform: translateX(60px) rotateY(-10deg) rotateX(-1deg) translateZ(30px) scale(0.9);
    z-index: 2;
  }

  ${media.mobile} {
    height: 200px;
    margin-bottom: 1.5rem;
    perspective: 800px;

    .tablet-container {
      transform: translateX(-20px) rotateY(8deg) scale(0.5);
    }

    .phone-container {
      transform: translateX(25px) rotateY(-5deg) translateZ(15px) scale(0.65);
    }
  }

  ${media.tablet} {
    height: 280px;
    margin-bottom: 2rem;

    .tablet-container {
      transform: translateX(-40px) rotateY(10deg) scale(0.7);
    }

    .phone-container {
      transform: translateX(40px) rotateY(-8deg) translateZ(20px) scale(0.8);
    }
  }

  ${media.xlarge} {
    height: 400px;
    margin-bottom: 3rem;

    .tablet-container {
      transform: translateX(-100px) rotateY(18deg) rotateX(3deg) scale(1);
    }

    .phone-container {
      transform: translateX(80px) rotateY(-12deg) rotateX(-2deg) translateZ(40px) scale(1.05);
    }
  }
`;

const DeviceContainer = styled(motion.div)`
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(-80px) rotateY(15deg) rotateX(2deg) scale(0.9) translateZ(10px) !important;
  }

  &.phone-container:hover {
    transform: translateX(60px) rotateY(-10deg) rotateX(-1deg) translateZ(40px) scale(0.95) !important;
  }

  ${media.mobile} {
    &:hover {
      transform: translateX(-20px) rotateY(8deg) scale(0.52) !important;
    }

    &.phone-container:hover {
      transform: translateX(25px) rotateY(-5deg) translateZ(15px) scale(0.67) !important;
    }
  }

  ${media.tablet} {
    &:hover {
      transform: translateX(-40px) rotateY(10deg) scale(0.72) !important;
    }

    &.phone-container:hover {
      transform: translateX(40px) rotateY(-8deg) translateZ(20px) scale(0.82) !important;
    }
  }
`;

const DeviceFrame = styled.div`
  position: relative;
  width: ${(props) => (props.type === "tablet" ? "350px" : "180px")};
  height: ${(props) => (props.type === "tablet" ? "250px" : "320px")};
  background: linear-gradient(
    145deg,
    ${(props) =>
      props.type === "tablet" ? "#2a2a3a, #1a1a2a" : "#1f1f2f, #0f0f1f"}
  );
  border-radius: ${(props) => (props.type === "tablet" ? "1.5rem" : "2.5rem")};
  padding: ${(props) => (props.type === "tablet" ? "1rem" : "1rem")};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 20px rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.15);
  overflow: hidden;
  animation: ${glow} 6s ease-in-out infinite;
  will-change: box-shadow;

  ${media.mobile} {
    width: ${(props) => (props.type === "tablet" ? "200px" : "100px")};
    height: ${(props) => (props.type === "tablet" ? "140px" : "180px")};
    border-radius: ${(props) => (props.type === "tablet" ? "1rem" : "1.5rem")};
    padding: ${(props) => (props.type === "tablet" ? "0.6rem" : "0.6rem")};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 10px rgba(0, 255, 255, 0.1);
  }

  ${media.tablet} {
    width: ${(props) => (props.type === "tablet" ? "280px" : "140px")};
    height: ${(props) => (props.type === "tablet" ? "200px" : "250px")};
    border-radius: ${(props) => (props.type === "tablet" ? "1.2rem" : "2rem")};
    padding: ${(props) => (props.type === "tablet" ? "0.8rem" : "0.8rem")};
  }

  ${media.xlarge} {
    width: ${(props) => (props.type === "tablet" ? "400px" : "200px")};
    height: ${(props) => (props.type === "tablet" ? "280px" : "360px")};
    border-radius: ${(props) => (props.type === "tablet" ? "1.8rem" : "3rem")};
    padding: ${(props) => (props.type === "tablet" ? "1.2rem" : "1.2rem")};
  }
`;

const DeviceScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: ${(props) => (props.type === "tablet" ? "1rem" : "2rem")};
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.6);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(1.1) contrast(1.05);
  }

  ${media.mobile} {
    border-radius: ${(props) => (props.type === "tablet" ? "0.6rem" : "1.2rem")};
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.6);
  }

  ${media.tablet} {
    border-radius: ${(props) => (props.type === "tablet" ? "0.8rem" : "1.6rem")};
  }

  ${media.xlarge} {
    border-radius: ${(props) => (props.type === "tablet" ? "1.4rem" : "2.4rem")};
  }
`;

// Элементы устройств - упрощенные
const TabletHome = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #00ffff, #ff0080);
  border-radius: 2px;
  z-index: 4;
  animation: ${pulse} 3s ease-in-out infinite;

  ${media.mobile} {
    width: 30px;
    height: 2px;
    bottom: 5px;
  }

  ${media.tablet} {
    width: 40px;
    height: 2.5px;
    bottom: 6px;
  }

  ${media.xlarge} {
    width: 60px;
    height: 4px;
    bottom: 10px;
  }
`;

const PhoneHome = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 25px;
  border: 2px solid rgba(0, 255, 255, 0.6);
  border-radius: 50%;
  z-index: 4;

  ${media.mobile} {
    width: 15px;
    height: 15px;
    bottom: 5px;
    border-width: 1px;
  }

  ${media.tablet} {
    width: 20px;
    height: 20px;
    bottom: 6px;
    border-width: 1.5px;
  }

  ${media.xlarge} {
    width: 30px;
    height: 30px;
    bottom: 10px;
    border-width: 3px;
  }
`;

const PhoneSpeaker = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 4px;
  background: linear-gradient(90deg, #00ffff, #ff0080);
  border-radius: 2px;
  z-index: 4;

  ${media.mobile} {
    width: 25px;
    height: 2px;
    top: 8px;
  }

  ${media.tablet} {
    width: 35px;
    height: 3px;
    top: 10px;
  }

  ${media.xlarge} {
    width: 60px;
    height: 5px;
    top: 18px;
  }
`;

// Кнопка
const LearnMoreButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #00ffff, #ff0080);
  color: white;
  font-weight: 700;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.03em;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #ff0080, #3a7bd5);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }

  ${media.mobile} {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    border-radius: 40px;
  }

  ${media.tablet} {
    padding: 0.9rem 2.2rem;
    font-size: 1.05rem;
    border-radius: 45px;
  }

  ${media.xlarge} {
    padding: 1.2rem 3rem;
    font-size: 1.2rem;
    border-radius: 60px;
  }
`;

// Модифицируйте компонент кнопки
const LearnMoreLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
`;

// Навигационные кнопки
const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(0, 255, 255, 0.3);
  color: #00ffff;
  font-size: 1.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  z-index: 20;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background: rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.6);
  }

  ${media.mobile} {
    font-size: 1.2rem;
    padding: 0.6rem 0.9rem;
    border-width: 1px;
  }

  ${media.tablet} {
    font-size: 1.3rem;
    padding: 0.7rem 1rem;
    border-width: 1.5px;
  }

  ${media.xlarge} {
    font-size: 1.8rem;
    padding: 1rem 1.5rem;
    border-width: 3px;
  }
`;

const NavButtonLeft = styled(NavButton)`
  left: 2rem;
  transform: translateY(0px);

  ${media.mobile} {
    left: 0.5rem;
  }

  ${media.tablet} {
    left: 1rem;
  }

  ${media.xlarge} {
    left: 3rem;
  }
`;

const NavButtonRight = styled(NavButton)`
  right: 2rem;
  transform: translateY(0px);

  ${media.mobile} {
    right: 0.5rem;
  }

  ${media.tablet} {
    right: 1rem;
  }

  ${media.xlarge} {
    right: 3rem;
  }
`;

// Индикаторы
const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
  z-index: 20;

  ${media.mobile} {
    bottom: 2rem;
    gap: 0.6rem;
  }

  ${media.tablet} {
    bottom: 3rem;
    gap: 0.7rem;
  }

  ${media.xlarge} {
    bottom: 5rem;
    gap: 1rem;
  }
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) =>
    props.active
      ? "linear-gradient(45deg, #00ffff, #ff0080)"
      : "rgba(255, 255, 255, 0.3)"};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 255, 255, 0.3);

  &:hover {
    transform: scale(1.2);
  }

  ${media.mobile} {
    width: 8px;
    height: 8px;
    border-width: 0.5px;
  }

  ${media.tablet} {
    width: 9px;
    height: 9px;
    border-width: 0.8px;
  }

  ${media.xlarge} {
    width: 12px;
    height: 12px;
    border-width: 1.5px;
  }
`;

const CasesSection = () => {
  // Мемоизированные данные кейсов
  const cases = useMemo(
    () => [
      {
        id: 1,
        title: "GoalTime News Site",
        description:
          "A Ukrainian news site built on WordPress. With the help of automation, current news is posted there every day.",
        images: [goaltime_tablet, goaltime_phone],
      },
      {
        id: 2,
        title: "Lunar Aliens Site",
        description:
          "The official website of the crypto game Lunar Aliens created on HTML/CSS/JavaScript, also the site of the pre-sale of their GRIT token on the Solana blockchain using React + TypeScript.",
        images: [lunaraliens_tablet, lunaraliens_phone],
      },
    ],
    []
  );

  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Отслеживание размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Оптимизированные частицы (уменьшенное количество для мобильных)
  const particles = useMemo(
    () => {
      const count = isMobile ? 0 : 25;
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: ["#00ffff", "#ff0080", "#3a7bd5"][Math.floor(Math.random() * 3)],
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 2,
      }));
    },
    [isMobile]
  );

  // Оптимизированная навигация
  const scrollToIndex = useCallback(
    (index) => {
      if (trackRef.current) {
        const width = trackRef.current.clientWidth;
        const newIndex = Math.min(Math.max(index, 0), cases.length - 1);
        setCurrentIndex(newIndex);
        trackRef.current.scrollTo({
          left: width * newIndex,
          behavior: "smooth",
        });
      }
    },
    [cases.length]
  );

  // Touch handlers - оптимизированные
  const touchStart = useRef(0);

  const onTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStart.current - touchEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          scrollToIndex(currentIndex + 1);
        } else {
          scrollToIndex(currentIndex - 1);
        }
      }
    },
    [currentIndex, scrollToIndex]
  );

  // Упрощенные варианты анимации для лучшей производительности
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const caseVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <CasesSectionContainer id="cases">
      <BackgroundOverlay />

      {/* Оптимизированные частицы */}
      <ParticleField>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            color={particle.color}
            duration={particle.duration}
            delay={particle.delay}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </ParticleField>

      {/* <ScanLine /> */}

      {/* Заголовок */}
      <SectionHeader
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionTitle variants={titleVariants}>Our Cases</SectionTitle>
        <SectionSubtitle variants={titleVariants}>
          Explore our portfolio of cutting-edge digital solutions
        </SectionSubtitle>
      </SectionHeader>

      {/* Слайдер */}
      <CasesContainer>
        <CasesTrack
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {cases.map((project) => (
            <Case
              key={project.id}
              variants={caseVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <CaseContent
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <CaseTitle
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false }}
                >
                  {project.title}
                </CaseTitle>

                <CaseDescription
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: false }}
                >
                  {project.description}
                </CaseDescription>

                <DeviceShowcase
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  <DeviceContainer className="tablet-container">
                    <DeviceFrame type="tablet">
                      <DeviceScreen type="tablet">
                        <img src={project.images[0]} alt="Tablet preview" />
                      </DeviceScreen>
                      <TabletHome />
                    </DeviceFrame>
                  </DeviceContainer>

                  <DeviceContainer className="phone-container">
                    <DeviceFrame type="phone">
                      <DeviceScreen type="phone">
                        <img src={project.images[1]} alt="Phone preview" />
                      </DeviceScreen>
                      <PhoneHome />
                      <PhoneSpeaker />
                    </DeviceFrame>
                  </DeviceContainer>
                </DeviceShowcase>
                <ComingSoonButton/>
                {/* <LearnMoreLink to={`/cases/${project.id}`}>
                  <LearnMoreButton
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: false }}
                  >
                    <span>Learn More</span>
                  </LearnMoreButton>
                </LearnMoreLink> */}
              </CaseContent>
            </Case>
          ))}
        </CasesTrack>

        {/* Навигационные кнопки */}
        <NavButtonLeft
          onClick={() => scrollToIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          whileTap={{ scale: 0.9 }}
        >
          ‹
        </NavButtonLeft>

        <NavButtonRight
          onClick={() => scrollToIndex(currentIndex + 1)}
          disabled={currentIndex === cases.length - 1}
          whileTap={{ scale: 0.9 }}
        >
          ›
        </NavButtonRight>

        {/* Индикаторы */}
        {/* <IndicatorContainer>
          {cases.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </IndicatorContainer> */}
      </CasesContainer>
    </CasesSectionContainer>
  );
};

export default CasesSection;