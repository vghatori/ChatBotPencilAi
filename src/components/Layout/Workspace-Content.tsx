'use client';

import { Layout } from 'antd';

//--------------------------------------------------------------------

const WorkspaceContent = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    const { Content } = Layout;

    return (
        <>
            <Content>  
                {children}
            </Content>
        </>
    )
}

//--------------------------------------------------------------------

export default WorkspaceContent;