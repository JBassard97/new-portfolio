import React, { useEffect, useRef, useState } from "react";
import "./InfiniteMarquee.css";

type Speed = "slow" | "normal" | "fast" | number;

interface Children {
  Text: string;
  Link: string;
}

interface MarqueeProps {
  speed?: Speed;
  className?: string;
  children: Children[];
}

const SPEED_MAP = {
  slow: 0.5, // 0.5 pixels per frame
  normal: 1, // 1 pixel per frame
  fast: 2, // 2 pixels per frame
};

const InfiniteMarquee: React.FC<MarqueeProps> = ({
  speed = "normal",
  className = "",
  children = [],
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

          if (firstItem) {
            // Add a safety check
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
        {children.length === 0 ? (
          <div>No items to display</div>
        ) : (
          children.map((child, index) => (
            <div key={index}>
              <a href={child.Link}>{child.Text}</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
