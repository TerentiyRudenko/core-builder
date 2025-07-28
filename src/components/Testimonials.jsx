import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import avatar_1 from "../assets/users_photos/avatar_1.jpg";
import avatar_2 from "../assets/users_photos/avatar_2.jpg";
import avatar_3 from "../assets/users_photos/avatar_3.jpg";
import new_avatar_1 from "../assets/users_photos/new_avatar_1.png";
import new_avatar_2 from "../assets/users_photos/new_avatar_2.png";

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO, LunarAliens",
    text: "The team delivered our website ahead of schedule with exceptional attention to detail.",
    avatar: new_avatar_1,
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Marketing Director, GoalTime",
    text: "Our news site saw a 40% increase in conversions after the redesign.",
    avatar: new_avatar_2,
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearTimeout(autoPlayTimeoutRef.current);
  }, [currentIndex, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleUserNavigation = (navigationFn) => {
    setIsAutoPlaying(false);
    navigationFn();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, width: "0%" }}
      whileInView={{ opacity: 1, width: "100%", x: 0 }}
    //   animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      viewport={{ once: true }}>
    <TestimonialsSection
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        viewport={{ once: false }}
      >
        <SectionTitle>What Our Clients Say</SectionTitle>
        <SectionSubtitle> </SectionSubtitle>
      </motion.div>

      <TestimonialContainer>
        <NavigationButton 
          onClick={() => handleUserNavigation(prevTestimonial)} 
          aria-label="Previous"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </NavigationButton>

        <AnimatePresence mode="wait">
          <TestimonialCard
            key={testimonials[currentIndex].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar 
              src={testimonials[currentIndex].avatar} 
              alt={testimonials[currentIndex].name}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            />
            <TestimonialText>"{testimonials[currentIndex].text}"</TestimonialText>
            {/* <ClientName>{testimonials[currentIndex].name}</ClientName> */}
            <ClientRole>{testimonials[currentIndex].role}</ClientRole>
          </TestimonialCard>
        </AnimatePresence>

        <NavigationButton 
          onClick={() => handleUserNavigation(nextTestimonial)} 
          aria-label="Next"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </NavigationButton>
      </TestimonialContainer>

      <DotsContainer>
        {testimonials.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </DotsContainer>
    </TestimonialsSection>
    </motion.div>
  );
};

// Styled Components
const TestimonialsSection = styled(motion.section)`
  padding: 5rem 2rem;
  background: #f9f9f9;
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const TestimonialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto 2rem;
  max-width: 900px;
  position: relative;

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0 1rem;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 280px;
  }
`;

const Avatar = styled(motion.img)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1.5rem;
  display: block;
  border: 3px solid #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-bottom: 1rem;
  }
`;

const TestimonialText = styled.blockquote`
  font-size: 1.2rem;
  color: #555;
  font-style: italic;
  line-height: 1.7;
  margin-bottom: 2rem;
  position: relative;

  &::before, &::after {
    content: '"';
    color: #0070f3;
    font-size: 1.5rem;
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const ClientName = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.3rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ClientRole = styled.p`
  font-size: 1rem;
  color: #777;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NavigationButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #0070f3;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  background-color: rgba(0, 118, 255, 0.1);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    width: 40px;
    height: 40px;
    padding: 0.3rem;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
`;

const Dot = styled(motion.div)`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#0070f3" : "#ddd")};
  cursor: pointer;
  transition: background 0.3s;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

export default Testimonials;