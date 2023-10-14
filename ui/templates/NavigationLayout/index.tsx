import { PropsWithChildren } from "react";
import { Layout } from "antd";
import { StyledContent } from "./styled";

// import useAppStore from "stores/useAppStore";

// import { Footer, Header, NavigationSider } from "ui/organisms";

// import { StyledContent, StyledFooter, StyledHeader } from "./styled";
// import { useExchangeToken, useMyProfile } from "hooks";
// import { useRouter } from "next/router";
// import { API_HOST, PRIVATE_ROUTES } from "@constants";
// import {
//   API_ENDPONTS,
//   queryClientInstance,
//   userQueryKeys,
// } from "src/infra/https";
// import { AppLoading } from "ui/atoms";

const NavigationLayout = ({ children }: PropsWithChildren) => {
  // const router = useRouter();
  // const prevRouteRef = useRef(router.route);

  // const { data, isFetching } = useMyProfile();
  // const { mutate: exchangeTokenMutate } = useExchangeToken();

  // const { isHiddenNav, toggleNav } = useAppStore((state) => ({
  //   isHiddenNav: state.isHiddenNav,
  //   toggleNav: state.toggleNav,
  // }));

  // const removeQueryParam = useCallback(
  //   (delParams: string[]) => {
  //     const { pathname, query }: any = router;
  //     const params = new URLSearchParams(query);
  //     delParams.forEach((param) => params.delete(param));

  //     router.replace({ pathname, query: params.toString() }, undefined, {
  //       shallow: true,
  //     });
  //   },
  //   [router]
  // );

  // useEffect(() => {
  //   const { code, email } = router.query;
  //   code &&
  //     email &&
  //     exchangeTokenMutate(
  //       { code: code as string, email: email as string },
  //       {
  //         onSuccess: (user) => {
  //           removeQueryParam(["code", "email"]);
  //           queryClientInstance.setQueryData(
  //             userQueryKeys.getSelf().queryKey,
  //             user
  //           );
  //         },
  //       }
  //     );
  // }, [router.query, exchangeTokenMutate, removeQueryParam]);

  // useEffect(() => {
  //   if (router.query?.code && router.query?.email) {
  //     return;
  //   }

  //   if (PRIVATE_ROUTES.includes(router.route)) {
  //     if (router.route !== prevRouteRef.current) {
  //       !data?.id &&
  //         router.push(
  //           `${API_HOST}${API_ENDPONTS.auth.LOGIN(
  //             `${window.location.origin}${router.route}`
  //           )}`
  //         );
  //     } else {
  //       if (!data && !isFetching) {
  //         router.push(
  //           `${API_HOST}${API_ENDPONTS.auth.LOGIN(
  //             `${window.location.origin}${router.route}`
  //           )}`
  //         );
  //       }
  //     }
  //   }

  //   prevRouteRef.current = router.route;
  // }, [router.route, data, router, isFetching]);

  // if (PRIVATE_ROUTES.includes(router.route) && !data?.id) {
  //   return <AppLoading />;
  // }

  return (
    <Layout>
      {/* <Layout> */}
      {/* <StyledHeader data-aos="fade-down">
          <Header />
        </StyledHeader> */}

      <StyledContent>
        <div className="container">{children}</div>
      </StyledContent>

      {/* <StyledFooter>
          <Footer />
        </StyledFooter> */}
      {/* </Layout> */}

      {/* <NavigationSider collapsed={isHiddenNav} closeHandler={toggleNav} /> */}
    </Layout>
  );
};

export default NavigationLayout;
