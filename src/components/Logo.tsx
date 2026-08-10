import React, { useState } from "react";
import { LOGO_URL } from "../data/initialData";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Brand Icon / SVG Shield */}
      <div
        className={`${sizeClasses[size]} rounded-xl overflow-hidden group-hover:scale-105 transition-all`}
      >
        <div 
        className="w-full h-full rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {!imgError && LOGO_URL ? (
            <img
              src={LOGO_URL}
              alt="Woubou Digital Agency Logo"
              className="w-full h-full object-contain rounded-sm"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Custom Crisp Vector W Emblem Fallback */
            <svg
              viewBox="0 0 40 40"
              className="w-full h-full p-1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 11L14 29L20 17L26 29L32 11"
                stroke="url(#woubouGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="11" r="2.5" fill="#fc5935" />
              <circle cx="32" cy="11" r="2.5" fill="#8ad0ea" />
              <defs>
                <linearGradient
                  id="woubouGrad"
                  x1="8"
                  y1="11"
                  x2="32"
                  y2="29"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fc5935" />
                  <stop offset="0.5" stopColor="#026177" />
                  <stop offset="1" stopColor="#8ad0ea" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      </div>

      {/* Brand Name & Tagline */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-geist font-bold tracking-tight text-[#004859] dark:text-white group-hover:text-[#b52703] dark:group-hover:text-[#fc5935] transition-colors ${textSizes[size]}`}
          >
            Woubou
          </span>
          <span className="font-mono-caps text-[9px] text-[#6f787c] dark:text-[#8ad0ea] tracking-widest hidden sm:block">
            DIGITAL AGENCY
          </span>
        </div>
      )}
    </div>
  );
};
