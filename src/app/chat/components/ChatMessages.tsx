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
    <div className="h-full overflow-y-auto p-4 pb-32 scroll-smooth">
      <div className="max-w-4xl mx-auto space-y-6">
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
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </div>
  );
};

export default ChatMessages;
