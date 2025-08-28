"use client";

import React, { useState, useEffect } from "react";
import { Layout, Menu, Progress, Avatar, Tooltip } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  RobotOutlined,
  MessageOutlined,
  ToolOutlined,
  CommentOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {
  selectedKey?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
}

export default function Sidebar({
  selectedKey = "home",
  collapsed = false,
  onCollapse,
  isMobile = false,
}: SidebarProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(selectedKey);

  const basicMenuItems = [
    { key: "home", icon: <HomeOutlined />, label: "Trang chủ" },
    { key: "customers", icon: <UserOutlined />, label: "Khách hàng" },
    { key: "automation", icon: <RobotOutlined />, label: "Automation" },
    { key: "messageFlows", icon: <MessageOutlined />, label: "Luồng tin nhắn" },
    { key: "tools", icon: <ToolOutlined />, label: "Công cụ" },
    { key: "comments", icon: <CommentOutlined />, label: "Bình luận" },
  ];

  const advancedMenuItems = [
    { key: "botcakeAI", icon: <RobotOutlined />, label: "Botcake AI" },
    { key: "liveChat", icon: <MessageOutlined />, label: "Live chat" },
    { key: "sendMessages", icon: <MessageOutlined />, label: "Gửi tin nhắn" },
    { key: "ecommerce", icon: <ShoppingCartOutlined />, label: "E-commerce" },
    { key: "settings", icon: <SettingOutlined />, label: "Cấu hình" },
  ];

  const handleMenuItemClick = (key: string) => {
    setSelectedMenuItem(key);
  };

  const renderMenuItem = (item: any) => {
    if (collapsed) {
      return (
        <Tooltip title={item.label} placement="right">
          <div className="flex items-center justify-center h-12 hover:bg-gray-100 rounded-lg transition-colors duration-200 sidebar-item-hover">
            {item.icon}
          </div>
        </Tooltip>
      );
    }
    return item;
  };

  const basicMenuItemsWithTooltips = basicMenuItems.map(item => renderMenuItem(item));
  const advancedMenuItemsWithTooltips = advancedMenuItems.map(item => renderMenuItem(item));

  return (
    <Sider
      width={collapsed ? 80 : 280}
      collapsible={!isMobile}
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="bg-white border-r border-gray-200 shadow-lg sidebar-transition"
      style={{
        background: "white",
        borderRight: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        position: "fixed",
        height: "100vh",
        zIndex: 1000,
      }}
      breakpoint="lg"
      collapsedWidth={80}
      trigger={null}
    >
      <div className="h-full flex flex-col">
        {/* Logo and Brand - Fixed at top */}
        <div className="p-4 lg:p-6 flex-shrink-0">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "space-x-3"
            } mb-8 sidebar-transition`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md logo-pulse">
              <span className="text-sm font-bold text-white">AIP</span>
            </div>
            {!collapsed && (
              <div className="min-w-0 sidebar-fade-in">
                <div className="font-bold text-gray-800 truncate text-lg">
                  AI Pencil
                </div>
                <div className="text-xs text-gray-500 truncate">
                  Powered by Botcake AI
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 scrollbar-hide sidebar-scroll">
          <div className="space-y-6">
            {/* Basic Section */}
            <div>
              {!collapsed && (
                <div className="sidebar-section-header">
                  Cơ bản
                </div>
              )}
              <Menu
                mode="inline"
                selectedKeys={[selectedMenuItem]}
                items={basicMenuItemsWithTooltips}
                className="border-0 bg-transparent"
                style={{ border: "none", background: "transparent" }}
                inlineCollapsed={collapsed}
                onSelect={({ key }) => handleMenuItemClick(key)}
              />
            </div>

            {/* Advanced Section */}
            <div>
              {!collapsed && (
                <div className="sidebar-section-header">
                  Nâng cao
                </div>
              )}
              <Menu
                mode="inline"
                selectedKeys={[selectedMenuItem]}
                items={advancedMenuItemsWithTooltips}
                className="border-0 bg-transparent"
                style={{ border: "none", background: "transparent" }}
                inlineCollapsed={collapsed}
                onSelect={({ key }) => handleMenuItemClick(key)}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section - Fixed at bottom */}
        <div className="flex-shrink-0">
          <div className="p-4 lg:p-6 space-y-4">
            {/* Message Usage */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 sidebar-scale-in">
              {!collapsed && (
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Số lượng tin nhắn
                </div>
              )}
              <Progress
                percent={75}
                size="small"
                className="mb-2 progress-animate"
                strokeColor={{
                  '0%': '#f97316',
                  '100%': '#ea580c',
                }}
                trailColor="#e5e7eb"
              />
              {!collapsed && (
                <div className="text-xs text-gray-500">
                  375K/500K Tin nhắn miễn phí
                </div>
              )}
            </div>

            {/* User Profile */}
            <div
              className={`flex items-center ${
                collapsed ? "justify-center" : "space-x-3"
              } p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 sidebar-transition`}
            >
              <Avatar 
                size={40} 
                className="bg-gradient-to-br from-orange-400 to-orange-500 flex-shrink-0 shadow-md"
              >
                <UserOutlined />
              </Avatar>
              {!collapsed && (
                <div className="min-w-0 sidebar-fade-in">
                  <div className="font-medium text-gray-800 truncate">
                    Dũng Rùa
                  </div>
                  <div className="text-xs text-gray-500 truncate">Admin</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
}
