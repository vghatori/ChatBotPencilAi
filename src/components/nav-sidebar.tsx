'use client';

import React from 'react';
import { Anchor } from 'antd';
import styles from "../app/WorkspaceSideBar.module.css";
const handleClick = (
  e: React.MouseEvent<HTMLElement>,
  link: {
    title: React.ReactNode;
    href: string;
  },
) => {
  e.preventDefault();
  console.log(link);
};

const WorkspaceSideBar: React.FC = () => (
  <div className={styles.customAnchor}>
    <Anchor
      affix={false}
      onClick={handleClick}
      items={[
        {
          key: '1',
          href: '#merged-channels',
          title: 'Merged Channels',
        },
        {
          key: '2',
          href: '#merged-channels',
          title: 'All Channels',
        },
      ]}
    />

  </div>
);

export default WorkspaceSideBar;