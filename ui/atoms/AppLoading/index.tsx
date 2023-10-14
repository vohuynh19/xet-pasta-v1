import IMAGES_URL from "@constants/images";
import Image from "next/image";
import { CSSProperties } from "react";
import { RingLoader } from "react-spinners";
import { theme } from "styles";

const AppLoading = () => {
  // Use inline styles to avoid styled-components mounting effect
  const containerStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };

  return (
    <div style={containerStyle}>
      <Image
        style={{ position: "absolute" }}
        alt="logo"
        src={IMAGES_URL.LOGO}
        width={75}
        height={75}
        priority
      />

      <RingLoader color={theme.colors.primary} size={160} />
    </div>
  );
};

export default AppLoading;
