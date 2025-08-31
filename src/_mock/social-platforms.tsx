import React from 'react';

export type Channel = {
  id: string;
  platformId: 'facebook' | 'instagram' | 'telegram' | 'tiktok';
  name: string;
  icon: React.ReactNode;
};

export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

const FacebookIcon = () => (
  <img 
    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-icon.svg" 
    alt="Facebook Icon" 
    width="32" 
    height="32" 
  />
);

const InstagramIcon = () => (
  <img 
    src="https://www.svgrepo.com/show/521711/instagram.svg" 
    alt="Instagram Icon" 
    width="32" 
    height="32" 
  />
);

const TelegramIcon = () => (
  <img 
    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/telegram-icon.svg" 
    alt="Telegram Icon" 
    width="32" 
    height="32" 
  />
);

const TikTokIcon = () => (
  <img 
    src="https://www.svgrepo.com/show/521873/tiktok.svg"
    alt="TikTok Icon" 
    width="32" 
    height="32" 
  />
);


export const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: <FacebookIcon /> },
  { id: 'instagram', name: 'Instagram', icon: <InstagramIcon /> },
  { id: 'telegram', name: 'Telegram', icon: <TelegramIcon /> },
  { id: 'tiktok', name: 'TikTok', icon: <TikTokIcon /> },
];

export const mockChannels: Channel[] = [
  { id: 'fb-page-1', platformId: 'facebook', name: 'Fanpage Bán Hàng A', icon: <FacebookIcon /> },
  { id: 'fb-page-2', platformId: 'facebook', name: 'Fanpage Tin Tức B', icon: <FacebookIcon /> },
  { id: 'ig-shop-1', platformId: 'instagram', name: 'Shop Quần Áo IG', icon: <InstagramIcon /> },
  { id: 'tele-support-1', platformId: 'telegram', name: 'Hỗ trợ kỹ thuật Tele', icon: <TelegramIcon /> },
  { id: 'tiktok-creative', platformId: 'tiktok', name: 'Kênh Sáng Tạo TikTok', icon: <TikTokIcon /> },
];

export const mockMessages: Record<string, Message[]> = {
  'fb-page-1': [
    { id: 1, text: 'Shop ơi, áo này còn size M không?', sender: 'user', timestamp: '09:30 AM' },
    { id: 2, text: 'Chào bạn, mẫu này bên mình còn đủ size ạ. Bạn đặt hàng không?', sender: 'bot', timestamp: '09:31 AM' },
    { id: 3, text: 'Có, cho mình 1 chiếc size M đến địa chỉ XYZ nhé.', sender: 'user', timestamp: '09:32 AM' },
  ],
  'fb-page-2': [
    { id: 1, text: 'Bài viết này rất hay, cảm ơn admin!', sender: 'user', timestamp: '11:00 AM' },
    { id: 2, text: 'Cảm ơn bạn đã theo dõi trang!', sender: 'bot', timestamp: '11:05 AM' },
  ],
  'ig-shop-1': [
    { id: 1, text: 'Check DM please', sender: 'user', timestamp: '01:15 PM' },
    { id: 2, text: 'Mình thấy DM của bạn rồi, mình rep ngay nhé.', sender: 'bot', timestamp: '01:16 PM' },
  ],
  'tele-support-1': [
    { id: 1, text: 'Tài khoản của tôi không đăng nhập được.', sender: 'user', timestamp: '02:00 PM' },
    { id: 2, text: 'Chào bạn, bạn vui lòng cung cấp username để chúng tôi kiểm tra được không?', sender: 'bot', timestamp: '02:01 PM' },
    { id: 3, text: 'username của tôi là @exampleuser', sender: 'user', timestamp: '02:02 PM' },
    { id: 4, text: 'Cảm ơn bạn, hệ thống đang kiểm tra. Vui lòng chờ trong giây lát.', sender: 'bot', timestamp: '02:03 PM' },
  ],
  'tiktok-creative': [
    { id: 1, text: 'Video hay quá bạn ơi!', sender: 'user', timestamp: '03:45 PM' },
  ],
};