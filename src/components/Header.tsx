import React from 'react';
import { ActiveScreen } from '../types';

interface HeaderProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  whatsappNumber: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  searchQuery,
  onSearchChange,
  whatsappNumber,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#ffffff]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#bdc9c5]/20">
      <div className="h-28 max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col justify-between py-2">
        {/* Top bar: Brand, Search, Helpline & Admin button */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => onNavigate('storefront')}
          >
            <img
              alt="Shoponshop Brand Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105 rounded-md shadow-xs"
              src="/src/assets/images/shoponshop_logo_1791951277410.jpg"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-none text-[#0b2447]">
                Shop<span className="text-[#f97316]">on</span>shop
              </span>
              <span className="text-[10px] text-[#3d4946] hidden sm:inline-block mt-0.5 font-medium">
                Shop Smart • Live Better | সরাসরি হোয়াটসঅ্যাপে অর্ডার
              </span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="flex-1 max-w-lg mx-3 hidden md:block">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#6d7a77] pointer-events-none text-xl">
                search
              </span>
              <input
                className="w-full h-10 pl-10 pr-4 rounded-full bg-[#f2f3ff] text-[#131b2e] placeholder-[#6d7a77] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00685d]/30 transition-all border border-transparent focus:border-[#00685d]/40"
                placeholder="প্রোডাক্ট খুঁজুন... (যেমন: শার্ট, ঘড়ি, গ্যাজেট)"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-xs text-[#6d7a77] hover:text-[#131b2e]"
                  title="ক্লিয়ার করুন"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right actions: WhatsApp Helpline, Admin Button, Profile */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber.startsWith('0') ? `88${whatsappNumber}` : whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#5dfd8a]/20 border border-[#006d2f]/15 hover:bg-[#5dfd8a]/35 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006d2f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006d2f]"></span>
              </span>
              <span className="text-xs text-[#007232] font-semibold">
                WhatsApp হেল্পলাইন: {whatsappNumber}
              </span>
            </a>

            <button
              onClick={() => onNavigate(currentScreen === 'admin_product' || currentScreen === 'admin_orders' ? 'storefront' : 'admin_product')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                currentScreen === 'admin_product' || currentScreen === 'admin_orders'
                  ? 'bg-[#00685d] text-white shadow-sm'
                  : 'bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd]'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {currentScreen === 'admin_product' || currentScreen === 'admin_orders' ? 'storefront' : 'lock'}
              </span>
              <span>
                {currentScreen === 'admin_product' || currentScreen === 'admin_orders' ? 'স্টোরফ্রন্টে ফিরুন' : 'অ্যাডমিন প্যানেল'}
              </span>
            </button>

            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#8ff4e3] shadow-xs cursor-pointer hover:scale-105 transition-transform"
              src="/src/assets/images/offer_poster_1791950725216.jpg"
              onClick={() => onNavigate('showcase')}
              title="সিস্টেম প্রোফাইল ও আর্কিটেকচার দেখুন"
            />
          </div>
        </div>

        {/* Bottom row: Nav Links & Mobile search */}
        <div className="flex items-center justify-between pt-1 border-t border-[#f2f3ff]">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
            <button
              onClick={() => onNavigate('storefront')}
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                currentScreen === 'storefront'
                  ? 'bg-[#008376] text-[#f4fffb] shadow-xs'
                  : 'text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e]'
              }`}
            >
              সকল প্রোডাক্ট
            </button>
            <button
              onClick={() => onNavigate('product_detail')}
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                currentScreen === 'product_detail'
                  ? 'bg-[#008376] text-[#f4fffb] shadow-xs'
                  : 'text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e]'
              }`}
            >
              নতুন কালেকশন (ডিটেইলস)
            </button>
            <button
              onClick={() => {
                onNavigate('storefront');
              }}
              className="px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-colors"
            >
              অফার
            </button>
            <button
              onClick={() => onNavigate('showcase')}
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                currentScreen === 'showcase'
                  ? 'bg-[#008376] text-[#f4fffb] shadow-xs'
                  : 'text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e]'
              }`}
            >
              কীভাবে অর্ডার করবেন (সিস্টেম শোকেস)
            </button>
          </nav>

          <div className="flex md:hidden w-36 sm:w-48 ml-2">
            <input
              className="w-full h-8 px-2.5 rounded-full bg-[#f2f3ff] text-[#131b2e] text-xs focus:outline-none focus:ring-1 focus:ring-[#00685d]"
              placeholder="সার্চ করুন..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
