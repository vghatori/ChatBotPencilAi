"use client";

import React from "react";
import { Typography } from "antd";
import { 
  PlayCircleOutlined,
  SoundOutlined,
  DatabaseOutlined
} from "@ant-design/icons";

const { Text } = Typography;

const SuggestedActions: React.FC = () => {
  const suggestedActions = [
    {
      title: "Generate True 4K Next-Gen Videos",
      icon: <PlayCircleOutlined className="text-2xl" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Generate Voiceovers, Music, or Sound Effects",
      icon: <SoundOutlined className="text-2xl" />,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Interact with the Smartest Data Bot Ever",
      icon: <DatabaseOutlined className="text-2xl" />,
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 2xl:gap-8 2xl:mb-16 xl:gap-7 xl:mb-14">
      {suggestedActions.map((action, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-lg suggested-card cursor-pointer border border-gray-100 2xl:p-8 2xl:rounded-3xl xl:p-7"
        >
          <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center text-white 2xl:w-20 2xl:h-20 2xl:mb-6 2xl:rounded-3xl xl:w-18 xl:h-18 xl:mb-5`}>
            {action.icon}
          </div>
          <Text className="text-gray-700 font-medium text-center block 2xl:text-lg xl:text-base">
            {action.title}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default SuggestedActions;
