"use client";

import React, { useRef, useCallback } from "react";
import { message as antdMessage } from "antd";
import { Crown, Shield, MoreVertical, Edit, Trash2, Copy } from "lucide-react";

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

interface MessageItemProps {
  message: Message;
  onReactionClick?: (messageId: string, emoji: string) => void;
  onMessageEdit?: (messageId: string, newContent: string) => void;
  onMessageDelete?: (messageId: string) => void;
  onMessageCopy?: (messageId: string) => void;
  currentUserId?: string;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Crown size={12} className="text-yellow-400" />;
    case "moderator":
      return <Shield size={12} className="text-blue-400" />;
    default:
      return null;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "text-yellow-400";
    case "moderator":
      return "text-blue-400";
    default:
      return "text-gray-300";
  }
};

const formatTime = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 7) return `${days} ngày trước`;

  return timestamp.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function MessageItem({
  message,
  onReactionClick,
  onMessageEdit,
  onMessageDelete,
  onMessageCopy,
  currentUserId = "current-user",
}: MessageItemProps) {
  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editContent, setEditContent] = React.useState(message.content);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  const isCurrentUser = message.author.id === currentUserId;

  /** Handle reaction click with validation. */
  const handleReactionClick = useCallback(
    (emoji: string) => {
      if (!emoji.trim()) return;

      try {
        onReactionClick?.(message.id, emoji);
      } catch (err) {
        console.error("[MessageList] handleReactionClick", err);
        antdMessage.error("Không thể thêm reaction.");
      }
    },
    [message.id, onReactionClick]
  );

  /** Handle message edit with validation. */
  const handleMessageEdit = useCallback(() => {
    if (!editContent.trim() || editContent === message.content) {
      setIsEditing(false);
      setEditContent(message.content);
      return;
    }

    try {
      onMessageEdit?.(message.id, editContent.trim());
      setIsEditing(false);
      antdMessage.success("Đã chỉnh sửa tin nhắn.");
    } catch (err) {
      console.error("[MessageList] handleMessageEdit", err);
      antdMessage.error("Không thể chỉnh sửa tin nhắn.");
    }
  }, [message.id, message.content, editContent, onMessageEdit]);

  /** Handle message delete with confirmation. */
  const handleMessageDelete = useCallback(() => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) {
      try {
        onMessageDelete?.(message.id);
        antdMessage.success("Đã xóa tin nhắn.");
      } catch (err) {
        console.error("[MessageList] handleMessageDelete", err);
        antdMessage.error("Không thể xóa tin nhắn.");
      }
    }
    setShowContextMenu(false);
  }, [message.id, onMessageDelete]);

  /** Handle message copy. */
  const handleMessageCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(message.content);
      onMessageCopy?.(message.id);
      antdMessage.success("Đã sao chép tin nhắn.");
    } catch (err) {
      console.error("[MessageList] handleMessageCopy", err);
      antdMessage.error("Không thể sao chép tin nhắn.");
    }
    setShowContextMenu(false);
  }, [message.id, message.content, onMessageCopy]);

  /** Handle edit mode toggle. */
  const handleEditToggle = useCallback(() => {
    setIsEditing(true);
    setEditContent(message.content);
    setShowContextMenu(false);
    setTimeout(() => {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }, 100);
  }, [message.content]);

  /** Handle edit cancel. */
  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    setEditContent(message.content);
  }, [message.content]);

  /** Handle edit key events. */
  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleMessageEdit();
      } else if (e.key === "Escape") {
        handleEditCancel();
      }
    },
    [handleMessageEdit, handleEditCancel]
  );

  return (
    <div
      className={`group px-4 py-2 hover:bg-gray-750 transition-colors relative ${
        isCurrentUser ? "bg-gray-750/50" : ""
      }`}
      role="article"
      aria-label={`Tin nhắn từ ${message.author.name}`}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {message.author.avatar}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-center space-x-2 mb-1">
            <span
              className={`font-semibold text-sm ${getRoleColor(
                message.author.role
              )}`}
            >
              {message.author.name}
            </span>
            {getRoleIcon(message.author.role)}
            <span className="text-xs text-gray-400">
              {formatTime(message.timestamp)}
            </span>
            {message.edited && (
              <span className="text-xs text-gray-500">(đã chỉnh sửa)</span>
            )}
          </div>

          {/* Message Text */}
          <div className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">
            {isEditing ? (
              <textarea
                ref={editInputRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={handleEditKeyDown}
                onBlur={handleMessageEdit}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-purple-500 outline-none resize-none"
                rows={Math.max(1, editContent.split("\n").length)}
                maxLength={2000}
                aria-label="Chỉnh sửa tin nhắn"
              />
            ) : (
              message.content
            )}
          </div>

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => handleReactionClick(reaction.emoji)}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-xs transition-colors"
                  aria-label={`Reaction ${reaction.emoji} với ${reaction.count} lượt thích`}
                  type="button"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-gray-300">{reaction.count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Context Menu */}
          {isCurrentUser && !isEditing && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setShowContextMenu(!showContextMenu)}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                aria-label="Tùy chọn tin nhắn"
                aria-expanded={showContextMenu}
                aria-haspopup="menu"
                type="button"
              >
                <MoreVertical size={16} />
              </button>

              {showContextMenu && (
                <div
                  className="absolute right-0 top-8 bg-gray-700 border border-gray-600 rounded-lg shadow-lg py-1 z-10 min-w-32"
                  role="menu"
                  aria-label="Tùy chọn tin nhắn"
                >
                  <button
                    onClick={handleEditToggle}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 transition-colors"
                    role="menuitem"
                    type="button"
                  >
                    <Edit size={14} />
                    <span>Chỉnh sửa</span>
                  </button>
                  <button
                    onClick={handleMessageCopy}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 transition-colors"
                    role="menuitem"
                    type="button"
                  >
                    <Copy size={14} />
                    <span>Sao chép</span>
                  </button>
                  <button
                    onClick={handleMessageDelete}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-600 transition-colors"
                    role="menuitem"
                    type="button"
                  >
                    <Trash2 size={14} />
                    <span>Xóa</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
