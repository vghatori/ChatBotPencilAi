"use client";

import React, { useState } from "react";
import { Layout } from "antd";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";

const { Sider } = Layout;

interface SidebarProps {
  selectedKey?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({
  selectedKey = "home",
  collapsed = false,
  onCollapse,
}: SidebarProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(selectedKey);

  const handleMenuItemClick = (key: string) => {
    setSelectedMenuItem(key);
  };

  const handleToggleSidebar = () => {
    if (onCollapse) {
      onCollapse(!collapsed);
    }
  };

  return (
    <Sider
      width={collapsed ? 80 : 280}
      collapsible={false}
      collapsed={collapsed}
      className="bg-white border-r border-purple-100 shadow-lg sidebar-width-animate relative"
      style={{
        background: "white",
        boxShadow:
          "0 4px 6px -1px rgba(147, 51, 234, 0.1), 0 2px 4px -1px rgba(147, 51, 234, 0.06)",
        position: "fixed",
        height: "100vh",
        zIndex: 1000,
      }}
      breakpoint="lg"
      collapsedWidth={80}
      trigger={null}
    >
      <div className="h-full flex flex-col">
        {/* Header with Logo and Toggle Button */}
        <SidebarHeader
          collapsed={collapsed}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Navigation Menu */}
        <SidebarNavigation
          collapsed={collapsed}
          selectedMenuItem={selectedMenuItem}
          onMenuItemClick={handleMenuItemClick}
        />

        {/* Footer with Message Usage and User Profile */}
        <SidebarFooter collapsed={collapsed} />
      </div>
    </Sider>
  );
}
