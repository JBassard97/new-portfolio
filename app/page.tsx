"use client";

import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import InfiniteMarquee from "./components/InfiniteMarquee/InfiniteMarquee";
import "./home.css";

interface ItemBlock {
  Text: string;
  Link: string;
}

interface HomePageData {
  PeopleILookUpTo: ItemBlock[];
  MyFavoriteProjects: ItemBlock[];
}

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const [homepageData, setHomepageData] = useState<HomePageData | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await fetch("/api/homepageData");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Homepage Data: ", data);
        setHomepageData(data);
      } catch (error) {
        console.error("Error fetching homepage data");
      }
    };

    fetchHomepageData();
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const marqueeItems = Array.from(marquee.children) as HTMLElement[];
    const totalWidth = marqueeItems.reduce(
      (acc, item) => acc + item.offsetWidth,
      0
    );
    let currentPosition = 0;

    const step = () => {
      currentPosition -= 1; // Adjust speed here
      if (Math.abs(currentPosition) >= totalWidth) {
        currentPosition = 0; // Reset position seamlessly
      }
      marquee.style.transform = `translateX(${currentPosition}px)`;
      requestAnimationFrame(step);
    };

    step();
  }, []);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    setShowVideo(!hasSeenIntro); // Show video if `hasSeenIntro` is not set
  }, []);

  useEffect(() => {
    if (showVideo) {
      localStorage.setItem("hasSeenIntro", "true");

      const videoDuration = 11000; // 11 seconds in milliseconds
      const fadeOutDuration = 1000; // 1 second fade-out effect

      const fadeOutTimer = setTimeout(() => {
        setVideoFading(true);
      }, videoDuration - fadeOutDuration);

      const removeVideoTimer = setTimeout(() => {
        setShowVideo(false);
      }, videoDuration);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(removeVideoTimer);
      };
    }
  }, [showVideo]);

  const stopVideo = () => {
    const stopButton: any = document.querySelector(".stop-button");
    if (stopButton) {
      stopButton.style.display = "none";
    }

    setVideoFading(true);
    setTimeout(() => {
      setShowVideo(false);
    }, 1000); // Wait for the fade-out to complete
  };

  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Restart video from the beginning
      videoRef.current.play(); // Play the video
    }
    setShowVideo(true); // Show the video container
    setVideoFading(false); // Remove any fading state
  };

  const getRandColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const getHeight = () =>
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const randomInteger = (min: number, max: number) =>
    Math.floor(min + Math.random() * (max - min + 1));
  const getRandLeft = () => randomInteger(0, getWidth());
  const getRandTop = () => randomInteger(0, getHeight());

  const createCircle = () => {
    const circle = document.createElement("div");
    circle.classList.add("circle");

    const animationDuration = randomInteger(5000, 30000);
    const left = getRandLeft();
    const top = getRandTop();
    const size = randomInteger(20, 200);
    const shadow = randomInteger(20, 60);
    const borderWidth = randomInteger(1, 3);

    // Generate random style
    circle.style.left = `${left}px`;
    circle.style.top = `${top}px`;
    circle.style.animationDuration = `${animationDuration / 1000}s`;
    circle.style.animationName = `move${randomInteger(1, 8)}`;
    circle.style.borderColor = getRandColor();
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.borderRadius = `${size}px`;
    circle.style.boxShadow = `0 0 ${shadow}px ${getRandColor()}`;
    circle.style.borderWidth = `${borderWidth}px`;

    if (fieldRef.current) {
      fieldRef.current.appendChild(circle);
      setTimeout(() => {
        if (fieldRef.current) {
          fieldRef.current.removeChild(circle);
        }
      }, animationDuration);
    }
  };

  useEffect(() => {
    const interval = setInterval(createCircle, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`video-intro-container ${
          showVideo ? (videoFading ? "fading-out" : "visible") : "hidden"
        }`}
      >
        {showVideo && (
          <div className={`video-overlay ${videoFading ? "fade-out" : ""}`}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="intro-video"
            >
              <source src="/portfolio_start.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              className="stop-button"
              onClick={stopVideo}
              data-tooltip-id="stop-intro"
              data-tooltip-content="Stop Intro"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M6 6h6v12H6zM12 6h6v12h-6z" />
              </svg>
            </div>
            <Tooltip
              id="stop-intro"
              opacity={1}
              style={{ background: "maroon" }}
            />
          </div>
        )}
      </div>

      {/* Circle Animation Field */}
      <div ref={fieldRef} className="field"></div>

      <div className="home-page">
        <div
          className="start-button"
          onClick={startVideo}
          data-tooltip-id="start-intro"
          data-tooltip-content="Play Intro"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <Tooltip
          id="start-intro"
          opacity={1}
          style={{ background: "darkblue" }}
        />
      </div>
    </>
  );
}
