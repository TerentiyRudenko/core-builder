import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ModalNotification } from "./ModalNotification";

// Breakpoints и media queries (если нет отдельного файла media.js)
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px',
  xlarge: '1400px'
};

const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  large: `@media (min-width: ${breakpoints.large})`,
  xlarge: `@media (min-width: ${breakpoints.xlarge})`
};

export const ComingSoonButton = ({ initialText = "Learn More" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e) => {
    if (e?.preventDefault) e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <StyledButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: false }}
        onClick={handleClick}
      >
        <span>{initialText}</span>
      </StyledButton>

      <ModalNotification
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="In development. Coming soon!"
        duration={3000}
        styles={{
          background: "linear-gradient(135deg, #1a0b2e, #16213e)",
          color: "#00ffff",
          border: "2px solid #00ffff",
          fontFamily: "inherit",
          fontSize: "1.1rem",
          borderRadius: "15px",
          padding: "1.5rem 2rem",
          boxShadow: "0 20px 40px rgba(0, 255, 255, 0.2), 0 0 30px rgba(0, 255, 255, 0.1)"
        }}
      />
    </>
  );
};

const StyledButton = styled(motion.button)`
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