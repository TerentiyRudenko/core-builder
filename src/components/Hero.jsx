import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import * as THREE from "three";

// Система брейкпоинтов
const breakpoints = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1200,
  xxl: 1440,
};

// Функция для генерации media queries
const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

// Responsive функция для масштабирования значений
const responsive = (values) => {
  const sortedBreakpoints = Object.entries(breakpoints).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedBreakpoints
    .map(([key, size]) => {
      if (values[key]) {
        return css`
          @media (max-width: ${size}px) {
            ${values[key]}
          }
        `;
      }
      return "";
    })
    .join("");
};

// Функция для fluid типографики
const fluidSize = (minSize, maxSize, minVw = 320, maxVw = 1200) => {
  return `clamp(${minSize}rem, ${minSize}rem + (${maxSize} - ${minSize}) * ((100vw - ${minVw}px) / (${maxVw} - ${minVw})), ${maxSize}rem)`;
};

// Конфигурация для разных устройств
const deviceConfig = {
  xxl: { particles: 50, matrixColumns: 60, hexSize: 35 },
  xl: { particles: 45, matrixColumns: 50, hexSize: 30 },
  lg: { particles: 35, matrixColumns: 40, hexSize: 25 },
  md: { particles: 25, matrixColumns: 30, hexSize: 20 },
  sm: { particles: 15, matrixColumns: 20, hexSize: 15 },
  xs: { particles: 10, matrixColumns: 15, hexSize: 12 }
};

// Хук для определения текущего устройства
const useDevice = () => {
  const [device, setDevice] = useState('xl');
  
  useEffect(() => {
    const getDevice = () => {
      const width = window.innerWidth;
      for (const [key, breakpoint] of Object.entries(breakpoints).reverse()) {
        if (width <= breakpoint) {
          return key;
        }
      }
      return 'xxl';
    };
    
    setDevice(getDevice());
    
    const handleResize = () => setDevice(getDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return device;
};


// Анимации для фона
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const scanline = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
`;

const glitch = keyframes`
  0%, 100% { transform: translate(0); }
  10% { transform: translate(-2px, 2px); }
  20% { transform: translate(2px, -2px); }
  30% { transform: translate(-2px, -2px); }
  40% { transform: translate(2px, 2px); }
  50% { transform: translate(-2px, 2px); }
  60% { transform: translate(2px, -2px); }
  70% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 2px); }
  90% { transform: translate(-2px, 2px); }
`;

const wave = keyframes`
  0%, 100% { transform: translateY(0px) rotateZ(0deg); }
  25% { transform: translateY(-10px) rotateZ(1deg); }
  50% { transform: translateY(-20px) rotateZ(0deg); }
  75% { transform: translateY(-10px) rotateZ(-1deg); }
`;

const matrix = keyframes`
  0% { transform: translateY(-100vh); opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

const energyWave = keyframes`
  0% { 
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: scale(3) rotate(360deg);
    opacity: 0;
  }
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(
      circle at 20% 80%,
      rgba(0, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 0, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 40%,
      rgba(0, 255, 127, 0.1) 0%,
      transparent 50%
    ),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;
  perspective: 1000px;
  padding: 1rem;

  @media (max-width: 768px) {
    min-height: 100svh;
    padding: 0.5rem;
    perspective: 500px;
  }

  @media (max-width: 480px) {
    min-height: 100svh;
    padding: 0.25rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        90deg,
        transparent,
        transparent 98px,
        rgba(0, 255, 255, 0.02) 100px
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(255, 0, 255, 0.02) 100px
      );
    animation: ${pulse} 4s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 255, 255, 0.8),
      transparent
    );
    animation: ${scanline} 3s linear infinite;
  }
`;

const ThreeJSCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const MatrixRain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`;

const MatrixColumn = styled.div`
  position: absolute;
  top: -100vh;
  font-family: "Courier New", monospace;
  font-size: 14px;
  color: rgba(0, 255, 255, 0.6);
  white-space: pre;
  line-height: 14px;
  animation: ${matrix} ${(props) => props.duration}s linear infinite;
  animation-delay: ${(props) => props.delay}s;
  text-shadow: 0 0 5px currentColor;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 255, 255, 0.4);
  }

  @media (max-width: 480px) {
    font-size: 10px;
    line-height: 10px;
    color: rgba(0, 255, 255, 0.3);
  }
`;

const EnergyOrb = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(0, 255, 255, 0.8),
    rgba(0, 255, 255, 0.4),
    rgba(0, 255, 255, 0.1),
    transparent
  );
  box-shadow: 0 0 50px rgba(0, 255, 255, 0.6),
    inset 0 0 50px rgba(0, 255, 255, 0.2);
  animation: ${wave} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    border: 2px solid rgba(0, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${energyWave} 2s ease-out infinite;
    animation-delay: ${(props) => props.delay}s;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.5),
      inset 0 0 40px rgba(0, 255, 255, 0.2);
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.4),
      inset 0 0 30px rgba(0, 255, 255, 0.1);
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 2px solid ${(props) => props.color};
  border-radius: ${(props) => (props.rounded ? "50%" : "0")};
  background: ${(props) =>
    `linear-gradient(45deg, ${props.color}20, transparent)`};
  animation: ${float} ${(props) => props.duration}s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  backdrop-filter: blur(1px);
  box-shadow: 0 0 20px ${(props) => props.color}40;

  @media (max-width: 768px) {
    width: ${(props) => Math.max(props.size * 0.7, 30)}px;
    height: ${(props) => Math.max(props.size * 0.7, 30)}px;
    box-shadow: 0 0 15px ${(props) => props.color}30;
  }

  @media (max-width: 480px) {
    width: ${(props) => Math.max(props.size * 0.5, 20)}px;
    height: ${(props) => Math.max(props.size * 0.5, 20)}px;
    box-shadow: 0 0 10px ${(props) => props.color}20;
    animation-duration: ${(props) => props.duration * 1.5}s;
  }
`;

const RotatingRing = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid #00ffff;
  animation: ${rotate} 20s linear infinite;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  transform: translateZ(50px);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    transform: translateZ(30px);
    animation-duration: 25s;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    transform: translateZ(20px);
    animation-duration: 30s;
    opacity: 0.6;
  }
`;

const HexGrid = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 1;

  @media (max-width: 768px) {
    opacity: 0.06;
  }

  @media (max-width: 480px) {
    opacity: 0.04;
    display: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
    transform-style: flat;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    transform-style: flat;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 8vw, 6rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f, #00ffff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* animation: ${pulse} 3s ease-in-out infinite; */
  /* text-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3),
    0 0 30px rgba(0, 255, 255, 0.2); */
  transform: translateZ(50px);
  line-height: 1.1;

  @media (max-width: 1024px) {
    font-size: clamp(2.5rem, 6vw, 5rem);
    transform: translateZ(30px);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 7vw, 4rem);
    transform: translateZ(30px);
    /* text-shadow: 0 0 8px rgba(0, 255, 255, 0.4), 0 0 15px rgba(0, 255, 255, 0.2);
    filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.4)); */
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
    transform: none;
    /* text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
    filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3)); */
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  @media (max-width: 320px) {
    font-size: clamp(1.2rem, 9vw, 2rem);
  }
`;

const Subtitle = styled(motion.p)`
  /* font-size: larger; */
  font-size: clamp(1rem, 3vw, 1.8rem);
  max-width: 1600px;
  margin-bottom: 3rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  transform: translateZ(30px) /*translateX(200px)*/;
  font-weight: 300;
  letter-spacing: 0.5px;

  /* @media (max-width: 1024px) {
    font-size: medium;
    transform: translateZ(20px);
  } */

  @media (max-width: 1060px) {
    font-size: clamp(2rem, 1vw, 2rem);
    transform: translateX(-15px);
  }

  @media (max-width: 1024px) {

  }

  @media (max-width: 800px) {
    font-size: 100%;
    transform: translateZ(30px);
  }

  @media (max-width: 768px) {
    font-size: 100%;
    transform: translateZ(30px);
  }

  @media (max-width: 600px) {
    /* font-size: clamp(1.8rem, 2vw, 3.5rem); */
    font-size: 100%;
    transform: translateZ(20px);
  }

  @media (max-width: 480px) {
    font-size: 100%;
    transform: translateZ(20px);
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 3rem;
  font-size: 1.1rem;
  border: 2px solid transparent;
  border-radius: 50px;
  background: linear-gradient(#0a0a0a, #0a0a0a) padding-box,
    linear-gradient(45deg, #00ffff, #ff00ff, #00ff7f) border-box;
  color: #00ffff;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  transform: translateZ(40px);
  backdrop-filter: blur(10px);
  min-width: 200px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.6),
      inset 0 0 20px rgba(0, 255, 255, 0.1);
    transform: translateZ(50px) translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateZ(45px) translateY(1px);
  }

  @media (max-width: 768px) {
    padding: 0.9rem 2.5rem;
    font-size: 1rem;
    letter-spacing: 1.5px;
    transform: translateZ(25px);
    margin-bottom: 2.5rem;
    min-width: 180px;

    &:hover {
      transform: translateZ(30px) translateY(-1px);
    }

    &:active {
      transform: translateZ(25px) translateY(0px);
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
    letter-spacing: 1px;
    transform: none;
    margin-bottom: 2rem;
    min-width: 160px;
    backdrop-filter: blur(5px);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
        inset 0 0 15px rgba(0, 255, 255, 0.1);
    }

    &:active {
      transform: translateY(0px);
    }
  }

  @media (max-width: 320px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.8rem;
    min-width: 140px;
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: translateZ(40px);
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.4),
        inset 0 0 15px rgba(0, 255, 255, 0.1);
    }
  }
`;

const ArrowDown = styled(motion.div)`
  position: absolute;
  bottom: -10px;
  left: 48.3%;
  font-size: 2.5rem;
  cursor: pointer;
  color: #00ffff;
  z-index: 10;
  filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
`;

const ParticleSystem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${(props) => props.color};
  border-radius: 50%;
  box-shadow: 0 0 10px ${(props) => props.color};
`;

const Hero = () => {
  const fullText = "Build. Innovate. Dominate.";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [matrixColumns, setMatrixColumns] = useState([]);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  const useResponsive = () => {
    const [screenSize, setScreenSize] = useState("lg");

    useEffect(() => {
      const updateSize = () => {
        const width = window.innerWidth;
        if (width < 480) setScreenSize("xs");
        else if (width < 768) setScreenSize("sm");
        else if (width < 1024) setScreenSize("md");
        else setScreenSize("lg");
      };

      window.addEventListener("resize", updateSize);
      updateSize();

      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return screenSize;
  };

  // Инициализация Three.js сцены
  useEffect(() => {
    if (!canvasRef.current) return;

    // Создание сцены, камеры и рендерера
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Создание 3D объектов
    const geometries = [];
    const materials = [];
    const meshes = [];

    // Тор
    const torusGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-8, 2, -5);
    scene.add(torus);
    meshes.push(torus);

    // Икосаэдр
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const icosahedron = new THREE.Mesh(
      icosahedronGeometry,
      icosahedronMaterial
    );
    icosahedron.position.set(8, -2, -3);
    scene.add(icosahedron);
    meshes.push(icosahedron);

    // Октаэдр
    const octahedronGeometry = new THREE.OctahedronGeometry(1.2);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff7f,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(0, 4, -8);
    scene.add(octahedron);
    meshes.push(octahedron);

    // Создание частиц
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = window.innerWidth < 768 ? 1000 : 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0;
        colors[i + 1] = 1;
        colors[i + 2] = 1; // cyan
      } else if (colorChoice < 0.66) {
        colors[i] = 1;
        colors[i + 1] = 0;
        colors[i + 2] = 1; // magenta
      } else {
        colors[i] = 0;
        colors[i + 1] = 1;
        colors[i + 2] = 0.5; // green
      }
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    // Анимационный цикл
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Анимация мешей
      meshes[0].rotation.x += 0.005;
      meshes[0].rotation.y += 0.01;

      meshes[1].rotation.x += 0.008;
      meshes[1].rotation.z += 0.006;

      meshes[2].rotation.y += 0.012;
      meshes[2].rotation.x += 0.004;

      // Анимация частиц
      particleSystem.rotation.y += 0.002;
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.001;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Движение камеры
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Обработка изменения размера окна
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      geometries.forEach((geo) => geo.dispose());
      materials.forEach((mat) => mat.dispose());
    };
  }, []);

  // Создание эффекта матрицы
  useEffect(() => {
    const characters =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдежзийклмнопрстуфхцчшщъыьэюя";
    const columns = Math.floor(window.innerWidth / 20);
    const newColumns = [];

    for (let i = 0; i < columns; i++) {
      const columnText = Array.from(
        { length: 50 },
        () => characters[Math.floor(Math.random() * characters.length)]
      ).join("\n");

      newColumns.push({
        id: i,
        text: columnText,
        left: `${i * 20}px`,
        duration: 8 + Math.random() * 6,
        delay: Math.random() * 10,
      });
    }

    setMatrixColumns(newColumns);
  }, []);

  // Создание частиц
  useEffect(() => {
    const getParticleCount = () => {
      if (window.innerWidth < 480) return 20;
      if (window.innerWidth < 768) return 35;
      return 50;
    };

    const newParticles = [];
    const particleCount = getParticleCount();

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: ["#00ffff", "#ff00ff", "#00ff7f"][Math.floor(Math.random() * 3)],
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      });
    }
    setParticles(newParticles);

    const handleResize = () => {
      const newCount = getParticleCount();
      if (newCount !== particles.length) {
        const updatedParticles = [];
        for (let i = 0; i < newCount; i++) {
          updatedParticles.push({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            color: ["#00ffff", "#ff00ff", "#00ff7f"][
              Math.floor(Math.random() * 3)
            ],
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4,
          });
        }
        setParticles(updatedParticles);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleClick = () => {
    scrollToSection("intro");
  };

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Создание шестиугольной сетки
  const createHexPattern = () => {
    const hexagons = [];

    const getGridParams = () => {
      if (window.innerWidth < 480) {
        return { rows: 4, cols: 6, hexSize: 20 };
      }
      if (window.innerWidth < 768) {
        return { rows: 6, cols: 8, hexSize: 25 };
      }
      return { rows: 8, cols: 12, hexSize: 30 };
    };

    const { rows, cols, hexSize } = getGridParams();

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
        const y = row * hexSize * 0.87;

        hexagons.push(
          <motion.polygon
            key={`${row}-${col}`}
            points={`${hexSize},0 ${hexSize * 0.75},${hexSize * 0.42} ${
              hexSize * 0.25
            },${hexSize * 0.42} 0,0 ${hexSize * 0.25},${-hexSize * 0.42} ${
              hexSize * 0.75
            },${-hexSize * 0.42}`}
            fill="rgba(0, 255, 255, 0.03)"
            stroke="rgba(0, 255, 255, 0.08)"
            strokeWidth="0.3"
            transform={`translate(${x},${y})`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: Math.random() * 0.5 }}
          />
        );
      }
    }
    return hexagons;
  };

  return (
    <HeroSection>
      {/* <ThreeJSCanvas ref={canvasRef} /> */}

      <HexGrid>
        <g transform="rotate(15)">{createHexPattern()}</g>
      </HexGrid>

      <BackgroundElements>
        {matrixColumns.map((column) => (
          <MatrixColumn
            key={column.id}
            style={{ left: column.left }}
            duration={column.duration}
            delay={column.delay}
          >
            {column.text}
          </MatrixColumn>
        ))}

        <EnergyOrb delay={0.2} style={{ top: "20%", left: "10%" }} />
        <EnergyOrb delay={0.5} style={{ top: "70%", left: "80%" }} />

        <FloatingShape
          color="#00ffff"
          size={40}
          duration={8}
          delay={0}
          style={{ top: "30%", left: "85%" }}
        />
        <FloatingShape
          color="#ff00ff"
          size={30}
          duration={6}
          delay={0.3}
          rounded
          style={{ top: "60%", left: "15%" }}
        />

        <RotatingRing top={20} left={80} />
        <RotatingRing top={70} left={20} />
      </BackgroundElements>

      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {typedText}
        </Title>

        <Subtitle
          initial={{ opacity: 0 /*x: 100*/ }}
          animate={{ opacity: 1 /*x: 0*/ }}
          transition={{ duration: 1, delay: 1 }}
        >
          CoreBuilder transforms your digital presence 
          with cutting-edge,
          bespoke websites that transcend 
          reality and enter the digital
          metaverse.
        </Subtitle>

        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          Explore Now
        </Button>

        <ArrowDown
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollToSection("content")}
        >
          ↓
        </ArrowDown>
      </ContentWrapper>

      <ParticleSystem>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </ParticleSystem>
    </HeroSection>
  );
};

export default Hero;
