"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { message as antdMessage } from "antd";
import { Hash } from "lucide-react";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: "admin" | "moderator" | "member";
  };
  timestamp: Date;
  edited?: boolean;
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onReactionClick?: (messageId: string, emoji: string) => void;
  onMessageEdit?: (messageId: string, newContent: string) => void;
  onMessageDelete?: (messageId: string) => void;
  onMessageCopy?: (messageId: string) => void;
  currentUserId?: string;
  autoScroll?: boolean;
}

export default function MessageList({ 
  messages, 
  isTyping, 
  onReactionClick,
  onMessageEdit,
  onMessageDelete,
  onMessageCopy,
  currentUserId = "current-user",
  autoScroll = true
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  /** Scroll to bottom of messages. */
  const scrollToBottom = useCallback(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScroll]);

  /** Auto-scroll when new messages arrive. */
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /** Handle scroll to bottom button click. */
  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  /** Handle reaction click with validation. */
  const handleReactionClick = useCallback((messageId: string, emoji: string) => {
    if (!messageId || !emoji.trim()) return;
    
    try {
      onReactionClick?.(messageId, emoji);
    } catch (err) {
      console.error("[MessageList] handleReactionClick", err);
      antdMessage.error("Không thể thêm reaction.");
    }
  }, [onReactionClick]);

  /** Handle message edit with validation. */
  const handleMessageEdit = useCallback((messageId: string, newContent: string) => {
    if (!messageId || !newContent.trim()) return;
    
    try {
      onMessageEdit?.(messageId, newContent);
    } catch (err) {
      console.error("[MessageList] handleMessageEdit", err);
      antdMessage.error("Không thể chỉnh sửa tin nhắn.");
    }
  }, [onMessageEdit]);

  /** Handle message delete with validation. */
  const handleMessageDelete = useCallback((messageId: string) => {
    if (!messageId) return;
    
    try {
      onMessageDelete?.(messageId);
    } catch (err) {
      console.error("[MessageList] handleMessageDelete", err);
      antdMessage.error("Không thể xóa tin nhắn.");
    }
  }, [onMessageDelete]);

  /** Handle message copy with validation. */
  const handleMessageCopy = useCallback((messageId: string) => {
    if (!messageId) return;
    
    try {
      onMessageCopy?.(messageId);
    } catch (err) {
      console.error("[MessageList] handleMessageCopy", err);
      antdMessage.error("Không thể sao chép tin nhắn.");
    }
  }, [onMessageCopy]);

  return (
    <div className="flex-1 overflow-y-auto relative" ref={messagesContainerRef}>
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Hash size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Chào mừng đến với #general!
            </h3>
            <p className="text-sm">Đây là nơi bắt đầu cuộc trò chuyện.</p>
          </div>
        </div>
      ) : (
        <div>
          {messages.map((message) => (
            <MessageItem 
              key={message.id} 
              message={message}
              onReactionClick={handleReactionClick}
              onMessageEdit={handleMessageEdit}
              onMessageDelete={handleMessageDelete}
              onMessageCopy={handleMessageCopy}
              currentUserId={currentUserId}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Scroll to Bottom Button */}
      {messages.length > 0 && (
        <button
          onClick={handleScrollToBottom}
          className="absolute bottom-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-lg transition-colors z-10"
          aria-label="Cuộn xuống tin nhắn mới nhất"
        >
          <Hash size={16} />
        </button>
      )}
    </div>
  );
}
