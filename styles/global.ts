import { Roboto } from "next/font/google";
import { createGlobalStyle } from "styled-components";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const GlobalStyled = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${roboto.style.fontFamily};
  }
  
  a {
    color: inherit;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    &:hover{
      color: ${({ theme }) => theme.colors.primary}
    }
  }
  * {
    box-sizing: border-box;
  }

  // Layout custom style
  .ant-layout-header{
    height: auto;
    padding-inline: 0;
  }

  .ant-popover-inner{
    padding: 0 !important;
  }

  .text-contrast{
    color: ${({ theme }) => theme.colors.contrastText} !important
  }
  .text-contrast-secondary{
    color: ${({ theme }) => theme.colors.contrastText} !important
  }
`;
