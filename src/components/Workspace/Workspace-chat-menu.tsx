'use client';

import React, { useState } from 'react';
import { Menu, Button, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { mockChannels } from '@/_mock/social-platforms';

//--------------------------------------------------------------------

type MenuItem = Required<MenuProps>['items'][number];

//--------------------------------------------------------------------

const channelItems: MenuItem[] = mockChannels.map((channel) => ({
  key: channel.id,   
  label: channel.name,
  icon: channel.icon,     
}));

//--------------------------------------------------------------------

interface WorkspaceChatSideBarProps {
  selectedChannelId?: string | null;
  onMenuClick: MenuProps['onClick'];
}

//--------------------------------------------------------------------

const WorkspaceChatSideBar: React.FC<WorkspaceChatSideBarProps> = ({ selectedChannelId, onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: collapsed ? 80 : 256, transition: 'width 0.2s' }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        onClick={onMenuClick}
        selectedKeys={selectedChannelId ? [selectedChannelId] : []}
        mode="inline"
        inlineCollapsed={collapsed} // <--- CHỈ CẦN DÙNG PROP NÀY
        items={channelItems}
      />
    </div>
  );
};

//--------------------------------------------------------------------

export default WorkspaceChatSideBar;