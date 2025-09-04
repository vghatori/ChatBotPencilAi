"use client";

import React from "react";
import { Layout, Button, Badge, Typography } from "antd";
import {
  BellOutlined,
  BarChartOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

interface HeaderProps {
  pageTitle?: string;
  notificationCount?: number;
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export default function DashboardHeader({
  pageTitle = "Trang chủ",
  notificationCount = 3,
  onMenuClick,
  isMobile = false,
}: HeaderProps) {
  return (
    <Header
      className="bg-white border-b border-purple-100 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 flex items-center justify-between shadow-sm relative z-50"
      style={{
        background: "white",
        borderBottom: "1px solid #f3e8ff",
        boxShadow: "0 1px 3px 0 rgba(147, 51, 234, 0.1)",
        height: "60px",
        lineHeight: "60px",
        minHeight: "60px",
      }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="lg:hidden text-purple-600 hover:text-purple-700 hover:bg-purple-50 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0"
            onClick={onMenuClick}
          />
        )}

        {/* Logo */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white font-bold text-sm sm:text-base">AIP</span>
        </div>

        {/* Page Title */}
        <Title
          level={4}
          className="mb-0 text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate flex-1 min-w-0"
        >
          {pageTitle}
        </Title>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 flex-shrink-0">
        {/* Notifications */}
        <Badge count={notificationCount} size="small" offset={[-2, 2]}>
          <Button
            type="text"
            icon={<BellOutlined />}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200 rounded-lg"
            aria-label="Thông báo"
          />
        </Badge>

        {/* Statistics */}
        <Button
          type="text"
          icon={<BarChartOutlined />}
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200 rounded-lg"
          aria-label="Thống kê"
        >
          <span className="hidden md:inline text-sm font-medium ml-1">
            Thống kê
          </span>
        </Button>
      </div>
    </Header>
  );
}
