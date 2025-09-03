"use client";

import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-2xl">
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
