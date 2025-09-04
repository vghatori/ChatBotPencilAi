"use client";

import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface ChatMessageData {
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

interface ChatMessagesProps {
  chatHistory: ChatMessageData[];
  isTyping: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatHistory,
  isTyping
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="h-full overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8 pb-20 sm:pb-24 md:pb-28 lg:pb-32 scroll-smooth">
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto">
        {chatHistory.map((msg) => (
          <ChatMessage
            key={msg.id}
            id={msg.id}
            type={msg.type}
            content={msg.content}
            timestamp={msg.timestamp}
            isTyping={msg.isTyping}
            code={msg.code}
            language={msg.language}
            imageUrl={msg.imageUrl}
            imageAlt={msg.imageAlt}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} className="h-2 sm:h-4" />
      </div>
    </div>
  );
};

export default ChatMessages;
