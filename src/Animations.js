// components/animations.js
import { keyframes } from "styled-components";

export const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

export const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(153, 69, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(153, 69, 255, 0.6); }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

export const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(50px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;
