"use client";

import React from "react";

export default function TypingIndicator() {
  return (
    <div className="px-4 py-2">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          AI
        </div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
          <span className="text-gray-400 text-sm ml-2">AI đang nhập...</span>
        </div>
      </div>
    </div>
  );
}
