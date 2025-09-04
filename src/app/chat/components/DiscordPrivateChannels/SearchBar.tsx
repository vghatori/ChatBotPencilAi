"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  show: boolean;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchToggle: () => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ 
  show, 
  searchQuery, 
  onSearchChange, 
  onSearchToggle, 
  searchInputRef 
}: SearchBarProps) {
  return (
    <div className="p-3 border-b border-gray-700">
      {show ? (
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Tìm hoặc bắt đầu cuộc trò chuyện"
            className="w-full bg-gray-700 text-white placeholder-gray-400 px-3 py-2 pl-10 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Tìm kiếm cuộc trò chuyện"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
            onClick={() => onSearchToggle()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label="Đóng tìm kiếm"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button 
          onClick={onSearchToggle}
          className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 text-left px-3 py-2 rounded text-sm transition-colors flex items-center"
          aria-label="Tìm kiếm cuộc trò chuyện"
        >
          <Search size={16} className="mr-2 text-gray-400" />
          <span>Tìm hoặc bắt đầu cuộc trò chuyện</span>
        </button>
      )}
    </div>
  );
}
