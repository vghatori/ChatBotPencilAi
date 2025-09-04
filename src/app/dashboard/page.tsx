"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Layout, Drawer, Card, Row, Col, Button, Typography } from "antd";
=======
import {
  Layout,
  Drawer,
  Card,
  Row,
  Col,
  Button,
  Typography,
} from "antd";
>>>>>>> 9b979c2b9032a28c0c67450d793b29a01e0542c8
import {
  MessageOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Sidebar, Header } from "@/components";
import { DashboardContent, NewFeaturesSection } from "./components";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Auto-collapse sidebar on mobile
      if (mobile) {
        setCollapsed(true);
        setMobileOpen(false);
      } else {
        setCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const handleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // Dashboard navigation cards
  const dashboardCards = [
    {
      title: "Chat AI",
      description: "Trò chuyện với AI Pencil",
      icon: <MessageOutlined className="text-3xl text-blue-500" />,
      link: "/chat",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Dashboard",
      description: "Quản lý và theo dõi",
      icon: <DashboardOutlined className="text-3xl text-green-500" />,
      link: "/dashboard",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Cài đặt",
      description: "Tùy chỉnh hệ thống",
      icon: <SettingOutlined className="text-3xl text-purple-500" />,
      link: "/settings",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Hồ sơ",
      description: "Thông tin cá nhân",
      icon: <UserOutlined className="text-3xl text-orange-500" />,
      link: "/profile",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Responsive Sidebar - Hidden on mobile, visible on desktop/tablet */}
      <div className="hidden lg:block sidebar-container">
        <Sidebar
          selectedKey="home"
          collapsed={collapsed}
          onCollapse={handleCollapse}
        />
      </div>

      <Layout
        className={`main-content-container transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-70"
        }`}
      >
        {/* Header */}
        <Header
          pageTitle="Trang chủ"
          notificationCount={3}
          onMenuClick={handleMobileMenu}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <Content className="bg-white p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <Title level={2} className="mb-2">
              Chào mừng bạn đến với AI Pencil! 🚀
            </Title>
            <Paragraph className="text-gray-600 text-lg">
              Khám phá các tính năng mới và bắt đầu trò chuyện với AI
            </Paragraph>
          </div>

          {/* Quick Navigation Cards */}
          <div className="mb-8">
            <Title level={3} className="mb-4 flex items-center">
              <RocketOutlined className="mr-2 text-blue-500" />
              Truy cập nhanh
            </Title>
            <Row gutter={[16, 16]}>
              {dashboardCards.map((card, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card
                    hoverable
                    className="text-center cursor-pointer transition-all duration-300 hover:shadow-lg"
                    onClick={() => (window.location.href = card.link)}
                  >
                    <div className="mb-4">{card.icon}</div>
                    <Title level={4} className="mb-2">
                      {card.title}
                    </Title>
                    <Paragraph className="text-gray-600 mb-4">
                      {card.description}
                    </Paragraph>
                    <Button
                      type="primary"
                      className={`bg-gradient-to-r ${card.color} border-0 hover:opacity-90`}
                    >
                      Truy cập
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Dashboard Content */}
          <DashboardContent />

          {/* New Features Section */}
          <NewFeaturesSection />
        </Content>
      </Layout>

      {/* Mobile Drawer - Only for mobile devices */}
      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">AIP</span>
            </div>
            <span className="font-semibold text-gray-800">AI Pencil</span>
          </div>
        }
        placement="left"
        onClose={closeMobileMenu}
        open={mobileOpen}
        width={280}
        className="lg:hidden"
        styles={{
          body: { padding: 0 },
          header: { padding: "16px 24px" },
        }}
      >
        <Sidebar selectedKey="home" collapsed={false} />
      </Drawer>
    </Layout>
  );
}
