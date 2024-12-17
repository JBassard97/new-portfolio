"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import house from "../../../public/house.svg";
import octocat from "../../../public/github.svg";
import journeys from "../../../public/journeys.svg";
import "./Header.css";

export default function Header() {
  const [currentLogo, setCurrentLogo] = useState("toolbox");
  const [isHovered, setIsHovered] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<{
    [key: string]: string;
  }>({});

  const tech_logos = [
    { name: "react", url: "/react_svg.svg" },
    { name: "vue", url: "/vue.svg" },
    { name: "next", url: "/next-js.svg" },
    { name: "svelte", url: "/svelte.svg" },
    { name: "node", url: "/node.svg" },
    { name: "python", url: "/python.svg" },
  ];

  // Preload images on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Preload images only on the client side
      const preload = () => {
        const loadedImages: { [key: string]: string } = {};
        tech_logos.forEach((logo) => {
          const img = new window.Image(); // Explicitly use window.Image
          img.src = logo.url;
          img.onload = () => {
            loadedImages[logo.name] = logo.url;
            if (Object.keys(loadedImages).length === tech_logos.length) {
              setPreloadedImages(loadedImages);
            }
          };
        });
      };
      preload();
    }
  }, []);

  useEffect(() => {
    let cycleInterval: NodeJS.Timeout | null = null;
    let i = 0;

    if (isHovered) {
      setCurrentLogo(tech_logos[i].name);
      cycleInterval = setInterval(() => {
        i = (i + 1) % tech_logos.length;
        setCurrentLogo(tech_logos[i].name);
      }, 500);
    } else {
      setCurrentLogo("toolbox");
    }

    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [isHovered]);

  return (
    <header>
      <ul>
        <li className="nav-item home">
          <Link href="/">
            <Image src={house} alt="Home" />
          </Link>
        </li>
        <li className="nav-item github">
          <Link href="/github">
            <Image src={octocat} alt="GitHub" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="tech-link" href="/technologies">
            <div
              className="icon-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundImage: `url(${
                  currentLogo === "toolbox"
                    ? "/toolbox.svg"
                    : preloadedImages[currentLogo]
                })`,
              }}
            ></div>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/projects/all">
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
              <symbol id="icn_phone" viewBox="0 0 26 40">
                <path
                  className="stroke-4"
                  d="M2,33V7c0-2.209,1.791-4,4-4h14c2.209,0,4,1.791,4,4v26c0,2.209-1.791,4-4,4H6C3.791,37,2,35.209,2,33z"
                />
                <path
                  className="stroke-2"
                  d="M7,8h12v18H7V8z M10.609,30.792c0,1.105,0.895,2,2,2s2-0.895,2-2c0-1.105-0.895-2-2-2 S10.609,29.687,10.609,30.792z"
                />
              </symbol>
            </svg>
            <p>
              <svg className="line-icon" width="26">
                <use xlinkHref="#icn_phone" />
              </svg>
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/journeys">
            <Image src={journeys} alt="Journeys" />
          </Link>
        </li>
      </ul>
    </header>
  );
}
