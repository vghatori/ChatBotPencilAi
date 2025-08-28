'use client';

import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import {
  ShoppingCartOutlined,
  TagsOutlined,
  BuildOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface TemplateCard {
  title: string;
  icon: React.ReactNode;
  users: string;
  description: string;
}

interface TemplatesSectionProps {
  templates?: TemplateCard[];
}

export default function TemplatesSection({ 
  templates = [
    {
      title: 'Shop Online',
      icon: <ShoppingCartOutlined className="text-blue-500" />,
      users: '3.331',
      description: 'người sử dụng',
    },
    {
      title: 'Mã giảm giá',
      icon: <TagsOutlined className="text-green-500" />,
      users: '2.436',
      description: 'người sử dụng',
    },
    {
      title: 'Bất động sản',
      icon: <BuildOutlined className="text-purple-500" />,
      users: '1.751',
      description: 'người sử dụng',
    },
  ]
}: TemplatesSectionProps) {
  return (
    <div>
      {/* Section Header - Responsive typography */}
      <div className="mb-3 sm:mb-4">
        <Title level={3} className="mb-1 sm:mb-2 text-lg sm:text-xl lg:text-2xl">Mẫu</Title>
        <Text className="text-gray-600 text-sm sm:text-base">Dễ dàng tùy chỉnh dự án của bạn</Text>
      </div>

      {/* Responsive Grid: Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
      <Row gutter={[12, 12]} className="sm:gutter-4 md:gutter-6">
        {templates.map((template, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl cursor-pointer group h-full"
              styles={{ body: { padding: '16px sm:20px lg:24px' } }}
            >
              {/* Card Header - Responsive spacing */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors flex-shrink-0">
                  {template.icon}
                </div>
                <LinkOutlined className="text-gray-400 group-hover:text-gray-600 transition-colors text-lg sm:text-xl" />
              </div>

              {/* Card Content - Responsive typography */}
              <Title level={4} className="mb-2 text-base sm:text-lg lg:text-xl">{template.title}</Title>
              <div className="flex items-center space-x-1">
                <Text className="text-sm sm:text-base lg:text-lg font-semibold text-blue-600">{template.users}</Text>
                <Text className="text-gray-600 text-xs sm:text-sm lg:text-base">{template.description}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
