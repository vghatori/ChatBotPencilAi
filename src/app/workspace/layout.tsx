'use client';

import React from 'react';
import "../globals.css";
import WorkspaceSideBar from '@/components/nav-sidebar';
import  WorkspaceModal  from '../../components/workspace-modal';
import SearchBar from '../../components/searchbar-channel';


export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className = 'workspace'>
          <div className='headContainer'>
            <SearchBar/>
            <div className='modalContainer'>
              <WorkspaceModal/>
            </div>
          </div>
          <div className='bodyContainer'>
            <div className='sidebarContainer'>
              <WorkspaceSideBar/>
            </div>
            <div className='mainContent'>
              {children}
            </div>
          </div>
      </div>
    </>
  );
}