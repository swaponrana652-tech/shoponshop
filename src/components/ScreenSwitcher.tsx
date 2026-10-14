import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ActiveScreen; label: string; icon: string; badge: string }[] = [
    { id: 'storefront', label: 'স্টোরফ্রন্ট ও ক্যাটালগ', icon: 'storefront', badge: 'স্ক্রিন ০১' },
    { id: 'product_detail', label: 'প্রোডাক্ট ও WhatsApp অর্ডার', icon: 'headphones', badge: 'স্ক্রিন ০২' },
    { id: 'admin_product', label: 'অ্যাডমিন প্রোডাক্ট ম্যানেজার', icon: 'edit_note', badge: 'স্ক্রিন ০৩' },
    { id: 'admin_orders', label: 'অর্ডার তালিকা ও ট্র্যাকিং', icon: 'receipt_long', badge: 'ম্যানেজমেন্ট' },
    { id: 'showcase', label: 'সিস্টেম ফ্লো ও আর্কিটেকচার', icon: 'devices', badge: 'শোকেস' },
  ];

  return (
    <div className="fixed top-24 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#131b2e] text-white px-3.5 py-2 rounded-full shadow-xl hover:bg-[#283044] transition-all text-xs font-bold border border-white/20 select-none group"
          title="স্ক্রিন পরিবর্তন করুন"
        >
          <span className="w-2 h-2 rounded-full bg-[#5dfd8a] animate-pulse"></span>
          <span className="material-symbols-outlined text-sm">view_carousel</span>
          <span className="hidden sm:inline">স্ক্রিন সুইচ করুন</span>
          <span className="material-symbols-outlined text-xs transition-transform group-hover:rotate-180">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white shadow-2xl border border-[#bdc9c5]/40 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-2 border-b border-[#bdc9c5]/20 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#6d7a77] uppercase tracking-wider">
                স্ক্রিন নেভিগেটর
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#6d7a77] hover:text-[#131b2e] text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1 p-1">
              {screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectScreen(s.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    currentScreen === s.id
                      ? 'bg-[#008376] text-white font-bold shadow-xs'
                      : 'hover:bg-[#f2f3ff] text-[#131b2e] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base">{s.icon}</span>
                    <span className="text-xs">{s.label}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      currentScreen === s.id ? 'bg-white/20 text-white' : 'bg-[#e2e7ff] text-[#00685d]'
                    }`}
                  >
                    {s.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
