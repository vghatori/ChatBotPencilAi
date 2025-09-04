"use client";

import React, { useState, useEffect } from "react";
import WelcomeGreeting from "./WelcomeGreeting";
import SuggestedActions from "./SuggestedActions";
import CategoryButtons from "./CategoryButtons";
import FloatingChatInput from "./FloatingChatInput";

interface WelcomeScreenProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onSuggestionClick?: (suggestion: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  collapsed: boolean;
  isMobile: boolean;
  onUpload?: (file: File) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  message,
  setMessage,
  onSendMessage,
  onSuggestionClick,
  onKeyPress,
  currentCategory,
  setCurrentCategory,
  onUpload,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full max-h-full flex flex-col">
      {/* AI Orb Background */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-0">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-20 blur-3xl bg-orb"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center pb-32 min-h-0">
        {/* Welcome Section */}
        <div className="text-center py-16 px-4">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <WelcomeGreeting />
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <SuggestedActions 
              onSuggestionClick={onSuggestionClick}
            />
          </div>

          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <CategoryButtons
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          </div>
        </div>
      </div>

      {/* Floating Chat Input */}
      <FloatingChatInput
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
        isWelcome={true}
        onUpload={onUpload}
      />
    </div>
  );
};

export default WelcomeScreen;
