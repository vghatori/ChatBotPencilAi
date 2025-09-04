"use client";

import React from "react";

interface EmojiPickerProps {
  show: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
  disabled?: boolean;
}

const emojis = ["😀", "😂", "😍", "🤔", "👍", "👎", "❤️", "🎉", "🔥", "💯"];

export default function EmojiPicker({ show, onClose, onEmojiSelect, disabled = false }: EmojiPickerProps) {
  if (!show) return null;

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-gray-700 rounded-lg shadow-lg border border-gray-600 p-3 z-10">
      <div className="grid grid-cols-5 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            disabled={disabled}
            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Chọn emoji ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
