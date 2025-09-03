"use client";

import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface UserProfileProps {
  collapsed: boolean;
}

export default function UserProfile({ collapsed }: UserProfileProps) {
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
      className={`flex items-center ${
        collapsed
          ? "justify-center user-profile-collapsed"
          : "space-x-3 p-3 gap-3"
      } bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 sidebar-user-profile-hover`}
    >
      <Avatar
        size={40}
        className="bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 shadow-md sidebar-transition"
      >
        <UserOutlined />
      </Avatar>

      {!collapsed && showContent && (
        <div className="min-w-0">
          <div className="font-medium text-gray-800 truncate">Dũng Rùa</div>
          <div className="text-xs text-purple-600 truncate">Admin</div>
        </div>
      )}

    </div>
  );
}
