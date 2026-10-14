import React, { useState } from 'react';
import { Product, Review, AppSettings, ActiveScreen } from '../types';
import { toBnNum, formatPriceBn } from '../data/mockData';

interface ProductDetailViewProps {
  product: Product;
  reviews: Review[];
  settings: AppSettings;
  onNavigate: (screen: ActiveScreen) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onOrderPlaced?: (product: Product, quantity: number) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  reviews,
  settings,
  onNavigate,
  onAddToCart,
  onOrderPlaced,
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'delivery' | 'reviews'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCartFeedback, setShowCartFeedback] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);

  const images = product.images.length > 0 ? product.images : [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuABTFip_SR-R_gNSw5ABmr17o2PlSkuwHzub3IZ3_M3CpyBcv2l041s-iJBYxx3LilUMPYUGdGNpeZl91JYRAz16-8IbGdNlVHYjLMCyxa2ZOPCTgDRq10B6E3GrBBZyZV7c6pc4fJNn2EmFO3yi4HYO0HtVrMrr83gls2Z7SeOLE-QfEh8tDvczcDjW3My0fpLx5c_jTi2j5muJZJaLKUw7cVHCLo4BsnNY8tR0LX2IDtRDGhN92iR'
  ];

  const currentImage = images[selectedImgIndex] || images[0];

  const handleQtyChange = (delta: number) => {
    const next = quantity + delta;
    if (next >= 1 && next <= 15) {
      setQuantity(next);
    }
  };

  const totalPrice = quantity * product.discountPrice;
  const regularTotal = quantity * product.regularPrice;
  const savings = regularTotal - totalPrice;

  // WhatsApp Message Generator
  const waMessage = `হাই '${settings.brandName}'! আমি অর্ডার করতে চাই:\n• প্রোডাক্ট: ${product.nameBn}\n• পরিমাণ: ${quantity} পিস\n• মোট মূল্য: ৳${totalPrice.toLocaleString('en-US')}\n• লিংক: amardokan.com/p/${product.slug}\nদয়া করে ডেলিভারির প্রক্রিয়া জানান।`;
  const cleanPhone = settings.whatsappNumber.startsWith('0')
    ? `88${settings.whatsappNumber}`
    : settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setShowCartFeedback(true);
    setTimeout(() => setShowCartFeedback(false), 2500);
  };

  const handleWhatsAppOrderClick = () => {
    if (onOrderPlaced) {
      onOrderPlaced(product, quantity);
    }
  };

  return (
    <div className="w-full pt-28 pb-16 bg-[#faf8ff] min-h-screen">
      {/* Decorative ambient background glows */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#8ff4e3]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-48 right-0 w-80 h-80 bg-[#5dfd8a]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-[#3d4946] mb-6 overflow-x-auto whitespace-nowrap py-1">
            <button
              onClick={() => onNavigate('storefront')}
              className="hover:text-[#00685d] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">home</span>
              <span>হোম</span>
            </button>
            <span className="material-symbols-outlined text-xs text-[#6d7a77]">chevron_right</span>
            <button
              onClick={() => onNavigate('storefront')}
              className="hover:text-[#00685d] transition-colors"
            >
              {product.categoryLabelBn}
            </button>
            <span className="material-symbols-outlined text-xs text-[#6d7a77]">chevron_right</span>
            <span className="text-[#131b2e] font-semibold truncate max-w-[280px] sm:max-w-none">
              {product.nameBn}
            </span>
          </nav>

          {/* Main Two-Column Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
            {/* Left Column: Rich Gallery Component */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative w-full aspect-square rounded-2xl bg-white shadow-md overflow-hidden flex items-center justify-center border border-[#bdc9c5]/30 group">
                <img
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    zoomActive ? 'scale-125 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'
                  }`}
                  src={currentImage}
                  alt={product.nameBn}
                  onClick={() => setZoomActive(!zoomActive)}
                />

                {/* Floating Badges Over Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                  {product.tagLabelBn && (
                    <span className="inline-flex items-center gap-1 bg-[#994100] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md tracking-wide">
                      <span className="material-symbols-outlined text-sm">local_fire_department</span>
                      {product.tagLabelBn}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#00685d] px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-[#00685d]/10">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    ১০০% জেনুইন গ্যাজেট
                  </span>
                </div>

                {/* Fullscreen / Zoom Hint Button */}
                <button
                  onClick={() => setZoomActive(!zoomActive)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur text-[#131b2e] hover:text-[#00685d] shadow-sm hover:scale-110 transition-transform"
                  title="জুম করুন"
                >
                  <span className="material-symbols-outlined text-lg">
                    {zoomActive ? 'zoom_out' : 'zoom_in'}
                  </span>
                </button>
              </div>

              {/* Thumbnails Selector */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`rounded-xl overflow-hidden aspect-square bg-white p-1 transition-all border ${
                        selectedImgIndex === idx
                          ? 'border-[#00685d] shadow-md bg-[#e2e7ff]/30 ring-2 ring-[#00685d]/30'
                          : 'border-[#bdc9c5]/30 shadow-xs hover:border-[#00685d]/50'
                      }`}
                    >
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Micro Specs Chips */}
              <div className="p-4 rounded-xl bg-[#f2f3ff] shadow-sm border border-[#bdc9c5]/25 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#131b2e] font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00685d] text-lg">tune</span>
                    এক নজরে মূল ফিচারসমূহ
                  </span>
                  <span className="text-xs text-[#00685d] font-semibold">
                    {product.warrantyBn || 'অফিশিয়াল ১ বছরের ওয়ারেন্টি'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {product.features.map((feat, i) => (
                    <div
                      key={i}
                      className="bg-white p-2.5 rounded-lg flex flex-col items-center text-center shadow-xs border border-[#bdc9c5]/15"
                    >
                      <span className="material-symbols-outlined text-[#00685d] text-xl">
                        {feat.icon}
                      </span>
                      <span className="text-xs text-[#131b2e] mt-1 font-bold">{feat.title}</span>
                      <span className="text-[10px] text-[#3d4946]">{feat.subtitle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Product Info & Dedicated WhatsApp Order Engine */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              {/* Stock status & SKU */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5dfd8a]/30 text-[#007232] text-xs font-bold border border-[#007232]/15">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006d2f] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006d2f]"></span>
                  </span>
                  ইন স্টক (এখনই ডেলিভারির জন্য প্রস্তুত)
                </span>
                <span className="text-xs text-[#3d4946] bg-[#e2e7ff] px-2.5 py-1 rounded-md font-mono">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#131b2e] leading-tight tracking-tight">
                {product.nameBn}
              </h1>

              {/* Rating & Social Proof Strip */}
              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                <div className="flex items-center gap-1 bg-[#e2e7ff] px-2.5 py-1 rounded-lg">
                  <div className="flex text-[#c05400]">
                    <span className="material-symbols-outlined text-base">star</span>
                    <span className="material-symbols-outlined text-base">star</span>
                    <span className="material-symbols-outlined text-base">star</span>
                    <span className="material-symbols-outlined text-base">star</span>
                    <span className="material-symbols-outlined text-base">star_half</span>
                  </div>
                  <span className="font-bold text-[#131b2e] ml-1">{toBnNum(product.rating)}</span>
                </div>
                <span className="text-[#bdc9c5]">•</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs font-semibold text-[#00685d] hover:underline cursor-pointer"
                >
                  {toBnNum(product.reviewCount)}টি ভেরিফাইড রিভিউ
                </button>
                <span className="text-[#bdc9c5]">•</span>
                <span className="text-xs text-[#3d4946] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#006d2f]">
                    shopping_cart_checkout
                  </span>
                  {toBnNum(product.ordersCount)}+ বার অর্ডার হয়েছে
                </span>
              </div>

              {/* Pricing Box */}
              <div className="p-4 rounded-xl bg-white shadow-sm border border-[#bdc9c5]/30 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-bold text-[#00685d] tracking-tight">
                    {formatPriceBn(totalPrice)}
                  </span>
                  <span className="text-base text-[#6d7a77] line-through">
                    {formatPriceBn(regularTotal)}
                  </span>
                  <span className="text-xs bg-[#ffdbca] text-[#783200] px-2.5 py-0.5 rounded-full font-bold">
                    বাঁচবে {formatPriceBn(savings)}
                  </span>
                </div>

                {/* Quantity Counter */}
                <div className="flex items-center gap-2 bg-[#f2f3ff] px-2 py-1.5 rounded-lg border border-[#bdc9c5]/20">
                  <span className="text-xs text-[#3d4946] pr-1 font-medium">পরিমাণ:</span>
                  <div className="flex items-center bg-white rounded-md shadow-xs border border-[#bdc9c5]/30">
                    <button
                      className="w-8 h-8 flex items-center justify-center text-[#131b2e] hover:bg-[#e2e7ff] rounded-l-md transition-colors font-bold text-lg select-none"
                      onClick={() => handleQtyChange(-1)}
                      type="button"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#131b2e]">
                      {toBnNum(quantity)}
                    </span>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-[#131b2e] hover:bg-[#e2e7ff] rounded-r-md transition-colors font-bold text-lg select-none"
                      onClick={() => handleQtyChange(1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* HIGHLIGHT FEATURE - WhatsApp Order Interactive Engine */}
              <div className="rounded-2xl bg-gradient-to-br from-[#008376] to-[#00685d] text-[#f4fffb] p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                {/* WhatsApp Header Status */}
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5dfd8a] flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 fill-[#075E54]" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.181-.077.355.101.173.449.741.963 1.199.662.59 1.221.774 1.394.86.173.087.274.072.375-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg text-white font-bold leading-tight">
                        {settings.brandName} WhatsApp অর্ডার ডেস্ক
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#66ff8e] animate-pulse"></span>
                        <span className="text-xs text-white/90 font-medium">
                          অনলাইনে আছেন (গড় রেসপন্স টাইম: ২ মিনিট)
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex bg-white/15 backdrop-blur px-2.5 py-1 rounded-md text-white text-xs font-semibold">
                    ঝামেলাহীন শপিং
                  </span>
                </div>

                {/* Live Message Preview Box */}
                <div className="bg-white text-[#131b2e] p-3 rounded-xl shadow-sm my-3 border border-white/20">
                  <div className="flex items-center justify-between pb-1.5 text-xs text-[#3d4946]">
                    <span className="flex items-center gap-1 font-semibold text-[#00685d]">
                      <span className="material-symbols-outlined text-sm text-[#006d2f]">
                        mark_chat_unread
                      </span>
                      অর্ডার মেসেজ প্রিভিউ:
                    </span>
                    <span className="text-[11px] text-[#6d7a77] font-mono">লাইভ প্রস্তুত</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#f2f3ff] font-mono leading-relaxed text-[#131b2e] text-xs select-all border border-[#bdc9c5]/30">
                    হাই &apos;{settings.brandName}&apos;! আমি অর্ডার করতে চাই:<br />
                    • প্রোডাক্ট: {product.nameBn}<br />
                    • পরিমাণ: <span className="font-bold text-[#00685d]">{toBnNum(quantity)}</span> পিস<br />
                    • মোট মূল্য: <span className="font-bold text-[#00685d]">{formatPriceBn(totalPrice)}</span><br />
                    • লিংক: amardokan.com/p/{product.slug}<br />
                    দয়া করে ডেলিভারির প্রক্রিয়া জানান।
                  </div>
                </div>

                {/* Primary WhatsApp CTA Button */}
                <div className="pt-1">
                  <a
                    className="w-full relative group flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-4 rounded-xl text-base font-bold shadow-lg shadow-black/20 transition-all transform active:scale-95"
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleWhatsAppOrderClick}
                  >
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#66ff8e]"></span>
                    </span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.181-.077.355.101.173.449.741.963 1.199.662.59 1.221.774 1.394.86.173.087.274.072.375-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"></path>
                    </svg>
                    <span>সরাসরি WhatsApp-এ চ্যাট ও অর্ডার করুন</span>
                    <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </a>
                  <p className="text-center text-xs text-white/80 mt-2">
                    কোনো পেমেন্ট তথ্য দিতে হবে না • চ্যাটেই নাম ও ঠিকানা পাঠান
                  </p>
                </div>
              </div>

              {/* Secondary Actions: Add to cart & share */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCartClick}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] font-semibold text-xs sm:text-sm transition-colors border border-[#bdc9c5]/30"
                >
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  <span>{showCartFeedback ? 'কার্টে যোগ হয়েছে ✓' : 'কার্টে যোগ করুন'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] font-semibold text-xs sm:text-sm transition-colors border border-[#bdc9c5]/30"
                >
                  <span className="material-symbols-outlined text-lg">share</span>
                  <span>{copiedLink ? 'লিংক কপি হয়েছে!' : 'বন্ধুদের সাথে শেয়ার'}</span>
                </button>
              </div>

              {/* Delivery & Payment Trust Cards */}
              <div className="p-4 rounded-xl bg-white shadow-sm border border-[#bdc9c5]/30 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#e2e7ff] text-[#00685d] shrink-0">
                    <span className="material-symbols-outlined text-2xl">local_shipping</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#131b2e]">
                      ক্যাশ অন ডেলিভারি (Cash on Delivery)
                    </h4>
                    <p className="text-xs text-[#3d4946] mt-0.5">
                      ঢাকা সিটির মধ্যে ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে ২-৩ দিনে হোম ডেলিভারি।
                    </p>
                    <div className="mt-1.5 flex items-center gap-3 text-xs font-semibold text-[#00685d]">
                      <span className="bg-[#eaedff] px-2 py-0.5 rounded">ঢাকা: ৳{toBnNum(settings.deliveryDhaka)}</span>
                      <span className="bg-[#eaedff] px-2 py-0.5 rounded">ঢাকার বাইরে: ৳{toBnNum(settings.deliveryOutside)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#bdc9c5]/20 pt-2 flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#e2e7ff] text-[#00685d] shrink-0">
                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#131b2e]">
                      পণ্য দেখে মূল্য পরিশোধের সুবিধা
                    </h4>
                    <p className="text-xs text-[#3d4946] mt-0.5">
                      রাইডারের সামনে বক্স চেক করে দেখে নেওয়ার নিশ্চয়তা ও ৭ দিনের ইজি রিটার্ন।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Detailed Information Tabs & Bento Grid */}
          <div className="mt-12 pt-4">
            {/* Tab Controls */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#bdc9c5]/30">
              <button
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'specs'
                    ? 'bg-[#00685d] text-white shadow-sm'
                    : 'bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
                onClick={() => setActiveTab('specs')}
              >
                বিস্তারিত স্পেসিফিকেশন
              </button>
              <button
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'delivery'
                    ? 'bg-[#00685d] text-white shadow-sm'
                    : 'bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
                onClick={() => setActiveTab('delivery')}
              >
                ডেলিভারি পলিসি ও ওয়ারেন্টি
              </button>
              <button
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-[#00685d] text-white shadow-sm'
                    : 'bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                কাস্টমার রিভিউ ({toBnNum(product.reviewCount)})
              </button>
            </div>

            {/* Tab 1: Detailed Specifications */}
            {activeTab === 'specs' && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Specs Table */}
                <div className="md:col-span-8 p-5 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/30">
                  <h3 className="text-base font-bold text-[#131b2e] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685d]">list_alt</span>
                    টেকনিক্যাল স্পেসিফিকেশন টেবিল
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <tbody>
                        {product.specs.map((s, idx) => (
                          <tr
                            key={idx}
                            className={idx % 2 === 0 ? 'bg-[#f2f3ff]' : 'bg-transparent'}
                          >
                            <td className="p-3 font-semibold text-[#131b2e] w-1/3 border-b border-white/40">
                              {s.label}
                            </td>
                            <td className="p-3 text-[#3d4946] border-b border-white/40">
                              {s.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Size table if available */}
                  {product.sizeTable && product.sizeTable.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-[#bdc9c5]/30">
                      <h4 className="text-sm font-bold text-[#131b2e] mb-2">
                        সাইজ ও পরিমাপ টেবিল (Size Chart)
                      </h4>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-[#eaedff] text-[#131b2e]">
                            <th className="p-2 text-left">সাইজ</th>
                            <th className="p-2 text-left">বুকের মাপ</th>
                            <th className="p-2 text-left">লম্বা</th>
                            <th className="p-2 text-right">স্ট্যাটাস</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizeTable.map((st, i) => (
                            <tr key={i} className="border-b border-[#bdc9c5]/20">
                              <td className="p-2 font-bold">{st.size}</td>
                              <td className="p-2">{st.chest}</td>
                              <td className="p-2">{st.length}</td>
                              <td className="p-2 text-right font-semibold text-[#006d2f]">{st.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Feature Highlight Card & Audio graph */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  <div className="p-5 rounded-2xl bg-[#f2f3ff] shadow-sm border border-[#bdc9c5]/30">
                    <h4 className="text-base font-bold text-[#131b2e] mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#006d2f]">hearing</span>
                      হাই-ফাই স্টুডিও অডিও
                    </h4>
                    <p className="text-xs sm:text-sm text-[#3d4946] leading-relaxed">
                      ১৩ মিমি টাইটানিয়াম ড্রাইভার দেয় ক্রিস্টাল ক্লিয়ার ভোকাল ও অসাধারণ ডিপ বেজ (Deep Bass)। গান শোনা বা গেমিং-এ কোনো ল্যাগ ছাড়াই দারুণ অভিজ্ঞতা উপভোগ করুন।
                    </p>

                    {/* Frequency / Sound Response Curve SVG Visual */}
                    <div className="mt-4 p-3 bg-white rounded-xl border border-[#bdc9c5]/25">
                      <div className="flex items-center justify-between text-[11px] text-[#3d4946] mb-1 font-mono">
                        <span>20Hz (বেজ)</span>
                        <span>1kHz (ভোকাল)</span>
                        <span>20kHz (ট্রেবল)</span>
                      </div>
                      <svg className="w-full h-12 stroke-[#00685d] fill-none stroke-2" viewBox="0 0 200 50">
                        <path d="M 0,40 Q 30,10 60,25 T 120,20 T 160,35 T 200,15"></path>
                        <path
                          className="fill-[#00685d]/10 stroke-none"
                          d="M 0,40 Q 30,10 60,25 T 120,20 T 160,35 T 200,15 L 200,50 L 0,50 Z"
                        ></path>
                      </svg>
                      <span className="block text-center text-[10px] text-[#6d7a77] mt-1">
                        ব্যালেন্সড স্টুডিও সাউন্ড প্রোফাইল গ্রাফ
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/30">
                    <h4 className="text-sm font-bold text-[#131b2e] mb-3">
                      কেন &apos;{settings.brandName}&apos; থেকে কিনবেন?
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-xs text-[#3d4946]">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#006d2f] text-base">
                          check_circle
                        </span>
                        <span>১০০% আসল প্রোডাক্টের নিশ্চয়তা</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#006d2f] text-base">
                          check_circle
                        </span>
                        <span>দ্রুততম হোম ডেলিভারি সার্ভিস</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#006d2f] text-base">
                          check_circle
                        </span>
                        <span>হোয়াটসঅ্যাপে তাৎক্ষণিক售后 বা আফটার সেলস সাপোর্ট</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Delivery & Warranty */}
            {activeTab === 'delivery' && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/30 flex flex-col gap-2.5">
                  <span className="material-symbols-outlined text-[#00685d] text-3xl">airport_shuttle</span>
                  <h4 className="text-base font-bold text-[#131b2e]">ডেলিভারির সময় ও খরচ</h4>
                  <p className="text-xs sm:text-sm text-[#3d4946] leading-relaxed">
                    • ঢাকা মেট্রোপলিটন: ২৪ ঘণ্টার মধ্যে ডেলিভারি (চার্জ ৳{toBnNum(settings.deliveryDhaka)})<br />
                    • ঢাকার আশপাশ ও সারা বাংলাদেশ: ৪৮ থেকে ৭২ ঘণ্টা (চার্জ ৳{toBnNum(settings.deliveryOutside)})<br />
                    • সুন্দরবন, রেডএক্স ও স্টিডফাস্ট কুরিয়ারের মাধ্যমে নিরাপদে পাঠানো হয়।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/30 flex flex-col gap-2.5">
                  <span className="material-symbols-outlined text-[#00685d] text-3xl">currency_exchange</span>
                  <h4 className="text-base font-bold text-[#131b2e]">রিটার্ন ও রিফান্ড নীতি</h4>
                  <p className="text-xs sm:text-sm text-[#3d4946] leading-relaxed">
                    • পণ্য পৌঁছানোর পর কোনো ত্রুটি দেখা দিলে ৭ দিনের মধ্যে বিনামূল্যে এক্সচেঞ্জ সুবিধা।<br />
                    • রাইডারের সামনে বক্স চেক করুন। পছন্দ না হলে বা সমস্যা থাকলে ডেলিভারি চার্জ পরিশোধ করে ফেরত দেওয়ার সুযোগ রয়েছে।
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/30 flex flex-col gap-2.5">
                  <span className="material-symbols-outlined text-[#00685d] text-3xl">security</span>
                  <h4 className="text-base font-bold text-[#131b2e]">১ বছরের ব্র্যান্ড ওয়ারেন্টি</h4>
                  <p className="text-xs sm:text-sm text-[#3d4946] leading-relaxed">
                    • ম্যানুফ্যাকচারিং যেকোনো ত্রুটির জন্য ১ বছর ফ্রি সার্ভিস ওয়ারেন্টি পাবেন।<br />
                    • ওয়ারেন্টির জন্য বক্স ও ইনভয়েস স্লিপটি সংরক্ষণ করুন অথবা WhatsApp চ্যাটে মেসেজ দিন।
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="mt-6 flex flex-col gap-6">
                {/* Rating Summary Overview */}
                <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/30 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-4 flex flex-col items-center justify-center sm:border-r border-[#bdc9c5]/30 text-center">
                    <span className="text-4xl font-bold text-[#00685d]">{toBnNum(product.rating)}</span>
                    <div className="flex text-[#c05400] my-1">
                      <span className="material-symbols-outlined text-lg">star</span>
                      <span className="material-symbols-outlined text-lg">star</span>
                      <span className="material-symbols-outlined text-lg">star</span>
                      <span className="material-symbols-outlined text-lg">star</span>
                      <span className="material-symbols-outlined text-lg">star_half</span>
                    </div>
                    <span className="text-xs text-[#3d4946]">
                      {toBnNum(product.reviewCount)}টি কাস্টমার রেটিংয়ের ভিত্তিতে
                    </span>
                  </div>

                  {/* Rating Bars */}
                  <div className="sm:col-span-8 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-12 text-[#3d4946]">৫ স্টার</span>
                      <div className="flex-1 h-2 rounded-full bg-[#e2e7ff] overflow-hidden">
                        <div className="h-full bg-[#006d2f] rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <span className="w-8 text-right font-bold">১০৯</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-12 text-[#3d4946]">৪ স্টার</span>
                      <div className="flex-1 h-2 rounded-full bg-[#e2e7ff] overflow-hidden">
                        <div className="h-full bg-[#00685d] rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="w-8 text-right font-bold">১২</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-12 text-[#3d4946]">৩ স্টার</span>
                      <div className="flex-1 h-2 rounded-full bg-[#e2e7ff] overflow-hidden">
                        <div className="h-full bg-[#c05400] rounded-full" style={{ width: '2%' }}></div>
                      </div>
                      <span className="w-8 text-right font-bold">৩</span>
                    </div>
                  </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/30 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#8ff4e3] flex items-center justify-center font-bold text-[#00201c] text-sm">
                            {rev.initial}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-[#131b2e]">{rev.author}</h5>
                            <span className="text-[11px] text-[#6d7a77]">
                              {rev.location} • {rev.verified ? 'ভেরিফাইড ক্রেতা' : ''}
                            </span>
                          </div>
                        </div>
                        <div className="flex text-[#c05400]">
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <span key={idx} className="material-symbols-outlined text-sm">star</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3d4946] mt-1 leading-relaxed">
                        &quot;{rev.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Consultation Banner */}
          <div className="mt-10 p-5 rounded-2xl bg-[#e2e7ff] shadow-sm border border-[#bdc9c5]/30 flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#00685d] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#131b2e]">
                  কোনো প্রশ্ন বা কনফিউশন আছে?
                </h4>
                <p className="text-xs text-[#3d4946]">
                  আমাদের প্রোডাক্ট এক্সপার্টের সাথে সরাসরি হোয়াটসঅ্যাপে কথা বলে নিন।
                </p>
              </div>
            </div>
            <a
              className="flex items-center gap-2 bg-[#006d2f] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#007232] transition-colors shadow-sm"
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `আমার ${product.nameBn} সম্পর্কে কিছু জানার ছিল`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>প্রশ্ন করুন</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Sticky WhatsApp Checkout Float Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] z-40 flex items-center justify-between gap-3 border-t border-[#bdc9c5]/30">
        <div className="flex flex-col pl-1">
          <span className="text-[11px] text-[#3d4946]">মোট পরিশোধযোগ্য:</span>
          <span className="text-lg font-bold text-[#00685d] leading-none">
            {formatPriceBn(totalPrice)}
          </span>
        </div>
        <a
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-transform"
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          onClick={handleWhatsAppOrderClick}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.181-.077.355.101.173.449.741.963 1.199.662.59 1.221.774 1.394.86.173.087.274.072.375-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"></path>
          </svg>
          <span>WhatsApp-এ অর্ডার</span>
        </a>
      </div>
    </div>
  );
};
