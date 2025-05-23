import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPhone, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const CTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const sectionRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Thank you! We'll contact you soon.");
      setIsFormOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: 50,
        message: ""
      });
      // Scroll back to top after submission
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStartedClick = () => {
    setIsFormOpen(true);
    // Wait for form to render before scrolling
    setTimeout(() => {
      formRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "center"
      });
    }, 100);
  };

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatBudget = (value) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue) || numericValue == 0) return "Not sure";
    if (numericValue <= 10) return "Under $5k";
    if (numericValue <= 25) return "$5k–15k";
    if (numericValue <= 45) return "$15k–50k";
    if (numericValue <= 60) return "$50k–70k";
    if (numericValue <= 85) return "$70k–100k";
    return "Over $100k";
  };
  
  
  const getBudgetAmount = (value) => {
    const numericValue = parseInt(value, 10);
    // 0–100% -> $0 – $100,000
    const amount = Math.round((numericValue / 100) * 100000);
    return `$${amount.toLocaleString()}`;
  };  
  
  return (
    <CTASection id="cta-section" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      >
        {!isFormOpen ? (
          <CTAContainer>
            <CTATitle>Ready to start your project?</CTATitle>
            <CTASubtitle>
              Contact us today and let's discuss how we can help you achieve
              your goals
            </CTASubtitle>
            <CTAButton
              onClick={handleGetStartedClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ marginRight: "10px" }}
              />
              Get Started
            </CTAButton>
            {/* <AlternativeContact>
              <span>Or call us directly:</span>
              <PhoneLink href="tel:+1234567890">
                <FontAwesomeIcon icon={faPhone} />
                +1 (234) 567-890
              </PhoneLink>
            </AlternativeContact> */}
          </CTAContainer>
        ) : (
          <>
            <FormContainer
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FormTitle>Tell us about your project</FormTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Your Name*</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    hasError={!!errors.name}
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email Address*</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    hasError={!!errors.email}
                  />
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="budget">
                    Project Budget:{" "}
                    <strong>{formatBudget(formData.budget)}</strong>
                  </Label>
                  <FormGroup>
                    <RangeWrapper>
                      <TooltipBubble style={{ left: `${formData.budget}%` }}>
                        {getBudgetAmount(formData.budget)}
                      </TooltipBubble>
                      <RangeInput
                        type="range"
                        id="budget"
                        name="budget"
                        min="0"
                        max="100"
                        step="1"
                        value={formData.budget}
                        onChange={handleInputChange}
                      />
                    </RangeWrapper>
                  </FormGroup>

                  <RangeLabels>
                    <span>Not sure</span>
                    <span>Under $5k</span>
                    <span>$5k–15k</span>
                    <span>$15k–50k</span>
                    <span>$50k-$70k</span>
                    <span>$70k-$100k</span>
                    <span>Over $100k</span>
                  </RangeLabels>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Project Details</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </FormGroup>

                <FormActions>
                  <SubmitButton
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Request
                  </SubmitButton>
                  <CancelButton
                    type="button"
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      style={{ marginRight: "8px" }}
                    />
                    Back to Top
                  </CancelButton>
                  <CancelButton
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </CancelButton>
                </FormActions>
              </Form>
            </FormContainer>
          </>
        )}
      </motion.div>
    </CTASection>
  );
};

// Styled Components
const CTASection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0070f3 0%, #0061d6 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  scroll-margin-top: 80px; /* For fixed headers */

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    scroll-margin-top: 60px;
  }
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: white;
  color: #0070f3;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

const AlternativeContact = styled.div`
  margin-top: 2rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PhoneLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
    transform: translateY(-1px);
  }
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 700px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  color: #333;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #0070f3;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
  color: #444;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.hasError ? "#ff4444" : "#ddd"};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: ${props => props.hasError ? "#fff8f8" : "white"};

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? "#ff4444" : "#0070f3"};
    box-shadow: 0 0 0 2px ${props => props.hasError ? "rgba(255, 68, 68, 0.2)" : "rgba(0, 112, 243, 0.2)"};
  }
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const ErrorText = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.2rem;
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #0070f3;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #0061d6;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const CancelButton = styled(motion.button)`
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const RangeInput = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  appearance: none;
  height: 6px;
  border-radius: 5px;
  background: #ddd;
  outline: none;
  transition: background 0.3s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #0070f3;
    cursor: pointer;
    transition: background 0.3s;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #0070f3;
    cursor: pointer;
  }

  &:focus {
    background: #ccc;
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #555;
  margin-top: 0.5rem;
`;

const RangeWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 2rem;
`;

const TooltipBubble = styled.div`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  background: #0070f3;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  white-space: nowrap;
  pointer-events: none;
  transition: left 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #0070f3 transparent transparent transparent;
  }
`;




export default CTA;