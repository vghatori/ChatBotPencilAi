"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorBoundaryProps {
  error: Error | null;
  onClose: () => void;
}

export default function ErrorBoundary({ error, onClose }: ErrorBoundaryProps) {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-red-900 border border-red-700 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-red-200">
              Có lỗi xảy ra
            </h3>
            <p className="text-sm text-red-300 mt-1 break-words">
              {error.message}
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
            >
              Đóng
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 flex-shrink-0"
            aria-label="Đóng thông báo lỗi"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
