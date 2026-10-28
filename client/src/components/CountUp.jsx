import React, { useEffect, useState } from "react";

const CountUp = ({ value = 0 }) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setN(current);
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return <>{n}</>;
};

export default CountUp;