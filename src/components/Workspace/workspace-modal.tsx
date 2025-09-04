"use client";

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { socialPlatforms } from '@/_mock/social-platforms';

const WorkspaceModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPlatform, setSelectedPlatform] = React.useState<string | null>(null);

  const showModal = () => setIsModalOpen(true);

  const handleConnect = () => {
    if (selectedPlatform) {
      console.log(`Kết nối với: ${selectedPlatform}`);
      setIsModalOpen(false);
      setSelectedPlatform(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPlatform(null);
  };

  return (
    <>
      <style jsx>{`
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
          padding-top: 16px;
        }
        .social-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 10px;
          border: 1px solid #d9d9d9;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .social-option:hover {
          border-color: #1677ff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .social-option.selected {
          border-color: #1677ff;
          background-color: #e6f4ff;
          transform: translateY(-2px);
        }
        .social-name {
          margin-top: 12px;
          font-weight: 500;
          color: #333;
        }
      `}</style>
    <div style={{ padding: '20px', minHeight: '100px' }}>
      <Button type="primary" onClick={showModal}>
        Tạo kênh mới
      </Button>
    </div>

      <Modal
        title="Kết nối một kênh mạng xã hội mới"
        open={isModalOpen}
        onOk={handleConnect}
        onCancel={handleCancel}
        width={600}
        okText="Kết nối"
        cancelText="Hủy"
        okButtonProps={{ disabled: !selectedPlatform }}
      >
        <p style={{ color: '#888', marginTop: 0 }}>
          Chọn một nền tảng bạn muốn kết nối để bắt đầu.
        </p>
        
        <div className="social-grid">
          {socialPlatforms.map((platform) => (
            <div
              key={platform.id}
              className={`social-option ${selectedPlatform === platform.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlatform(platform.id)}
            >
              {platform.icon}
              <span className="social-name">{platform.name}</span>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default WorkspaceModal;
