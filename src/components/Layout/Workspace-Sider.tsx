'use client';

import { AutoComplete, Layout } from 'antd';
import { WorkspaceSideBar } from '@/components';

//--------------------------------------------------------------------

const WorkspaceSider = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    const { Sider } = Layout;

    return (
        <>
            <Sider
                theme='light'
            >
                {children}
            </Sider>
        </>
    )
}

//--------------------------------------------------------------------

export default WorkspaceSider;