"use client";

import React from "react";
import { 
  Hash, 
  Plus, 
  Settings, 
  Mic, 
  Headphones, 
  Volume2,
  ChevronDown,
  Crown
} from "lucide-react";

interface DiscordSidebarProps {
  selectedServer: string;
  selectedChannel: string;
  onServerSelect: (serverId: string) => void;
  onChannelSelect: (channelId: string) => void;
  collapsed: boolean;
}

interface Server {
  id: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  unread?: boolean;
  mentions?: number;
}

const servers: Server[] = [
  { id: "main", name: "AI Pencil", icon: "AIP", isActive: true },
  { id: "dev", name: "Development", icon: "DEV" },
  { id: "design", name: "Design", icon: "DES" },
  { id: "marketing", name: "Marketing", icon: "MAR" },
];

const channels: Channel[] = [
  { id: "general", name: "general", type: "text", unread: true, mentions: 3 },
  { id: "announcements", name: "announcements", type: "text" },
  { id: "random", name: "random", type: "text" },
  { id: "voice-general", name: "General", type: "voice" },
  { id: "voice-gaming", name: "Gaming", type: "voice" },
];

export default function DiscordSidebar({
  selectedServer,
  selectedChannel,
  onServerSelect,
  onChannelSelect,
  collapsed
}: DiscordSidebarProps) {

  const getChannelIcon = (type: string) => {
    return type === "voice" ? <Volume2 size={16} /> : <Hash size={16} />;
  };

  const getServerIcon = (server: Server) => {
    return (
      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
        {server.icon}
      </div>
    );
  };

  return (
    <div className={`bg-gray-800 border-r border-gray-700 flex ${collapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
      {/* Server List */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-2">
        {/* Home Server */}
        <div className="relative">
          <button
            onClick={() => onServerSelect("main")}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              selectedServer === "main"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <Crown size={20} />
          </button>
          {selectedServer === "main" && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
          )}
        </div>

        {/* Divider */}
        <div className="w-8 h-px bg-gray-600" />

        {/* Other Servers */}
        {servers.slice(1).map((server) => (
          <div key={server.id} className="relative">
            <button
              onClick={() => onServerSelect(server.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                selectedServer === server.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {getServerIcon(server)}
            </button>
            {selectedServer === server.id && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
            )}
          </div>
        ))}

        {/* Add Server */}
        <button className="w-12 h-12 rounded-full bg-gray-700 text-gray-300 hover:bg-green-600 hover:text-white transition-all duration-200 flex items-center justify-center">
          <Plus size={20} />
        </button>
      </div>

      {/* Channel List */}
      {!collapsed && (
        <div className="flex-1 flex flex-col">
          {/* Server Header */}
          <div className="h-12 border-b border-gray-700 flex items-center justify-between px-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <ChevronDown size={16} className="text-gray-400" />
              <span className="font-semibold text-white text-sm">
                {servers.find(s => s.id === selectedServer)?.name}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 text-gray-400 hover:text-white transition-colors">
                <Plus size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-white transition-colors">
                <Settings size={16} />
              </button>
            </div>
          </div>

          {/* Channels */}
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {/* Text Channels */}
            <div className="mb-4">
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Text Channels
                </span>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <div className="space-y-1">
                {channels.filter(c => c.type === "text").map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => onChannelSelect(channel.id)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-all duration-200 group ${
                      selectedChannel === channel.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {getChannelIcon(channel.type)}
                    <span className="flex-1 text-left truncate">{channel.name}</span>
                    {channel.mentions && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {channel.mentions}
                      </span>
                    )}
                    {channel.unread && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Channels */}
            <div>
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Voice Channels
                </span>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <div className="space-y-1">
                {channels.filter(c => c.type === "voice").map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => onChannelSelect(channel.id)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-all duration-200 group ${
                      selectedChannel === channel.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {getChannelIcon(channel.type)}
                    <span className="flex-1 text-left truncate">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gray-900 p-2">
            <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">DR</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">Dũng Rùa</div>
                <div className="text-gray-400 text-xs truncate">#1234</div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <Mic size={16} />
                </button>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <Headphones size={16} />
                </button>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
