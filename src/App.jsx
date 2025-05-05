// src/App.tsx
import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import Layout from "./layout/Layout";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

// Глобальные стили
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text};
  }
`;

// Тема
const theme = {
  bg: "#ffeee",
  text: "#ffffff",
  accent: "#61dafb",
};

// Стилизованный контейнер
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

// Анимированный блок
const Box = styled(motion.div)`
  background-color: ${(props) => props.theme.accent};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px ${(props) => props.theme.accent};
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Layout>
          <Header />
          <Box
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Hello, Vite + React + Styled + Motion!
          </Box>
          <Footer />
        </Layout>
      </Container>
    </ThemeProvider>
  );
};

export default App;
