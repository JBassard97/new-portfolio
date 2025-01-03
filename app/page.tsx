"use client";

import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import "./home.css";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Access `localStorage` only on the client
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
      <div className="home-page">
        <h1>Hi, welcome to the homepage!</h1>
        <div
          className="start-button"
          onClick={startVideo}
          data-tooltip-id="start-intro"
          data-tooltip-content="Play Intro"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M8 5v14l11-7z" />{" "}
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
