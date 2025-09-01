'use client';

import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


//--------------------------------------------------------------------

type MenuItem = Required<MenuProps>['items'][number];

//--------------------------------------------------------------------

const items: MenuItem[] = [
  {
    label: 'Manage Channels',
    key: 'Manage Channels',
    type: 'group',
    children: [
      {
        key: 'Merged Channels',
        label: 'Merged Channels',
      },
      {
        key: 'All Channels',
        label: 'All Channels',
      },
    ],
  },
];

//--------------------------------------------------------------------

const WorkspaceSideBar = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          background: `#ffffff` 
        }}
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="vertical" 
        items={items} 
      />;
    </>
  )
};

export default WorkspaceSideBar;