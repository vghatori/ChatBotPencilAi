"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button, message as antMessage, Dropdown, Menu } from "antd";
import {
  PlusOutlined,
  SendOutlined,
  AudioOutlined,
  SoundOutlined,
  PictureOutlined,
  FileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

interface FloatingChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isWelcome?: boolean;
  onUpload?: (file: File) => void;
}

const FloatingChatInput: React.FC<FloatingChatInputProps> = ({
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
  isWelcome = false,
  onUpload,
}) => {
  const [isComposing, setIsComposing] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(async () => {
    if (!message.trim()) return;

    const messageText = message.trim();
    setMessage("");

    try {
      onSendMessage();
    } catch (error) {
      antMessage.error("Không thể gửi tin nhắn");
      setMessage(messageText); // Restore message on error
    }
  }, [message, onSendMessage, setMessage]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && !isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend, isComposing]
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (onUpload) {
          onUpload(file);
        } else {
          antMessage.info(`Đã chọn file: ${file.name}`);
        }
      }
    },
    [onUpload]
  );

  const handleUploadClick = useCallback((type: "image" | "file") => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "image" ? "image/*" : "*";
      fileInputRef.current.click();
    }
  }, []);

  const uploadMenuItems: MenuProps["items"] = [
    {
      key: "image",
      icon: <PictureOutlined />,
      label: "Tải lên ảnh",
      onClick: () => handleUploadClick("image"),
    },
    {
      key: "file",
      icon: <FileOutlined />,
      label: "Tải lên file",
      onClick: () => handleUploadClick("file"),
    },
  ];

  const toggleVoiceMode = useCallback(() => {
    setVoiceMode(!voiceMode);
    antMessage.info(
      voiceMode ? "Tắt chế độ giọng nói" : "Bật chế độ giọng nói"
    );
  }, [voiceMode]);

  const handleMicClick = useCallback(() => {
    antMessage.info(
      "Tính năng ghi âm sẽ được phát triển trong phiên bản tiếp theo"
    );
  }, []);

  return (
    <div 
      className={`fixed bottom-0 z-50 bg-white border-t border-gray-200 transition-all duration-500 ease-in-out ${
        isWelcome 
          ? "left-1/2 -translate-x-1/2 -translate-y-20 w-auto" 
          : "left-0 right-0"
      }`}
    >
      <div className="flex justify-center px-4 @[37rem]:px-6 @[72rem]:px-16 py-4">
        <div
          className={`${isWelcome ? "max-w-2xl" : "max-w-4xl"} w-full relative`}
        >
          <form className="group/composer w-full">
            {/* ChatGPT-style composer container with old theme */}
            <div
              className="bg-white rounded-3xl shadow-2xl backdrop-blur-xl p-2 
                         grid grid-cols-[auto_1fr_auto] 
                         [grid-template-areas:'leading_primary_trailing']"
              style={{ borderRadius: "28px" }}
            >
              {/* Leading: Plus button */}
              <div className="[grid-area:leading] flex items-center">
                <Dropdown
                  menu={{ items: uploadMenuItems }}
                  trigger={["click"]}
                  placement="topLeft"
                >
                  <button
                    type="button"
                    className="composer-btn w-9 h-9 flex items-center justify-center rounded-full 
                             text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="composer-plus-btn"
                  >
                    <PlusOutlined className="w-5 h-5" />
                  </button>
                </Dropdown>
              </div>

              {/* Primary: Message input */}
              <div className="-my-2.5 flex min-h-14 items-center overflow-x-hidden px-1.5 [grid-area:primary]">
                <div
                  className="text-gray-900 max-h-[max(35svh,5rem)] max-h-52 flex-1 overflow-auto 
                             [scrollbar-width:thin] vertical-scroll-fade-mask"
                >
                  <textarea
                    ref={textAreaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder="Ask anything"
                    className="w-full resize-none border-0 outline-none bg-transparent 
                             text-gray-900 placeholder-gray-500 text-base leading-6 
                             py-2 px-0 overflow-y-auto"
                    style={{
                      minHeight: "24px",
                      maxHeight: "200px",
                    }}
                    rows={1}
                    data-virtualkeyboard="true"
                  />
                </div>
              </div>

              {/* Trailing: Action buttons */}
              <div className="flex items-center gap-2 [grid-area:trailing]">
                <div className="ms-auto flex items-center gap-1.5">
                  {/* Dictate button */}
                  <button
                    type="button"
                    className="composer-btn w-9 h-9 flex items-center justify-center rounded-full 
                             text-gray-500 hover:text-gray-700 hover:bg-gray-100 
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleMicClick}
                    aria-label="Dictate button"
                  >
                    <AudioOutlined className="w-5 h-5" />
                  </button>

                  {/* Voice mode button */}
                  <div className="min-w-9">
                    <button
                      type="button"
                      className={`relative flex h-9 items-center justify-center rounded-full w-9 
                               disabled:text-gray-50 disabled:opacity-30 
                               hover:opacity-80 ${
                                voiceMode
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-500 hover:bg-gray-100"
                              }`}
                      onClick={toggleVoiceMode}
                      data-testid="composer-speech-button"
                      aria-label="Start voice mode"
                    >
                      <SoundOutlined className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Send button with old theme */}
                  <button
                    type="button"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                             text-white rounded-full w-9 h-9 flex items-center justify-center 
                             shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 
                             disabled:cursor-not-allowed"
                    onClick={handleSend}
                    disabled={!message.trim()}
                    title="Gửi tin nhắn"
                  >
                    <SendOutlined className="w-5 h-5 flex items-center justify-center text-white" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleFileSelect}
          />

          {/* Footer text */}
          <div className="text-gray-500 relative mt-2 flex w-full items-center justify-center text-center text-xs">
            <div>Enter để gửi • Shift+Enter để xuống dòng</div>
          </div>

          {/* Floating glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingChatInput;