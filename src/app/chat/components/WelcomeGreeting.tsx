"use client";

import React from "react";
import { Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";

const { Title } = Typography;

const WelcomeGreeting: React.FC = () => {
  return (
    <div className="mb-8 2xl:mb-12 xl:mb-10">
      {/* AI Orb */}
      <div className="mb-8 2xl:mb-12 xl:mb-10">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-float 2xl:w-32 2xl:h-32 xl:w-28 xl:h-28">
          <RobotOutlined className="text-3xl text-white 2xl:text-4xl xl:text-3xl" />
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-8 2xl:mb-12 xl:mb-10">
        <Title level={1} className="text-4xl font-bold gradient-text mb-4 2xl:text-6xl 2xl:mb-6 xl:text-5xl xl:mb-5">
          Hi there, Sam
        </Title>
        <Title level={2} className="text-5xl font-bold gradient-text 2xl:text-7xl xl:text-6xl">
          How can I help you today?
        </Title>
      </div>
    </div>
  );
};

export default WelcomeGreeting;
