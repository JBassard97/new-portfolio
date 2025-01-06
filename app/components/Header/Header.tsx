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
    { name: "typescript", url: "/typescript.svg" },
    { name: "next", url: "/next-js.svg" },
    { name: "node", url: "/node.svg" },
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
            {/* <svg className="svg-css-animation" viewBox="0 0 120 24">
              <path
                stroke="white"
                stroke-width="10"
                fill="none"
                stroke-dasharray="148 148"
                stroke-dashoffset="-67.5"
                d="M -46,4 C -36,4 -36,20 -26,20 C -16,20 -16,4 -6,4 C 4,4 4,20 14,20 C 24,20 24,4 34,4 C 44,4 44,20 54,20 C 64,20 64,4 74,4 C 84,4 84,20 94,20 C 104,20 104,4 114,4"
              />
            </svg> */}
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 32 32"
              id="svg5"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              className="journey-svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <defs id="defs2"></defs>
                <g id="layer1" transform="translate(-204,-52)">
                  <path
                    d="m 229.375,53.988287 c -0.72661,0.01749 -1.45694,0.210816 -2.12695,0.597646 -2.14404,1.237874 -2.8863,4.010272 -1.64844,6.1543 0.0207,0.03577 0.043,0.07045 0.0644,0.105515 l -5.31055,4.927737 c -1.49788,-1.113291 -3.35013,-1.77344 -5.35351,-1.773439 -0.56859,3e-6 -1.12432,0.05469 -1.66407,0.156248 l -1.65234,-3.916017 c 1.3276,-1.060458 1.72483,-2.979634 0.85156,-4.492182 -0.96177,-1.665843 -3.12126,-2.243027 -4.7871,-1.281252 -1.66585,0.96178 -2.24499,3.119311 -1.28321,4.785155 0.7021,1.216081 2.04281,1.853423 3.36328,1.734371 l 1.58594,3.761727 c -3.1815,1.389704 -5.41406,4.567013 -5.41406,8.251951 -1e-5,2.80419 1.29264,5.31434 3.31249,6.9668 a 1,1 0 0 0 0.48242,0.36523 c 1.47125,1.04807 3.26712,1.66797 5.20509,1.66797 2.00493,0 3.85893,-0.66054 5.35742,-1.7754 a 1,1 0 0 0 0.22849,-0.17776 c 0.87949,-0.69891 1.6249,-1.55794 2.19336,-2.5332 l 4.22266,0.96289 c -0.006,0.60475 0.14091,1.21771 0.46288,1.77538 0.96178,1.66586 3.12127,2.24303 4.78712,1.28125 1.66584,-0.96177 2.24498,-3.1193 1.2832,-4.78515 -0.96178,-1.66585 -3.12126,-2.24498 -4.78711,-1.2832 -0.48199,0.27828 -0.87119,0.65793 -1.16015,1.0957 l -3.98828,-0.91211 c 0.25897,-0.83794 0.40039,-1.72712 0.40039,-2.64844 -1e-5,-0.37052 -0.0245,-0.73477 -0.0684,-1.09375 l 3.53516,-0.62695 c 0.96204,1.6643 3.12008,2.24259 4.78516,1.28126 1.66585,-0.96178 2.24302,-3.121267 1.28124,-4.787119 -0.96177,-1.665843 -3.1193,-2.243028 -4.78515,-1.281248 -1.05446,0.608795 -1.67201,1.696523 -1.74023,2.835937 l -3.53906,0.628899 c -0.3756,-1.040572 -0.93808,-1.992921 -1.64649,-2.816402 l 5.24609,-4.869138 c 1.37462,0.877644 3.18154,0.984393 4.6836,0.117183 2.14403,-1.23786 2.88825,-4.008297 1.65038,-6.152342 -0.85102,-1.474019 -2.42878,-2.286537 -4.02734,-2.24804 z m 0.0606,1.990227 c 0.88719,-0.0251 1.7549,0.427341 2.23437,1.257816 0.69743,1.207976 0.29,2.7225 -0.91796,3.419915 -1.20798,0.697425 -2.7225,0.291968 -3.41993,-0.916008 -0.69742,-1.207966 -0.29195,-2.724452 0.91602,-3.421872 0.37749,-0.217945 0.78423,-0.328441 1.1875,-0.339851 z m -19.97266,0.01367 c 0.53276,-0.01671 1.05213,0.254143 1.3418,0.755866 0.42134,0.729783 0.17705,1.633346 -0.55274,2.054686 -0.72978,0.42134 -1.63334,0.179004 -2.05468,-0.550778 -0.42134,-0.729773 -0.179,-1.631396 0.55078,-2.052736 0.22806,-0.13167 0.47267,-0.199456 0.71484,-0.207038 z m 5.53711,10.007817 c 3.87784,4e-6 7,3.122164 7.00001,6.999997 -1e-5,1.77485 -0.65516,3.38974 -1.73633,4.6211 -0.61002,-1.111 -1.56136,-2.00863 -2.71094,-2.55078 0.88222,-0.73572 1.44726,-1.84076 1.44726,-3.07032 0,-2.197278 -1.80271,-4.000002 -4,-3.999997 -2.19728,4e-6 -4,1.802718 -4,3.999997 0,1.22956 0.56504,2.3346 1.44727,3.07031 -1.14939,0.54242 -2.10105,1.43958 -2.71094,2.55079 -1.08117,-1.23137 -1.73634,-2.84624 -1.73633,-4.62109 0,-3.877845 3.12216,-7.000006 7,-7.000007 z m 15.4629,2.017577 c 0.53226,-0.01642 1.05016,0.254136 1.33983,0.75586 0.42134,0.729782 0.17901,1.633344 -0.55078,2.05468 -0.72978,0.42134 -1.63334,0.17901 -2.05468,-0.550774 -0.42134,-0.729782 -0.17901,-1.633344 0.55078,-2.054684 0.22806,-0.13167 0.4729,-0.197629 0.71485,-0.205082 z M 215.00005,70 c 1.11642,-10e-7 2.00001,0.883588 2,1.999998 0,1.11642 -0.88358,2 -2,2 -1.11642,0 -2,-0.88358 -2,-2 1e-5,-1.11641 0.88358,-1.999997 2,-1.999998 z m 1e-5,6.500008 c 1.67074,-10e-6 3.08932,1.0143 3.6914,2.45507 -1.07046,0.66318 -2.33451,1.04492 -3.69141,1.04492 -1.3569,0 -2.62094,-0.38176 -3.6914,-1.04492 0.60203,-1.44072 2.0209,-2.45508 3.69141,-2.45507 z m 15.46289,0.49023 c 0.53225,-0.0164 1.05017,0.25608 1.33984,0.75781 0.42134,0.72978 0.17899,1.63335 -0.55078,2.05468 -0.72978,0.42134 -1.63336,0.17901 -2.0547,-0.55077 -0.42134,-0.72978 -0.17899,-1.63335 0.55079,-2.05469 0.22806,-0.13167 0.47289,-0.19959 0.71485,-0.20703 z"
                    style={{
                      color: "#ffffff",
                      fillRule: "evenodd",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 4.1,
                      stroke: "none", // Equivalent of `-inkscape-stroke:none` (ignoring the prefix)
                    }}
                  ></path>
                </g>
              </g>
            </svg>
          </Link>
        </li>
      </ul>
    </header>
  );
}
