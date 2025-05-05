// src/layout/Header.jsx
import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Site Logo</h1>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  padding: 24px 0;
  background: #f7f7f7;
  text-align: center;
  color: black;
`

export default Header
