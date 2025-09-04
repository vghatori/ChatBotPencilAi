"use client";

import React from "react";
import Image from "next/image";
import { Button } from "antd";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";

interface ImageBoxProps {
  imageUrl: string;
  alt: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ imageUrl, alt }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg my-4 border border-gray-200">
      <div className="p-4">
        <Image 
          src={imageUrl} 
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-t border-gray-200">
        <span className="text-gray-600 text-sm">Generated Image</span>
        <div className="flex space-x-2">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            className="text-gray-600 hover:text-blue-600"
          >
            Edit
          </Button>
          <Button
            type="text"
            size="small"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className="text-gray-600 hover:text-green-600"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
