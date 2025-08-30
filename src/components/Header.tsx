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

export default function DashboardHeader({ 
  pageTitle = 'Trang chủ', 
  notificationCount = 3, 
  onMenuClick,
  isMobile = false
}: HeaderProps) {
  return (
    <Header
             className="bg-white border-b border-purple-100 px-4 lg:px-6 flex items-center justify-between shadow-sm"
       style={{
         background: 'white',
         borderBottom: '1px solid #f3e8ff',
         boxShadow: '0 1px 3px 0 rgba(147, 51, 234, 0.1)',
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
             className="lg:hidden text-purple-600 hover:text-purple-700 hover:bg-purple-50"
             onClick={onMenuClick}
           />
         )}
         
         {/* Logo */}
         <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
           <span className="text-white font-bold text-sm">AIP</span>
         </div>
        
        {/* Page Title */}
        <Title level={4} className="mb-0 text-gray-800 hidden sm:block">
          {pageTitle}
        </Title>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
                 {/* Notifications */}
         <Badge count={notificationCount} size="small">
           <Button
             type="text"
             icon={<BellOutlined />}
             className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
           />
         </Badge>
         
         {/* Statistics */}
         <Button
           type="text"
           icon={<BarChartOutlined />}
           className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 hidden sm:inline-flex"
         >
           <span className="hidden sm:inline">Thống kê</span>
         </Button>
      </div>
    </Header>
  );
}
