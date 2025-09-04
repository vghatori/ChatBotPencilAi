"use client";

import React from "react";
import { Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";

const { Title } = Typography;

const WelcomeGreeting: React.FC = () => {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-10 2xl:mb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* AI Orb */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-10 2xl:mb-12">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-float hover:scale-105 transition-transform duration-300">
          <RobotOutlined className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl text-white" />
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-10 2xl:mb-12 text-center">
        <Title
          level={2}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold gradient-text leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight px-2 sm:px-4"
        >
          How can I help you today?
        </Title>
      </div>
    </div>
  );
};

export default WelcomeGreeting;
