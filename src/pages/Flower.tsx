// src/MouseFollower.js
import React, { useState, useEffect } from "react";
import styles from "./Flower.module.scss";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (event: MouseEvent) => {
    if (isInside) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;

      setPosition({ x: mouseX + offsetX, y: mouseY + offsetY });
    }
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInside]);

  return (
    <div
      className={styles["follow-area"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.follower}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      ></div>
    </div>
  );
};

export default MouseFollower;
