import React, { useState } from 'react';
import { Product, AppSettings, ActiveScreen, CategoryId, ProductTag } from '../types';
import { toBnNum } from '../data/mockData';

interface AdminProductViewProps {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  onSaveProduct: (p: Product) => void;
  onNavigate: (screen: ActiveScreen) => void;
  existingProduct?: Product;
}

export const AdminProductView: React.FC<AdminProductViewProps> = ({
  settings,
  onUpdateSettings,
  onSaveProduct,
  onNavigate,
  existingProduct,
}) => {
  // Form State
  const [nameBn, setNameBn] = useState(existingProduct?.nameBn || 'প্রিমিয়াম মেনস পোলো টি-শার্ট');
  const [nameEn, setNameEn] = useState(existingProduct?.nameEn || "Premium Men's Polo T-Shirt");
  const [category, setCategory] = useState<CategoryId>(existingProduct?.category || 'fashion');
  const [tag, setTag] = useState<ProductTag>(existingProduct?.tag || 'hot');
  const [regularPrice, setRegularPrice] = useState<number>(existingProduct?.regularPrice || 1850);
  const [discountPrice, setDiscountPrice] = useState<number>(existingProduct?.discountPrice || 1450);
  const [stockQty, setStockQty] = useState<number>(existingProduct?.stockQty || 50);
  const [lowStockAlert, setLowStockAlert] = useState<number>(existingProduct?.lowStockThreshold || 5);
  const [waNumber, setWaNumber] = useState<string>(settings.whatsappNumber);
  const [waTemplate, setWaTemplate] = useState<string>(
    settings.whatsappMessageTemplate ||
      'হাই, আমি আপনার ওয়েবসাইট থেকে [Product_Name] (দাম: ৳[Price]) কিনতে আগ্রহী। বিস্তারিত ও ডেলিভারি তথ্য জানান।'
  );

  // Gallery state
  const [images, setImages] = useState<string[]>(
    existingProduct?.images && existingProduct.images.length > 0
      ? existingProduct.images
      : [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDkJaYMHvCEUJCG0FbZmNQK2LsOf84XlxnTyaDWaSG_u9ay9lXQFY0IEicM81k_IEMd9O_xnvrpEjuhNouhdrrkF22xaXPbyChj7EF0iEew45VddsaQvnPmPhI63ABquOI1eJeCCOhEjAZnqrrzfsYXsmq-Gw9Mm5kOZCe00T4GTOFuiz03u00G5QlOhRYVlGS-nLZRIsHUDhcd2T0eYuUCFzXxyo4DL85G2u8lickMwIqCsBBTRMuo',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC5VgmFANST8-m9Qpp5oJ0-9s-gvzf32hK4gizSf6mmocKEb-9Ayr_7fLlsFRHhsCOK_2Ad3AGVexFAaVWoHjOemOjw73HeeYCPIISfCTvixyWThTuF2D-_qr8Bmnd390oSq-VX7-ectfpEskMM5Te4hXLMHROjMEMMO8YnIuDQuyo_LctXqF5Wr-6R9H73_p4fsEExxW6g71qRL1smH3-kA8wXdGozMpw9izawMJDC4kD5X9aEbplD',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBTumU3ess7rgj9AGcb6863V0gXGgTh9q6ET-rTZ3Mk-lKR7E1pJOWZGoQAJkxfKF65KozOzgqSwcpWECaClCuH3CJWUSU2Jtd2ZfcMhvQE9v_HrJcR7W4Na4gPfFuVeAoPMG9AEJg_K3H8Bl4nCkZb3X6fDfFRMgsTW_cbIXL_WLM-aE2zSR3RSQYD8EgKHvUY5wyQOpxkxW3bplcHWFcZRAIpZo8YxGS8xQGUQNNJ3_aE-utxc3AJ',
        ]
  );

  const [coverIndex, setCoverIndex] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Discount calculation
  const discountPercent =
    regularPrice > 0 && discountPrice > 0 && discountPrice < regularPrice
      ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
      : 0;

  const savingsAmount = Math.max(0, regularPrice - discountPrice);

  // Live Chat Preview message
  const chatPreviewText = waTemplate
    .replace(/\[Product_Name\]/g, nameBn || 'প্রোডাক্ট')
    .replace(/\[Price\]/g, toBnNum(discountPrice || regularPrice || 0));

  const handleSetCover = (index: number) => {
    setCoverIndex(index);
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) return;
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    if (coverIndex >= next.length) {
      setCoverIndex(0);
    }
  };

  const handleAddSampleImage = () => {
    if (images.length >= 5) return;
    const additional =
      'https://lh3.googleusercontent.com/aida-public/AB6AXuANQy3u9TzzdlaIq5pdyxomvoDt-NUVnhWW-a0kKGy3eWCYONH_BAvmgovZtvXRUBw3nDL_o43uVJ2WsDALaz_-Y_-WxqMLOVFfuEgzR68OixB9h3lzsPYcM5rChICS1cTk5GOjQLI20xBNs6LeN2Xs5FmxdBsuKeXx3SwwJa7gw-GEDKNK523AP69oXif3ISZoswNfwu3MyVJVtQcg2tMidFvo-zbPSHJyLjamOhy7ozcJhagZwPDx';
    setImages([...images, additional]);
  };

  const handleSaveAndPublish = () => {
    const categoryLabels: Record<CategoryId, string> = {
      all: 'সকল প্রোডাক্ট',
      fashion: 'ফ্যাশন ও ক্লথিং',
      electronics: 'ইলেকট্রনিক্স ও গ্যাজেট',
      home: 'হোম অ্যান্ড লিভিং',
      watches: 'ঘড়ি ও অ্যাক্সেসরিজ',
      gifts: 'গ্রোসারি ও গিফট',
    };

    const tagLabels: Record<ProductTag, string> = {
      hot: 'হট ডিল (Hot Deal)',
      bestseller: 'বেস্ট সেলার (Bestseller)',
      new: 'নতুন আগমন (New Arrival)',
      organic: 'অর্গানিক',
      none: '',
    };

    // Reorder so cover is first
    const orderedImages = [...images];
    if (coverIndex > 0 && coverIndex < orderedImages.length) {
      const cover = orderedImages.splice(coverIndex, 1)[0];
      orderedImages.unshift(cover);
    }

    const newProd: Product = {
      id: existingProduct?.id || `prd-${Date.now()}`,
      nameBn,
      nameEn,
      sku: existingProduct?.sku || `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      categoryLabelBn: categoryLabels[category] || 'পণ্য',
      tag,
      tagLabelBn: tagLabels[tag],
      regularPrice: Number(regularPrice) || 0,
      discountPrice: Number(discountPrice) || Number(regularPrice) || 0,
      rating: existingProduct?.rating || 4.9,
      reviewCount: existingProduct?.reviewCount || 1,
      ordersCount: existingProduct?.ordersCount || 0,
      stockQty: Number(stockQty) || 10,
      lowStockThreshold: Number(lowStockAlert) || 5,
      inStock: stockQty > 0,
      images: orderedImages,
      slug: nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-product',
      features: existingProduct?.features || [
        { icon: 'checkroom', title: '১০০% কম্বড কটন', subtitle: '২২০ GSM নিখুঁত ফিনিশ' },
        { icon: 'palette', title: 'কালার গ্যারান্টি', subtitle: 'প্রি-ওয়াশড ফ্যাব্রিক' },
        { icon: 'dry_cleaning', title: 'মাদার অফ পার্ল', subtitle: 'অরিজিনাল প্রিমিয়াম বোতাম' },
        { icon: 'verified', title: 'ডাবল স্টিচ', subtitle: 'দীর্ঘস্থায়ী নিখুঁত সেলাই' },
      ],
      specs: existingProduct?.specs || [
        { label: 'ম্যাটেরিয়াল', value: '100% Combed Cotton' },
        { label: 'ফিটিং টাইপ', value: 'Regular Smart Fit' },
      ],
      sizeTable: [
        { size: 'Medium (M)', chest: '৩৮-৪০"', length: '২৭"', status: 'স্টকে আছে' },
        { size: 'Large (L)', chest: '৪২-৪৪"', length: '২৮"', status: 'স্টকে আছে' },
        { size: 'X-Large (XL)', chest: '৪৬-৪৮"', length: '২৯"', status: 'সীমিত স্টক' },
      ],
    };

    onSaveProduct(newProd);

    // Save WhatsApp number and template to settings
    onUpdateSettings({
      ...settings,
      whatsappNumber: waNumber,
      whatsappMessageTemplate: waTemplate,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onNavigate('storefront');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#f2f3ff] z-50 flex flex-col pt-4 pb-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#bdc9c5]/30">
        <div className="flex items-center gap-2 px-5 mb-8">
          <img
            alt="Shoponshop Brand Logo"
            className="h-8 w-auto object-contain rounded"
            src="/src/assets/images/shoponshop_logo_1791951277410.jpg"
          />
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#0b2447]">
              Shop<span className="text-[#f97316]">on</span>shop
            </span>
            <span className="text-[10px] text-[#3d4946]">অ্যাডমিন ড্যাশবোর্ড</span>
          </div>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-1.5">
          <button
            onClick={() => onNavigate('admin_orders')}
            className="flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-lg text-[#00685d]">shopping_bag</span>
            অর্ডার তালিকা
          </button>

          <button
            onClick={() => onNavigate('admin_product')}
            className="flex items-center px-4 py-2.5 rounded-xl text-xs font-bold bg-[#008376] text-white shadow-xs w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-lg">inventory_2</span>
            পণ্য ব্যবস্থাপনা
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('whatsapp-config-card');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-lg text-[#006d2f]">send_and_archive</span>
            হোয়াটসঅ্যাপ ইন্টিগ্রেশন
          </button>

          <button
            onClick={() => onNavigate('showcase')}
            className="flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-lg text-[#00685d]">devices</span>
            সিস্টেম আর্কিটেকচার
          </button>

          <button
            onClick={() => onNavigate('storefront')}
            className="flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-[#00685d] bg-white border border-[#bdc9c5]/30 hover:bg-[#faf8ff] transition-colors mt-auto w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-lg">storefront</span>
            স্টোরফ্রন্টে ফিরুন
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-xs z-40 flex items-center justify-between px-6 border-b border-[#bdc9c5]/30">
          <div className="flex items-center gap-2 text-xs text-[#3d4946] font-semibold">
            <span className="material-symbols-outlined text-base text-[#00685d]">verified_user</span>
            <span>অ্যাডমিন ম্যানেজমেন্ট পোর্টাল</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#5dfd8a]/20 text-[#007232] text-xs font-semibold border border-[#007232]/10">
              <span className="inline-block w-2 h-2 rounded-full bg-[#006d2f] animate-pulse"></span>
              <span>লাইভ অর্ডার সিঙ্ক</span>
            </div>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#8ff4e3] shadow-xs cursor-pointer hover:scale-105 transition-transform"
              src="/src/assets/images/offer_poster_1791950725216.jpg"
              onClick={() => onNavigate('showcase')}
            />
          </div>
        </header>

        {/* Content Body */}
        <main className="pt-20 px-6 py-6 pb-28 max-w-7xl w-full">
          {/* Top Breadcrumb & Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <nav className="flex items-center gap-2 text-xs text-[#3d4946]">
              <span className="hover:text-[#00685d] cursor-pointer" onClick={() => onNavigate('storefront')}>
                ড্যাশবোর্ড
              </span>
              <span className="material-symbols-outlined text-xs opacity-60">chevron_right</span>
              <span className="hover:text-[#00685d] cursor-pointer">প্রোডাক্ট ম্যানেজমেন্ট</span>
              <span className="material-symbols-outlined text-xs opacity-60">chevron_right</span>
              <span className="text-[#00685d] font-bold">নতুন প্রোডাক্ট যোগ করুন</span>
            </nav>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#3d4946] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#006d2f]"></span>
              <span>অটো-সেভ সক্রিয় (ড্রাফট ID: #PRD-9482)</span>
            </div>
          </div>

          {/* Primary Header & Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e]">নতুন প্রোডাক্টের তথ্য দিন</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#5dfd8a]/40 text-[#007232] text-xs font-bold">
                  নতুন ড্রাফট
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3d4946] mt-1">
                প্রোডাক্টের বিবরণ, গ্যালারি ও হোয়াটসঅ্যাপ অর্ডার কনফিগারেশন এক ক্লিকে সেটআপ করুন।
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                className="px-4 py-2.5 rounded-xl bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd] transition-colors flex items-center gap-2 text-xs font-bold shadow-xs border border-[#bdc9c5]/30"
                type="button"
                onClick={handleSaveAndPublish}
              >
                <span className="material-symbols-outlined text-lg">save</span>
                <span>ড্রাফট হিসেবে সংরক্ষণ</span>
              </button>
              <button
                className="px-5 py-2.5 rounded-xl bg-[#00685d] text-white hover:bg-[#008376] transition-all flex items-center gap-2 text-xs font-bold shadow-md hover:shadow-lg active:scale-95"
                type="button"
                onClick={handleSaveAndPublish}
              >
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
                <span>প্রোডাক্ট পাবলিশ করুন</span>
              </button>
            </div>
          </div>

          {/* Form Grid Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* LEFT MAIN COLUMN: Basic Info, Rich Editor, Image Gallery (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Basic Product Information Card */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#bdc9c5]/30">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#bdc9c5]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685d] text-xl">edit_note</span>
                    <h2 className="text-base font-bold text-[#131b2e]">মৌলিক তথ্য (Basic Info)</h2>
                  </div>
                  <span className="text-xs text-[#994100] font-semibold">* চিহ্নিত তথ্য আবশ্যক</span>
                </div>

                <div className="space-y-4">
                  {/* Bengali Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="prod-name-bn">
                      প্রোডাক্টের নাম (বাংলায়) <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-11 px-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30"
                        id="prod-name-bn"
                        placeholder="যেমন: প্রিমিয়াম মেনস পোলো টি-শার্ট"
                        type="text"
                        value={nameBn}
                        onChange={(e) => setNameBn(e.target.value)}
                      />
                      <span className="absolute right-3 top-3.5 text-[#6d7a77] text-xs font-mono">BN</span>
                    </div>
                  </div>

                  {/* English Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="prod-name-en">
                      প্রোডাক্টের নাম (ইংরেজিতে)
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-11 px-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30"
                        id="prod-name-en"
                        placeholder="e.g. Premium Breathable Pique Polo"
                        type="text"
                        value={nameEn}
                        onChange={(e) => setNameEn(e.target.value)}
                      />
                      <span className="absolute right-3 top-3.5 text-[#6d7a77] text-xs font-mono">EN</span>
                    </div>
                  </div>

                  {/* Category and Subcategory Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="prod-category">
                        ক্যাটাগরি <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-11 px-4 pr-10 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs sm:text-sm appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30 cursor-pointer font-semibold"
                          id="prod-category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value as CategoryId)}
                        >
                          <option value="fashion">ফ্যাশন ও ক্লথিং</option>
                          <option value="electronics">গ্যাজেট ও এক্সেসরিজ</option>
                          <option value="home">লাইফস্টাইল ও হোম</option>
                          <option value="watches">ঘড়ি ও অ্যাক্সেসরিজ</option>
                          <option value="gifts">গিফট ও গ্রোসারি</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-3 text-[#3d4946] pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="prod-tag">
                        প্রোডাক্ট ব্যাজ / ট্যাগ
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-11 px-4 pr-10 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs sm:text-sm appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30 cursor-pointer font-semibold"
                          id="prod-tag"
                          value={tag}
                          onChange={(e) => setTag(e.target.value as ProductTag)}
                        >
                          <option value="hot">হট ডিল (Hot Deal)</option>
                          <option value="bestseller">বেস্ট সেলার (Bestseller)</option>
                          <option value="new">নতুন আগমন (New Arrival)</option>
                          <option value="organic">অর্গানিক (Organic)</option>
                          <option value="none">কোনো ট্যাগ নেই</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-3 text-[#3d4946] pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Rich Description Section */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#bdc9c5]/30">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#bdc9c5]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685d] text-xl">description</span>
                    <h2 className="text-base font-bold text-[#131b2e]">বিস্তারিত বিবরণ ও স্পেসিফিকেশন</h2>
                  </div>
                  <span className="text-xs text-[#3d4946]">HTML সমর্থিত</span>
                </div>

                {/* Mini Rich Text Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-1.5 rounded-t-xl bg-[#f2f3ff] border border-b-0 border-[#bdc9c5]/30">
                  <button className="p-1.5 rounded hover:bg-[#e2e7ff] text-[#131b2e]" title="Bold" type="button">
                    <span className="material-symbols-outlined text-base">format_bold</span>
                  </button>
                  <button className="p-1.5 rounded hover:bg-[#e2e7ff] text-[#131b2e]" title="Italic" type="button">
                    <span className="material-symbols-outlined text-base">format_italic</span>
                  </button>
                  <button className="p-1.5 rounded hover:bg-[#e2e7ff] text-[#131b2e]" title="Underline" type="button">
                    <span className="material-symbols-outlined text-base">format_underlined</span>
                  </button>
                  <span className="w-[1px] h-4 bg-[#bdc9c5] mx-1"></span>
                  <button className="p-1.5 rounded hover:bg-[#e2e7ff] text-[#131b2e]" title="Bullet List" type="button">
                    <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                  </button>
                  <button className="p-1.5 rounded hover:bg-[#e2e7ff] text-[#131b2e]" title="Numbered List" type="button">
                    <span className="material-symbols-outlined text-base">format_list_numbered</span>
                  </button>
                  <span className="w-[1px] h-4 bg-[#bdc9c5] mx-1"></span>
                  <button className="p-1.5 rounded hover:bg-[#e2e7ff] text-[#131b2e]" title="Insert Table" type="button">
                    <span className="material-symbols-outlined text-base">table_chart</span>
                  </button>
                  <button className="p-1.5 rounded hover:bg-[#e2e7ff] text-[#131b2e]" title="Link" type="button">
                    <span className="material-symbols-outlined text-base">link</span>
                  </button>
                </div>

                {/* Visual Editor Area */}
                <div
                  className="p-4 rounded-b-xl bg-[#faf8ff] text-[#131b2e] min-h-[160px] focus:outline-none text-xs sm:text-sm leading-relaxed border border-[#bdc9c5]/30"
                  contentEditable
                  suppressContentEditableWarning
                >
                  <p className="font-bold mb-2">বৈশিষ্ট্যসমূহ:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-3 text-[#3d4946]">
                    <li>১০০% কম্বড সুতি (Combed Cotton, 220 GSM) কাপড়ে তৈরি।</li>
                    <li>কালার গ্যারান্টিযুক্ত প্রি-ওয়াশড ফ্যাব্রিক, কুঁচকে যায় না।</li>
                    <li>অরিজিনাল মাদার অফ পার্ল বোতাম এবং ডাবল স্টিচ কলার।</li>
                  </ul>
                  <p className="text-[#3d4946]">অফিসিয়াল ও ক্যাজুয়াল উভয় পরিবেশেই আরামদায়ক ব্যবহারের জন্য ডিজাইনকৃত।</p>
                </div>

                {/* Specifications Table Snippet */}
                <div className="mt-5">
                  <label className="block text-xs font-bold text-[#131b2e] mb-2">
                    সাইজ ও পরিমাপ টেবিল (Quick Specifications)
                  </label>
                  <div className="overflow-x-auto rounded-xl bg-[#f2f3ff] p-2 border border-[#bdc9c5]/25">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-[#3d4946] uppercase font-bold text-[11px]">
                          <th className="p-2">সাইজ</th>
                          <th className="p-2">বুকের মাপ (ইঞ্চি)</th>
                          <th className="p-2">লম্বা (ইঞ্চি)</th>
                          <th className="p-2 text-right">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#131b2e]">
                        <tr className="bg-white/80 rounded border-b border-[#bdc9c5]/20">
                          <td className="p-2 font-bold">Medium (M)</td>
                          <td className="p-2">৩৮-৪০&quot;</td>
                          <td className="p-2">২৭&quot;</td>
                          <td className="p-2 text-right text-[#006d2f] font-bold">স্টকে আছে</td>
                        </tr>
                        <tr className="border-b border-[#bdc9c5]/20">
                          <td className="p-2 font-bold">Large (L)</td>
                          <td className="p-2">৪২-৪৪&quot;</td>
                          <td className="p-2">২৮&quot;</td>
                          <td className="p-2 text-right text-[#006d2f] font-bold">স্টকে আছে</td>
                        </tr>
                        <tr className="bg-white/80 rounded">
                          <td className="p-2 font-bold">X-Large (XL)</td>
                          <td className="p-2">৪৬-৪৮&quot;</td>
                          <td className="p-2">২৯&quot;</td>
                          <td className="p-2 text-right text-[#994100] font-bold">সীমিত স্টক</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Product Media & Dropzone Gallery */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#bdc9c5]/30">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#bdc9c5]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685d] text-xl">photo_library</span>
                    <h2 className="text-base font-bold text-[#131b2e]">ছবি আপলোড গ্যালারি</h2>
                  </div>
                  <span className="text-xs text-[#3d4946]">সর্বোচ্চ ৫টি ছবি যুক্ত করুন</span>
                </div>

                {/* Drag & Drop Zone */}
                <div
                  className="p-6 rounded-2xl bg-[#f2f3ff] hover:bg-[#e2e7ff] transition-colors flex flex-col items-center justify-center text-center cursor-pointer mb-5 border-2 border-dashed border-[#00685d]/30 group"
                  onClick={handleAddSampleImage}
                >
                  <div className="w-14 h-14 rounded-full bg-[#8ff4e3] flex items-center justify-center text-[#00201c] mb-2 group-hover:scale-110 transition-transform shadow-xs">
                    <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                  </div>
                  <p className="text-sm font-bold text-[#131b2e] mb-1">
                    ছবিগুলো টেনে এনে ড্রপ করুন অথবা ব্রাউজ করুন
                  </p>
                  <p className="text-xs text-[#3d4946]">
                    প্রতিটি ছবির সর্বোচ্চ সাইজ ৫ মেগাবাইট (প্রস্তাবিত মাপ: ১২০০ x ১২০০ পিক্সেল)
                  </p>
                  <button
                    className="mt-3 px-4 py-1.5 rounded-lg bg-white text-[#00685d] text-xs font-bold shadow-xs hover:bg-[#faf8ff] border border-[#bdc9c5]/30"
                    type="button"
                  >
                    ফাইল বাছাই করুন
                  </button>
                </div>

                {/* Image Gallery Previews Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={`relative group rounded-xl overflow-hidden aspect-square bg-[#eaedff] shadow-sm border ${
                        coverIndex === i ? 'ring-2 ring-[#00685d] border-[#00685d]' : 'border-[#bdc9c5]/30'
                      }`}
                    >
                      <img className="w-full h-full object-cover" src={img} alt={`Product ${i + 1}`} />

                      {coverIndex === i ? (
                        <div className="absolute top-2 left-2 bg-[#00685d] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">star</span> কভার ছবি
                        </div>
                      ) : null}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        {coverIndex !== i && (
                          <button
                            className="px-2 py-1 rounded bg-white text-[#131b2e] text-[11px] font-bold hover:bg-[#e2e7ff] transition-colors"
                            type="button"
                            onClick={() => handleSetCover(i)}
                          >
                            কভার করুন
                          </button>
                        )}
                        <button
                          className="p-1.5 rounded-full bg-white text-[#ba1a1a] hover:scale-110 transition-transform shadow-md"
                          title="মুছে ফেলুন"
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Empty Slot if < 5 */}
                  {images.length < 5 && (
                    <div
                      className="rounded-xl aspect-square bg-[#f2f3ff] border border-dashed border-[#bdc9c5] flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-[#e2e7ff] transition-colors"
                      onClick={handleAddSampleImage}
                    >
                      <span className="material-symbols-outlined text-[#3d4946] text-2xl mb-1">
                        add_photo_alternate
                      </span>
                      <span className="text-xs font-bold text-[#3d4946]">+ ছবি যোগ</span>
                      <span className="text-[10px] text-[#6d7a77]">বাকি {5 - images.length} টি</span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT SIDEBAR COLUMN: Pricing, Inventory, WhatsApp Integration (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Pricing & Discount Card */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#bdc9c5]/30">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#bdc9c5]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685d] text-xl">payments</span>
                    <h2 className="text-base font-bold text-[#131b2e]">মূল্য নির্ধারণ (Pricing)</h2>
                  </div>

                  {discountPercent > 0 && (
                    <div className="px-3 py-1 rounded-full bg-[#ffdbca] text-[#783200] text-xs flex items-center gap-1 font-bold shadow-xs">
                      <span className="material-symbols-outlined text-xs">local_fire_department</span>
                      <span>{discountPercent}% ছাড় প্রযোজ্য</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Regular Price */}
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="reg-price">
                      মূল বিক্রয়মূল্য (Regular Price) <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 font-bold text-[#3d4946]">৳</span>
                      <input
                        className="w-full h-11 pl-9 pr-12 rounded-xl bg-[#f2f3ff] text-[#131b2e] font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30"
                        id="reg-price"
                        type="number"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(Number(e.target.value))}
                      />
                      <span className="absolute right-3.5 top-3 text-xs text-[#6d7a77] font-mono">BDT</span>
                    </div>
                  </div>

                  {/* Discount Price */}
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="disc-price">
                      অফার বা বিশেষ ছাড়ের মূল্য (Discount Price)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 font-bold text-[#006d2f]">৳</span>
                      <input
                        className="w-full h-11 pl-9 pr-12 rounded-xl bg-[#f2f3ff] text-[#006d2f] font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30"
                        id="disc-price"
                        type="number"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(Number(e.target.value))}
                      />
                      <span className="absolute right-3.5 top-3 text-xs text-[#6d7a77] font-mono">BDT</span>
                    </div>
                    {savingsAmount > 0 && (
                      <p className="text-xs text-[#3d4946] mt-2 flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-sm text-[#006d2f]">check_circle</span>
                        ক্রেতা সঞ্চয় করবেন:{' '}
                        <span className="font-bold text-[#131b2e]">৳{toBnNum(savingsAmount)}</span>
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Inventory & Stock Management */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#bdc9c5]/30">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#bdc9c5]/20">
                  <span className="material-symbols-outlined text-[#00685d] text-xl">inventory</span>
                  <h2 className="text-base font-bold text-[#131b2e]">ইনভেন্টরি ও স্টক অ্যালার্ট</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="stock-qty">
                      স্টক পরিমাণ (Qty)
                    </label>
                    <input
                      className="w-full h-11 px-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30"
                      id="stock-qty"
                      type="number"
                      value={stockQty}
                      onChange={(e) => setStockQty(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="stock-alert">
                      লো-স্টক সতর্কবার্তা
                    </label>
                    <input
                      className="w-full h-11 px-4 rounded-xl bg-[#f2f3ff] text-[#994100] font-bold text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30"
                      id="stock-alert"
                      type="number"
                      value={lowStockAlert}
                      onChange={(e) => setLowStockAlert(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-[#eaedff] flex items-center gap-2.5 text-xs text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#00685d] text-lg">check_circle</span>
                  <span>স্টক শুন্য হলে স্বয়ংক্রিয়ভাবে &quot;আউট অফ স্টক&quot; লেবেল প্রদর্শিত হবে।</span>
                </div>
              </section>

              {/* WhatsApp Order Settings & Live Preview */}
              <section id="whatsapp-config-card" className="bg-white rounded-2xl p-6 shadow-sm border border-[#bdc9c5]/30">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#bdc9c5]/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685d] text-xl">chat</span>
                    <h2 className="text-base font-bold text-[#131b2e]">হোয়াটসঅ্যাপ অর্ডার কনফিগারেশন</h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#5dfd8a]/40 text-[#007232] text-xs font-bold">
                    1-Click Order
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Target Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5" htmlFor="wa-number">
                      টার্গেট হোয়াটসঅ্যাপ বিজনেস নম্বর <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 material-symbols-outlined text-[#6d7a77] text-lg">
                        call
                      </span>
                      <input
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] font-bold text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30 font-mono"
                        id="wa-number"
                        type="text"
                        value={waNumber}
                        onChange={(e) => setWaNumber(e.target.value)}
                      />
                    </div>
                    <p className="text-[11px] text-[#6d7a77] mt-1">কান্ট্রি কোড সহ ইনপুট দিন (+৮৮০)</p>
                  </div>

                  {/* WhatsApp Custom Message Template */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#131b2e]" htmlFor="wa-msg-template">
                        কাস্টম মেসেজ টেমপ্লেট
                      </label>
                      <button
                        type="button"
                        onClick={() => setWaTemplate((prev) => prev + ' [Product_Name]')}
                        className="text-xs font-bold text-[#00685d] hover:underline"
                      >
                        + নাম ট্যাগ
                      </button>
                    </div>
                    <textarea
                      className="w-full p-3 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs leading-relaxed resize-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00685d] transition-all border border-[#bdc9c5]/30 font-mono"
                      id="wa-msg-template"
                      rows={3}
                      value={waTemplate}
                      onChange={(e) => setWaTemplate(e.target.value)}
                    ></textarea>
                    <p className="text-[11px] text-[#6d7a77] mt-1">
                      প্যারামিটার সাপোর্ট:{' '}
                      <code className="bg-[#eaedff] px-1 rounded text-[#131b2e] font-mono">[Product_Name]</code>,{' '}
                      <code className="bg-[#eaedff] px-1 rounded text-[#131b2e] font-mono">[Price]</code>
                    </p>
                  </div>

                  {/* WhatsApp Live Chat Bubble Preview */}
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3d4946] mb-2">
                      ক্রেতার হোয়াটসঅ্যাপ চ্যাট প্রিভিউ:
                    </span>
                    <div className="p-4 rounded-2xl bg-[#e5ddd5]/40 relative overflow-hidden shadow-inner border border-[#bdc9c5]/30">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#006d2f]"></span>
                        <span className="text-xs font-bold text-[#3d4946]">{settings.brandName} সাপোর্ট ডায়ালগ</span>
                      </div>

                      {/* WhatsApp Message Bubble Mockup */}
                      <div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[92%] ml-auto relative border border-[#bdc9c5]/20">
                        <p className="text-xs text-[#131b2e] leading-relaxed">
                          {chatPreviewText}
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#6d7a77]">
                          <span>১০:৪২ AM</span>
                          <span className="material-symbols-outlined text-sm text-[#00685d]">done_all</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sticky Bottom Global Action Footer */}
          <div className="sticky bottom-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#bdc9c5]/30 flex flex-col sm:flex-row items-center justify-between gap-4 z-30">
            <div className="flex items-center gap-2 text-[#3d4946] text-xs sm:text-sm font-semibold">
              <span className="material-symbols-outlined text-[#006d2f] text-lg">check_circle</span>
              <span>
                {saveSuccess
                  ? 'সফলভাবে সংরক্ষিত এবং স্টোরফ্রন্টে পাবলিশ হয়েছে!'
                  : 'সবগুলো আবশ্যিক ফিল্ড পূর্ণ করা হয়েছে। পাবলিশ করার জন্য প্রস্তুত।'}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#e2e7ff] text-[#131b2e] text-xs font-bold hover:bg-[#dae2fd] transition-colors"
                type="button"
                onClick={() => onNavigate('storefront')}
              >
                বাতিল করুন
              </button>
              <button
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00685d] text-white text-xs font-bold hover:bg-[#008376] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                type="button"
                onClick={handleSaveAndPublish}
              >
                <span className="material-symbols-outlined text-lg">verified</span>
                <span>{saveSuccess ? 'পাবলিশ সম্পন্ন!' : 'সংরক্ষণ ও পাবলিশ করুন'}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
