'use client';

import React from 'react';
import { Card, Button, Typography, Row, Col } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface TopBannerProps {
  pageName?: string;
  pageId?: string;
  botLink?: string;
}

export default function TopBanner({ 
  pageName = 'Flyone Hà Nội',
  pageId = '306747905865308',
  botLink = 'https://m.me/306747905865308'
}: TopBannerProps) {
  return (
    <Row gutter={[16, 16]} className="flex-col lg:flex-row">
      {/* Main Content - Mobile: Full width, Desktop: 16/24 */}
      <Col xs={24} sm={24} md={24} lg={16}>
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header Section - Responsive layout */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3">
                                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                   <span className="text-sm sm:text-lg font-bold text-white">AIP</span>
                 </div>
                <div className="min-w-0">
                  <Title level={3} className="mb-1 text-base sm:text-lg lg:text-xl">{pageName}</Title>
                  <div className="text-xs sm:text-sm text-gray-600 truncate">Page ID: {pageId}</div>
                  <div className="text-xs sm:text-sm text-blue-600 truncate">Bot Link: {botLink}</div>
                </div>
              </div>
            </div>

            {/* Content Section - Responsive typography */}
            <div className="mb-4 sm:mb-6">
              <Title level={2} className="mb-2 sm:mb-3 text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                Tận dụng trợ lý AI cùng Botcake
              </Title>
              <Paragraph className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Cá nhân hóa trải nghiệm khách hàng và tăng hiệu quả kinh doanh với công nghệ AI tiên tiến. 
                Tự động hóa quy trình và tối ưu hóa tương tác với khách hàng.
              </Paragraph>
            </div>

            {/* CTA Button - Full width on mobile, auto width on larger screens */}
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-purple-600 hover:to-pink-600 rounded-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 h-12 sm:h-14 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-friendly"
            >
              Trải nghiệm ngay →
            </Button>
          </div>
        </Card>
      </Col>

      {/* Right Panel - Mobile: Full width below, Desktop: 8/24 */}
      <Col xs={24} sm={24} md={24} lg={8}>
        <div className="relative h-full min-h-[180px] sm:min-h-[200px] lg:min-h-0">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 h-full flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FolderOutlined className="text-blue-500 text-xl sm:text-2xl" />
              </div>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Xem thêm tính năng và tùy chọn nâng cao
              </div>
            </div>
            <Button
              type="text"
              icon={<FolderOutlined />}
              className="text-blue-600 hover:text-blue-700 self-start touch-friendly"
            >
              <span className="hidden sm:inline">Xem thêm</span>
              <span className="sm:hidden">Xem</span>
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}
