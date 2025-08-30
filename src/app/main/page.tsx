"use client";

import React, { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/Header";
import DashboardContent from "../../components/DashboardContent";

const { Content } = Layout;

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
        <DashboardHeader 
          pageTitle="Trang chủ" 
          notificationCount={3}
          onMenuClick={handleMobileMenu}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <Content className="bg-white">
          <DashboardContent />
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
