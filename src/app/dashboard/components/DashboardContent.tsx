'use client';

import React from 'react';
import { Layout, Row, Col } from 'antd';
import { TopBanner } from '@/components';
import NewFeaturesSection from './NewFeaturesSection';

const { Content } = Layout;

export default function DashboardContent() {
  const handleUnderstandClick = () => {
    console.log('User clicked "Đã hiểu"');
    // Add your logic here
  };

  return (
    <Content className="p-3 sm:p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Top Banner Section */}
        <TopBanner />

        {/* Getting Started and New Features - Responsive Grid */}
        <Row gutter={[16, 16]}>
          {/* Mobile: Full width, Tablet: 2 columns, Desktop: 2 columns */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Bắt đầu sử dụng</h3>
              <p className="text-gray-600 mb-4">
                Chào mừng bạn đến với AI Pencil! Hãy bắt đầu trò chuyện với AI để khám phá các tính năng mới.
              </p>
              <button
                onClick={handleUnderstandClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Đã hiểu
              </button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <NewFeaturesSection />
          </Col>
        </Row>
      </div>
    </Content>
  );
}
