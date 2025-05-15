import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import lunaraliensScreen from '@assets/cases-images/lunaraliens-case.png'

const LunarAliens = () => {
  return (
    <Wrapper>
      <Hero>
        <BackgroundImage src="/cases/ecom-bg.jpg" alt="Lunar Aliens Background" />
        <Overlay />
        <HeroContent>
          <h1>Lunar Aliens Site</h1>
          <p>
            The official site of the crypto game Lunar Aliens. Built with HTML/CSS/JavaScript and React + TypeScript for the GRIT token presale on Solana. The ecosystem integrates with Telegram and uses Solana & TON blockchains.
          </p>
          <BackButton to="/">← Back to Home</BackButton>
        </HeroContent>
      </Hero>

      <Details>
        <SectionTitle>Project Overview</SectionTitle>
        <InfoGrid>
          <Card>
            <h3>Technologies</h3>
            <ul>
              <li>React + TypeScript</li>
              <li>HTML/CSS/JS</li>
              <li>Solana & TON</li>
              <li>Telegram integration</li>
            </ul>
          </Card>
          <Card>
            <h3>Features</h3>
            <ul>
              <li>Token presale platform</li>
              <li>Web3 wallet integration</li>
              <li>Custom animations</li>
              <li>Fully responsive layout</li>
            </ul>
          </Card>
        </InfoGrid>

        <Gallery>
          <img src={lunaraliensScreen} alt="Lunar Aliens Screenshot 1" />
          <img src="/cases/ecom-2.jpg" alt="Lunar Aliens Screenshot 2" />
        </Gallery>
      </Details>
    </Wrapper>
  )
}

export default LunarAliens

// Styled Components
const Wrapper = styled.div`
  color: white;
  background: #0a0a0a;
`

const Hero = styled.section`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`

const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: 1;
`

const HeroContent = styled.div`
  z-index: 2;
  max-width: 800px;
  padding: 2rem;

  h1 {
    font-size: 3rem;
    background: linear-gradient(90deg, #ff6a00, #ee0979);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
`

const BackButton = styled(Link)`
  display: inline-block;
  padding: 0.7rem 1.5rem;
  border: 2px solid #ff6a00;
  color: #ff6a00;
  border-radius: 999px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #ff6a00;
    color: white;
  }
`

const Details = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #ee0979, #ff6a00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 3rem;
`

const Card = styled.div`
  background: #1a1a1a;
  border-radius: 1rem;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);

  h3 {
    margin-bottom: 1rem;
    color: #ff6a00;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
`

const Gallery = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;

  img {
    width: 100%;
    max-width: 500px;
    border-radius: 0.8rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }
`
