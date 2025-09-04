"use client";

import React from "react";
import { Typography } from "antd";
import {
  PlayCircleOutlined,
  SoundOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface SuggestedActionsProps {
  onSuggestionClick?: (suggestion: string) => void;
}

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ onSuggestionClick }) => {
  const suggestedActions = [
    {
      title: "Generate True 4K Next-Gen Videos",
      suggestion: "Tạo video 4K chất lượng cao với AI",
      icon: <PlayCircleOutlined className="text-xl sm:text-2xl" />,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Generate Voiceovers, Music, or Sound Effects",
      suggestion: "Tạo giọng nói, nhạc nền và hiệu ứng âm thanh",
      icon: <SoundOutlined className="text-xl sm:text-2xl" />,
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Interact with the Smartest Data Bot Ever",
      suggestion: "Hỏi về dữ liệu và phân tích thông tin",
      icon: <DatabaseOutlined className="text-xl sm:text-2xl" />,
      color: "from-orange-500 to-red-600",
    },
  ];

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-6 lg:px-8">
      {suggestedActions.map((action, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(action.suggestion)}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg suggested-card cursor-pointer border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-br ${action.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
          >
            {action.icon}
          </div>
          <Text className="text-gray-700 font-medium text-center block text-sm sm:text-base lg:text-lg leading-tight">
            {action.title}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default SuggestedActions;
