"use client";

import { useState } from "react";

export default function SidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    const sidebar = document.getElementById("sidebar");
    sidebar?.classList.toggle("-translate-x-full");
  };

  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-40 md:hidden bg-gray-800 text-white p-2 rounded-md"
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
