import React, { useEffect, useRef, useState } from "react";
import "./InfiniteMarquee.css";

type Speed = "slow" | "normal" | "fast" | number;

interface MarqueeProps {
  speed?: Speed;
  className?: string;
}

const SPEED_MAP = {
  slow: 0.5,
  normal: 1,
  fast: 2,
};

const InfiniteMarquee: React.FC<MarqueeProps> = ({
  speed = "normal",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const itemsRef = useRef<HTMLElement[]>([]);
  const [contentWidth, setContentWidth] = useState(0);

  const getSpeedInPixels = (speedProp: Speed): number => {
    if (typeof speedProp === "number") {
      return speedProp;
    }
    return SPEED_MAP[speedProp];
  };

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Calculate total width of all items
    const calculateWidth = () => {
      const items = Array.from(content.children) as HTMLElement[];
      const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);
      setContentWidth(totalWidth);
    };

    calculateWidth();
    itemsRef.current = Array.from(content.children) as HTMLElement[];

    let frameId: number | null = null;
    const pixelsPerFrame = getSpeedInPixels(speed);

    const step = () => {
      if (!isPaused) {
        positionRef.current -= pixelsPerFrame;

        if (content) {
          content.style.transform = `translateX(${positionRef.current}px)`;

          // Check if we need to reset
          const firstItem = itemsRef.current[0];
          const firstItemWidth = firstItem.offsetWidth;

          if (Math.abs(positionRef.current) >= firstItemWidth) {
            // Move first item to the end
            const shiftedItem = itemsRef.current.shift();
            if (shiftedItem) {
              itemsRef.current.push(shiftedItem);
              content.appendChild(shiftedItem);

              // Reset position by the width of the moved item
              positionRef.current += firstItemWidth;
              content.style.transform = `translateX(${positionRef.current}px)`;
            }
          }
        }
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    // Handle window resize
    const handleResize = () => {
      calculateWidth();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isPaused, speed]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className={`marquee-container ${className}`.trim()} ref={containerRef}>
      <div className="marquee-inner">
        <div
          className="marquee-content"
          ref={contentRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Welcome to my homepage! 🌟</span>
          <span>Check out the latest updates! 🚀</span>
          <span>Exciting projects and more! 🎨</span>
          <span>The fourth one</span>
          <span>Oh and a fifth one</span>
          <span>A sixth one for good measure</span>
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
