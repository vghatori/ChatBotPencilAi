"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { message as antdMessage } from "antd";
import { 
  Search, 
  Plus, 
  X, 
  Users, 
  Crown,
  Store,
  Settings,
  UserPlus
} from "lucide-react";
import SearchBar from "./SearchBar";
import ChannelList from "./ChannelList";
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

interface DiscordPrivateChannelsProps {
  selectedChannel?: string;
  onChannelSelect?: (channelId: string) => void;
  onSearchChange?: (query: string) => void;
  onCloseChannel?: (channelId: string) => void;
  onCreateDM?: (userId: string) => void;
  onStatusChange?: (channelId: string, status: string) => void;
  onSettingsClick?: () => void;
}

const privateChannels: PrivateChannel[] = [
  {
    id: "friends",
    name: "Bạn bè",
    avatar: "👥",
    status: "online",
    isBot: false
  },
  {
    id: "nitro",
    name: "Tham gia Nitro",
    avatar: "💎",
    status: "online",
    isBot: false
  },
  {
    id: "shop",
    name: "Cửa hàng",
    avatar: "🛍️",
    status: "online",
    isBot: false,
    unread: true
  },
  {
    id: "mypham2946",
    name: "mypham2946",
    avatar: "https://cdn.discordapp.com/avatars/1309156219893584014/320d5a40d309f942.png",
    status: "offline",
    isBot: false
  },
  {
    id: "hungnm2310",
    name: "hungnm2310",
    avatar: "https://cdn.discordapp.com/avatars/1400709410334183544/788f05731f8aa02e.png",
    status: "idle",
    isBot: false
  },
  {
    id: "kero",
    name: "Kero",
    avatar: "https://cdn.discordapp.com/avatars/592598503306297355/1812219561a503f04809972304855445.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "d3aa2n3",
    name: "d3aa2n3",
    avatar: "https://cdn.discordapp.com/avatars/675887905704771638/c634b07b5ecb54a6cf6196efa4988da5.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "haaa",
    name: "Hàaa",
    avatar: "https://cdn.discordapp.com/avatars/1015623747778138192/9ea9528e0519daee842bfad619720d14.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "discord",
    name: "Discord",
    avatar: "https://cdn.discordapp.com/avatars/643945264868098049/c6a249645d46209f337279cd2ca998c7.webp",
    status: "online",
    isBot: true,
    isVerified: true
  },
  {
    id: "vietcuong",
    name: "Việt Cường",
    avatar: "https://cdn.discordapp.com/avatars/1382993598479466548/18e336a74a159cfd.png",
    status: "offline",
    isBot: false
  },
  {
    id: "rowolf",
    name: "Rowolf_gaming",
    avatar: "https://cdn.discordapp.com/avatars/743998241242087466/be2f22cdf17a92fe5a0be6768554d4a2.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "quangtrinh",
    name: "Quang Trình",
    avatar: "https://cdn.discordapp.com/avatars/1382424517393125477/9855d7e3b9780976.png",
    status: "offline",
    isBot: false
  },
  {
    id: "wings",
    name: "Wings[]FroggyMan",
    avatar: "https://cdn.discordapp.com/avatars/1043787566190690344/0e9aea0923bc33b55503981a0e4cb2ed.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "thngan",
    name: "thngan",
    avatar: "https://cdn.discordapp.com/avatars/1287771906111705203/89fbdcc21d734bf828893284add635e2.webp",
    status: "idle",
    isBot: false
  },
  {
    id: "haiminhh",
    name: "Hai Minhh",
    avatar: "https://cdn.discordapp.com/avatars/1201884719692926986/c82b3fa769ed6e6ffdea579381ed5f5c.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "nngthao",
    name: "N Ng Thao",
    avatar: "https://cdn.discordapp.com/avatars/1375519871147839589/320d5a40d309f942.png",
    status: "offline",
    isBot: false
  },
  {
    id: "liljvenn",
    name: "Lil JVenn",
    avatar: "https://cdn.discordapp.com/avatars/859140720865706025/e4c30c51e2c36c495bdb3cfa87160eb4.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "borischi",
    name: "Boris Chi",
    avatar: "https://cdn.discordapp.com/avatars/1256297389128421427/82817bd4ae6dc7ff734f54df45c672a5.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "thanhvan",
    name: "thanh van",
    avatar: "https://cdn.discordapp.com/avatars/1287307916625313812/157e517cdbf371a47aaead44675714a3.webp",
    status: "idle",
    isBot: false
  },
  {
    id: "riotgames",
    name: "Riot games",
    avatar: "https://cdn.discordapp.com/avatars/1156186435410477119/b877da91e34be71c2b1682a4a67b1b54.webp",
    status: "offline",
    isBot: false
  },
  {
    id: "hope",
    name: "Hope",
    avatar: "https://cdn.discordapp.com/avatars/1051154399113793586/2464de5a13c9261d95670ae0f33fe234.webp",
    status: "idle",
    isBot: false,
    clanTag: "XNXX"
  },
  {
    id: "liam",
    name: "Liam",
    avatar: "https://cdn.discordapp.com/avatars/817746317245677628/d12a098ccd55769e87659ed845d756a0.webp",
    status: "dnd",
    isBot: false,
    clanTag: "GD",
    activity: "chill"
  },
  {
    id: "qcd",
    name: "QCĐ",
    avatar: "https://cdn.discordapp.com/avatars/501759033926221825/2c75a4cf9f542ca6e1cf20484e05afe4.webp",
    status: "online",
    isBot: false,
    clanTag: "KWB"
  },
  {
    id: "ymmal",
    name: "ymmal",
    avatar: "https://cdn.discordapp.com/avatars/845498928484057089/ced3475d98c5a8e89a9d4e6c45bff7ae.webp",
    status: "offline",
    isBot: false,
    clanTag: "XDAY"
  },
  {
    id: "cu_anh",
    name: "𝘾𝙪́ 𝘼𝙣𝙝 🦉",
    avatar: "https://cdn.discordapp.com/avatars/889482395240235089/2af81c6bc4e6a197174a4c03da588ca5.webp",
    status: "offline",
    isBot: false,
    clanTag: "TổCú"
  },
  {
    id: "korusticket",
    name: "KorusTicket",
    avatar: "https://cdn.discordapp.com/avatars/1340998864844492822/ba249ad8357fbb38cb780202080161cd.webp",
    status: "offline",
    isBot: false
  }
];

export default function DiscordPrivateChannels({ 
  selectedChannel, 
  onChannelSelect,
  onSearchChange,
  onCloseChannel,
  onCreateDM,
  onStatusChange,
  onSettingsClick
}: DiscordPrivateChannelsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDM, setShowCreateDM] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredChannels = privateChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /** Handle channel selection with validation. */
  const handleChannelClick = useCallback((channelId: string) => {
    if (!channelId.trim()) return;
    
    try {
      onChannelSelect?.(channelId);
    } catch (err) {
      console.error("[DiscordPrivateChannels] handleChannelClick", err);
      antdMessage.error("Không thể chọn kênh.");
    }
  }, [onChannelSelect]);

  /** Handle close channel with confirmation. */
  const handleCloseChannel = useCallback((channelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm("Bạn có chắc chắn muốn đóng cuộc trò chuyện này?")) {
      try {
        onCloseChannel?.(channelId);
        antdMessage.success("Đã đóng cuộc trò chuyện.");
      } catch (err) {
        console.error("[DiscordPrivateChannels] handleCloseChannel", err);
        antdMessage.error("Không thể đóng cuộc trò chuyện.");
      }
    }
  }, [onCloseChannel]);

  /** Handle search input change with debounce. */
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  }, [onSearchChange]);

  /** Handle create DM toggle. */
  const handleCreateDMToggle = useCallback(() => {
    setShowCreateDM(!showCreateDM);
  }, [showCreateDM]);

  /** Handle create DM with user. */
  const handleCreateDM = useCallback((userId: string) => {
    if (!userId.trim()) return;
    
    try {
      onCreateDM?.(userId);
      setShowCreateDM(false);
      antdMessage.success("Đã tạo cuộc trò chuyện mới.");
    } catch (err) {
      console.error("[DiscordPrivateChannels] handleCreateDM", err);
      antdMessage.error("Không thể tạo cuộc trò chuyện.");
    }
  }, [onCreateDM]);

  /** Handle status change. */
  const _handleStatusChange = useCallback((channelId: string, status: string) => {
    if (!channelId || !status) return;
    
    try {
      onStatusChange?.(channelId, status);
      antdMessage.success("Đã thay đổi trạng thái.");
    } catch (err) {
      console.error("[DiscordPrivateChannels] handleStatusChange", err);
      antdMessage.error("Không thể thay đổi trạng thái.");
    }
  }, [onStatusChange]);

  /** Handle settings click. */
  const handleSettingsClick = useCallback(() => {
    try {
      onSettingsClick?.();
    } catch (err) {
      console.error("[DiscordPrivateChannels] handleSettingsClick", err);
      antdMessage.error("Không thể mở cài đặt.");
    }
  }, [onSettingsClick]);

  /** Handle search toggle. */
  const handleSearchToggle = useCallback(() => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [showSearch]);

  /** Handle keyboard navigation. */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowSearch(false);
      setShowCreateDM(false);
    }
  }, []);

  /** Focus search input when search is shown. */
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <nav 
      className="hidden md:flex w-60 bg-gray-800 border-r border-gray-700 flex-col h-full flex-shrink-0"
      onKeyDown={handleKeyDown}
    >
      {/* Search Bar */}
      <SearchBar
        show={showSearch}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchToggle={handleSearchToggle}
        searchInputRef={searchInputRef}
      />

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto">
        <ChannelList
          selectedChannel={selectedChannel}
          filteredChannels={filteredChannels}
          showCreateDM={showCreateDM}
          onChannelClick={handleChannelClick}
          onCloseChannel={handleCloseChannel}
          onCreateDMToggle={handleCreateDMToggle}
          onCreateDM={handleCreateDM}
          onSettingsClick={handleSettingsClick}
        />
      </div>
    </nav>
  );
}
