import { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export const ModalNotification = ({
  isOpen,
  onClose,
  message,
  duration = 3000,
  styles = {},
}) => {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  // Обработчик клика по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          transition={{ duration: 0.2 }}
        >
          <ModalBox
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            style={styles}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton 
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            <MessageText>{message}</MessageText>
          </ModalBox>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
`;

const ModalBox = styled.div`
  background: white;
  color: black;
  padding: 2rem;
  border-radius: 15px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    font-size: 1rem;
    max-width: 300px;
  }
`;

const MessageText = styled.div`
  margin-top: 0.5rem;
  line-height: 1.4;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
  }
`;