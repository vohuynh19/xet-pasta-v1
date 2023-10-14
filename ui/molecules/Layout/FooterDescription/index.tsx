import { IMAGES_URL, PAGE_ROUTES } from "@constants";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Content = styled.div`
  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.contrastText};
  }
`;

const FooterDescription = () => {
  return (
    <>
      <Link href={PAGE_ROUTES.HOME} style={{ width: 125, height: 125 }}>
        <div style={{ width: 125, height: 125 }}>
          <Image
            alt="logo"
            src={IMAGES_URL.LOGO_FOOTER}
            width={125}
            height={125}
            priority
          />
        </div>
      </Link>

      <Content>
        <p>Liên hệ:</p>
        <p>Gmail: hiep.cbla5@gmail.com</p>
        <p>SĐT: 036 908 8090</p>
        <p>&nbsp;</p>
        <p>Tập hợp hacker lỏd từ Youtube</p>
        <p>&nbsp;</p>
        <p>Học tập thường xảy ra trong lớp học nhưng nó không phải như vậy.</p>
      </Content>
    </>
  );
};

export default FooterDescription;
