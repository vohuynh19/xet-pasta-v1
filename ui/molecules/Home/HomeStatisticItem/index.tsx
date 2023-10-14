import { useState } from "react";
import { Container } from "./styled";
import { useSpring, animated } from "react-spring";
import { Waypoint } from "react-waypoint";

type THomeStatisticItem = {
  label: string;
  value: number;
};

const HomeStatisticItem = ({ label, value }: THomeStatisticItem) => {
  const [inView, setInview] = useState(false);

  const { number } = useSpring({
    from: { number: 0 },
    number: !inView ? 0 : value,
    delay: 200,
    config: {
      mass: 1,
      tension: 20,
      friction: 10,
    },
  });

  return (
    <Waypoint onEnter={() => setInview(true)}>
      <Container data-aos="zoom-in">
        <animated.h1>{number.to((n) => n.toFixed(0))}</animated.h1>
        <p>{label}</p>
      </Container>
    </Waypoint>
  );
};

export default HomeStatisticItem;
