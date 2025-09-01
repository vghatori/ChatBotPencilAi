'use client';

import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { LeftOutlined } from '@ant-design/icons';

interface ButtonBackProps {
  href?: string;
  children?: React.ReactNode;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ href, children }) => {
  const router = useRouter(); 
  
  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };
  return (
    <Button 
      icon={<LeftOutlined />} 
      onClick={handleClick}
    >
      {children || 'Quay lại'}
    </Button>
  );
};

export default ButtonBack;