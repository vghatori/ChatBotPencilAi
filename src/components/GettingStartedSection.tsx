"use client";

import React from "react";
import { Card, Button, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface GettingStartedSectionProps {
  setupSteps?: string[];
  onUnderstandClick?: () => void;
}

export default function GettingStartedSection({
  setupSteps = [
    'Kích hoạt nút "Bắt đầu"',
    'Thiết lập "Tin nhắn chào mừng"',
    'Thiết lập "Tin nhắn mặc định"',
    'Thiết lập "Từ khóa"',
    'Thiết lập "Kịch bản chăm sóc"',
  ],
  onUnderstandClick,
}: GettingStartedSectionProps) {
  return (
    <Card
      className="border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl h-full"
      title={
        <div className="flex items-center space-x-2 sm:space-x-3">
          <CheckCircleOutlined className="text-green-500 text-lg sm:text-xl flex-shrink-0" />
          <span className="text-base sm:text-lg">Thiết lập Bot</span>
        </div>
      }
      styles={{ body: { padding: "16px sm:20px lg:24px" } }}
    >
      {/* Steps List - Responsive spacing */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {setupSteps.map((step, index) => (
          <div key={index} className="flex items-start space-x-2 sm:space-x-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-green-600">
                {index + 1}
              </span>
            </div>
            <Text className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {step}
            </Text>
          </div>
        ))}
      </div>

      {/* Action Button - Full width on mobile, auto width on larger screens */}
      <Button
        type="primary"
        className="bg-blue-500 border-0 hover:bg-blue-600 rounded-xl px-4 sm:px-6 py-2 sm:py-3 h-10 sm:h-11 w-full sm:w-auto touch-friendly"
        onClick={onUnderstandClick}
      >
        Đã hiểu
      </Button>
    </Card>
  );
}
