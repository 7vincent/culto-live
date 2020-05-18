import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
// import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  /* @import url('https://fonts.googleapis.com/css?family=Inconsolata:400,700&display=swap'); */
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font: 14px 'Inconsolata', sans-serif;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
  .loading {
    margin: 0 auto;
  }
  .algo{
    width: 100%;
    height: 50px;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-radius: 4px;

  }



`;
