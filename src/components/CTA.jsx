import React, { useState, useRef } from "react";
import { Mail, Phone, ArrowUp, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://cjmgacitkjxwvltzjauh.supabase.co"; // Replace with your Supabase project URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqbWdhY2l0a2p4d3ZsdHpqYXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzAyMzIsImV4cCI6MjA2NDU0NjIzMn0.55x0KWcdhejqCpll0inQIsaP5q0XOlwhOiuvSpDXTBY"; // Replace with your Supabase public API key
const supabase = createClient(supabaseUrl, supabaseKey);

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 5rem 2rem;
  background: linear-gradient(to bottom right, #2563eb, #1d4ed8);
  color: white;
  text-align: center;
  scroll-margin-top: 80px;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: #1e3a8a;
  opacity: 0.1;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.75;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const GetStartedButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  color: #2563eb;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  &:hover {
    background: #f3f4f6;
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  }
  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s;
  }
  &:hover svg {
    transform: rotate(12deg);
  }
`;

const FormContainer = styled.div`
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  color: #1f2937;
`;

const FormHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 2rem;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const StatusMessage = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  font-size: 1.125rem;
  animation: ${({ type }) => type === 'success' ? 'successPulse 0.6s ease-out' : 'errorShake 0.5s ease-out'};
  
  @keyframes successPulse {
    0% { transform: scale(0.95); opacity: 0; }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes errorShake {
    0%, 20%, 40%, 60%, 80% { transform: translateX(0); }
    10%, 30%, 50%, 70% { transform: translateX(-5px); }
    15%, 35%, 55%, 75% { transform: translateX(5px); }
  }

  ${({ type }) =>
    type === "success"
      ? `
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border-color: #22c55e;
    color: #15803d;
    box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.2);
  `
      : `
    background: linear-gradient(135deg, #fef2f2, #fee2e2);
    border-color: #ef4444;
    color: #b91c1c;
    box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.2);
  `}

  svg {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-radius: 1rem;
  border: 2px solid #22c55e;
  box-shadow: 0 20px 40px -10px rgba(34, 197, 94, 0.3);
  animation: successSlideIn 0.8s ease-out;
  
  @keyframes successSlideIn {
    0% { 
      transform: translateY(20px) scale(0.95); 
      opacity: 0; 
    }
    100% { 
      transform: translateY(0) scale(1); 
      opacity: 1; 
    }
  }
`;

const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  animation: successIconBounce 0.6s ease-out 0.3s both;
  
  @keyframes successIconBounce {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  svg {
    width: 2rem;
    height: 2rem;
    color: white;
  }
`;

const SuccessTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  color: #15803d;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  font-size: 1.125rem;
  color: #166534;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const BudgetValue = styled.span`
  color: #2563eb;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  transition: all 0.3s;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
  ${({ error }) =>
    error
      ? `
    border-color: #ef4444;
    background: #fef2f2;
    &:focus {
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
    }
  `
      : `
    border-color: #d1d5db;
  `}
  ${({ isSubmitting }) =>
    isSubmitting &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  resize: vertical;
  transition: all 0.3s;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
  ${({ isSubmitting }) =>
    isSubmitting &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const BudgetContainer = styled.div`
  position: relative;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const BudgetTooltip = styled.div`
  position: absolute;
  top: 0;
  background: #2563eb;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.2s;
  left: ${({ value }) => `calc(${value}% - 1.5rem)`};
  transform: translateX(-50%);
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #2563eb;
  }
`;

const Slider = styled.input`
  width: 100%;
  height: 0.5rem;
  background: ${({ value }) =>
    `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`};
  border-radius: 0.5rem;
  appearance: none;
  cursor: pointer;
  outline: none;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  ${({ isSubmitting }) =>
    isSubmitting &&
    `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const BudgetLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  ${({ primary }) =>
    primary
      ? `
    background: #2563eb;
    color: white;
    &:hover:not(:disabled) {
      background: #1d4ed8;
      transform: scale(1.05);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
    }
  `
      : `
    background: #f3f4f6;
    color: #374151;
    &:hover:not(:disabled) {
      background: #e5e7eb;
      transform: scale(1.05);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
    }
  `}
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: scale(1);
    }
  `}
`;

const CTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "50",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);
  const sectionRef = useRef(null);

  // Telegram Bot Configuration
  const TELEGRAM_BOT_TOKEN = "8002186853:AAGnc6un43kwqMP5-KEK7bbsBw4gda2lHsk";
  const TELEGRAM_CHAT_ID = "5050081002";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
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
    if (
      formData.phone &&
      formData.phone.trim() &&
      !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendToTelegram = async (data) => {
    const message = `
🚀 *Новая заявка с сайта*

👤 *Имя:* ${data.name}
📧 *Email:* ${data.email}
📞 *Телефон:* ${data.phone || "Не указан"}
💰 *Бюджет:* ${formatBudget(data.budget)} (${getBudgetAmount(data.budget)})
📝 *Детали проекта:*
${data.message || "Не указаны"}

⏰ *Время:* ${new Date().toLocaleString("ru-RU")}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return response;
  };

  const saveToSupabase = async (data) => {
    const { error } = await supabase.from("form_submissions").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        budget: `${formatBudget(data.budget)} (${getBudgetAmount(data.budget)})`,
        message: data.message || null,
      },
    ]);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send to Telegram
      const telegramResponse = await sendToTelegram(formData);

      if (!telegramResponse.ok) {
        const errorData = await telegramResponse.json();
        throw new Error(`Telegram API error: ${errorData.description || telegramResponse.status}`);
      }

      const telegramResult = await telegramResponse.json();
      if (!telegramResult.ok) {
        throw new Error(telegramResult.description || "Failed to send message to Telegram");
      }

      // Save to Supabase
      await saveToSupabase(formData);

      setShowSuccess(true);
      setSubmitStatus({
        type: "success",
        message: "Заявка успешно отправлена! Мы свяжемся с вами в течение 24 часов.",
      });

      // Automatically close the form and scroll to top after 4 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          budget: "50",
          message: "",
        });
        setIsFormOpen(false);
        setShowSuccess(false);
        setSubmitStatus(null);
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 4000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message: `Ошибка отправки: ${error.message}. Пожалуйста, попробуйте еще раз.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetStartedClick = () => {
    setIsFormOpen(true);
    setSubmitStatus(null);
    setShowSuccess(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewRequest = () => {
    setShowSuccess(false);
    setSubmitStatus(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: "50",
      message: "",
    });
    setErrors({});
  };

  const formatBudget = (value) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue) || numericValue === 0) return "Not sure";
    if (numericValue <= 15) return "Under $5k";
    if (numericValue <= 35) return "$5k–15k";
    if (numericValue <= 55) return "$15k–50k";
    if (numericValue <= 75) return "$50k–100k";
    if (numericValue <= 90) return "$100k–250k";
    return "Over $250k";
  };

  const getBudgetAmount = (value) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue) || numericValue === 0) return "Not sure";

    let amount;
    if (numericValue <= 15)
      amount = Math.round((numericValue / 15) * 5000);
    else if (numericValue <= 35)
      amount = 5000 + Math.round(((numericValue - 15) / 20) * 10000);
    else if (numericValue <= 55)
      amount = 15000 + Math.round(((numericValue - 35) / 20) * 35000);
    else if (numericValue <= 75)
      amount = 50000 + Math.round(((numericValue - 55) / 20) * 50000);
    else if (numericValue <= 90)
      amount = 100000 + Math.round(((numericValue - 75) / 15) * 150000);
    else
      amount = 250000 + Math.round(((numericValue - 90) / 10) * 250000);

    if (amount === 0) return "Not sure";
    return `$${amount.toLocaleString()}`;
  };

  return (
    <Section id="cta-section" ref={sectionRef}>
      <BackgroundOverlay />
      <Content>
        {!isFormOpen ? (
          <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
            <Heading>Ready to start your project?</Heading>
            <SubHeading>
              Contact us today and let’s discuss how we can help you achieve your
              goals
            </SubHeading>
            <GetStartedButton onClick={handleGetStartedClick}>
              <Mail />
              Get Started
            </GetStartedButton>
          </div>
        ) : showSuccess ? (
          <SuccessContainer>
            <SuccessIcon>
              <CheckCircle />
            </SuccessIcon>
            <SuccessTitle>Заявка отправлена!</SuccessTitle>
            <SuccessMessage>
              Спасибо за ваш интерес к нашим услугам! Мы получили вашу заявку и свяжемся с вами в течение 24 часов для обсуждения деталей проекта.
            </SuccessMessage>
            <ButtonGroup>
              <Button primary onClick={handleNewRequest}>
                <Send />
                Отправить еще одну заявку
              </Button>
              <Button onClick={scrollToTop}>
                <ArrowUp />
                Закрыть
              </Button>
            </ButtonGroup>
          </SuccessContainer>
        ) : (
          <FormContainer ref={formRef}>
            <FormHeading>Tell us about your project</FormHeading>

            {submitStatus && (
              <StatusMessage type={submitStatus.type}>
                {submitStatus.type === "success" ? <CheckCircle /> : <XCircle />}
                <span>{submitStatus.message}</span>
              </StatusMessage>
            )}

            <Form>
              <FormGroup>
                <Label htmlFor="name">Your Name*</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  error={errors.name}
                  isSubmitting={isSubmitting}
                  placeholder="Enter your full name"
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  error={errors.email}
                  isSubmitting={isSubmitting}
                  placeholder="your@email.com"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  error={errors.phone}
                  isSubmitting={isSubmitting}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="budget">
                  Project Budget: <BudgetValue>{formatBudget(formData.budget)}</BudgetValue>
                </Label>
                <BudgetContainer>
                  <BudgetTooltip value={formData.budget}>
                    {getBudgetAmount(formData.budget)}
                  </BudgetTooltip>
                  <Slider
                    type="range"
                    id="budget"
                    name="budget"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.budget}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                  />
                </BudgetContainer>
                <BudgetLabels>
                  <span>Not sure</span>
                  <span>Under $5k</span>
                  <span>$5k–15k</span>
                  <span>$15k–50k</span>
                  <span>$50k–100k</span>
                  <span>$100k–250k</span>
                  <span>Over $250k</span>
                </BudgetLabels>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Project Details</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows="4"
                  isSubmitting={isSubmitting}
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                />
              </FormGroup>

              <ButtonGroup>
                <Button type="button" primary disabled={isSubmitting} onClick={handleSubmit}>
                  {isSubmitting ? (
                    <>
                      <Loader2 style={{ animation: "spin 1s linear infinite" }} />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send />
                      Send Request
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={scrollToTop}
                  disabled={isSubmitting}
                >
                  <ArrowUp />
                  Back to Top
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setSubmitStatus(null);
                    setShowSuccess(false);
                    setErrors({});
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          </FormContainer>
        )}
      </Content>
    </Section>
  );
};

export default CTA;