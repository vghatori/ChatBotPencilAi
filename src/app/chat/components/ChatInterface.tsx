"use client";

import React from "react";
import ChatMessages from "./ChatMessages";
import FloatingChatInput from "./FloatingChatInput";

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  isTyping: boolean;
  code?: string;
  language?: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface ChatInterfaceProps {
  chatHistory: ChatMessage[];
  isTyping: boolean;
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  collapsed: boolean;
  isMobile: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatHistory,
  isTyping,
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
  collapsed,
  isMobile
}) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable Chat Messages */}
      <div className="flex-1 overflow-hidden pb-32">
        <ChatMessages chatHistory={chatHistory} isTyping={isTyping} />
      </div>
      
      {/* Fixed Chat Input */}
      <FloatingChatInput
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
        onKeyPress={onKeyPress}
        collapsed={collapsed}
        isMobile={isMobile}
        isWelcome={false}
      />
    </div>
  );
};

export default ChatInterface;
