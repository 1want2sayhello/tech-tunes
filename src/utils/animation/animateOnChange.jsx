import { useRef, useState, useEffect } from "react";

const useAnimateOnChange = (value, duration = 220) => {
  const prev = useRef(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), duration);

      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value, duration]);

  return animate;
};

export default useAnimateOnChange;
