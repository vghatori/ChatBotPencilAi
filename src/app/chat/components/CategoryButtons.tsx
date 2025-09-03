"use client";

import React from "react";

interface CategoryButtonsProps {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  currentCategory,
  setCurrentCategory
}) => {
  const categories = ["General", "Text", "Media", "Music", "Analytics"];

  return (
    <div className="flex justify-center space-x-8 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCurrentCategory(category)}
          className={`text-lg font-medium category-button ${
            currentCategory === category
              ? "text-purple-600 active"
              : "text-gray-500 hover:text-purple-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
