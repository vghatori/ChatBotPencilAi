"use client";

import React, { useState } from "react";
// SỬA: Xóa bỏ các import của Next.js vì môi trường này không hỗ trợ
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
import {
  Layout,
  Button,
  Badge,
  Typography,
  Menu,
  Dropdown,
  Avatar,
  Space,
  Grid,
  Drawer,
} from "antd";
import type { MenuProps } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Bell, Pencil } from "lucide-react";
import clsx from "clsx";

const { Header } = Layout;
const { Text } = Typography;

// Định nghĩa kiểu dữ liệu cho các mục navigation
export interface NavItem {
  key: React.Key;
  label: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
}

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

// SỬA LỖI: Thêm `defaultSelectedKey` trở lại props
interface HeaderProps {
  navItems?: NavItem[];
  user?: User | null;
  notificationCount?: number;
  defaultSelectedKey?: React.Key;
  onNavigate?: (href: string) => void;
}

export default function DashboardHeader({
  navItems = [],
  user = null,
  notificationCount = 3,
  defaultSelectedKey,
  onNavigate,
}: HeaderProps) {
  const screens = Grid.useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // SỬA LỖI: Sử dụng `defaultSelectedKey` để khởi tạo trạng thái active
  const [activeKey, setActiveKey] = useState<React.Key>(
    defaultSelectedKey || (navItems.length > 0 ? navItems[0].key : "")
  );

  const getUserMenuItems = (): MenuProps["items"] => {
    const items: MenuProps["items"] = [];
    if (user) {
      items.push({
        key: "profile-info",
        disabled: true,
        label: (
          <Space className="p-2" align="start">
            <Avatar size="large" src={user.avatarUrl} />
            <div>
              <Text strong>{user.name}</Text>
              <br />
              <Text type="secondary">{user.email}</Text>
            </div>
          </Space>
        ),
      });
      items.push({ type: "divider" });
    }
    items.push(
      { key: "profile", icon: <UserOutlined />, label: "Trang cá nhân" },
      { key: "statistics", icon: <BarChartOutlined />, label: "Thống kê" },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Đăng xuất",
        danger: true,
      }
    );
    return items;
  };

  const handleMobileMenuClick: MenuProps["onClick"] = (e) => {
    const clickedItem = navItems.find((item) => item.key === e.key);
    if (clickedItem && onNavigate) {
      onNavigate(clickedItem.href);
    }
    setActiveKey(e.key);
    setDrawerVisible(false);
  };

  // Giao diện cho màn hình lớn (Desktop)
  const renderDesktopView = () => (
    <div className="container mx-auto flex h-full w-full items-center justify-between px-6">
      {/* Phần bên trái (Logo) */}
      <a href="/" className="flex flex-shrink-0 items-center gap-2">
        <Pencil className="h-6 w-6 text-[#1a365d]" />
        <span className="text-xl font-bold text-[#1a365d] tracking-wider">
          PENCIL AI
        </span>
      </a>

      {/* Phần ở giữa (Menu) */}
      <nav className="flex items-center justify-center gap-2">
        {navItems.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveKey(item.key);
                if (onNavigate) {
                  onNavigate(item.href);
                }
              }}
              className={clsx(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap",
                {
                  "bg-[#DC2626]/10 text-[#DC2626] shadow-sm": isActive,
                  "text-[#DC2626]/80 hover:text-[#DC2626] hover:bg-[#DC2626]/5":
                    !isActive,
                }
              )}
            >
              {item.icon}
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Phần bên phải (Nút chức năng) */}
      <div className="flex flex-shrink-0 items-center gap-4">
        <Badge count={notificationCount} size="small" color="#1a365d">
          <Button
            type="text"
            shape="circle"
            className="flex h-[40px] w-[40px] items-center justify-center"
            icon={
              <Bell className="h-5 w-5 text-[#1a365d] transition-colors hover:text-[#1a365d]" />
            }
          />
        </Badge>
        <Dropdown menu={{ items: getUserMenuItems() }} trigger={["click"]}>
          <a
            onClick={(e) => e.preventDefault()}
            className="flex cursor-pointer items-center transition-opacity hover:opacity-80"
          >
            <Avatar src={user?.avatarUrl} icon={!user && <UserOutlined />} />
          </a>
        </Dropdown>
      </div>
    </div>
  );

  // Giao diện cho màn hình nhỏ (Mobile)
  const renderMobileView = () => (
    <div className="flex w-full items-center justify-between px-4">
      <Button
        type="text"
        icon={<MenuOutlined className="text-[#1a365d]" />}
        onClick={() => setDrawerVisible(true)}
      />
      <a href="/" className="flex items-center gap-2">
        <Pencil className="h-5 w-5 text-[#1a365d]" />
        <span className="text-lg font-bold text-[#1a365d]">PENCIL AI</span>
      </a>
      <Space>
        <Badge count={notificationCount} size="small" color="#1a365d">
          <Button
            type="text"
            shape="circle"
            icon={<Bell className="h-5 w-5 text-[#1a365d]" />}
          />
        </Badge>
        <Avatar src={user?.avatarUrl} icon={!user && <UserOutlined />} />
      </Space>
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          className="border-none"
          style={{
            color: "#0D9488",
          }}
          items={navItems.map((item) => ({
            key: item.key,
            label: item.label,
            icon: item.icon,
            className: "font-semibold tracking-wide hover:text-[#0D9488]",
            style: {
              color:
                item.key === activeKey ? "#0D9488" : "rgba(13, 148, 136, 0.8)",
            },
          }))}
          selectedKeys={[String(activeKey)]}
          onClick={handleMobileMenuClick}
        />
      </Drawer>
    </div>
  );

  return (
    <Header
      className="sticky top-0 z-50 flex items-center border-b p-0"
      style={{
        height: "64px",
        background:
          "linear-gradient(135deg, #FFD1DB 0%, #FFB8C6 60%, #FFA8B8 100%)",
        borderColor: "rgba(255, 152, 172, 0.2)",
        boxShadow: "0 4px 16px rgba(255, 152, 172, 0.15)",
      }}
    >
      {screens.lg ? renderDesktopView() : renderMobileView()}
    </Header>
  );
}
