
import React from 'react';
import { WorkspaceSider, WorkspaceHeader, WorkspaceContent, WorkspaceFooter} from '@/components/Layout';
import { Layout } from 'antd';
import { WorkspaceSideBar, SearchBar, WorkspaceModal } from '@/components'

//--------------------------------------------------------------------

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Layout>
        <WorkspaceHeader>
            <SearchBar/>
            <WorkspaceModal/>
        </WorkspaceHeader>
        <Layout>
          <WorkspaceSider> <WorkspaceSideBar/> </WorkspaceSider>
          <WorkspaceContent>{children}</WorkspaceContent>
        </Layout>
      </Layout>
    </>
  );
}