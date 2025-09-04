"use client";

import React, { useState, useEffect } from "react";

interface TransitionWrapperProps {
  showWelcome: boolean;
  children: React.ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  showWelcome,
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState(showWelcome);

  useEffect(() => {
    if (showWelcome !== currentView) {
      setIsTransitioning(true);

      // Wait for fade out animation
      setTimeout(() => {
        setCurrentView(showWelcome);
        setIsTransitioning(false);
      }, 500);
    }
  }, [showWelcome, currentView]);

  return (
    <div
      className={`transition-all duration-500 ${
        isTransitioning
          ? "opacity-0 scale-95 translate-y-8"
          : "opacity-100 scale-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
