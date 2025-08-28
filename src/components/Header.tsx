'use client';

import React from 'react';
import { Layout, Button, Badge, Typography } from 'antd';
import { BellOutlined, BarChartOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

interface HeaderProps {
  pageTitle?: string;
  notificationCount?: number;
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export default function DashboardHeader({ pageTitle = 'Trang chủ', notificationCount = 3, onMenuClick }: HeaderProps) {
  return (
    <Header
      className="bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm"
      style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        height: '64px',
        lineHeight: '64px',
      }}
    >
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          className="lg:hidden text-gray-600 hover:text-gray-800"
          onClick={onMenuClick}
        />
        
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">b</span>
        </div>
        <Title level={4} className="mb-0 text-gray-800 hidden sm:block">
          {pageTitle}
        </Title>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <Badge count={notificationCount} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="text-gray-600 hover:text-gray-800"
          />
        </Badge>
        <Button
          type="text"
          icon={<BarChartOutlined />}
          className="text-gray-600 hover:text-gray-800 hidden sm:inline-flex"
        >
          <span className="hidden sm:inline">Thống kê</span>
        </Button>
      </div>
    </Header>
  );
}
