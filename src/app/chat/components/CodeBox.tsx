"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

interface CodeBoxProps {
  code: string;
  language: string;
}

const CodeBox: React.FC<CodeBoxProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg my-4">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-gray-300 text-sm font-medium">{language}</span>
        <Button
          type="text"
          size="small"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
          className={`text-gray-300 hover:text-white border-0 bg-transparent shadow-none code-copy-btn relative ${
            copied ? "copied" : ""
          }`}
          style={{ color: "#d1d5db" }}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-green-400 text-sm leading-relaxed">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBox;
