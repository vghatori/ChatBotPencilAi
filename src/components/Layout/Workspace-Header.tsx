'use client';

import { Layout } from 'antd';
import { SearchBar, WorkspaceModal } from '@/components';

//--------------------------------------------------------------------

const WorkspaceHeader = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    const { Header } = Layout;

    return (
        <>
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 24px',
                    background: '#ffffffff',
                }}
            >
                {children}
            </Header>
        </>
    )
}

//--------------------------------------------------------------------

export default WorkspaceHeader;