'use client';

import React from 'react';
import { Layout, Row, Col } from 'antd';
import TopBanner from './TopBanner';
import TemplatesSection from './TemplatesSection';
import GettingStartedSection from './GettingStartedSection';
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

        {/* Templates Section */}
        <TemplatesSection />

        {/* Getting Started and New Features - Responsive Grid */}
        <Row gutter={[16, 16]}>
          {/* Mobile: Full width, Tablet: 2 columns, Desktop: 2 columns */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <GettingStartedSection onUnderstandClick={handleUnderstandClick} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <NewFeaturesSection />
          </Col>
        </Row>
      </div>
    </Content>
  );
}
