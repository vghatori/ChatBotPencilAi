'use client';

import React from 'react';
import { Layout, Button, Badge, Typography, Tooltip } from 'antd';
import { BellOutlined, BarChartOutlined, MenuOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

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
      className="bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between shadow-sm"
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
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="lg:hidden text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            onClick={onMenuClick}
          />
        )}
        
        {/* Desktop Sidebar Toggle */}
        {!isMobile && onToggleSidebar && (
          <Tooltip title={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className="hidden lg:flex text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              onClick={onToggleSidebar}
            />
          </Tooltip>
        )}
        
        {/* Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
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
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            />
          </Badge>
        </Tooltip>
        
        {/* Statistics */}
        <Tooltip title="Thống kê">
          <Button
            type="text"
            icon={<BarChartOutlined />}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 hidden sm:inline-flex"
          >
            <span className="hidden sm:inline">Thống kê</span>
          </Button>
        </Tooltip>
      </div>
    </Header>
  );
}
