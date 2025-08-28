'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/Header';
import DashboardContent from '../../components/DashboardContent';

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      {/* Desktop Sidebar - Hidden on mobile, collapsible on tablet */}
      <div className="hidden lg:block">
        <Sidebar 
          selectedKey="home" 
          collapsed={collapsed}
          onCollapse={handleCollapse}
        />
      </div>

      <Layout className="lg:ml-0">
        {/* Header */}
        <DashboardHeader 
          pageTitle="Trang chủ" 
          notificationCount={3}
          onMenuClick={handleMobileMenu}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <DashboardContent />
      </Layout>

      {/* Mobile/Tablet Drawer Sidebar */}
      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-gray-800">FIC</span>
            </div>
            <span className="font-semibold text-gray-800">Flyone Hà Nội</span>
          </div>
        }
        placement="left"
        onClose={closeMobileMenu}
        open={mobileOpen}
        width={280}
        className="lg:hidden"
        styles={{
          body: { padding: 0 },
          header: { padding: '16px 24px' }
        }}
      >
        <Sidebar 
          selectedKey="home" 
          collapsed={false}
          isMobile={true}
        />
      </Drawer>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={handleMobileMenu}
          className="fixed bottom-6 right-6 z-30 lg:hidden touch-friendly"
          style={{ 
            borderRadius: '50%', 
            width: '56px', 
            height: '56px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        />
      )}
    </Layout>
  );
}
