"use client";

import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export default function SidebarHeader({
  collapsed,
  onToggleSidebar,
}: SidebarHeaderProps) {
  const [showContent, setShowContent] = useState(!collapsed);

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

  return (
    <div
      className={`flex-shrink-0 border-b border-purple-100 sidebar-transition ${
        collapsed ? "p-4" : "p-4"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center w-full" : "space-x-3"
          }`}
        >
          <div
            className={`${
              collapsed ? "w-12 h-12" : "w-12 h-12"
            } bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center text-white justify-center flex-shrink-0 shadow-md sidebar-logo-float sidebar-logo-glow cursor-pointer transition-all duration-500`}
            onClick={collapsed ? onToggleSidebar : undefined}
          >
            <span
              className={`font-bold text-white ${
                collapsed ? "text-xs" : "text-sm"
              }`}
            >
              {collapsed ? "AI" : "AIP"}
            </span>
          </div>

          {!collapsed && showContent && (
            <div className="min-w-0">
              <div className="font-bold text-gray-800 truncate text-lg">
                AI Pencil
              </div>
              <div className="text-xs text-purple-600 truncate">
                Powered by Botcake AI
              </div>
            </div>
          )}
        </div>

        {/* Toggle Button - Only visible when expanded */}
        {!collapsed && showContent && (
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            className="sidebar-toggle-button text-purple-600 w-12 h-12 hover:text-purple-700 hover:bg-purple-50 p-2"
            onClick={onToggleSidebar}
            size="large"
          />
        )}
      </div>


    </div>
  );
}
