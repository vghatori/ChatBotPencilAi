"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "antd";

interface MessageUsageProps {
  collapsed: boolean;
}

export default function MessageUsage({ collapsed }: MessageUsageProps) {
  const [showContent, setShowContent] = useState(!collapsed);
  const [progressValue, setProgressValue] = useState(75); // Set default value

  // Handle content visibility and progress animation
  useEffect(() => {
    if (!collapsed) {
      setShowContent(true);
      // Animate progress bar
      const timer = setTimeout(() => {
        setProgressValue(75);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(false);
        // Keep progress value when collapsed
        setProgressValue(75);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  return (
    <div
      className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 sidebar-transition ${
        collapsed ? "message-usage-collapsed" : "p-4"
      }`}
    >
      {!collapsed && showContent ? (
        // Expanded state - Horizontal layout
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Số lượng tin nhắn
          </div>
          <Progress
            percent={progressValue}
            size="small"
            className="mb-2"
            strokeColor={{
              "0%": "#a855f7",
              "100%": "#ec4899",
            }}
            trailColor="#f3e8ff"
          />
          <div className="text-xs text-purple-600">
            375K/500K Tin nhắn miễn phí
          </div>
        </div>
      ) : (
        // Collapsed state - Compact vertical layout with ALWAYS VISIBLE progress bar
        <div className="flex flex-col items-center py-2">
          <div className="relative w-2.5 h-32 bg-purple-200 rounded-full overflow-hidden vertical-progress">
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-full sidebar-transition"
              style={{ height: `${progressValue}%` }}
            />
          </div>
          {/* Show percentage text below progress bar when collapsed */}
          <div className="text-xs text-purple-600 mt-2 font-medium">
            {progressValue}%
          </div>
        </div>
      )}
    </div>
  );
}
