import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import goaltimeScreen from '@assets/cases-images/goaltime.png'

const GoalTime = () => {
  return (
    <Container>
      <Content>
        <Title>GoalTime News Site</Title>
        <Description>
          GoalTime is a Ukrainian news website built on WordPress. It automatically publishes up-to-date news every day using automated pipelines.
          <br /><br />
          Our team focused on delivering a stable and responsive platform optimized for fast publishing and high search engine performance. The design is fully adaptive and integrates seamlessly with various news sources.
        </Description>

        <Gallery>
          <img src={goaltimeScreen} alt="GoalTime Screenshot 1" />
          <img src="/cases/ai-2.jpg" alt="GoalTime Screenshot 2" />
        </Gallery>

        <BackButton to="/">← Back to Home</BackButton>
      </Content>
    </Container>
  )
}

export default GoalTime

// Styled Components
const Container = styled.div`
  padding: 4rem 2rem;
  background: #0b0c10;
  min-height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  max-width: 900px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 3rem;
  background: linear-gradient(90deg, #00d2ff, #3a7bd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
`

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
`

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;

  img {
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;

    img {
      width: 45%;
    }
  }
`

const BackButton = styled(Link)`
  display: inline-block;
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
  }
`
