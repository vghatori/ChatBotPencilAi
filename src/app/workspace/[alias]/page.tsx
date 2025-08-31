'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { mockChannels, Channel } from '@/_mock/social-platforms';
import styles from './workspace.module.css';


export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const workspaceAlias = params.alias as string;

  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const pathParts = pathname.split('/');
    if (pathParts.length === 5 && pathParts[3] === 'chat') {
      const channelId = pathParts[4];
      const channelToOpen = mockChannels.find(c => c.id === channelId);
      setActiveChannel(channelToOpen || null);
    } else {
      setActiveChannel(null);
    }
  }, [pathname]);

  const handleSelectChannel = (channel: Channel) => {
    router.push(`/workspace/${workspaceAlias}/chat/${channel.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div>
          {mockChannels.map((channel) => {
            const isActive = activeChannel?.id === channel.id;
            const channelClassName = `${styles.channelItem} ${isActive ? styles.active : ''}`;
            return (
              <div
                key={channel.id}
                onClick={() => handleSelectChannel(channel)}
                className={channelClassName.trim()}
              >
                {channel.icon}
                <span>{channel.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.mainContent}>
      </div>
    </div>
  );
}
