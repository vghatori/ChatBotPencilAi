"use client";

import React from "react";
import Image from "next/image";
import { 
  Plus, 
  X, 
  Users, 
  Crown,
  Store,
  Settings,
  UserPlus
} from "lucide-react";
import CreateDMModal from "./CreateDMModal";

interface PrivateChannel {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "idle" | "dnd" | "offline";
  isBot?: boolean;
  isVerified?: boolean;
  clanTag?: string;
  activity?: string;
  unread?: boolean;
  mentions?: number;
}

interface ChannelListProps {
  selectedChannel?: string;
  filteredChannels: PrivateChannel[];
  showCreateDM: boolean;
  onChannelClick: (channelId: string) => void;
  onCloseChannel: (channelId: string, e: React.MouseEvent) => void;
  onCreateDMToggle: () => void;
  onCreateDM: (userId: string) => void;
  onSettingsClick: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "idle":
      return "bg-yellow-500";
    case "dnd":
      return "bg-red-500";
    case "offline":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

export default function ChannelList({
  selectedChannel,
  filteredChannels,
  showCreateDM,
  onChannelClick,
  onCloseChannel,
  onCreateDMToggle,
  onCreateDM,
  onSettingsClick
}: ChannelListProps) {
  return (
    <div className="p-2">
      {/* Friends Button */}
      <div className="mb-2">
        <button
          onClick={() => onChannelClick("friends")}
          className={`w-full flex items-center p-2 rounded text-sm transition-colors ${
            selectedChannel === "friends"
              ? "bg-purple-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
            <Users size={16} />
          </div>
          <span className="flex-1 text-left">Bạn bè</span>
        </button>
      </div>

      {/* Nitro Button */}
      <div className="mb-2">
        <button
          onClick={() => onChannelClick("nitro")}
          className={`w-full flex items-center p-2 rounded text-sm transition-colors ${
            selectedChannel === "nitro"
              ? "bg-purple-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
            <Crown size={16} />
          </div>
          <span className="flex-1 text-left">Tham gia Nitro</span>
        </button>
      </div>

      {/* Shop Button */}
      <div className="mb-2 relative">
        <button
          onClick={() => onChannelClick("shop")}
          className={`w-full flex items-center p-2 rounded text-sm transition-colors ${
            selectedChannel === "shop"
              ? "bg-purple-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
            <Store size={16} />
          </div>
          <span className="flex-1 text-left">Cửa hàng</span>
          <div className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            mới
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 my-2" />

      {/* Direct Messages Header */}
      <div className="flex items-center justify-between px-2 py-1 mb-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Tin nhắn trực tiếp
        </h2>
        <div className="flex items-center space-x-1">
          <button
            onClick={onCreateDMToggle}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Tạo tin nhắn trực tiếp"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={onSettingsClick}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Cài đặt"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Create DM Modal */}
      {showCreateDM && (
        <CreateDMModal
          onCreateDM={onCreateDM}
          onClose={() => onCreateDMToggle()}
        />
      )}

      {/* Direct Messages List */}
      <div className="space-y-1">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className={`group relative flex items-center p-2 rounded text-sm transition-colors ${
              selectedChannel === channel.id
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => onChannelClick(channel.id)}
          >
            {/* Avatar */}
            <div className="relative mr-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                {channel.avatar.startsWith("http") ? (
                  <Image
                    src={channel.avatar}
                    alt={channel.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg">{channel.avatar}</span>
                )}
              </div>
              {/* Status Indicator */}
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(channel.status)} rounded-full border-2 border-gray-800`} />
            </div>

            {/* Channel Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="truncate font-medium">{channel.name}</span>
                {channel.isBot && channel.isVerified && (
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
                {channel.clanTag && (
                  <span className="text-xs text-gray-400 bg-gray-700 px-1.5 py-0.5 rounded">
                    {channel.clanTag}
                  </span>
                )}
              </div>
              {channel.activity && (
                <div className="text-xs text-gray-400 truncate">
                  {channel.activity}
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={(e) => onCloseChannel(channel.id, e)}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white transition-all"
              aria-label={`Đóng cuộc trò chuyện với ${channel.name}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
