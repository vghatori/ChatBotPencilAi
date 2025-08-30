"use client";

import React, { useState } from "react";
import { Layout, Menu, Progress, Avatar, Button, Divider } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  RobotOutlined,
  MessageOutlined,
  ToolOutlined,
  CommentOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

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
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

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

  const handleToggleSidebar = () => {
    if (onCollapse) {
      onCollapse(!collapsed);
    }
  };

  // Create menu items for collapsed and expanded states
  const getMenuItems = (items: Array<{key: string, icon: React.ReactNode, label: string}>, isCollapsed: boolean) => {
    if (isCollapsed) {
      return items.map((item) => ({
        key: item.key,
        icon: (
          <div className="flex items-center justify-center w-full h-full">
            {item.icon}
          </div>
        ),
        label: null, // Hide label when collapsed
      }));
    }
    return items;
  };

  const basicMenuItemsFormatted = getMenuItems(basicMenuItems, collapsed);
  const advancedMenuItemsFormatted = getMenuItems(advancedMenuItems, collapsed);

  return (
    <Sider
      width={collapsed ? 80 : 280}
      collapsible={false}
      collapsed={collapsed}
             className="bg-white border-r border-purple-100 shadow-lg sidebar-transition relative"
       style={{
         background: "white",
         borderRight: "1px solid #f3e8ff",
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
         <div
           className={`flex-shrink-0 border-b border-purple-100 ${
             collapsed ? "p-3" : "p-4 lg:p-6"
           }`}
         >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className={`flex items-center ${
                collapsed ? "justify-center w-full" : "space-x-3"
              }`}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div
                                 className={`${
                   collapsed ? "w-8 h-8" : "w-10 h-10"
                 } bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md logo-pulse cursor-pointer transition-all duration-200 ${
                   isLogoHovered && collapsed ? "scale-110" : ""
                 }`}
                onClick={collapsed ? handleToggleSidebar : undefined}
              >
                {collapsed && isLogoHovered ? (
                  <MenuUnfoldOutlined className="text-white text-sm" />
                ) : (
                  <span
                    className={`font-bold text-white ${
                      collapsed ? "text-xs" : "text-sm"
                    }`}
                  >
                    {collapsed ? "AI" : "AIP"}
                  </span>
                )}
              </div>

              {!collapsed && (
                <div className="min-w-0 sidebar-fade-in">
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
            {!collapsed && (
                           <Button
               type="text"
               icon={<MenuFoldOutlined />}
               className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2"
               onClick={handleToggleSidebar}
               size="small"
             />
            )}
          </div>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 scrollbar-hide sidebar-scroll">
          <div className="space-y-6 pt-4">
            {/* Basic Section */}
            <div>
              {!collapsed && (
                <div className="sidebar-section-header">Cơ bản</div>
              )}
              <Menu
                mode="inline"
                selectedKeys={[selectedMenuItem]}
                items={basicMenuItemsFormatted}
                className="border-0 bg-transparent"
                style={{ border: "none", background: "transparent" }}
                inlineCollapsed={collapsed}
                onSelect={(info) => handleMenuItemClick(info.key)}
              />
            </div>

            {/* Subtle Divider between sections */}
                         {!collapsed && (
               <div className="flex justify-center">
                 <Divider 
                   className="w-16 border-purple-200" 
                   style={{ margin: "16px 0", borderColor: "#e9d5ff" }}
                 />
               </div>
             )}

            {/* Advanced Section */}
            <div>
              {!collapsed && (
                <div className="sidebar-section-header">Nâng cao</div>
              )}
              <Menu
                mode="inline"
                selectedKeys={[selectedMenuItem]}
                items={advancedMenuItemsFormatted}
                className="border-0 bg-transparent"
                style={{ border: "none", background: "transparent" }}
                inlineCollapsed={collapsed}
                onSelect={(info) => handleMenuItemClick(info.key)}
              />
            </div>
          </div>
        </div>

                 {/* Bottom Section - Fixed at bottom */}
         <div className="flex-shrink-0 border-t border-purple-100">
          <div className={`space-y-3 ${collapsed ? "p-2" : "p-4 lg:p-6"}`}>
            {/* Message Usage */}
                         <div
               className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 sidebar-scale-in ${
                 collapsed ? "message-usage-collapsed" : "p-4"
               }`}
             >
              {!collapsed ? (
                // Expanded state - Horizontal layout
                <>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Số lượng tin nhắn
                  </div>
                                     <Progress
                     percent={75}
                     size="small"
                     className="mb-2 progress-animate"
                     strokeColor={{
                       "0%": "#a855f7",
                       "100%": "#ec4899",
                     }}
                     trailColor="#f3e8ff"
                   />
                   <div className="text-xs text-purple-600">
                     375K/500K Tin nhắn miễn phí
                   </div>
                </>
              ) : (
                                 // Collapsed state - Compact vertical layout
                 <div className="flex flex-col items-center py-2">
                   <div className="relative w-2.5 h-32 bg-purple-200 rounded-full overflow-hidden vertical-progress">
                     <div
                       className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                       style={{ height: "75%" }}
                     />
                   </div>
                 </div>
              )}
            </div>

            {/* User Profile */}
                         <div
               className={`flex items-center ${
                 collapsed
                   ? "justify-center user-profile-collapsed"
                   : "space-x-3 p-3"
               } bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 sidebar-transition`}
              onMouseEnter={() => setIsAvatarHovered(true)}
              onMouseLeave={() => setIsAvatarHovered(false)}
            >
                             <Avatar
                 size={40}
                 className="bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 shadow-md"
               >
                 <UserOutlined />
               </Avatar>
               
               {!collapsed && (
                 <div className="min-w-0 sidebar-fade-in">
                   <div className="font-medium text-gray-800 truncate">
                     Dũng Rùa
                   </div>
                   <div className="text-xs text-purple-600 truncate">Admin</div>
                 </div>
               )}

                             {/* Expand info icon on hover when collapsed */}
               {collapsed && isAvatarHovered && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg transition-all duration-200">
                   <InfoCircleOutlined className="text-white text-lg" />
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
}
