'use client';

import React from 'react';
import { Layout, Button, Badge, Typography, Tooltip } from 'antd';
import { BellOutlined, BarChartOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

interface HeaderProps {
  pageTitle?: string;
  notificationCount?: number;
  onMenuClick?: () => void;
  isMobile?: boolean;
  collapsed?: boolean;
  onToggleSidebar?: () => void;
}

export default function DashboardHeader({ 
  pageTitle = 'Trang chủ', 
  notificationCount = 3, 
  onMenuClick,
  isMobile = false,
  collapsed = false,
  onToggleSidebar
}: HeaderProps) {
  return (
    <Header
      className="bg-white border-b border-orange-100 px-4 lg:px-6 flex items-center justify-between shadow-sm"
      style={{
        background: 'white',
        borderBottom: '1px solid #fed7aa',
        boxShadow: '0 1px 3px 0 rgba(249, 115, 22, 0.1)',
        height: '64px',
        lineHeight: '64px',
      }}
    >
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="lg:hidden text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            onClick={onMenuClick}
          />
        )}
        
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">AIP</span>
        </div>
        
        {/* Page Title */}
        <Title level={4} className="mb-0 text-gray-800 hidden sm:block">
          {pageTitle}
        </Title>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Notifications */}
        <Tooltip title="Thông báo">
          <Badge count={notificationCount} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            />
          </Badge>
        </Tooltip>
        
        {/* Statistics */}
        <Tooltip title="Thống kê">
          <Button
            type="text"
            icon={<BarChartOutlined />}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 hidden sm:inline-flex"
          >
            <span className="hidden sm:inline">Thống kê</span>
          </Button>
        </Tooltip>
      </div>
    </Header>
  );
}
