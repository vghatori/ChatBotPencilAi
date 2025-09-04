"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="p-4 bg-gray-800 border-b border-gray-700">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Tìm kiếm tin nhắn..."
          className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-2 pl-10 rounded-lg border border-gray-600 focus:border-purple-500 outline-none"
          aria-label="Tìm kiếm tin nhắn"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
