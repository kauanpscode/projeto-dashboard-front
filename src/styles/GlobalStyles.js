import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin:0;
    padding:0;
    outline:none;
    box-sizing:border-box;
  }

  body {
    font-family: "Calibri", sans-serif;
    font-size: 1;
    background: #fff;
    color:black;
  }

  html,body,#root {
    height:100%;
  }

  button {
    cursor:pointer;
    background: #000d8b;
    color: #fff;
    padding: 10px 20px;
    border-radius: 2px;
    font-weight: 700;
    transition: all 300ms;
  }

  button:hover {
    filter: brightness(70%)
  }

  a {
    text-decoration:none;
    color:black
  }

  ul {
    list-style: none;
  }

  .app-container {
  display: flex;            /* Habilita o layout flex */
  min-height: 100vh;        /* Garante que o contêiner ocupe toda a altura da tela */
}

.app-content {
  flex: 1; /* O conteúdo ocupará o espaço restante */
  margin-left: 200px; /* Espaço igual à largura da Sidebar */
  padding: 20px; /* Espaçamento interno */
  background-color: #f5f5f5; /* Cor de fundo para destacar o conteúdo */
}

`;

export const Container = styled.section`
  max-width: 480px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
