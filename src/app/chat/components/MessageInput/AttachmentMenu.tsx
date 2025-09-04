"use client";

import React from "react";
import { Image, FileText, Code, Link } from "lucide-react";

interface AttachmentMenuProps {
  show: boolean;
  onClose: () => void;
  onAttachFile: (file: File) => void;
  disabled?: boolean;
}

const createAttachmentOptions = (onAttachFile: (file: File) => void) => [
  { 
    icon: Image, 
    label: "Hình ảnh", 
    action: () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) onAttachFile(file);
      };
      input.click();
    }
  },
  { 
    icon: FileText, 
    label: "Tệp tin", 
    action: () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '*/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) onAttachFile(file);
      };
      input.click();
    }
  },
  { 
    icon: Code, 
    label: "Code snippet", 
    action: () => {
      const textarea = document.querySelector('textarea[aria-label="Soạn tin nhắn"]') as HTMLTextAreaElement;
      if (textarea) {
        const currentValue = textarea.value;
        const newValue = currentValue + "```\n\n```";
        textarea.value = newValue;
        textarea.focus();
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  },
  { 
    icon: Link, 
    label: "Liên kết", 
    action: () => {
      const url = prompt("Nhập URL:");
      if (url) {
        const textarea = document.querySelector('textarea[aria-label="Soạn tin nhắn"]') as HTMLTextAreaElement;
        if (textarea) {
          const currentValue = textarea.value;
          const newValue = currentValue + url;
          textarea.value = newValue;
          textarea.focus();
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  },
];

export default function AttachmentMenu({ show, onClose, onAttachFile, disabled = false }: AttachmentMenuProps) {
  if (!show) return null;

  const attachmentOptions = createAttachmentOptions(onAttachFile);

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-gray-700 rounded-lg shadow-lg border border-gray-600 p-2 z-10">
      <div className="grid grid-cols-2 gap-2">
        {attachmentOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              option.action();
              onClose();
            }}
            disabled={disabled}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={option.label}
          >
            <option.icon size={16} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
