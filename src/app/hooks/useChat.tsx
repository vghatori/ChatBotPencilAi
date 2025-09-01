import { useState, useEffect } from 'react';
import { mockChannels, mockMessages, Channel, Message } from '@/_mock/social-platforms';

export function useChat(channelId: string) {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const channel = mockChannels.find(c => c.id === channelId);
    setActiveChannel(channel || null);
    setMessages(mockMessages[channelId] || []);
  }, [channelId]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      const timer = setTimeout(() => {
        const botResponse: Message = {
          id: Date.now(),
          text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
  };

  return { activeChannel, messages, sendMessage };
}