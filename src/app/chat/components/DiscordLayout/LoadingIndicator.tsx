"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export default function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-6 flex items-center gap-3">
        <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
        <span className="text-gray-200 text-sm">Đang tải...</span>
      </div>
    </div>
  );
}
