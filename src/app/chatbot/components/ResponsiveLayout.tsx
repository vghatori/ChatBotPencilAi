"use client";

import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { Sidebar, Header } from "@/components";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  notificationCount?: number;
  isFixedHeader?: boolean;
}

export default function ResponsiveLayout({
  children,
  pageTitle,
  notificationCount = 0,
  isFixedHeader = true,
}: ResponsiveLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width < 1024;
      const tablet = width >= 640 && width < 1024;

      setIsMobile(mobile);

      if (mobile) {
        setCollapsed(true);
        setMobileOpen(false);
      } else if (tablet) {
        // For tablets, start with collapsed sidebar
        setCollapsed(true);
        setMobileOpen(false);
      } else {
        // For desktop, start with collapsed sidebar to save space
        setCollapsed(true);
        setMobileOpen(false);
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
    <div className="flex-1 flex overflow-hidden">
      {/* Responsive Sidebar */}
      <div className="hidden lg:block sidebar-container">
        <Sidebar
          selectedKey="chat"
          collapsed={collapsed}
          onCollapse={handleCollapse}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-70"
        }`}
      >
        {/* Header - Fixed or Static based on isFixedHeader */}
        {isFixedHeader ? (
          <div
            className="fixed top-0 right-0 z-50 w-full"
            style={{
              left: isMobile ? "0px" : collapsed ? "80px" : "280px",
              transition: "left 0.3s ease",
            }}
          >
            <div className="w-full max-w-none 2xl:max-w-[1600px] xl:max-w-[1400px] lg:max-w-[1200px] md:max-w-[1000px] mx-auto">
              <Header
                pageTitle={pageTitle}
                notificationCount={notificationCount}
                onMenuClick={handleMobileMenu}
                isMobile={isMobile}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-none 2xl:max-w-[1600px] xl:max-w-[1400px] lg:max-w-[1200px] md:max-w-[1000px] mx-auto">
            <Header
              pageTitle={pageTitle}
              notificationCount={notificationCount}
              onMenuClick={handleMobileMenu}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* Main Content */}
        <div
          className={`flex-1 relative overflow-hidden ${
            isFixedHeader ? "pt-16" : ""
          }`}
          style={{
            background:
              "radial-gradient(ellipse at center bottom, #FFFFFF 0%, #F9F4FC 100%)",
            maxHeight: isFixedHeader ? "calc(100vh - 60px)" : "100vh",
          }}
        >
          <div className="w-full max-w-none 2xl:max-w-[1600px] xl:max-w-[1400px] lg:max-w-[1200px] md:max-w-[1000px] mx-auto h-full px-2 sm:px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
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
        <Sidebar selectedKey="chat" collapsed={false} />
      </Drawer>
    </div>
  );
}
