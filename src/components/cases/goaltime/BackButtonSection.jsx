import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const BackButtonSection = () => {
  return (
    <Section>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionText>
            Learn more about our projects and services on the main page
          </SectionText>

          <ButtonsContainer>
            <PrimaryButton
              to="/"
              as={motion.div}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(79, 172, 254, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ButtonIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ButtonIcon>
              <StyledLink to="/">Back to Homepage</StyledLink>
            </PrimaryButton>

            <SecondaryButton
              to="/contact"
              as={motion.div}
              whileHover={{
                scale: 1.05,
                background: "rgba(79, 172, 254, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Contact Us</span>
              <ButtonIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ButtonIcon>
            </SecondaryButton>
          </ButtonsContainer>
        </motion.div>
      </ContentWrapper>

      <FooterWrapper>
        <FooterContent>
          <Copyright>© 2025 GoalTime News. All rights reserved.</Copyright>
          <SocialLinks>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              as={motion.a}
              whileHover={{ scale: 1.2, color: "#4facfe" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SocialLink>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              as={motion.a}
              whileHover={{ scale: 1.2, color: "#4facfe" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              as={motion.a}
              whileHover={{ scale: 1.2, color: "#4facfe" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7616 8.09206 10.9099 8.47033 10.1584C8.84861 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterContent>
      </FooterWrapper>

      <BackgroundGlow top="20%" left="10%" size="300px" color="rgba(79, 172, 254, 0.05)" />
      <BackgroundGlow top="80%" left="70%" size="350px" color="rgba(0, 242, 254, 0.04)" />
    </Section>
  )
}

export default BackButtonSection

const Section = styled.section`
  position: relative;
  background: linear-gradient(180deg, #0A0E1A 0%, #0B0C10 100%);
  padding: 6rem 2rem 0;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 6rem;
  position: relative;
  z-index: 1;
`

const SectionText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`

const ButtonBase = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.8rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 100%;
  }
`

const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
`

const SecondaryButton = styled(ButtonBase)`
  background: rgba(79, 172, 254, 0.1);
  color: #fff;
  border: 1px solid rgba(79, 172, 254, 0.3);
`

const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
`

const FooterWrapper = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  position: relative;
  z-index: 1;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Copyright = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
  }
`

const BackgroundGlow = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
`
const StyledLink = styled(Link)`
  color: #fff;
  /* display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
  font-weight: bold;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0072ff, #00c6ff);
    transform: translateY(-3px);
  } */
`