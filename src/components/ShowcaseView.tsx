import React from 'react';
import { ActiveScreen } from '../types';

interface ShowcaseViewProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const ShowcaseView: React.FC<ShowcaseViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-28 pb-16 bg-[#faf8ff] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col gap-12">
        {/* Top Hero Section */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#bdc9c5]/30 pb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#008376]/15 text-[#00685d] text-xs font-bold border border-[#00685d]/20">
                কেস স্টাডি ও ইউআই/ইউএক্স প্রজেক্ট প্রেজেন্টেশন ২০২৫
              </span>
              <span className="px-3 py-1 rounded-full bg-[#5dfd8a]/20 text-[#007232] text-xs font-bold border border-[#007232]/20">
                ভেরিফায়েড প্রোডাক্ট ব্লুপ্রিন্ট
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#131b2e] tracking-tight leading-tight">
              আমারদোকান — <span className="text-[#00685d]">স্মার্ট হোয়াটসঅ্যাপ কমার্স</span> সলিউশন
            </h1>

            <p className="text-sm sm:text-base text-[#3d4946] mt-3 max-w-3xl leading-relaxed">
              কার্ট ও জটিল চেকআউট ছাড়াই সরাসরি এক ক্লিকে হোয়াটসঅ্যাপে অর্ডার, কাস্টমার চ্যাট এবং সহজ অ্যাডমিন ম্যানেজমেন্টের পরিপূর্ণ হাই-কনভার্টিং ইকোসিস্টেম।
            </p>

            {/* 4 Metadata Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
              <div className="p-3.5 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#6d7a77]">
                  <span className="material-symbols-outlined text-sm text-[#00685d]">storefront</span>
                  <span>টার্গেট মার্কেট</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#131b2e] mt-1">বাংলাদেশ এফ-কমার্স ও ডিটুসি ব্র্যান্ড</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#6d7a77]">
                  <span className="material-symbols-outlined text-sm text-[#00685d]">terminal</span>
                  <span>টেকনোলজি স্ট্যাক</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#131b2e] mt-1">মডার্ন ওয়েব + মেটা ক্লাউড এপিআই</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#6d7a77]">
                  <span className="material-symbols-outlined text-sm text-[#00685d]">bolt</span>
                  <span>সিআরও মেট্রিক্স</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#131b2e] mt-1">৩ গুণ দ্রুত ও ঝামেলাহীন চেকআউট</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#6d7a77]">
                  <span className="material-symbols-outlined text-sm text-[#00685d]">verified</span>
                  <span>ডিজাইন কোয়ালিটি</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#131b2e] mt-1">৪টি কোর স্ক্রিন ভেরিফাইড</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigate('storefront')}
              className="px-6 py-3 rounded-xl bg-[#00685d] text-white font-bold text-xs sm:text-sm hover:bg-[#008376] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-lg">visibility</span>
              <span>স্ক্রিন শোকেস দেখুন</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>

            <a
              href="#architecture"
              className="px-6 py-3 rounded-xl bg-[#eaedff] text-[#131b2e] font-bold text-xs sm:text-sm hover:bg-[#dae2fd] flex items-center justify-center gap-2 border border-[#bdc9c5]/30 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">account_tree</span>
              <span>সিস্টেম ফ্লো ও আর্কিটেকচার</span>
              <span className="material-symbols-outlined text-lg">arrow_downward</span>
            </a>
          </div>
        </section>

        {/* 3 Interactive Screen Showcase Cards */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#00685d] mb-1">
                <span className="material-symbols-outlined text-sm">dashboard</span>
                <span>ইন্টারেক্টিভ ইন্টারফেস গ্যালারি</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
                সম্পূর্ণ প্ল্যাটফর্ম স্ক্রিন শোকেস
              </h2>
            </div>
            <span className="text-xs text-[#6d7a77] bg-[#eaedff] px-3 py-1 rounded-full font-semibold">
              ৩টি ভেরিফাইড স্ক্রিন অন্তর্ভুক্ত
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Screen 1: Storefront */}
            <div className="rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="p-4 border-b border-[#bdc9c5]/20 flex items-center justify-between bg-[#f2f3ff]/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  <span className="text-xs font-bold text-[#131b2e] ml-2">স্ক্রিন ০১: ক্যাটালগ ভিউ</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#008376] text-white">
                  স্টোরফ্রন্ট
                </span>
              </div>

              <div
                className="p-4 cursor-pointer overflow-hidden bg-[#faf8ff]"
                onClick={() => onNavigate('storefront')}
              >
                <img
                  className="w-full h-44 object-cover rounded-xl shadow-xs group-hover:scale-102 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGrjpMJV_YZ3LhSqiTPcK8dRT7So5UzqiHnZ007gAJ2QAClfZy0Q4ZBijx6VUWrGfxYms4dezvVl2gMVx6dwgzoH5eeD_zir4RGQltJ-YSX064iSTRbdwhnjFiw4ZfwLnczokQxw1SphQEPQwk7LkeIkT1MP4r61xFYQEfQv6Eu4r8YesV9L4twlYrcG4NywKAGoxK8Uoa3WRc_gYQwURJykPI08o6tTa69QqDqjLC7-_jQ7OP8tq8"
                  alt="Storefront Preview"
                />
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-[#131b2e]">
                  স্টোরফ্রন্ট ও প্রোডাক্ট ক্যাটালগ (Storefront & Catalog)
                </h3>
                <p className="text-xs text-[#3d4946] leading-relaxed">
                  বাংলাদেশের ডিজিটাল ব্যবহারকারীদের জন্য অতি সহজ গ্রিড লেআউট, তাৎক্ষণিক ফিল্টারিং এবং প্রডাক্ট কার্ডে সরাসরি অর্ডার ট্রিগার।
                </p>

                <ul className="text-xs text-[#3d4946] space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>স্বয়ংক্রিয় ক্যাটাগরি ও প্রাইস ফিল্টারিং</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>সরাসরি ১-ক্লিক হোয়াটসঅ্যাপ অর্ডার বাটন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>ক্যাশ অন ডেলিভারি ট্রাস্ট ব্যাজ ইন্টিগ্রেশন</span>
                  </li>
                </ul>

                <button
                  onClick={() => onNavigate('storefront')}
                  className="mt-2 w-full py-2.5 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base text-[#00685d]">open_in_new</span>
                  <span>স্ক্রিন দেখুন (স্টোরফ্রন্ট)</span>
                </button>
              </div>
            </div>

            {/* Screen 2: Product Detail & WhatsApp */}
            <div className="rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="p-4 border-b border-[#bdc9c5]/20 flex items-center justify-between bg-[#f2f3ff]/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  <span className="text-xs font-bold text-[#131b2e] ml-2">স্ক্রিন ০২: প্রোডাক্ট ও চ্যাট</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#006d2f] text-white">
                  চ্যাট ইন্টিগ্রেশন
                </span>
              </div>

              <div
                className="p-4 cursor-pointer overflow-hidden bg-[#faf8ff]"
                onClick={() => onNavigate('product_detail')}
              >
                <img
                  className="w-full h-44 object-cover rounded-xl shadow-xs group-hover:scale-102 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuABTFip_SR-R_gNSw5ABmr17o2PlSkuwHzub3IZ3_M3CpyBcv2l041s-iJBYxx3LilUMPYUGdGNpeZl91JYRAz16-8IbGdNlVHYjLMCyxa2ZOPCTgDRq10B6E3GrBBZyZV7c6pc4fJNn2EmFO3yi4HYO0HtVrMrr83gls2Z7SeOLE-QfEh8tDvczcDjW3My0fpLx5c_jTi2j5muJZJaLKUw7cVHCLo4BsnNY8tR0LX2IDtRDGhN92iR"
                  alt="Product Details Preview"
                />
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-[#131b2e]">
                  প্রোডাক্ট বিস্তারিত ও চ্যাট প্রিভিউ (Product Details & Live Order)
                </h3>
                <p className="text-xs text-[#3d4946] leading-relaxed">
                  হাই-রেজ্যুলেশন প্রোডাক্ট গ্যালারি ও অর্ডার ক্লিক করার সাথে সাথে হোয়াটসঅ্যাপে কী মেসেজ যাবে তার স্বচ্ছ প্রিভিউ।
                </p>

                <ul className="text-xs text-[#3d4946] space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>স্বয়ংক্রিয় প্রাক-প্রস্তুত মেসেজ জেনারেটর</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>কালার/সাইজ নির্বাচন ও স্টক স্ট্যাটাস ট্র্যাকার</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>ডেলিভারি চার্জ ও রিটার্ন গ্যারান্টি হাইলাইটস</span>
                  </li>
                </ul>

                <button
                  onClick={() => onNavigate('product_detail')}
                  className="mt-2 w-full py-2.5 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base text-[#00685d]">open_in_new</span>
                  <span>স্ক্রিন দেখুন (প্রোডাক্ট পেজ)</span>
                </button>
              </div>
            </div>

            {/* Screen 3: Admin Portal */}
            <div className="rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="p-4 border-b border-[#bdc9c5]/20 flex items-center justify-between bg-[#f2f3ff]/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  <span className="text-xs font-bold text-[#131b2e] ml-2">স্ক্রিন ০৩: অ্যাডমিন পোর্টাল</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#994100] text-white">
                  অ্যাডমিন
                </span>
              </div>

              <div
                className="p-4 cursor-pointer overflow-hidden bg-[#faf8ff]"
                onClick={() => onNavigate('admin_product')}
              >
                <img
                  className="w-full h-44 object-cover rounded-xl shadow-xs group-hover:scale-102 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkJaYMHvCEUJCG0FbZmNQK2LsOf84XlxnTyaDWaSG_u9ay9lXQFY0IEicM81k_IEMd9O_xnvrpEjuhNouhdrrkF22xaXPbyChj7EF0iEew45VddsaQvnPmPhI63ABquOI1eJeCCOhEjAZnqrrzfsYXsmq-Gw9Mm5kOZCe00T4GTOFuiz03u00G5QlOhRYVlGS-nLZRIsHUDhcd2T0eYuUCFzXxyo4DL85G2u8lickMwIqCsBBTRMuo"
                  alt="Admin Product Preview"
                />
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-[#131b2e]">
                  অ্যাডমিন ড্যাশবোর্ড ও প্রোডাক্ট ম্যানেজার (Admin Management)
                </h3>
                <p className="text-xs text-[#3d4946] leading-relaxed">
                  মার্চেন্টের জন্য ব্যতিব্যস্ত কন্ট্রোল প্যানেল—এক ক্লিকে নতুন প্রোডাক্ট যোগ, স্টক আপডেট এবং কাস্টম নম্বর সেটআপ।
                </p>

                <ul className="text-xs text-[#3d4946] space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>ড্রপ প্রোডাক্ট লিস্টিং ও ফটো আপলোড</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>ডায়নামিক প্রাইসিং ও ডিসকাউন্ট পার্সেন্টেজ ক্যালকুলেটর</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006d2f] text-sm">check_circle</span>
                    <span>মার্চেন্ট হোয়াটসঅ্যাপ নম্বর ও প্রিভিউ কনফিগারেশন</span>
                  </li>
                </ul>

                <button
                  onClick={() => onNavigate('admin_product')}
                  className="mt-2 w-full py-2.5 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base text-[#00685d]">open_in_new</span>
                  <span>স্ক্রিন দেখুন (অ্যাডমিন পোর্টাল)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How System Works & 4 Steps Architecture */}
        <section id="architecture" className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#f2f3ff] border border-[#bdc9c5]/30 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#00685d] bg-[#8ff4e3]/50 px-3.5 py-1 rounded-full">
              ব্যবহারকারী যাত্রা ও ইনফরমেশন আর্কিটেকচার
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#131b2e] mt-3">
              কীভাবে পুরো &apos;আমারদোকান&apos; সিস্টেম কাজ করে?
            </h2>
            <p className="text-xs sm:text-sm text-[#3d4946] mt-1">
              ব্রাউজিং থেকে ক্যাশ-অন-ডেলিভারি কনফার্মেশন পর্যন্ত প্রতিটি পদক্ষেপ অপ্টিমাইজড যাতে কনভার্শন ড্রপ-অফ থাকে শূন্যের কোঠায়।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/25 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#008376] font-mono">০১</span>
                <h4 className="text-sm font-bold text-[#131b2e] mt-1">ব্রাউজ ও নির্বাচন</h4>
                <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                  কাস্টমার হাই-স্পিড লোডিং ক্যাটালগ থেকে পছন্দমতো ক্যাটাগরি ফিল্টার করে সঠিক প্রোডাক্ট নির্বাচন করেন।
                </p>
              </div>
              <span className="text-[11px] text-[#006d2f] font-semibold mt-4">১ সেকেন্ডেরও কম সময়</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/25 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#008376] font-mono">০২</span>
                <h4 className="text-sm font-bold text-[#131b2e] mt-1">১-ক্লিক হোয়াটসঅ্যাপ লিংক</h4>
                <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                  প্রোডাক্ট টাইটেল, প্রাইস, সাইজ এবং ওয়েব লিঙ্ক অটোমেটিক তৈরি হয়ে কাস্টমারের হোয়াটসঅ্যাপ চ্যাটবক্সে বসে যায়।
                </p>
              </div>
              <span className="text-[11px] text-[#006d2f] font-semibold mt-4">জিরো টাইপিং হেডেক</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/25 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#008376] font-mono">০৩</span>
                <h4 className="text-sm font-bold text-[#131b2e] mt-1">সরাসরি কথা ও কনফার্ম</h4>
                <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                  গ্রাহক ও বিক্রেতা সরাসরি মেসেজিংয়ে সাইজ, কালার বা স্পেশাল নোট নিশ্চিত করে ক্যাশ অন ডেলিভারিতে অর্ডার চূড়ান্ত করেন।
                </p>
              </div>
              <span className="text-[11px] text-[#006d2f] font-semibold mt-4">১০০% আস্থার রিলেশন</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/25 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#008376] font-mono">০৪</span>
                <h4 className="text-sm font-bold text-[#131b2e] mt-1">মার্চেন্ট ও ফুলফিলমেন্ট</h4>
                <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                  অ্যাডমিন পোর্টাল থেকে মার্চেন্ট ইনভেন্টরি হ্রাস করেন, প্যাকেজিং স্ট্যাটাস বদলান এবং কুরিয়ার হ্যান্ডওভার সম্পন্ন করেন।
                </p>
              </div>
              <span className="text-[11px] text-[#006d2f] font-semibold mt-4">সহজ ব্যাকএন্ড সিঙ্ক</span>
            </div>
          </div>

          {/* Live Message Protocol Visualizer */}
          <div className="mt-8 p-6 rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00685d]">
                লাইভ মেসেজ প্রোটোকল
              </span>
              <h3 className="text-lg font-bold text-[#131b2e] mt-1">
                স্বয়ংক্রিয় প্রাক-ফরম্যাট করা হোয়াটসঅ্যাপ পে-লোড
              </h3>
              <p className="text-xs text-[#3d4946] mt-2 leading-relaxed">
                গ্রাহক &apos;WhatsApp-এ অর্ডার করুন&apos; বাটনে চাপ দেওয়ার সাথে সাথে এই নিখুঁত মেসেজটি মেটা এপিআই-এর মাধ্যমে বিক্রেতার ইনবক্সে চলে যায়। এতে কোনো ভুল তথ্য তৈরি হওয়ার সুযোগ থাকে না।
              </p>

              <div className="flex items-center gap-3 mt-4 text-xs font-semibold text-[#006d2f]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check</span>
                  স্বয়ংক্রিয় লিঙ্ক
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check</span>
                  প্রোডাক্ট আইডি যুক্ত
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check</span>
                  দাম কনফার্মড
                </span>
              </div>
            </div>

            <div className="md:col-span-6 p-4 rounded-2xl bg-[#e5ddd5]/30 border border-[#bdc9c5]/30 shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#006d2f] text-white flex items-center justify-center font-bold text-xs">
                    আ
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#131b2e]">আমারদোকান অনলাইন সেলস</h5>
                    <span className="text-[10px] text-[#007232]">অনলাইন • তাৎক্ষণিক উত্তর দিন</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-base text-[#6d7a77]">more_vert</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl rounded-tr-none shadow-sm text-xs leading-relaxed text-[#131b2e] border border-black/5">
                আসসালামু আলাইকুম, আমি আমারদোকান থেকে অর্ডার করতে চাই:<br />
                <br />
                👕 <strong>প্রিমিয়াম মেনস ফর্মাল শার্ট (নেভি ব্লু)</strong><br />
                মূল্য: ৳১,৪৫০ (অফার ডিসকাউন্টসহ)<br />
                পছন্দের সাইজ: L | কোয়ান্টিটি: ০১ টি<br />
                🔗 amardokan.com/bd/p/formal-shirt-navy<br />
                <br />
                আমার ডেলিভারি ঠিকানা ও বিকাশ/সিওডি প্রসেস জানিয়ে সাহায্য করুন।
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#6d7a77]">
                  <span>১২:২৪ PM</span>
                  <span className="material-symbols-outlined text-xs text-[#00685d]">done_all</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Matrix: Why AmarDokan is Different */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-[#00685d]">ব্যবসায়িক কার্যকারিতা ও ফলাফল</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
                কেন &apos;আমারদোকান&apos; সাধারণ ই-কমার্স থেকে আলাদা?
              </h2>
            </div>
            <span className="text-xs text-[#3d4946]">
              প্রচলিত জটিল ওয়েব শপে ৯১% স্থানীয় ক্রেতা চেকআউট ফর্ম পূরণের ভয়ে ড্রপ-অফ করে।
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="text-3xl font-bold text-[#00685d]">০%</span>
              <h4 className="text-sm font-bold text-[#131b2e] mt-1">ড্রপ-অফ রেট চেকআউট</h4>
              <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                পাসওয়ার্ড তৈরি, ইমেইল ভেরিফিকেশন বা জটিল চেকআউট ফর্ম নেই। সরাসরি পরিচিত হোয়াটসঅ্যাপ চ্যাটেই অর্ডার শেষ হয়।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="text-3xl font-bold text-[#006d2f]">১০০%</span>
              <h4 className="text-sm font-bold text-[#131b2e] mt-1">সরাসরি বিশ্বস্ত রিলেশনশিপ</h4>
              <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                প্রতিটি ক্রেতার সরাসরি ফোন ও চ্যাট কন্টাক্ট বিক্রেতার কাছে সেভ থাকে। ফলে রিটার্নিং কাস্টমার তৈরি ও আপ-সেল সহজ হয়।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="material-symbols-outlined text-3xl text-[#008376]">notifications_active</span>
              <h4 className="text-sm font-bold text-[#131b2e] mt-1">তাৎক্ষণিক অ্যালার্ট ও দ্রুত সিওডি</h4>
              <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                অর্ডারের মুহূর্তেই বিক্রেতার ফোনে অ্যালার্ট বেজে ওঠে। ফলে অর্ডার কনফার্ম করে দ্রুত কুরিয়ার পাঠানো সম্ভব হয়।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="material-symbols-outlined text-3xl text-[#00685d]">translate</span>
              <h4 className="text-sm font-bold text-[#131b2e] mt-1">১০০% বাংলা ইউজার-ফ্রেন্ডলি</h4>
              <p className="text-xs text-[#3d4946] mt-1 leading-relaxed">
                দেশের প্রত্যন্ত অঞ্চলের সকল বয়সের মানুষের জন্য সহজপাঠ্য ইন্টারফেস। ডিজিটাল বৈষম্যহীন সর্বজনীন ডিজাইন।
              </p>
            </div>
          </div>
        </section>

        {/* Quick Screen Launchpad */}
        <section className="p-6 rounded-2xl bg-[#e2e7ff] border border-[#bdc9c5]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#131b2e]">সকল স্ক্রিন সরাসরি টেস্ট করতে চান?</h3>
            <p className="text-xs text-[#3d4946] mt-0.5">নিচের যেকোনো বাটনে ক্লিক করে সংশ্লিষ্ট স্ক্রিনে প্রবেশ করুন।</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onNavigate('storefront')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#faf8ff] text-[#131b2e] text-xs font-bold border border-[#bdc9c5]/30 shadow-xs"
            >
              🛍️ স্টোরফ্রন্ট
            </button>
            <button
              onClick={() => onNavigate('product_detail')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#faf8ff] text-[#131b2e] text-xs font-bold border border-[#bdc9c5]/30 shadow-xs"
            >
              🎧 প্রোডাক্ট ডিটেইলস
            </button>
            <button
              onClick={() => onNavigate('admin_product')}
              className="px-4 py-2 rounded-xl bg-[#00685d] text-white text-xs font-bold shadow-xs hover:bg-[#008376]"
            >
              ⚙️ অ্যাডমিন পোর্টাল
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
