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
      processMessage(message);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Hide welcome screen on first message
    if (showWelcome) {
      setShowWelcome(false);
    }
    
    // Set the message and process it immediately
    setMessage(suggestion);
    processMessage(suggestion);
  };

  const processMessage = (messageText: string) => {
    // Hide welcome screen on first message
    if (showWelcome) {
      setShowWelcome(false);
    }

    const userInput = messageText.toLowerCase().trim();

    // Add user message
    const userMessage: ChatMessage = {
      id: chatHistory.length + 1,
      type: "user",
      content: messageText,
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
      } else if (userInput.includes("video") || userInput.includes("4k")) {
        aiResponse.content = "Tôi có thể giúp bạn tạo video 4K chất lượng cao! Đây là một số gợi ý:\n\n• Sử dụng AI để tạo video từ văn bản\n• Chuyển đổi hình ảnh thành video\n• Tạo video animation từ ý tưởng của bạn\n\nBạn muốn tạo loại video nào?";
      } else if (userInput.includes("giọng nói") || userInput.includes("âm thanh")) {
        aiResponse.content = "Tôi có thể giúp bạn tạo giọng nói và âm thanh! Các tính năng bao gồm:\n\n• Tạo giọng nói AI từ văn bản\n• Tạo nhạc nền phù hợp\n• Thêm hiệu ứng âm thanh\n• Chuyển đổi giọng nói\n\nBạn cần tạo gì?";
      } else if (userInput.includes("dữ liệu") || userInput.includes("phân tích")) {
        aiResponse.content = "Tôi có thể giúp bạn phân tích và xử lý dữ liệu! Các khả năng của tôi:\n\n• Phân tích dữ liệu thống kê\n• Tạo biểu đồ và báo cáo\n• Xử lý dữ liệu lớn\n• Dự đoán xu hướng\n\nBạn có dữ liệu nào cần phân tích không?";
      } else {
        aiResponse.content =
          "Cảm ơn bạn đã gửi tin nhắn! Tôi đang xử lý yêu cầu của bạn và sẽ trả lời chi tiết trong giây lát...";
      }

      setChatHistory((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);

    setMessage("");
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
    handleSuggestionClick,
    handleKeyPress,
  };
};
