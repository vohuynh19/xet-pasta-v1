import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "src/infra/firebase";

import HostView from "views/HostView";
import EmployeeView from "views/EmployeeView";
import AuthView from "views/AuthView";

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "sentence", "home"])),
    },
  };
}

const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Xet Pasta - Mì ý phô mai</title>
      </Head>

      {user?.email === "xet.service@gmail.com" && <EmployeeView />}
      {user?.email === "xet.admin@gmail.com" && <HostView />}
      {!user?.email && <AuthView />}
    </>
  );
};

export default Home;
