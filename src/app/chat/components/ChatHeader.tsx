"use client";

import React from "react";
import { Typography, Button } from "antd";

const { Text } = Typography;

const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="flex items-center space-x-3">
        <Text className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">← New Chat</Text>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          chatsphere 3.2
        </div>
      </div>
      <Button 
        type="text" 
        icon={<span className="text-gray-500">×</span>}
        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
      />
    </div>
  );
};

export default ChatHeader;
