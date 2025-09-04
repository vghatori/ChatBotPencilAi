"use client";

import React from "react";
import ChatMessages from "./ChatMessages";

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
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatHistory,
  isTyping
}) => {
  return (
    <div className="flex flex-col h-full max-h-full">
      {/* Scrollable Chat Messages */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ChatMessages chatHistory={chatHistory} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default ChatInterface;
