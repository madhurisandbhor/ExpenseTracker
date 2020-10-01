import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100vh;
    width: 100vw;
    line-height: 1.5;
  }

  html {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 400;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Josefin Sans', sans-serif;
  }

  #app {
    min-height: 100vh;
    min-width: 100vw;
    font-size: 1.6rem;
    background:#e8e8e8;
  }

  p,
  label {
    font-weight: 300;
    line-height: 1.5rem;
  }

  image{
    min-height: 100%;
  }
`;

export default GlobalStyle;
