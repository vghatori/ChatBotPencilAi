"use client";

import React from "react";
import { 
  Bell, 
  Pin, 
  Users, 
  Phone,
  Video,
  Info,
  Search
} from "lucide-react";

interface ChatHeaderProps {
  channelName: string;
  channelIcon: React.ReactNode;
  channelType: string;
  notificationsEnabled: boolean;
  pinnedMessages: string[];
  selectedChannel: string;
  showSearch: boolean;
  onNotificationToggle: () => void;
  onPinToggle: () => void;
  onSearchToggle: () => void;
  onVoiceCall: () => void;
  onVideoCall: () => void;
  onInfoToggle: () => void;
}

export default function ChatHeader({
  channelName,
  channelIcon,
  channelType,
  notificationsEnabled,
  pinnedMessages,
  selectedChannel,
  showSearch,
  onNotificationToggle,
  onPinToggle,
  onSearchToggle,
  onVoiceCall,
  onVideoCall,
  onInfoToggle
}: ChatHeaderProps) {
  return (
    <div className="h-12 border-b border-gray-700 bg-gray-800 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {channelIcon}
          <span className="font-semibold text-white text-lg">
            {channelName}
          </span>
        </div>
        <div className="w-px h-6 bg-gray-600" />
        <span className="text-gray-400 text-sm">
          {channelType}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button 
          onClick={onNotificationToggle}
          className={`p-2 rounded transition-colors ${
            notificationsEnabled 
              ? "text-white bg-gray-700" 
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          aria-label={notificationsEnabled ? "Tắt thông báo" : "Bật thông báo"}
          type="button"
        >
          <Bell size={18} />
        </button>
        <button 
          onClick={onPinToggle}
          className={`p-2 rounded transition-colors ${
            pinnedMessages.includes(selectedChannel)
              ? "text-white bg-gray-700" 
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          aria-label={pinnedMessages.includes(selectedChannel) ? "Bỏ ghim kênh" : "Ghim kênh"}
          type="button"
        >
          <Pin size={18} />
        </button>
        <button 
          onClick={onSearchToggle}
          className={`p-2 rounded transition-colors ${
            showSearch 
              ? "text-white bg-gray-700" 
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          aria-label="Tìm kiếm tin nhắn"
          type="button"
        >
          <Search size={18} />
        </button>
        <div className="w-px h-6 bg-gray-600" />
        <div className="flex items-center space-x-1">
          <button 
            onClick={onVoiceCall}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            aria-label="Cuộc gọi thoại"
            type="button"
          >
            <Phone size={18} />
          </button>
          <button 
            onClick={onVideoCall}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            aria-label="Cuộc gọi video"
            type="button"
          >
            <Video size={18} />
          </button>
          <button 
            onClick={onInfoToggle}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            aria-label="Thông tin kênh"
            type="button"
          >
            <Info size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
