'use client';

import React from 'react';
import { WorkspaceSider, WorkspaceContent, WorkspaceHeader } from '@/components/Layout';
import { Layout } from 'antd';
import dynamic from 'next/dynamic';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { ButtonBack} from '@/components';

const WorkspaceChatSideBar = dynamic(
  () => import('@/components/Workspace-chat-menu'),
  { ssr: false }
);

export default function ChatSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const workspaceAlias = params.alias as string;

  const pathParts = pathname.split('/');
  const selectedChannelId = (pathParts.length === 5 && pathParts[3] === 'chat')
    ? pathParts[4]
    : null;

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(`/workspace/${workspaceAlias}/chat/${key}`);
  };

  return (
    <>
      <Layout>
          <WorkspaceHeader>
            <ButtonBack href={`/workspace/${workspaceAlias}`}/>
          </WorkspaceHeader>
        <Layout>
          <WorkspaceSider>
            <WorkspaceChatSideBar
              onMenuClick={handleMenuClick}
              selectedChannelId={selectedChannelId}
              />
            </WorkspaceSider>
          <WorkspaceContent>
            {children}
          </WorkspaceContent>
        </Layout>
      </Layout>
    </>
  );
}