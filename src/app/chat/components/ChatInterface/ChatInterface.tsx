"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { message as antdMessage } from "antd";
import { 
  Bell, 
  Pin, 
  Users, 
  MessageCircle,
  Phone,
  Video,
  Info,
  Search
} from "lucide-react";
import { MessageList } from "../MessageList";
import { MessageInput } from "../MessageInput";
import ChatHeader from "./ChatHeader";
import SearchBar from "./SearchBar";

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

interface ChatInterfaceProps {
  selectedChannel: string;
  selectedServer: string;
  onSearchChange?: (query: string) => void;
  onNotificationToggle?: (enabled: boolean) => void;
  onPinToggle?: (pinned: boolean) => void;
  onVoiceCall?: () => void;
  onVideoCall?: () => void;
  onInfoToggle?: () => void;
  onReactionClick?: (messageId: string, emoji: string) => void;
  onMessageEdit?: (messageId: string, newContent: string) => void;
  onMessageDelete?: (messageId: string) => void;
  onMessageCopy?: (messageId: string) => void;
  onAttachFile?: (file: File) => void;
  onEmojiSelect?: (emoji: string) => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Chào mừng mọi người đến với server AI Pencil! 🎉",
    author: {
      id: "admin1",
      name: "Dũng Rùa",
      avatar: "DR",
      role: "admin"
    },
    timestamp: new Date(Date.now() - 3600000),
    reactions: [
      { emoji: "🎉", count: 5, users: ["user1", "user2", "user3", "user4", "user5"] },
      { emoji: "👋", count: 3, users: ["user1", "user2", "user3"] }
    ]
  },
  {
    id: "2",
    content: "Hôm nay chúng ta sẽ thảo luận về các tính năng mới của AI Pencil. Ai có ý kiến gì không?",
    author: {
      id: "admin1",
      name: "Dũng Rùa",
      avatar: "DR",
      role: "admin"
    },
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: "3",
    content: "Tôi nghĩ tính năng chat interface mới rất hay! Giao diện giống Discord rất dễ sử dụng.",
    author: {
      id: "user1",
      name: "Nguyễn Văn A",
      avatar: "NA",
      role: "member"
    },
    timestamp: new Date(Date.now() - 2400000),
    reactions: [
      { emoji: "👍", count: 2, users: ["user2", "user3"] }
    ]
  },
  {
    id: "4",
    content: "Đúng rồi! Mình cũng thích cách tổ chức channel như thế này, rất rõ ràng và dễ tìm kiếm.",
    author: {
      id: "user2",
      name: "Trần Thị B",
      avatar: "TB",
      role: "moderator"
    },
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "5",
    content: "Có ai biết cách sử dụng tính năng voice chat không? Mình muốn thử test thử.",
    author: {
      id: "user3",
      name: "Lê Văn C",
      avatar: "LC",
      role: "member"
    },
    timestamp: new Date(Date.now() - 1200000),
  }
];

export default function ChatInterface({ 
  selectedChannel, 
  selectedServer: _selectedServer,
  onSearchChange,
  onNotificationToggle,
  onPinToggle,
  onVoiceCall,
  onVideoCall,
  onInfoToggle,
  onReactionClick,
  onMessageEdit,
  onMessageDelete,
  onMessageCopy,
  onAttachFile,
  onEmojiSelect
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /** Scroll to bottom of messages. */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /** Handle sending a message with validation. */
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: content.trim(),
        author: {
          id: "current-user",
          name: "Bạn",
          avatar: "B",
          role: "member"
        },
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
    } catch (err) {
      console.error("[ChatInterface] handleSendMessage", err);
      antdMessage.error("Không thể gửi tin nhắn.");
    }
  }, []);

  /** Handle search input change with debounce. */
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  }, [onSearchChange]);

  /** Handle notification toggle. */
  const handleNotificationToggle = useCallback(() => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    onNotificationToggle?.(newState);
    antdMessage.success(newState ? "Đã bật thông báo" : "Đã tắt thông báo");
  }, [notificationsEnabled, onNotificationToggle]);

  /** Handle pin toggle. */
  const handlePinToggle = useCallback(() => {
    const newState = !pinnedMessages.includes(selectedChannel);
    if (newState) {
      setPinnedMessages(prev => [...prev, selectedChannel]);
    } else {
      setPinnedMessages(prev => prev.filter(id => id !== selectedChannel));
    }
    onPinToggle?.(newState);
    antdMessage.success(newState ? "Đã ghim kênh" : "Đã bỏ ghim kênh");
  }, [selectedChannel, pinnedMessages, onPinToggle]);

  /** Handle voice call. */
  const handleVoiceCall = useCallback(() => {
    try {
      onVoiceCall?.();
      antdMessage.info("Đang kết nối cuộc gọi thoại...");
    } catch (err) {
      console.error("[ChatInterface] handleVoiceCall", err);
      antdMessage.error("Không thể bắt đầu cuộc gọi thoại.");
    }
  }, [onVoiceCall]);

  /** Handle video call. */
  const handleVideoCall = useCallback(() => {
    try {
      onVideoCall?.();
      antdMessage.info("Đang kết nối cuộc gọi video...");
    } catch (err) {
      console.error("[ChatInterface] handleVideoCall", err);
      antdMessage.error("Không thể bắt đầu cuộc gọi video.");
    }
  }, [onVideoCall]);

  /** Handle info toggle. */
  const handleInfoToggle = useCallback(() => {
    try {
      onInfoToggle?.();
    } catch (err) {
      console.error("[ChatInterface] handleInfoToggle", err);
      antdMessage.error("Không thể mở thông tin kênh.");
    }
  }, [onInfoToggle]);

  /** Handle reaction click. */
  const handleReactionClick = useCallback((messageId: string, emoji: string) => {
    try {
      onReactionClick?.(messageId, emoji);
    } catch (err) {
      console.error("[ChatInterface] handleReactionClick", err);
      antdMessage.error("Không thể thêm reaction.");
    }
  }, [onReactionClick]);

  /** Handle message edit. */
  const handleMessageEdit = useCallback((messageId: string, newContent: string) => {
    try {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: newContent, edited: true }
          : msg
      ));
      onMessageEdit?.(messageId, newContent);
    } catch (err) {
      console.error("[ChatInterface] handleMessageEdit", err);
      antdMessage.error("Không thể chỉnh sửa tin nhắn.");
    }
  }, [onMessageEdit]);

  /** Handle message delete. */
  const handleMessageDelete = useCallback((messageId: string) => {
    try {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      onMessageDelete?.(messageId);
    } catch (err) {
      console.error("[ChatInterface] handleMessageDelete", err);
      antdMessage.error("Không thể xóa tin nhắn.");
    }
  }, [onMessageDelete]);

  /** Handle message copy. */
  const handleMessageCopy = useCallback((messageId: string) => {
    try {
      onMessageCopy?.(messageId);
    } catch (err) {
      console.error("[ChatInterface] handleMessageCopy", err);
      antdMessage.error("Không thể sao chép tin nhắn.");
    }
  }, [onMessageCopy]);

  /** Handle file attachment. */
  const handleAttachFile = useCallback((file: File) => {
    try {
      onAttachFile?.(file);
    } catch (err) {
      console.error("[ChatInterface] handleAttachFile", err);
      antdMessage.error("Không thể đính kèm file.");
    }
  }, [onAttachFile]);

  /** Handle emoji selection. */
  const handleEmojiSelect = useCallback((emoji: string) => {
    try {
      onEmojiSelect?.(emoji);
    } catch (err) {
      console.error("[ChatInterface] handleEmojiSelect", err);
      antdMessage.error("Không thể thêm emoji.");
    }
  }, [onEmojiSelect]);

  const getChannelName = () => {
    const channelMap: { [key: string]: string } = {
      friends: "Bạn bè",
      nitro: "Tham gia Nitro",
      shop: "Cửa hàng",
      mypham2946: "mypham2946",
      hungnm2310: "hungnm2310",
      kero: "Kero",
      d3aa2n3: "d3aa2n3",
      haaa: "Hàaa",
      discord: "Discord",
      vietcuong: "Việt Cường",
      rowolf: "Rowolf_gaming",
      quangtrinh: "Quang Trình",
      wings: "Wings[]FroggyMan",
      thngan: "thngan",
      haiminhh: "Hai Minhh",
      nngthao: "N Ng Thao",
      liljvenn: "Lil JVenn",
      borischi: "Boris Chi",
      thanhvan: "thanh van",
      riotgames: "Riot games",
      hope: "Hope",
      liam: "Liam",
      qcd: "QCĐ",
      ymmal: "ymmal",
      cu_anh: "𝘾𝙪́ 𝘼𝙣𝙝 🦉",
      korusticket: "KorusTicket"
    };
    return channelMap[selectedChannel] || selectedChannel;
  };

  const getChannelIcon = () => {
    // For private channels, use message circle icon
    if (selectedChannel === "friends" || selectedChannel === "nitro" || selectedChannel === "shop") {
      return <MessageCircle size={20} />;
    }
    // For direct messages, use user icon
    return <Users size={20} />;
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Chat Header */}
      <ChatHeader
        channelName={getChannelName()}
        channelIcon={getChannelIcon()}
        channelType={selectedChannel === "friends" || selectedChannel === "nitro" || selectedChannel === "shop" 
          ? "Private Channel" 
          : "Direct Message"}
        notificationsEnabled={notificationsEnabled}
        pinnedMessages={pinnedMessages}
        selectedChannel={selectedChannel}
        showSearch={showSearch}
        onNotificationToggle={handleNotificationToggle}
        onPinToggle={handlePinToggle}
        onSearchToggle={() => setShowSearch(!showSearch)}
        onVoiceCall={handleVoiceCall}
        onVideoCall={handleVideoCall}
        onInfoToggle={handleInfoToggle}
      />

      {/* Search Bar */}
      {showSearch && (
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <MessageList 
          messages={messages} 
          isTyping={isTyping}
          onReactionClick={handleReactionClick}
          onMessageEdit={handleMessageEdit}
          onMessageDelete={handleMessageDelete}
          onMessageCopy={handleMessageCopy}
          currentUserId="current-user"
          autoScroll={true}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <MessageInput 
          onSendMessage={handleSendMessage}
          onAttachFile={handleAttachFile}
          onEmojiSelect={handleEmojiSelect}
          placeholder={`Nhập tin nhắn trong #${getChannelName()}`}
        />
      </div>
    </div>
  );
}
