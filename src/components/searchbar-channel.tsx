"use client";

import React from 'react';
import { Input, Space, Button } from 'antd';

const { Search } = Input;


const handleSearch = (value: string) => {
  console.log('Bạn đã tìm kiếm:', value);
};

const SearchBar: React.FC = () => (
  <div style={{ padding: '20px', border: '1px solid #d9d9d9',minHeight: '100px' }}>
    <Space direction="vertical" style={{ width: '100%' }}>
      <Search
        placeholder="Nhập từ khóa tìm kiếm..."
        onSearch={handleSearch}
        enterButton
        styles={{
          input: {
            borderColor: '#40a9ff', 
            borderWidth: '2px',     
            borderRadius: '10px',   
          },
        }}
      />
    </Space>
  </div>
);

export default SearchBar;
