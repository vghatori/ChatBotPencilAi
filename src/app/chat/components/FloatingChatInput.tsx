"use client";

import React from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface FloatingChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  collapsed: boolean;
  isMobile: boolean;
  isWelcome?: boolean;
}

const FloatingChatInput: React.FC<FloatingChatInputProps> = ({
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
  collapsed,
  isMobile,
  isWelcome = false
}) => {
  return (
    <div 
      className={`fixed ${isWelcome ? 'bottom-8' : 'bottom-4'} left-0 right-0 z-50 flex justify-center`}
      style={{
        left: isMobile ? '40px' : (collapsed ? '120px' : '320px'),
        right: '40px',
        transition: 'left 0.3s ease, right 0.3s ease'
      }}
    >
      <div className={`${isWelcome ? 'max-w-2xl' : 'max-w-4xl'} w-full px-10`}>
        <div className="relative">
          {/* Drop Shadow Container */}
          <div className="bg-white rounded-3xl shadow-2xl backdrop-blur-xl p-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Ask me anything..."
              size="large"
              className={`${isWelcome ? 'h-14 text-lg' : 'h-14 text-base'} rounded-2xl border-0 focus:border-0 focus:shadow-none shadow-none chat-input bg-transparent`}
              suffix={
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={onSendMessage}
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 rounded-xl h-10 shadow-lg hover:shadow-xl transition-all duration-200"
                />
              }
            />
          </div>
          {/* Floating glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatInput;
