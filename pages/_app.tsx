import "aos/dist/aos.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";

import { queryClientInstance } from "src/infra/https";

import { GlobalStyled, theme, antdTheme } from "styles";
import { useEffect, useState } from "react";
import { NavigationLayout } from "ui";

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Head>
        <title> Vicodemy - Viet Code Academy</title>
      </Head>

      <QueryClientProvider client={queryClientInstance}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <ConfigProvider theme={antdTheme}>
              <GlobalStyled />
              <NavigationLayout>
                <Component {...pageProps} />
              </NavigationLayout>
            </ConfigProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
