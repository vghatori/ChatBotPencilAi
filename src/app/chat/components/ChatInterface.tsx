"use client";

import React from "react";
import ChatMessages from "./ChatMessages";
<<<<<<< HEAD
=======
import ChatInput from "./ChatInput";
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8

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
<<<<<<< HEAD
      <div className="flex-1 overflow-hidden min-h-0">
        <ChatMessages chatHistory={chatHistory} isTyping={isTyping} />
      </div>
=======
      <div className="flex-1 overflow-y-auto px-4 2xl:px-8 xl:px-6">
        <div className="w-full py-4 2xl:py-8 xl:py-6">
          <ChatMessages chatHistory={chatHistory} isTyping={isTyping} />
        </div>
      </div>
      
      {/* Fixed Chat Input at bottom */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-100 px-2 sm:px-4 py-2 sm:py-4 2xl:px-8 2xl:py-6 xl:px-6 xl:py-5">
        <div className={`mx-auto ${isMobile ? 'max-w-full' : 'max-w-4xl'}`}>
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSendMessage={onSendMessage}
            onKeyPress={onKeyPress}
            collapsed={collapsed}
            isMobile={isMobile}
            isWelcome={false}
          />
        </div>
      </div>
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8
    </div>
  );
};

export default ChatInterface;
