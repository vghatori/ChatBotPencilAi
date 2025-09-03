"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, Divider } from "antd";
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

interface SidebarNavigationProps {
  collapsed: boolean;
  selectedMenuItem: string;
  onMenuItemClick: (key: string) => void;
}

export default function SidebarNavigation({
  collapsed,
  selectedMenuItem,
  onMenuItemClick,
}: SidebarNavigationProps) {
  const [showContent, setShowContent] = useState(!collapsed);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle content visibility based on collapsed state
  useEffect(() => {
    if (!collapsed) {
      setShowContent(true);
    } else {
      const timer = setTimeout(() => {
        setShowContent(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

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

  // Format menu items for Ant Design Menu
  const getMenuItems = (items: Array<{ key: string; icon: React.ReactNode; label: string }>) => {
    return items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: collapsed ? null : item.label,
      title: collapsed ? item.label : undefined,
    }));
  };

  const basicMenuItemsFormatted = getMenuItems(basicMenuItems);
  const advancedMenuItemsFormatted = getMenuItems(advancedMenuItems);



  return (
    <div ref={menuRef} className="flex-1 overflow-y-auto px-4 lg:px-6 scrollbar-hide sidebar-scroll">
      <div className="space-y-6 pt-4">
        {/* Basic Section */}
        <div>
          {!collapsed && showContent && (
            <div className="sidebar-section-header">Cơ bản</div>
          )}
          
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            items={basicMenuItemsFormatted}
            className="border-0 bg-transparent"
            style={{ border: "none", background: "transparent" }}
            inlineCollapsed={collapsed}
            onSelect={(info) => onMenuItemClick(info.key)}
          />
        </div>

        {/* Subtle Divider between sections */}
        {!collapsed && showContent && (
          <div className="flex justify-center">
            <Divider
              className="w-16 border-purple-200"
              style={{ margin: "16px 0", borderColor: "#e9d5ff" }}
            />
          </div>
        )}

        {/* Advanced Section */}
        <div>
          {!collapsed && showContent && (
            <div className="sidebar-section-header">Nâng cao</div>
          )}
          
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuItem]}
            items={advancedMenuItemsFormatted}
            className="border-0 bg-transparent"
            style={{ border: "none", background: "transparent" }}
            inlineCollapsed={collapsed}
            onSelect={(info) => onMenuItemClick(info.key)}
          />
        </div>
      </div>


    </div>
  );
}
