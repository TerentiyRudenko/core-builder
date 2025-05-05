// src/layout/Layout.jsx
import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const Container = styled.div`
  max-width: 1645px;
  margin: 0 auto;
  padding: 0 16px;
`

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <MainWrapper>
        <Container>{children}</Container>
      </MainWrapper>
      <Footer />
    </>
  )
}

const MainWrapper = styled.main`
  flex: 1;
  padding: 40px 0;
`

export default Layout
