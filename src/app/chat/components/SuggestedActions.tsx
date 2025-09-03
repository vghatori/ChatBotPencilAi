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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
      {suggestedActions.map((action, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-lg suggested-card cursor-pointer border border-gray-100"
        >
          <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center text-white`}>
            {action.icon}
          </div>
          <Text className="text-gray-700 font-medium text-center block">
            {action.title}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default SuggestedActions;
