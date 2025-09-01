'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { mockChannels, Channel } from '@/_mock/social-platforms';
import dynamic from 'next/dynamic';

//--------------------------------------------------------------------
const WorkspaceChatSideBar = dynamic(
  () => import('@/components/Workspace-chat-menu').then(mod => mod.default),
  { ssr: false }
);
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

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(`/workspace/${workspaceAlias}/chat/${key}`);
};

  return (
    <>
      <WorkspaceChatSideBar
        onMenuClick={handleMenuClick}
        selectedChannelId={activeChannel?.id}
      />
     </>
  );
}
