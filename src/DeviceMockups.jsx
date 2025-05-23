import React from 'react'
import styled from 'styled-components'

const DeviceMockups = () => {
  return (
    <DevicesWrapper>
      <Laptop>
        <Screen />
        <Base />
      </Laptop>
      <Phone>
        <PhoneScreen />
        <Button />
      </Phone>
    </DevicesWrapper>
  )
}

export default DeviceMockups

const DevicesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  z-index: 2;
  position: relative;
`

const Laptop = styled.div`
  width: 300px;
  height: 180px;
  position: relative;
  transform: perspective(800px) rotateX(15deg);
`

const Screen = styled.div`
  width: 100%;
  height: 70%;
  background: #0f1117;
  border-radius: 12px 12px 0 0;
  border: 2px solid #4facfe;
  box-shadow: 0 5px 20px rgba(0,0,0,0.5);
`

const Base = styled.div`
  width: 100%;
  height: 30%;
  background: #1e212a;
  border-radius: 0 0 12px 12px;
  border: 2px solid #4facfe;
  border-top: none;
`

const Phone = styled.div`
  width: 80px;
  height: 160px;
  background: #0f1117;
  border-radius: 20px;
  border: 2px solid #00f2fe;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.5);
`

const PhoneScreen = styled.div`
  width: 70%;
  height: 85%;
  background: #1a1f2c;
  border-radius: 12px;
`

const Button = styled.div`
  position: absolute;
  bottom: 10px;
  width: 20px;
  height: 4px;
  background: #00f2fe;
  border-radius: 2px;
`
