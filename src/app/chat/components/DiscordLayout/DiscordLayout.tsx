"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { message as antdMessage } from "antd";
import Sidebar from "@/components/Sidebar";
import { DiscordPrivateChannels } from "../DiscordPrivateChannels";
import { ChatInterface } from "../ChatInterface";
import ErrorBoundary from "./ErrorBoundary";
import LoadingIndicator from "./LoadingIndicator";

interface DiscordLayoutProps {
  selectedKey?: string;
  onError?: (error: Error) => void;
  onChannelChange?: (channelId: string) => void;
  onServerChange?: (serverId: string) => void;
}

export default function DiscordLayout({ 
  selectedKey = "chat",
  onError,
  onChannelChange,
  onServerChange
}: DiscordLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedServer, setSelectedServer] = useState("main");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  /** Handle sidebar collapse with validation. */
  const handleCollapse = useCallback((collapsed: boolean) => {
    try {
      setCollapsed(collapsed);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleCollapse", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /** Handle channel selection with validation. */
  const handleChannelSelect = useCallback((channelId: string) => {
    if (!channelId.trim()) return;
    
    try {
      setIsLoading(true);
      setSelectedChannel(channelId);
      onChannelChange?.(channelId);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleChannelSelect", error);
      setError(error);
      onError?.(error);
      antdMessage.error("Không thể chọn kênh.");
    } finally {
      setIsLoading(false);
    }
  }, [onChannelChange, onError]);

  /** Handle server selection with validation. */
  const _handleServerSelect = useCallback((serverId: string) => {
    if (!serverId.trim()) return;
    
    try {
      setIsLoading(true);
      setSelectedServer(serverId);
      onServerChange?.(serverId);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleServerSelect", error);
      setError(error);
      onError?.(error);
      antdMessage.error("Không thể chọn server.");
    } finally {
      setIsLoading(false);
    }
  }, [onServerChange, onError]);

  /** Handle search change. */
  const handleSearchChange = useCallback((query: string) => {
    try {
      // TODO: Implement search functionality
      console.log("[DiscordLayout] Search query:", query);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleSearchChange", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /** Handle close channel. */
  const handleCloseChannel = useCallback((channelId: string) => {
    try {
      // TODO: Implement close channel functionality
      console.log("[DiscordLayout] Close channel:", channelId);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleCloseChannel", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /** Handle create DM. */
  const handleCreateDM = useCallback((userId: string) => {
    try {
      // TODO: Implement create DM functionality
      console.log("[DiscordLayout] Create DM with:", userId);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleCreateDM", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /** Handle status change. */
  const handleStatusChange = useCallback((channelId: string, status: string) => {
    try {
      // TODO: Implement status change functionality
      console.log("[DiscordLayout] Status change:", channelId, status);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleStatusChange", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /** Handle settings click. */
  const handleSettingsClick = useCallback(() => {
    try {
      // TODO: Implement settings functionality
      console.log("[DiscordLayout] Settings clicked");
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleSettingsClick", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /** Handle chat interface callbacks. */
  const handleChatSearchChange = useCallback((query: string) => {
    try {
      handleSearchChange(query);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleChatSearchChange", error);
      setError(error);
      onError?.(error);
    }
  }, [handleSearchChange, onError]);

  const handleNotificationToggle = useCallback((enabled: boolean) => {
    try {
      // TODO: Implement notification toggle
      console.log("[DiscordLayout] Notifications:", enabled);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleNotificationToggle", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handlePinToggle = useCallback((pinned: boolean) => {
    try {
      // TODO: Implement pin toggle
      console.log("[DiscordLayout] Pin:", pinned);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handlePinToggle", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleVoiceCall = useCallback(() => {
    try {
      // TODO: Implement voice call
      console.log("[DiscordLayout] Voice call");
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleVoiceCall", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleVideoCall = useCallback(() => {
    try {
      // TODO: Implement video call
      console.log("[DiscordLayout] Video call");
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleVideoCall", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleInfoToggle = useCallback(() => {
    try {
      // TODO: Implement info toggle
      console.log("[DiscordLayout] Info toggle");
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleInfoToggle", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleReactionClick = useCallback((messageId: string, emoji: string) => {
    try {
      // TODO: Implement reaction click
      console.log("[DiscordLayout] Reaction:", messageId, emoji);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleReactionClick", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleMessageEdit = useCallback((messageId: string, newContent: string) => {
    try {
      // TODO: Implement message edit
      console.log("[DiscordLayout] Message edit:", messageId, newContent);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleMessageEdit", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleMessageDelete = useCallback((messageId: string) => {
    try {
      // TODO: Implement message delete
      console.log("[DiscordLayout] Message delete:", messageId);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleMessageDelete", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleMessageCopy = useCallback((messageId: string) => {
    try {
      // TODO: Implement message copy
      console.log("[DiscordLayout] Message copy:", messageId);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleMessageCopy", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleAttachFile = useCallback((file: File) => {
    try {
      // TODO: Implement file attachment
      console.log("[DiscordLayout] Attach file:", file.name);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleAttachFile", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  const handleEmojiSelect = useCallback((emoji: string) => {
    try {
      // TODO: Implement emoji selection
      console.log("[DiscordLayout] Emoji select:", emoji);
    } catch (err) {
      const error = err as Error;
      console.error("[DiscordLayout] handleEmojiSelect", error);
      setError(error);
      onError?.(error);
    }
  }, [onError]);

  /** Clear error when component unmounts or when new action is performed. */
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /** Handle keyboard shortcuts. */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            // TODO: Implement search shortcut
            break;
          case 'n':
            e.preventDefault();
            // TODO: Implement new DM shortcut
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={layoutRef} className="min-h-screen bg-gray-900 flex">
      {/* Error Boundary */}
      <ErrorBoundary error={error} onClose={() => setError(null)} />

      {/* Loading Indicator */}
      <LoadingIndicator isLoading={isLoading} />

      {/* First Sidebar - Keep existing design */}
      <div className="hidden lg:block sidebar-container">
        <Sidebar
          selectedKey={selectedKey}
          collapsed={collapsed}
          onCollapse={handleCollapse}
        />
      </div>

      {/* Content Area - Contains Second Sidebar and Chat */}
      <div className="flex-1 flex min-w-0">
        {/* Second Sidebar - Discord Private Channels */}
        <DiscordPrivateChannels
          selectedChannel={selectedChannel}
          onChannelSelect={handleChannelSelect}
          onSearchChange={handleSearchChange}
          onCloseChannel={handleCloseChannel}
          onCreateDM={handleCreateDM}
          onStatusChange={handleStatusChange}
          onSettingsClick={handleSettingsClick}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatInterface
            selectedChannel={selectedChannel}
            selectedServer={selectedServer}
            onSearchChange={handleChatSearchChange}
            onNotificationToggle={handleNotificationToggle}
            onPinToggle={handlePinToggle}
            onVoiceCall={handleVoiceCall}
            onVideoCall={handleVideoCall}
            onInfoToggle={handleInfoToggle}
            onReactionClick={handleReactionClick}
            onMessageEdit={handleMessageEdit}
            onMessageDelete={handleMessageDelete}
            onMessageCopy={handleMessageCopy}
            onAttachFile={handleAttachFile}
            onEmojiSelect={handleEmojiSelect}
          />
        </div>
      </div>
    </div>
  );
}
