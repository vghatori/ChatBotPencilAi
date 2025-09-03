"use client";

import React from "react";
import TypewriterText from "./TypewriterText";
import CodeBox from "./CodeBox";
import ImageBox from "./ImageBox";

interface ChatMessageProps {
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

const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  content,
  isTyping,
  code,
  language,
  imageUrl,
  imageAlt
}) => {
  if (type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-2xl">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-4 shadow-lg message-enter">
            <div className="text-sm leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI message - no box, just text
  return (
    <div className="flex justify-start">
      <div className="max-w-2xl">
        <div className="text-gray-800 text-sm leading-relaxed message-enter">
          {isTyping ? (
            <TypewriterText text={content} speed={30} />
          ) : (
            content
          )}
        </div>
        
        {/* Code Box */}
        {code && language && (
          <CodeBox code={code} language={language} />
        )}
        
        {/* Image Box */}
        {imageUrl && imageAlt && (
          <ImageBox imageUrl={imageUrl} imageAlt={imageAlt} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
