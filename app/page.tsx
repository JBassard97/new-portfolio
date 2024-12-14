"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./home.css";

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [videoFading, setVideoFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
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
  }, []);

  const stopVideo = () => {
    setVideoFading(true);
    setTimeout(() => {
      setShowVideo(false);
    }, 1000); // Wait for the fade-out to complete
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
            <div className="stop-button" onClick={stopVideo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M6 6h6v12H6zM12 6h6v12h-6z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {!showVideo && (
        <div>
          <h1>Hi, welcome to the homepage!</h1>
          {/* Rest of your page content */}
        </div>
      )}
    </>
  );
}
