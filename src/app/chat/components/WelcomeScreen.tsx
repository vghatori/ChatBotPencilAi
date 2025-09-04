"use client";

import React, { useState, useEffect } from "react";
import WelcomeGreeting from "./WelcomeGreeting";
import SuggestedActions from "./SuggestedActions";
import CategoryButtons from "./CategoryButtons";
import ChatInput from "./ChatInput";

interface WelcomeScreenProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  collapsed: boolean;
  isMobile: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
  currentCategory,
  setCurrentCategory,
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
<<<<<<< HEAD
    <div className="relative h-full max-h-full flex flex-col">
=======
    <div className="relative min-h-screen flex flex-col">
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8
      {/* AI Orb Background */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-0">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-20 blur-3xl bg-orb"></div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-8 2xl:py-16 xl:py-12">
        {/* Welcome Section */}
        <div className="text-center w-full">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8
            <WelcomeGreeting />
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <SuggestedActions />
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

<<<<<<< HEAD
      {/* Chat Input is now rendered at page level */}
=======
      {/* Chat Input - Integrated at bottom */}
      <div className="relative z-10 px-4 pb-4 sm:pb-8 2xl:pb-12 xl:pb-10">
        <div className={`mx-auto ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}>
          <div className={`transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <ChatInput
              message={message}
              setMessage={setMessage}
              onSendMessage={onSendMessage}
              onKeyPress={onKeyPress}
              collapsed={collapsed}
              isMobile={isMobile}
              isWelcome={true}
            />
          </div>
        </div>
      </div>
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8
    </div>
  );
};

export default WelcomeScreen;
