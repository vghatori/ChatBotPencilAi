"use client";

import React, { useState, useCallback } from "react";
import {
  WelcomeScreen,
  ChatInterface,
  ResponsiveLayout,
  TransitionWrapper,
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

  const { message, setMessage, handleSendMessage, handleKeyPress } =
    useChatLogic({
      showWelcome,
      setShowWelcome,
      onChatHistoryChange: handleChatHistoryChange,
      onIsTypingChange: handleIsTypingChange,
    });

  return (
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
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            collapsed={false}
            isMobile={false}
          />
        )}
      </TransitionWrapper>
    </ResponsiveLayout>
  );
}
