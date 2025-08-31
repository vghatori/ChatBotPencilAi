'use client';

import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { LeftOutlined } from '@ant-design/icons';

const ButtonBack: React.FC = () => {
  const router = useRouter(); 
  
  const handleGoBack = () => {
    router.back();
  };
  return (
    <Button 
      icon={<LeftOutlined />} 
      onClick={handleGoBack}
    >
      Quay lại
    </Button>
  );
};

export default ButtonBack;