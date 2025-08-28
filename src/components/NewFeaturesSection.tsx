'use client';

import React from 'react';
import { Card } from 'antd';
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  FireOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

interface NewFeature {
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface NewFeaturesSectionProps {
  features?: NewFeature[];
}

export default function NewFeaturesSection({ 
  features = [
    {
      title: 'Tích hợp TikTok',
      icon: <PlayCircleOutlined className="text-black" />,
      description: 'Tiếp cận khách hàng dễ dàng qua TikTok',
    },
    {
      title: 'Hotmart',
      icon: <FireOutlined className="text-orange-500" />,
      description: 'Tự động hóa thông báo & tăng tương tác trên WABA',
    },
    {
      title: 'Google Meet',
      icon: <VideoCameraOutlined className="text-orange-500" />,
      description: 'Lên lịch và thông báo tự động trên Google Meet',
    },
  ]
}: NewFeaturesSectionProps) {
  return (
    <Card
      className="border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl h-full"
      title={
        <div className="flex items-center space-x-2 sm:space-x-3">
          <CheckCircleOutlined className="text-green-500 text-lg sm:text-xl flex-shrink-0" />
          <span className="text-base sm:text-lg">Tính năng mới</span>
        </div>
      }
      styles={{ body: { padding: '16px sm:20px lg:24px' } }}
    >
      {/* Features List - Responsive spacing and layout */}
      <div className="space-y-3 sm:space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              {feature.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 mb-1 text-sm sm:text-base">{feature.title}</div>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
