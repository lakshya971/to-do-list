'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard', href: '/' },
    { id: 'tasks', icon: '✅', label: 'Tasks', href: '/' },
    { id: 'calendar', icon: '📅', label: 'Calendar', href: '/' },
    { id: 'settings', icon: '⚙️', label: 'Settings', href: '/settings' }
  ];

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-8">      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">📝</span>
        </div>
      </div>{/* Menu Items */}
      <nav className="flex-1 w-full">
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link href={item.href}>
                  <button
                    className={`w-full flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                    title={item.label}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                      {isActive && (
                      <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"></div>
                    )}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>      {/* Bottom Items */}
      <div className="space-y-4">
        <Link href="/settings">
          <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <span className="text-xl">⚙️</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
