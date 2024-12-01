import React from "react";
import Link from "next/link";
import Image from "next/image";
import techToLogo from "../../techToLogo";
import "./StackDisplay.css";

interface StackDisplayProps {
  stack: string[];
}

const StackDisplay: React.FC<StackDisplayProps> = ({ stack }) => {
  return (
    <div className="stack-display">
      {stack.map((technology, index) => (
        <Image
          className="technology-image"
          key={index}
          src={techToLogo(technology)}
          alt={technology}
          height="25"
          width="25"
        />
      ))}
    </div>
  );
};

export default StackDisplay;
