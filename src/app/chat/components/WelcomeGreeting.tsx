"use client";

import React from "react";
import { Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";

const { Title } = Typography;

const WelcomeGreeting: React.FC = () => {
  return (
    <div className="mb-8">
      {/* AI Orb */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-float">
          <RobotOutlined className="text-3xl text-white" />
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-8">
        <Title level={1} className="text-4xl font-bold gradient-text mb-4">
          Hi there, Sam
        </Title>
        <Title level={2} className="text-5xl font-bold gradient-text">
          How can I help you today?
        </Title>
      </div>
    </div>
  );
};

export default WelcomeGreeting;
