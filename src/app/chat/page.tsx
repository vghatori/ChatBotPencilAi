"use client";

import React, { useState, useCallback } from "react";
import {
  WelcomeScreen,
  ChatInterface,
  ResponsiveLayout,
  TransitionWrapper,
  FloatingChatInput,
  useChatLogic,
  type ChatMessageType,
} from "./components";

export default function ChatPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("General");
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleChatHistoryChange = useCallback((history: ChatMessageType[]) => {
    setChatHistory(history);
  }, []);

  const handleIsTypingChange = useCallback((typing: boolean) => {
    setIsTyping(typing);
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    console.log('File uploaded:', file.name);
    // TODO: Implement file upload logic
  }, []);

  const { message, setMessage, handleSendMessage, handleKeyPress } =
    useChatLogic({
      showWelcome,
      setShowWelcome,
      onChatHistoryChange: handleChatHistoryChange,
      onIsTypingChange: handleIsTypingChange,
    });

  return (
    <div className="h-screen flex flex-col">
      <ResponsiveLayout
        pageTitle="Chat AI"
        notificationCount={0}
        isFixedHeader={!showWelcome}
      >
        <TransitionWrapper showWelcome={showWelcome}>
          {showWelcome ? (
            <WelcomeScreen
              message={message}
              setMessage={setMessage}
              onSendMessage={handleSendMessage}
              onKeyPress={handleKeyPress}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              collapsed={false}
              isMobile={false}
            />
          ) : (
            <ChatInterface
              chatHistory={chatHistory}
              isTyping={isTyping}
            />
          )}
        </TransitionWrapper>
      </ResponsiveLayout>
      
      {/* Chat Input - Fixed at bottom, outside ResponsiveLayout */}
      <FloatingChatInput
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        isWelcome={showWelcome}
        onUpload={handleFileUpload}
      />
    </div>
  );
}
