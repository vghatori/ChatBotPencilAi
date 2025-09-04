"use client";

import React from "react";
import { Layout } from "antd";
import {
  HomeFilled,
  AppstoreOutlined,
  BookFilled,
  GithubFilled,
  ReadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import DashboardHeader, { NavItem } from "../components/Header";

const { Content } = Layout;

export default function HomePage() {
  const router = useRouter();

  // Định nghĩa các mục menu cho thanh navigation
  const navItems: NavItem[] = [
    { key: "/", label: "Trang chủ", icon: <HomeFilled />, href: "/" },
    {
      key: "/templates",
      label: "Mẫu thiết kế",
      icon: <AppstoreOutlined />,
      href: "/templates",
    },
    {
      key: "/apps",
      label: "Ứng dụng",
      icon: <AppstoreOutlined />,
      href: "/apps",
    },
    { key: "/blog", label: "Blog", icon: <BookFilled />, href: "/blog" },
    {
      key: "/about",
      label: "Giới thiệu",
      icon: <GithubFilled />,
      href: "/about",
    },
    { key: "/docs", label: "Tài liệu", icon: <ReadOutlined />, href: "/docs" },
  ];

  // Thông tin người dùng mẫu
  const currentUser = {
    name: "Truong Son",
    email: "sondnha123@gmail.com",
    avatarUrl: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashboardHeader
        navItems={navItems}
        user={currentUser}
        defaultSelectedKey="/"
        notificationCount={5}
        onNavigate={(href) => router.push(href)}
      />
      <Content style={{ padding: "24px 48px" }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
            borderRadius: "8px",
          }}
        >
          <h1>Chào mừng đến với PENCIL AI!</h1>
          <p>Nội dung trang web của bạn sẽ hiển thị ở đây.</p>
        </div>
      </Content>
    </Layout>
  );
}
