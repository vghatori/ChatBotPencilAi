"use client";

import React from "react";
import { UserPlus } from "lucide-react";

interface CreateDMModalProps {
  onCreateDM: (userId: string) => void;
  onClose: () => void;
}

export default function CreateDMModal({ onCreateDM, onClose }: CreateDMModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;
    const userId = input?.value.trim();
    if (userId) {
      onCreateDM(userId);
      input.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const userId = e.currentTarget.value.trim();
      if (userId) {
        onCreateDM(userId);
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <div className="mb-2 p-2 bg-gray-700 rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <UserPlus size={16} className="text-gray-400" />
        <span className="text-sm text-gray-300">Tạo tin nhắn trực tiếp</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-1">
        <input
          type="text"
          placeholder="Nhập tên người dùng..."
          className="w-full bg-gray-600 text-white placeholder-gray-400 px-2 py-1 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          onKeyDown={handleKeyDown}
        />
        <div className="flex space-x-1">
          <button
            type="submit"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs transition-colors"
          >
            Tạo
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
