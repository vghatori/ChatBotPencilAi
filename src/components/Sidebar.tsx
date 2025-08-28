'use client';

import React from 'react';
import { Layout, Menu, Progress, Avatar } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  RobotOutlined,
  MessageOutlined,
  ToolOutlined,
  CommentOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  selectedKey?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
}

export default function Sidebar({ selectedKey = 'home', collapsed = false, onCollapse }: SidebarProps) {
  const basicMenuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: 'customers', icon: <UserOutlined />, label: 'Khách hàng' },
    { key: 'automation', icon: <RobotOutlined />, label: 'Automation' },
    { key: 'messageFlows', icon: <MessageOutlined />, label: 'Luồng tin nhắn' },
    { key: 'tools', icon: <ToolOutlined />, label: 'Công cụ' },
    { key: 'comments', icon: <CommentOutlined />, label: 'Bình luận' },
  ];

  const advancedMenuItems = [
    { key: 'botcakeAI', icon: <RobotOutlined />, label: 'Botcake AI' },
    { key: 'liveChat', icon: <MessageOutlined />, label: 'Live chat' },
    { key: 'sendMessages', icon: <MessageOutlined />, label: 'Gửi tin nhắn' },
    { key: 'ecommerce', icon: <ShoppingCartOutlined />, label: 'E-commerce' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Cấu hình' },
  ];

  return (
    <Sider
      width={collapsed ? 80 : 280}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="bg-white border-r border-gray-200 shadow-sm transition-all duration-300"
      style={{
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
      breakpoint="lg"
      collapsedWidth={80}
    >
      <div className="p-6">
        {/* Logo and Brand */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} mb-8`}>
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-gray-800">FIC</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-semibold text-gray-800 truncate">Flyone Hà Nội</div>
              <div className="text-xs text-gray-500 truncate">Powered by Botcake AI</div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="space-y-6">
          <div>
            {!collapsed && (
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Cơ bản
              </div>
            )}
            <Menu
              mode="inline"
              defaultSelectedKeys={[selectedKey]}
              items={basicMenuItems}
              className="border-0 bg-transparent"
              style={{ border: 'none', background: 'transparent' }}
              inlineCollapsed={collapsed}
            />
          </div>

          <div>
            {!collapsed && (
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Nâng cao
              </div>
            )}
            <Menu
              mode="inline"
              items={advancedMenuItems}
              className="border-0 bg-transparent"
              style={{ border: 'none', background: 'transparent' }}
              inlineCollapsed={collapsed}
            />
          </div>
        </div>

        {/* Message Usage */}
        <div className="mt-auto pt-6">
          <div className="bg-gray-50 rounded-xl p-4">
            {!collapsed && (
              <div className="text-sm font-medium text-gray-700 mb-2">
                Số lượng tin nhắn
              </div>
            )}
            <Progress
              percent={0}
              size="small"
              className="mb-2"
              strokeColor="#fc8393"
            />
            {!collapsed && (
              <div className="text-xs text-gray-500">
                0/500K Tin nhắn miễn phí
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} mt-4 p-3 bg-gray-50 rounded-xl`}>
            <Avatar size={40} className="bg-blue-500 flex-shrink-0">
              <UserOutlined />
            </Avatar>
            {!collapsed && (
              <div className="min-w-0">
                <div className="font-medium text-gray-800 truncate">Dũng Rùa</div>
                <div className="text-xs text-gray-500 truncate">Admin</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sider>
  );
}
