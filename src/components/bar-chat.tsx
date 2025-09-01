"use client";

import React from 'react';
import { Input, Space, Button } from 'antd';

const { Search } = Input;


interface BarChatProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const BarChat: React.FC<BarChatProps> = ({ value, onChange, onSubmit }) => (
  <div style={{ padding: '16px', backgroundColor: 'white', borderTop: '1px solid #f0f0f0' }}>
    <Search
      placeholder="Nhập tin nhắn..."
      enterButton="Gửi"
      size="large"
      value={value}
      onChange={onChange}
      onSearch={onSubmit}
      styles={{
        input: {
          borderColor: '#40a9ff', 
          borderWidth: '2px',     
          borderRadius: '10px',   
        },
      }}
    />
  </div>
);

export default BarChat;

