"use client";

import React, { useState, useRef, useCallback, KeyboardEvent } from "react";
import { message as antdMessage } from "antd";
import { 
  Smile, 
  Plus, 
  Send, 
  Mic
} from "lucide-react";
import AttachmentMenu from "./AttachmentMenu";
import EmojiPicker from "./EmojiPicker";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onAttachFile?: (file: File) => void;
  onEmojiSelect?: (emoji: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({ 
  onSendMessage, 
  onAttachFile, 
  onEmojiSelect,
  disabled = false,
  placeholder = "Nhập tin nhắn..."
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Send a message with validation and error handling. */
  const handleSend = useCallback(async (e?: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e?.preventDefault?.();
    
    if (!message.trim() || disabled || isSending) return;
    
    try {
      setIsSending(true);
      await onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
    } catch (err) {
      console.error("[MessageInput] handleSend", err);
      antdMessage.error("Không gửi được tin nhắn. Vui lòng thử lại.");
    } finally {
      setIsSending(false);
    }
  }, [onSendMessage, disabled, isSending]);

  /** Handle keyboard events - Enter to send, Shift+Enter for newline. */
  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Escape") {
      setShowEmojiPicker(false);
      setShowAttachmentMenu(false);
    }
  }, [handleSend, message]);

  /** Handle textarea input with auto-resize and validation. */
  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Basic input validation
    if (value.length > 2000) {
      antdMessage.warning("Tin nhắn quá dài. Tối đa 2000 ký tự.");
      return;
    }
    
    setMessage(value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, []);

  /** Toggle voice recording state. */
  const handleRecordingToggle = useCallback(() => {
    if (disabled) return;
    setIsRecording(!isRecording);
    // TODO: Implement voice recording with Web Audio API
    console.log("[MessageInput] Voice recording:", !isRecording ? "started" : "stopped");
  }, [isRecording, disabled]);

  /** Handle file attachment with validation. */
  const handleAttachFile = useCallback((file: File) => {
    if (!file) return;
    
    // File size validation (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      antdMessage.error("File quá lớn. Tối đa 10MB.");
      return;
    }
    
    // File type validation
    const allowedTypes = ['image/', 'video/', 'audio/', 'text/', 'application/pdf'];
    const isValidType = allowedTypes.some(type => file.type.startsWith(type));
    
    if (!isValidType) {
      antdMessage.error("Loại file không được hỗ trợ.");
      return;
    }
    
    try {
      onAttachFile?.(file);
      antdMessage.success(`Đã đính kèm: ${file.name}`);
    } catch (err) {
      console.error("[MessageInput] handleAttachFile", err);
      antdMessage.error("Không thể đính kèm file.");
    }
  }, [onAttachFile]);

  /** Handle emoji selection. */
  const handleEmojiSelect = useCallback((emoji: string) => {
    if (disabled) return;
    
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    onEmojiSelect?.(emoji);
    
    // Focus back to textarea
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  }, [disabled, onEmojiSelect]);

  /** Handle file input change. */
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAttachFile(file);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [handleAttachFile]);

  return (
    <div className="relative">
      {/* Attachment Menu */}
      <AttachmentMenu
        show={showAttachmentMenu}
        onClose={() => setShowAttachmentMenu(false)}
        onAttachFile={handleAttachFile}
        disabled={disabled}
      />

      {/* Emoji Picker */}
      <EmojiPicker
        show={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onEmojiSelect={handleEmojiSelect}
        disabled={disabled}
      />

      {/* Main Input Area */}
      <div className="bg-gray-700 rounded-lg border border-gray-600 focus-within:border-purple-500 transition-colors">
        <div className="flex items-end space-x-2 p-3">
          {/* Attachment Button */}
          <button
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            disabled={disabled}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Đính kèm file"
            aria-expanded={showAttachmentMenu}
            aria-haspopup="menu"
            type="button"
          >
            <Plus size={20} />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm leading-relaxed max-h-32 disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
              style={{ minHeight: "20px" }}
              aria-label="Soạn tin nhắn"
              maxLength={2000}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
                      {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={disabled}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Chọn emoji"
            aria-expanded={showEmojiPicker}
            aria-haspopup="menu"
            type="button"
          >
            <Smile size={20} />
          </button>

            {/* Voice/Text Toggle */}
            {message.trim() ? (
              <button
                onClick={handleSend}
                disabled={disabled || isSending}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isSending ? "Đang gửi..." : "Gửi tin nhắn"}
                type="button"
              >
                <Send size={20} />
              </button>
            ) : (
              <button
                onClick={handleRecordingToggle}
                disabled={disabled}
                className={`p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRecording
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-600"
                }`}
                aria-label={isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
                type="button"
              >
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="px-3 pb-2 border-t border-gray-600">
            <div className="flex items-center space-x-2 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>Đang ghi âm... Nhấn để dừng</span>
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInputChange}
        accept="image/*,video/*,audio/*,text/*,.pdf"
        className="hidden"
        aria-label="Chọn file để đính kèm"
      />

      {/* Click outside to close menus */}
      {(showEmojiPicker || showAttachmentMenu) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowEmojiPicker(false);
            setShowAttachmentMenu(false);
          }}
        />
      )}
    </div>
  );
}
