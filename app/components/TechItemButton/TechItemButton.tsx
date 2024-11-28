"use client";

import React from "react";
import "./TechItemButton.css";

interface TechItemButtonProps {
  text: string;
  proficiency: string;
}

const TechItemButton: React.FC<TechItemButtonProps> = ({
  text,
  proficiency,
}) => {
  return (
    <button
      className={`tech-item-button ${proficiency}`}
      disabled={proficiency === "none"}
    >
      {text}
    </button>
  );
};

export default TechItemButton;
