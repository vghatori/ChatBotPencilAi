# 🚀 AI PENCIL PROJECT - COMPREHENSIVE MUST READ 🚀
==================================================

## 📌 QUY TẮC BẮT BUỘC PHẢI TUÂN THỦ
====================================

### 1. 🏗️ PROJECT STRUCTURE (CẤU TRÚC DỰ ÁN)
=============================================

#### Tech Stack:
- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **UI Library**: Ant Design
- **Icons**: Lucide React

#### Cấu trúc thư mục:
```
app/                    # Next.js App Router
├── layout.tsx         # Root layout
├── page.tsx           # Home page
├── (auth)/            # Auth pages group
│   ├── login/
│   └── register/
├── chat/              # Chat interface
│   ├── page.tsx
│   └── components/
│       ├── DiscordLayout.tsx
│       ├── DiscordPrivateChannels.tsx
│       ├── ChatInterface.tsx
│       ├── MessageList.tsx
│       └── MessageInput.tsx
├── chatbot/           # Chatbot interface
├── dashboard/         # Dashboard
└── globals.css        # Global styles

components/            # Reusable components
├── common/           # Pure UI components (no API logic)
├── layout/           # Layout components (Header, Footer, Sidebar)
├── sections/         # Page-specific components with logic
└── ui/               # shadcn UI components

actions/              # API interaction functions
├── userActions.ts
└── postActions.ts

types/                # TypeScript interfaces
└── user.d.ts

hooks/                # Custom React hooks
└── useUser.ts

lib/                  # Utility functions
├── utils.ts          # General utilities
└── formatter.ts      # Date formatting

constants/            # Constants and configurations
├── roles.ts
└── api.ts
```

### 2. 🎨 DESIGN SYSTEM (HỆ THỐNG THIẾT KẾ)
=============================================

#### Color Palette:
- **Primary Gradient**: Purple-Pink (#a855f7 → #ec4899)
- **Background**: White (#ffffff) / Dark Gray (#1f2937)
- **Text Primary**: Gray-800 (#1f2937) / White (#ffffff)
- **Text Secondary**: Gray-600 (#4b5563) / Gray-400 (#9ca3af)
- **Border**: Purple-100 (#f3e8ff) / Gray-700 (#374151)
- **Shadow**: Purple with opacity 0.1-0.15

#### Discord-like Theme (for Chat):
- **Background**: Gray-900 (#111827)
- **Sidebar**: Gray-800 (#1f2937)
- **Chat Area**: Gray-800 (#1f2937)
- **Borders**: Gray-700 (#374151)
- **Text**: White (#ffffff) / Gray-300 (#d1d5db)

### 3. 📱 RESPONSIVE DESIGN (THIẾT KẾ ĐÁP ỨNG)
===============================================

#### Breakpoints:
- **sm**: 640px (Mobile)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)

#### Layout Behavior:
- **Mobile (< md)**: Chat area only, sidebars hidden
- **Tablet (md-lg)**: Second sidebar + Chat area
- **Desktop (lg+)**: All sidebars + Chat area

#### Touch Targets:
- Minimum 44px for interactive elements
- Proper spacing between touch targets

### 4. 🔧 COMPONENT RULES (QUY TẮC COMPONENT)
=============================================

#### File Structure:
- **Maximum 200 lines per file**
- **Use 'use client' directive for all components**
- **TypeScript interfaces for all props**
- **Default values for optional props**

#### Component Types:
- **Layout Components**: DiscordLayout, ResponsiveLayout
- **UI Components**: Buttons, Cards, Inputs
- **Feature Components**: ChatInterface, MessageList, MessageInput
- **Sidebar Components**: DiscordPrivateChannels, DiscordSidebar

#### Naming Conventions:
- **Interfaces**: I + ObjectName (e.g., IUser, IMessage)
- **Types**: T + ObjectName (e.g., TUser, TMessage)
- **Functions**: verb + noun (e.g., getUser, createPost)
- **Components**: PascalCase (e.g., ChatInterface, MessageList)
- **Handlers**: handle + verb (e.g., handleClick, handleSubmit)

### 5. 🎯 CHAT INTERFACE RULES (QUY TẮC GIAO DIỆN CHAT)
=====================================================

#### Discord-like Layout:
- **Three-column layout**: First Sidebar + Second Sidebar + Chat Area
- **Second Sidebar**: Always visible, cannot be collapsed
- **Search Bar**: "Tìm hoặc bắt đầu cuộc trò chuyện"
- **Direct Messages**: List with avatars, status indicators, close buttons

#### Message System:
- **Message List**: Scrollable with auto-scroll to bottom
- **Message Input**: Auto-resize textarea with send button
- **Reactions**: Emoji reactions with counts
- **Timestamps**: Relative time display

#### Status Indicators:
- **Online**: Green dot
- **Idle**: Yellow dot
- **Do Not Disturb**: Red dot
- **Offline**: Gray dot

### 6. 🎭 ANIMATIONS & TRANSITIONS (HIỆU ỨNG)
==============================================

#### Transition Classes:
- **Sidebar**: `transition-all duration-300`
- **Hover Effects**: `hover:bg-gray-700 hover:text-white`
- **Scale Effects**: `hover:scale-105`
- **Fade Effects**: `opacity-0 group-hover:opacity-100`

#### Animation Timing:
- **Fast**: 150ms
- **Normal**: 300ms
- **Slow**: 500ms

### 7. 🚫 KHÔNG ĐƯỢC LÀM (FORBIDDEN)
=====================================

#### Code Quality:
- **No hardcoded colors** (use CSS variables)
- **No inline styles** (except when necessary)
- **No `any` type in TypeScript**
- **No components over 200 lines**
- **No direct API calls in page.tsx**

#### Layout:
- **No absolute positioning conflicts**
- **No fixed heights without proper overflow**
- **No missing responsive breakpoints**

### 8. ✅ PHẢI LÀM (REQUIRED)
============================

#### Code Standards:
- **Use Tailwind CSS classes**
- **Implement proper TypeScript interfaces**
- **Follow component composition pattern**
- **Maintain theme consistency**
- **Use Next.js Image component for images**

#### Performance:
- **Lazy loading for heavy components**
- **Memoization for expensive calculations**
- **Debounce for resize events**
- **Optimize re-renders**

#### Accessibility:
- **Proper ARIA labels**
- **Keyboard navigation support**
- **Screen reader compatibility**
- **Color contrast compliance**

### 9. 🔍 CODE QUALITY (CHẤT LƯỢNG CODE)
=========================================

#### Linting:
- **ESLint rules must pass**
- **TypeScript strict mode enabled**
- **Prettier formatting applied**
- **No unused variables or imports**

#### Error Handling:
- **Proper error boundaries**
- **Graceful fallbacks**
- **User-friendly error messages**
- **Console error logging**

### 10. 📚 IMPORT/EXPORT RULES (QUY TẮC IMPORT/EXPORT)
=====================================================

#### Import Structure:
```typescript
// React imports first
import React, { useState, useEffect } from "react";

// Next.js imports
import Image from "next/image";
import Link from "next/link";

// External libraries
import { Layout } from "antd";
import { Search, Plus, X } from "lucide-react";

// Internal components (relative paths)
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

// Types and interfaces
import { ChatInterfaceProps, Message } from "./types";
```

#### Export Structure:
```typescript
// Default export for main component
export default function ChatInterface() { ... }

// Named exports for utilities
export { formatMessage, parseTimestamp } from "./utils";

// Re-export from index files
export { default as ChatInterface } from "./ChatInterface";
```

### 11. 🎨 CSS CLASS NAMING (QUY TẮC ĐẶT TÊN CSS)
=================================================

#### Naming Patterns:
- **Layout**: `layout-*`, `container-*`, `wrapper-*`
- **Components**: `chat-*`, `sidebar-*`, `message-*`
- **States**: `*-active`, `*-collapsed`, `*-expanded`
- **Colors**: `*-purple`, `*-pink`, `*-gray`
- **Animations**: `*-animate`, `*-transition`

#### Tailwind Classes:
- **Use utility classes over custom CSS**
- **Group related classes together**
- **Use responsive prefixes (sm:, md:, lg:)**
- **Use state prefixes (hover:, focus:, active:)**

### 12. 🚀 PERFORMANCE RULES (QUY TẮC HIỆU SUẤT)
===============================================

#### Optimization:
- **Code splitting with dynamic imports**
- **Image optimization with Next.js Image**
- **Bundle size monitoring**
- **Lazy loading for non-critical components**

#### Memory Management:
- **Cleanup useEffect dependencies**
- **Avoid memory leaks in event listeners**
- **Proper component unmounting**

### 13. 🧪 TESTING REQUIREMENTS (YÊU CẦU TESTING)
=================================================

#### Component Testing:
- **Components must render without errors**
- **Props changes must update UI correctly**
- **Responsive behavior must work**
- **Accessibility standards must be met**

#### Integration Testing:
- **Chat functionality works end-to-end**
- **Sidebar interactions work properly**
- **Message sending and receiving works**

### 14. 📱 MOBILE OPTIMIZATION (TỐI ƯU MOBILE)
==============================================

#### Touch Interface:
- **Touch targets minimum 44px**
- **Swipe gestures for sidebar**
- **Mobile-first CSS approach**
- **Performance on mobile devices**

#### Responsive Behavior:
- **Sidebar collapse on mobile**
- **Touch-friendly navigation**
- **Optimized for small screens**

### 15. 🔧 GIT WORKFLOW (QUY TRÌNH GIT)
======================================

#### Branch Strategy:
- **Each developer works on separate branch**
- **No direct coding on master**
- **Branch naming: feature/description**

#### Workflow:
1. **Pull latest master**: `git pull origin master`
2. **Create feature branch**: `git checkout -b feature/chat-interface`
3. **Code and commit**: `git add . && git commit -m "Add chat interface"`
4. **Push to remote**: `git push origin feature/chat-interface`
5. **Create Pull Request on GitHub**

### 16. 📋 RECENT IMPLEMENTATIONS (CÁC TÍNH NĂNG MỚI)
===================================================

#### Discord-like Chat Interface:
- **DiscordLayout**: Main layout with three columns
- **DiscordPrivateChannels**: Second sidebar with direct messages
- **ChatInterface**: Main chat area with messages
- **MessageList**: Message display component
- **MessageInput**: Message input with send functionality

#### Features Implemented:
- **Search bar for conversations**
- **Friends, Nitro, Shop buttons**
- **Direct messages list with avatars**
- **Status indicators (online, idle, dnd, offline)**
- **Clan tags and activity status**
- **Verified bot badges**
- **Close buttons for conversations**
- **Responsive design for all screen sizes**

### 17. 🎯 CURRENT PROJECT STATUS (TRẠNG THÁI DỰ ÁN)
==================================================

#### Completed:
- ✅ Discord-like chat interface
- ✅ Responsive layout system
- ✅ Second sidebar implementation
- ✅ Message system with reactions
- ✅ Status indicators and avatars
- ✅ Mobile optimization

#### In Progress:
- 🔄 Real-time messaging integration
- 🔄 Voice chat functionality
- 🔄 File sharing capabilities

#### Planned:
- 📋 User authentication system
- 📋 Database integration
- 📋 Real-time notifications
- 📋 Advanced chat features

==================================================
⚠️  LƯU Ý QUAN TRỌNG:
- Đọc kỹ trước khi code
- Tuân thủ tất cả quy tắc
- Không được bỏ qua bất kỳ rule nào
- Hỏi team lead nếu có thắc mắc
- Cập nhật file này khi có thay đổi
==================================================

🎯 MỤC TIÊU: Tạo ra một ứng dụng chat AI Pencil đẹp, responsive, 
    maintainable và có performance tốt với giao diện giống Discord!

📅 Cập nhật lần cuối: [Ngày hiện tại]
👥 Team: AI Pencil Development Team
🔗 Repository: [GitHub Link]
