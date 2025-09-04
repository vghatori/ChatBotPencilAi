"use client";

import React from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  collapsed: boolean;
  isMobile: boolean;
  isWelcome?: boolean;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
  collapsed,
  isMobile,
  isWelcome = false,
  className = ""
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Drop Shadow Container */}
        <div className={`bg-white rounded-3xl shadow-2xl backdrop-blur-xl p-2 ${
          isMobile ? 'mx-2' : ''
        } 2xl:p-3 xl:p-2.5`}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask me anything..."
            size="large"
            className={`${isWelcome ? 'h-14 text-lg' : 'h-12 text-base'} ${
              isMobile ? 'text-sm' : ''
            } 2xl:text-lg 2xl:h-16 xl:text-base xl:h-14 rounded-2xl border-0 focus:border-0 focus:shadow-none shadow-none chat-input bg-transparent`}
            suffix={
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={onSendMessage}
                disabled={!message.trim()}
                className={`bg-gradient-to-r from-purple-500 to-pink-500 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${
                  isMobile ? 'h-8 w-8' : 'h-10'
                } 2xl:h-12 2xl:w-12 xl:h-11 xl:w-11`}
              />
            }
          />
        </div>
        {/* Floating glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl -z-10"></div>
      </div>
    </div>
  );
};

export default ChatInput;
