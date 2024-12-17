"use client";

import React, { useRef } from "react";
import "./ParallaxCard.css";

interface ParallaxCardProps {
  image: string; // The image to display
  widthAndHeight: number;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({
  image,
  widthAndHeight,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const midWidth = width / 2;
    const midHeight = height / 2;

    const cursPosX = e.clientX - rect.left;
    const cursPosY = e.clientY - rect.top;

    const cursCenterX = midWidth - cursPosX;
    const cursCenterY = midHeight - cursPosY;

    const perspective = 500; // Perspective value
    const delta = 8; // Sensitivity value

    card.style.transform = `perspective(${perspective}px) rotateX(${
      cursCenterY / delta
    }deg) rotateY(${-(cursCenterX / delta)}deg)`;
    card.classList.remove("is-out");
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.classList.add("is-out");
      card.style.transform = "rotateX(0) rotateY(0)"; // Reset transform on mouse leave
    }
  };

  return (
    <div
      ref={cardRef}
      className="card rounded"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${image})`,
        width: `${widthAndHeight}px`,
        height: `${widthAndHeight}px`,
      }}
    ></div>
  );
};

export default ParallaxCard;
