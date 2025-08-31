'use client';


import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockChannels, mockMessages, Channel, Message } from '@/_mock/social-platforms';
import ButtonBack from '@/components/button-back';

export default function WorkspaceChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const channel = mockChannels.find(c => c.id === channelId);
    setActiveChannel(channel || null);
    setMessages(mockMessages[channelId] || []);
  }, [channelId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  if (!activeChannel) {
    return <div className="p-8 text-center text-gray-500">Đang tải thông tin kênh...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center gap-4 p-4 border-b border-gray-200 shrink-0">
        <ButtonBack />
        <div className="w-8 h-8">{activeChannel.icon}</div>
        <h1 className="text-lg font-semibold text-gray-800">{activeChannel.name}</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-xl shadow-sm ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <p className="break-words">{msg.text}</p>
              <span className="block mt-1 text-xs text-right opacity-70">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-4 bg-white border-t border-gray-200 shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!newMessage.trim()}
          >
            Gửi
          </button>
        </form>
      </footer>
    </div>
  );
}

