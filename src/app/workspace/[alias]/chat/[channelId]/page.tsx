'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { BarChat } from '@/components';
import { useChat } from '../../../../hooks/useChat';
import { useAutoScroll } from '../../../../hooks/useScrollChat';

export default function WorkspaceChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  // Gọi custom hooks để lấy logic và state
  const { activeChannel, messages, sendMessage } = useChat(channelId);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useAutoScroll(messages); // Tự động cuộn khi `messages` thay đổi

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  if (!activeChannel) {
    return <div className="p-8 text-center text-gray-500">Đang tải thông tin kênh...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Phần Giao diện (JSX) không thay đổi nhiều */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-200 shrink-0">
        <div className="w-8 h-8">{activeChannel.icon}</div>
        <h1 className="text-lg font-semibold text-gray-800">{activeChannel.name}</h1>
      </header>
      
      <main className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}>
            <div className={`max-w-md px-4 py-2 rounded-xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
              <p className="break-words">{msg.text}</p>
              <span className="block mt-1 text-xs text-right opacity-70">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <BarChat
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSubmit={handleSendMessage}
      />
    </div>
  );
}