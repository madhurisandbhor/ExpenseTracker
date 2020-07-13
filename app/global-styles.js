import { createGlobalStyle } from 'styled-components';
// import image from './images/fr_background.jpg';
import img1 from './images/piggy.jpg';
import img2 from './images/calculator.jpg';

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
    font-family: 'Lora', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', serif;
  }

  #app {
    min-height: 100vh;
    min-width: 100vw;
    font-size: 1.6rem;
   
    // background: linear-gradient(90deg, rgba(213,190,174,1) 0%, rgba(171,126,112,1) 84%);
    
    // background: url(${img1}) no-repeat center center fixed;    
    // background-size: cover;
    // background-position: bottom;
    background:lightgrey;
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
