"use client";

import React, { useState, useEffect, useRef } from "react";

export interface ChatMessage {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  isTyping: boolean;
  code?: string;
  language?: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface ChatLogicProps {
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
  onChatHistoryChange: (history: ChatMessage[]) => void;
  onIsTypingChange: (typing: boolean) => void;
}

export const useChatLogic = ({
  showWelcome,
  setShowWelcome,
  onChatHistoryChange,
  onIsTypingChange,
}: ChatLogicProps) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    onChatHistoryChange(chatHistory);
  }, [chatHistory, onChatHistoryChange]);

  useEffect(() => {
    onIsTypingChange(isTyping);
  }, [isTyping, onIsTypingChange]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Hide welcome screen on first message
      if (showWelcome) {
        setShowWelcome(false);
      }

      const userInput = message.toLowerCase().trim();

      // Add user message
      const userMessage: ChatMessage = {
        id: chatHistory.length + 1,
        type: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString(),
        isTyping: false,
      };

      setChatHistory((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate AI response based on input
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: chatHistory.length + 2,
          type: "ai",
          content: "",
          timestamp: new Date().toLocaleTimeString(),
          isTyping: true,
        };

        if (
          userInput.includes("hello") ||
          userInput.includes("hi") ||
          userInput.includes("chào")
        ) {
          aiResponse.content =
            "Xin chào! Tôi là AI assistant của bạn. Tôi có thể giúp bạn viết code, tạo hình ảnh, hoặc trả lời các câu hỏi. Bạn cần tôi hỗ trợ gì?";
        } else if (userInput.includes("code")) {
          aiResponse.content = "Đây là code Python đơn giản cho bạn:";
          aiResponse.code = `def hello_world():
    print("Hello, World!")
    return "Welcome to Python!"

# Gọi function
result = hello_world()
print(f"Kết quả: {result}")`;
          aiResponse.language = "python";
        } else if (userInput.includes("image")) {
          aiResponse.content = "Đây là hình ảnh ngẫu nhiên cho bạn:";
          aiResponse.imageUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
          aiResponse.imageAlt = "Generated random image";
        } else {
          aiResponse.content =
            "Cảm ơn bạn đã gửi tin nhắn! Tôi đang xử lý yêu cầu của bạn và sẽ trả lời chi tiết trong giây lát...";
        }

        setChatHistory((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000);

      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    message,
    setMessage,
    isTyping,
    chatHistory,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
  };
};
