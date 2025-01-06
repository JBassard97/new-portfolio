import React, { useEffect, useRef, useState } from "react";
import "./InfiniteMarquee.css";

type Speed = "slow" | "normal" | "fast" | number;

interface MarqueeProps {
  speed?: Speed;
  className?: string;
}

const SPEED_MAP = {
  slow: 0.5, // 0.5 pixels per frame
  normal: 1, // 1 pixel per frame
  fast: 2, // 2 pixels per frame
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

  // Convert speed prop to pixels per frame
  const getSpeedInPixels = (speedProp: Speed): number => {
    if (typeof speedProp === "number") {
      // If speed is a number, interpret it as pixels per frame
      return speedProp;
    }
    // Otherwise use the preset speeds
    return SPEED_MAP[speedProp];
  };

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

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

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
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
      <div
        className="marquee-content"
        ref={contentRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <a href="/projects/all">Welcome to my homepage! 🌟</a>
        </div>
        <div>
          <a href="/projects/all">Check out the latest updates! 🚀</a>
        </div>
        <div>
          <a href="/projects/all">Exciting projects and more! 🎨</a>
        </div>
        <div>
          <a href="/projects/all">The fourth one</a>
        </div>
        <div>
          <a href="/projects/all">Oh and a fifth one</a>
        </div>
        <div>
          <a href="/projects/all">A sixth one for good measure</a>
        </div>
        <div>
          <a href="/projects/all">div</a>
        </div>
        <div>
          <a href="/projects/all">another</a>
        </div>
        <div>
          <a href="/projects/all">please</a>
        </div>
        <div>
          <a href="/projects/all">dammit</a>
        </div>
        <div>
          <a href="/projects/all">2 more</a>
        </div>
        <div>
          <a href="/projects/all">fuck</a>
        </div>
        <div>
          <a href="/projects/all">Bro</a>
        </div>
        <div>
          <a href="/projects/all">how</a>
        </div>
        <div>
          <a href="/projects/all">Many</a>
        </div>
        <div>
          <a href="/projects/all">do</a>
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
