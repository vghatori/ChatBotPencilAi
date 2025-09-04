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
      <div className="flex justify-end mb-4 sm:mb-6">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg message-enter">
            <div className="text-xs sm:text-sm md:text-base leading-relaxed break-words">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI message - no box, just text
  return (
    <div className="flex justify-start mb-4 sm:mb-6">
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full">
        <div className="text-gray-800 text-xs sm:text-sm md:text-base leading-relaxed message-enter break-words">
          {isTyping ? (
            <TypewriterText text={content} speed={30} />
          ) : (
            content
          )}
        </div>
        
        {/* Code Box */}
        {code && language && (
          <div className="mt-3 sm:mt-4">
            <CodeBox code={code} language={language} />
          </div>
        )}
        
        {/* Image Box */}
        {imageUrl && imageAlt && (
          <div className="mt-3 sm:mt-4">
            <ImageBox imageUrl={imageUrl} alt={imageAlt} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
