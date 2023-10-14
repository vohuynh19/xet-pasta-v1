import { useEffect, useState } from "react";

const useMounted = (timeout = 0) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (timeout) {
      setTimeout(() => {
        setIsMounted(true);
      }, timeout);
    } else {
      setIsMounted(true);
    }
  }, [timeout]);

  return {
    isMounted,
  };
};

export default useMounted;
