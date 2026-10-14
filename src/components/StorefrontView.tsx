import React, { useState, useMemo } from 'react';
import { Product, CategoryId, AppSettings, ActiveScreen } from '../types';
import { toBnNum, formatPriceBn } from '../data/mockData';

interface StorefrontViewProps {
  products: Product[];
  settings: AppSettings;
  onSelectProduct: (p: Product) => void;
  onNavigate: (screen: ActiveScreen) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOrderPlaced?: (product: Product, quantity: number) => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({
  products,
  settings,
  onSelectProduct,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOrderPlaced,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'newest'>('popularity');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.categoryLabelBn.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.id > a.id ? 1 : -1));
    } else {
      // popularity
      list.sort((a, b) => b.ordersCount - a.ordersCount);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const cleanPhone = settings.whatsappNumber.startsWith('0')
    ? `88${settings.whatsappNumber}`
    : settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleQuickWhatsApp = (p: Product) => {
    if (onOrderPlaced) {
      onOrderPlaced(p, 1);
    }
  };

  return (
    <div className="w-full pt-28 bg-[#faf8ff] min-h-screen">
      {/* Dynamic Urgency / Top Marquee Banner */}
      <div className="w-full bg-[#008376] text-[#f4fffb] py-2 px-4 sm:px-6 shadow-xs">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[#66ff8e]">bolt</span>
            <span>আজকের বিশেষ সুবিধা: সারাদেশে ৩টি বা ততোধিক প্রোডাক্ট অর্ডারে ক্যাশ অন ডেলিভারি একদম ফ্রি!</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[#f4fffb]/90 text-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#8ff4e3]">verified_user</span>
              ১০০% অরিজিনাল পণ্য
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#8ff4e3]">support_agent</span>
              দ্রুত কাস্টমার কেয়ার সাপোর্ট
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 py-6 md:py-10 flex flex-col gap-10">
        {/* Hero Promo Banner Section */}
        <section className="relative w-full rounded-2xl overflow-hidden bg-[#e2e7ff] shadow-md border border-[#bdc9c5]/30">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#00685d_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 md:p-10">
            <div className="lg:col-span-7 flex flex-col items-start gap-4 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#006d2f] text-white shadow-xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.77.82 2.781.82h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.77-5.769-5.77zm7.592 5.766c0 4.19-3.407 7.598-7.592 7.598-1.282 0-2.493-.321-3.561-.884l-3.957 1.038 1.056-3.864c-.663-1.127-1.042-2.441-1.042-3.888 0-4.19 3.408-7.598 7.504-7.598 4.185 0 7.592 3.408 7.592 7.598z"></path>
                </svg>
                <span className="text-xs font-semibold tracking-wide">সরাসরি হোয়াটসঅ্যাপ শপিং সুবিধা</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#131b2e] font-bold leading-tight tracking-tight">
                সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন —{' '}
                <span className="text-[#00685d] underline decoration-[#00685d]/30 decoration-wavy">
                  কোনো ঝামেলা নেই
                </span>
                , দ্রুত ডেলিভারি!
              </h1>

              <p className="text-sm sm:text-base text-[#3d4946] max-w-xl leading-relaxed">
                কার্ট যোগ করা বা একাউন্ট খোলার দীর্ঘ প্রক্রিয়া ছাড়াই, আপনার পছন্দের প্রোডাক্টটি সিলেক্ট করে এক ক্লিকেই কথা বলুন প্রতিনিধির সাথে। পণ্য হাতে পেয়ে নিশ্চিত পেমেন্ট করুন।
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#006d2f] hover:bg-[#007232] text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `আমি ${settings.brandName} থেকে একটি অর্ডার করতে চাই`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.77.82 2.781.82h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.77-5.769-5.77zm7.592 5.766c0 4.19-3.407 7.598-7.592 7.598-1.282 0-2.493-.321-3.561-.884l-3.957 1.038 1.056-3.864c-.663-1.127-1.042-2.441-1.042-3.888 0-4.19 3.408-7.598 7.504-7.598 4.185 0 7.592 3.408 7.592 7.598z"></path>
                  </svg>
                  <span>হোয়াটসঅ্যাপে চ্যাট করুন</span>
                </a>

                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-white text-[#131b2e] font-semibold text-sm shadow-sm hover:bg-[#faf8ff] transition-colors border border-[#bdc9c5]/30"
                  href="#catalog"
                >
                  <span>প্রোডাক্ট ক্যাটালগ দেখুন</span>
                  <span className="material-symbols-outlined text-lg">arrow_downward</span>
                </a>
              </div>

              <div className="flex items-center gap-6 pt-2 text-[#3d4946] text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006d2f] text-base">local_shipping</span>
                  দ্রুত ডেলিভারি
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006d2f] text-base">payments</span>
                  ক্যাশ অন ডেলিভারি
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006d2f] text-base">published_with_changes</span>
                  ৭ দিন রিপ্লেসমেন্ট
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center mt-2 lg:mt-0">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-white border border-[#bdc9c5]/30 group">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/src/assets/images/offer_poster_1791950725216.jpg"
                  alt="Creative Smart Fast - Special Mega Offer Poster"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-between border border-white/20 shadow-lg">
                  <div>
                    <p className="text-[11px] font-bold text-[#00685d]">ক্রিয়েটিভ স্মার্ট ফাস্ট</p>
                    <p className="text-sm font-bold text-[#131b2e]">বিশেষ মেগা অফার পোস্টার</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#c05400] text-white text-[11px] font-bold shadow-xs">
                    HOT DEAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Pills Bar */}
        <section className="flex flex-col gap-3" id="categories">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#131b2e]">ক্যাটাগরি সমূহ</h2>
            <span className="text-xs text-[#3d4946] hidden sm:inline">পছন্দের ক্যাটাগরি বাছাই করুন</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'সকল প্রোডাক্ট' },
              { id: 'fashion', label: 'ফ্যাশন ও ক্লথিং' },
              { id: 'electronics', label: 'ইলেকট্রনিক্স ও গ্যাজেট' },
              { id: 'home', label: 'হোম অ্যান্ড লিভিং' },
              { id: 'watches', label: 'ঘড়ি ও অ্যাক্সেসরিজ' },
              { id: 'gifts', label: 'গ্রোসারি ও গিফট' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#00685d] text-white shadow-sm'
                    : 'bg-white text-[#3d4946] hover:bg-[#e2e7ff] border border-[#bdc9c5]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Filter, Search and Sorting Control Bar */}
        <section
          className="p-4 rounded-xl bg-white shadow-sm border border-[#bdc9c5]/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
          id="catalog"
        >
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#6d7a77] text-xl">
              search
            </span>
            <input
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00685d]/30 border border-transparent focus:border-[#00685d]/30 transition-all"
              placeholder="প্রোডাক্ট নাম দিয়ে খুঁজুন..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Controls Right: Count & Sort Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eaedff] text-xs font-semibold text-[#131b2e]">
              <span className="material-symbols-outlined text-base text-[#00685d]">inventory_2</span>
              <span>{toBnNum(filteredProducts.length)}টি প্রোডাক্ট প্রদর্শিত</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-[#3d4946] whitespace-nowrap hidden sm:inline" htmlFor="sortSelect">
                সর্ট করুন:
              </label>
              <div className="relative">
                <select
                  id="sortSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-10 pl-3 pr-8 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold focus:outline-none appearance-none cursor-pointer border border-[#bdc9c5]/30"
                >
                  <option value="popularity">জনপ্রিয়তা</option>
                  <option value="price-low">দাম: কম থেকে বেশি</option>
                  <option value="price-high">দাম: বেশি থেকে কম</option>
                  <option value="newest">নতুন কালেকশন</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 text-[#6d7a77] pointer-events-none text-lg">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const savings = p.regularPrice - p.discountPrice;
            const waOrderMsg = `আসসালামু আলাইকুম, আমি '${p.nameBn}' (মূল্য ৳${p.discountPrice.toLocaleString('en-US')}) অর্ডার করতে চাই।`;
            const cardWaUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waOrderMsg)}`;

            return (
              <article
                key={p.id}
                className="flex flex-col rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#bdc9c5]/30 group"
              >
                {/* Product Image Area */}
                <div
                  className="relative aspect-square w-full bg-[#f2f3ff] overflow-hidden cursor-pointer"
                  onClick={() => {
                    onSelectProduct(p);
                    onNavigate('product_detail');
                  }}
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={p.images[0]}
                    alt={p.nameBn}
                  />

                  {/* Badge */}
                  {p.tagLabelBn && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#c05400] text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">local_fire_department</span>
                      {p.tagLabelBn}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#006d2f] text-[11px] font-bold shadow-xs border border-[#006d2f]/10">
                    স্টকে আছে
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-[#6d7a77] uppercase font-semibold tracking-wider">
                      {p.categoryLabelBn}
                    </span>
                    <h3
                      className="text-base font-bold text-[#131b2e] mt-0.5 line-clamp-1 hover:text-[#00685d] cursor-pointer transition-colors"
                      onClick={() => {
                        onSelectProduct(p);
                        onNavigate('product_detail');
                      }}
                    >
                      {p.nameBn}
                    </h3>
                    <p className="text-xs text-[#3d4946] truncate mt-0.5">{p.nameEn}</p>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#131b2e]">
                        {formatPriceBn(p.discountPrice)}
                      </span>
                      <span className="text-xs text-[#6d7a77] line-through">
                        {formatPriceBn(p.regularPrice)}
                      </span>
                    </div>
                    {savings > 0 && (
                      <span className="px-2 py-0.5 rounded bg-[#e2e7ff] text-[#00685d] text-xs font-bold">
                        {formatPriceBn(savings)} সাশ্রয়
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-1">
                    <a
                      className="w-full h-11 px-4 rounded-xl bg-[#006d2f] hover:bg-[#007232] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                      href={cardWaUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => handleQuickWhatsApp(p)}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.77.82 2.781.82h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.77-5.769-5.77zm7.592 5.766c0 4.19-3.407 7.598-7.592 7.598-1.282 0-2.493-.321-3.561-.884l-3.957 1.038 1.056-3.864c-.663-1.127-1.042-2.441-1.042-3.888 0-4.19 3.408-7.598 7.504-7.598 4.185 0 7.592 3.408 7.592 7.598z"></path>
                      </svg>
                      <span>WhatsApp-এ অর্ডার করুন</span>
                    </a>

                    <button
                      className="w-full h-9 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold transition-colors flex items-center justify-center gap-1 border border-[#bdc9c5]/25"
                      type="button"
                      onClick={() => {
                        onSelectProduct(p);
                        onNavigate('product_detail');
                      }}
                    >
                      <span className="material-symbols-outlined text-base text-[#00685d]">visibility</span>
                      <span>বিস্তারিত দেখুন</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#bdc9c5]/30">
            <span className="material-symbols-outlined text-4xl text-[#6d7a77]">search_off</span>
            <p className="text-base font-bold text-[#131b2e] mt-2">কোনো প্রোডাক্ট পাওয়া যায়নি</p>
            <p className="text-xs text-[#3d4946] mt-1">অন্য কোনো কি-ওয়ার্ড দিয়ে সার্চ করুন অথবা ক্যাটাগরি পরিবর্তন করুন।</p>
          </div>
        )}

        {/* Special Offer Campaign Spotlight Banner */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#00685d] via-[#008376] to-[#006d2f] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div className="flex-1 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold tracking-wide">
              <span className="material-symbols-outlined text-sm text-[#ffdbca]">local_fire_department</span>
              মেগা ডিসকাউন্ট অফার • ক্রিয়েটিভ স্মার্ট ফাস্ট
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3 leading-tight text-white">
              স্মার্ট প্রোডাক্ট ও স্পেশাল সার্ভিসে আকর্ষণীয় অফার!
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-2 max-w-xl leading-relaxed">
              সরাসরি হোয়াটসঅ্যাপে ১-ক্লিকে অর্ডার করলেই পাবেন এক্সক্লুসিভ ছাড় ও দ্রুত হোম ডেলিভারি সুবিধা। কোনো কার্ড বা পেমেন্ট ঝামেলা ছাড়াই ঘরে বসে পণ্য বুঝে নিন।
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  'আসসালামু আলাইকুম, আমি আপনার স্পেশাল অফার পোস্টারটি দেখেছি এবং অর্ডার করতে চাই।'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.77.82 2.781.82h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.77-5.769-5.77zm7.592 5.766c0 4.19-3.407 7.598-7.592 7.598-1.282 0-2.493-.321-3.561-.884l-3.957 1.038 1.056-3.864c-.663-1.127-1.042-2.441-1.042-3.888 0-4.19 3.408-7.598 7.504-7.598 4.185 0 7.592 3.408 7.592 7.598z"></path>
                </svg>
                <span>অফারটি লুফে নিন (WhatsApp)</span>
              </a>
              <span className="text-xs text-white/80 font-medium">
                হটলাইন: {settings.whatsappNumber}
              </span>
            </div>
          </div>

          <div className="w-full md:w-56 lg:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 shrink-0 group">
            <img
              src="/src/assets/images/offer_poster_1791950725216.jpg"
              alt="Special Offer Poster"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        {/* How It Works Section: 3 Easy Steps */}
        <section className="mt-2 p-6 sm:p-8 md:p-10 rounded-3xl bg-[#f2f3ff] shadow-sm border border-[#bdc9c5]/30">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#00685d] bg-[#8ff4e3]/50 px-3.5 py-1 rounded-full">
              ঝামেলাহীন অর্ডার প্রসেস
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] mt-3">
              কীভাবে ৩টি সহজ ধাপে অর্ডার করবেন
            </h2>
            <p className="text-xs sm:text-sm text-[#3d4946] mt-1">
              কার্ট বা অনলাইন পেমেন্টের ঝামেলা ছাড়াই ঘরে বসে পণ্য বুঝে নিন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/20 group hover:border-[#00685d]/40 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#008376] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">touch_app</span>
              </div>
              <span className="text-xs font-bold text-[#006d2f] mb-1">ধাপ ০১</span>
              <h3 className="text-base font-bold text-[#131b2e] mb-1">১. প্রোডাক্ট পছন্দ করুন</h3>
              <p className="text-xs text-[#3d4946] leading-relaxed">
                আমাদের ক্যাটালগ থেকে আপনার পছন্দসই পণ্য, সাইজ বা কালার ভ্যারিয়েন্ট নির্বাচন করুন।
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/20 group hover:border-[#00685d]/40 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#006d2f] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.77.82 2.781.82h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.77-5.769-5.77zm7.592 5.766c0 4.19-3.407 7.598-7.592 7.598-1.282 0-2.493-.321-3.561-.884l-3.957 1.038 1.056-3.864c-.663-1.127-1.042-2.441-1.042-3.888 0-4.19 3.408-7.598 7.504-7.598 4.185 0 7.592 3.408 7.592 7.598z"></path>
                </svg>
              </div>
              <span className="text-xs font-bold text-[#006d2f] mb-1">ধাপ ০২</span>
              <h3 className="text-base font-bold text-[#131b2e] mb-1">২. হোয়াটসঅ্যাপ বাটনে ক্লিক করুন</h3>
              <p className="text-xs text-[#3d4946] leading-relaxed">
                &apos;WhatsApp-এ অর্ডার করুন&apos; বাটনে ক্লিক করলেই স্বয়ংক্রিয়ভাবে প্রোডাক্টের বিবরণসহ সরাসরি চ্যাট শুরু হবে।
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-[#bdc9c5]/20 group hover:border-[#00685d]/40 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#008376] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">home_pin</span>
              </div>
              <span className="text-xs font-bold text-[#006d2f] mb-1">ধাপ ০৩</span>
              <h3 className="text-base font-bold text-[#131b2e] mb-1">৩. ঠিকানা দিয়ে কনফার্ম করুন</h3>
              <p className="text-xs text-[#3d4946] leading-relaxed">
                চ্যাটে আপনার ডেলিভারি ঠিকানা ও ফোন নম্বর প্রদান করুন। আমাদের প্রতিনিধি অর্ডার নিশ্চিত করবেন।
              </p>
            </div>
          </div>

          {/* Trust Assurance Banner */}
          <div className="mt-8 p-5 rounded-2xl bg-[#eaedff] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#bdc9c5]/30">
            <div className="flex items-center gap-3.5 text-left">
              <span className="material-symbols-outlined text-3xl text-[#006d2f]">verified</span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#131b2e]">ক্যাশ অন ডেলিভারি সুরক্ষা</h4>
                <p className="text-xs text-[#3d4946]">ডেলিভারিম্যানের সামনে পণ্য চেক করে মূল্য পরিশোধ করার ১০০% নিশ্চয়তা।</p>
              </div>
            </div>
            <a
              className="px-5 py-2.5 rounded-xl bg-white text-[#006d2f] hover:bg-[#faf8ff] text-xs font-bold flex items-center gap-2 shadow-xs transition-colors whitespace-nowrap border border-[#bdc9c5]/30"
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>হোয়াটসঅ্যাপ প্রতিনিধি দেখুন</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </section>
      </div>

      {/* Mobile Floating Sticky Quick Order Bar */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
        <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-[#bdc9c5]/30 flex items-center justify-between gap-3">
          <div className="flex flex-col pl-1">
            <span className="text-[10px] text-[#3d4946]">সরাসরি কথা বলুন</span>
            <span className="text-xs font-bold text-[#006d2f]">{settings.whatsappNumber}</span>
          </div>
          <a
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#006d2f] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `আমি ${settings.brandName} থেকে একটি অর্ডার কনফার্ম করতে চাই`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.77.82 2.781.82h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.77-5.769-5.77zm7.592 5.766c0 4.19-3.407 7.598-7.592 7.598-1.282 0-2.493-.321-3.561-.884l-3.957 1.038 1.056-3.864c-.663-1.127-1.042-2.441-1.042-3.888 0-4.19 3.408-7.598 7.504-7.598 4.185 0 7.592 3.408 7.592 7.598z"></path>
            </svg>
            <span>হোয়াটসঅ্যাপে অর্ডার</span>
          </a>
        </div>
      </div>
    </div>
  );
};
