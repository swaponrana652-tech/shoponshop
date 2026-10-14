import React from 'react';
import { ActiveScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  whatsappNumber: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, whatsappNumber }) => {
  return (
    <footer className="w-full bg-[#f2f3ff] text-[#131b2e] border-t border-[#bdc9c5]/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Top Feature Strip: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)] border border-[#bdc9c5]/20 hover:border-[#00685d]/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#00685d]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#00685d] text-2xl">chat</span>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#131b2e]">সরাসরি চ্যাটে নিশ্চিত অর্ডার</h4>
              <p className="text-xs text-[#3d4946]">কোনো বিলম্ব ছাড়া ১ ক্লিকেই হোয়াটসঅ্যাপে কেনাকাটা</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)] border border-[#bdc9c5]/20 hover:border-[#00685d]/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#00685d]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#00685d] text-2xl">local_shipping</span>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#131b2e]">ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-[#3d4946]">পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা সারা বাংলাদেশে</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)] border border-[#bdc9c5]/20 hover:border-[#00685d]/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#00685d]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#00685d] text-2xl">published_with_changes</span>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#131b2e]">৭ দিনের রিটার্ন পলিসি</h4>
              <p className="text-xs text-[#3d4946]">সহজ ও ঝামেলামুক্ত পরিবর্তন এবং রিফান্ড ব্যবস্থা</p>
            </div>
          </div>
        </div>

        {/* 4 Columns Navigation & Support */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#bdc9c5]/20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('storefront')}>
              <img
                alt="Shoponshop Brand Logo"
                className="h-8 w-auto object-contain rounded"
                src="/src/assets/images/shoponshop_logo_1791951277410.jpg"
              />
              <span className="text-lg font-bold text-[#0b2447]">
                Shop<span className="text-[#f97316]">on</span>shop
              </span>
            </div>
            <p className="text-xs text-[#3d4946] leading-relaxed mt-2">
              Shop Smart • Live Better | প্রযুক্তিবান্ধব শপিং প্লাটফর্ম। সহজে পছন্দ করুন এবং ঝামেলাহীন হোয়াটসঅ্যাপের মাধ্যমে সরাসরি অর্ডার দিন।
            </p>
          </div>

          <div>
            <h5 className="text-sm font-bold text-[#131b2e] mb-3">দ্রুত লিঙ্ক</h5>
            <ul className="flex flex-col gap-2 text-xs text-[#3d4946]">
              <li>
                <button onClick={() => onNavigate('storefront')} className="hover:text-[#00685d] transition-colors">
                  সকল প্রোডাক্ট
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product_detail')} className="hover:text-[#00685d] transition-colors">
                  নতুন অফারসমূহ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('storefront')} className="hover:text-[#00685d] transition-colors">
                  ট্রেন্ডিং আইটেম
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showcase')} className="hover:text-[#00685d] transition-colors">
                  কীভাবে অর্ডার করবেন
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-[#131b2e] mb-3">গ্রাহক সেবা ও নীতি</h5>
            <ul className="flex flex-col gap-2 text-xs text-[#3d4946]">
              <li>
                <button onClick={() => onNavigate('product_detail')} className="hover:text-[#00685d] transition-colors">
                  ডেলিভারি চার্জ ও নিয়মাবলী
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product_detail')} className="hover:text-[#00685d] transition-colors">
                  রিটার্ন এবং রিফান্ড পলিসি
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showcase')} className="hover:text-[#00685d] transition-colors">
                  প্রাইভেসি পলিসি
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showcase')} className="hover:text-[#00685d] transition-colors">
                  শর্তাবলী
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-xl bg-white border border-[#bdc9c5]/20 shadow-xs">
            <h5 className="text-sm font-bold text-[#131b2e]">WhatsApp কাস্টমার সাপোর্ট</h5>
            <p className="text-xs text-[#3d4946]">প্রতিদিন সকাল ৯টা থেকে রাত ১১টা পর্যন্ত যেকোনো প্রয়োজনে চ্যাট করুন।</p>
            <a
              href={`https://wa.me/${whatsappNumber.startsWith('0') ? `88${whatsappNumber}` : whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 mt-2 text-[#006d2f] hover:text-[#007232] transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">chat</span>
              <span className="text-base font-bold text-[#131b2e]">{whatsappNumber}</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-[#6d7a77]">
          © ২০২৫ Shoponshop (Shop Smart • Live Better). সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};
