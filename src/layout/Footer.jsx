// src/layout/Footer.jsx
import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  padding: 24px 0;
  background: #f1f1f1;
  text-align: center;
  font-size: 14px;
`

export default Footer
