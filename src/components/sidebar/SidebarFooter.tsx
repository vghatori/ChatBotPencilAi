"use client";

import React from "react";
import MessageUsage from "./MessageUsage";
import UserProfile from "./UserProfile";

interface SidebarFooterProps {
  collapsed: boolean;
}

export default function SidebarFooter({ collapsed }: SidebarFooterProps) {

  return (
    <div className="flex-shrink-0 border-t border-purple-100 sidebar-transition">
      <div className={`space-y-4 ${collapsed ? "p-4" : "p-4"}`}>
        {/* Message Usage */}
        <MessageUsage collapsed={collapsed} />

        {/* User Profile */}
        <UserProfile collapsed={collapsed} />
      </div>
    </div>
  );
}
