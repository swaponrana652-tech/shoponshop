import React, { useState } from 'react';
import { Order, OrderStatus, ActiveScreen } from '../types';
import { toBnNum, formatPriceBn } from '../data/mockData';

interface AdminOrdersViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const AdminOrdersView: React.FC<AdminOrdersViewProps> = ({
  orders,
  onUpdateOrderStatus,
  onNavigate,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        o.productName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#ffdad6] text-[#ba1a1a]">নতুন অর্ডার</span>;
      case 'whatsapp_confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#5dfd8a]/40 text-[#007232]">হোয়াটসঅ্যাপ কনফার্মড</span>;
      case 'packaging':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#ffdbca] text-[#783200]">প্যাকেজিং চলছে</span>;
      case 'dispatched':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#eaedff] text-[#00685d]">ডেলিভারিতে আছে</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#66ff8e]/30 text-[#006d2f]">ডেলিভারি সম্পন্ন</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-700">বাতিল</span>;
    }
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
            className="flex items-center px-4 py-2.5 rounded-xl text-xs font-bold bg-[#008376] text-white shadow-xs w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-lg">shopping_bag</span>
            অর্ডার তালিকা
          </button>

          <button
            onClick={() => onNavigate('admin_product')}
            className="flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold text-[#3d4946] hover:bg-[#e2e7ff] hover:text-[#131b2e] transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined mr-3 text-lg text-[#00685d]">inventory_2</span>
            পণ্য ব্যবস্থাপনা
          </button>

          <button
            onClick={() => onNavigate('admin_product')}
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
        <header className="fixed top-0 left-64 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-xs z-40 flex items-center justify-between px-6 border-b border-[#bdc9c5]/30">
          <div className="flex items-center gap-2 text-xs text-[#3d4946] font-semibold">
            <span className="material-symbols-outlined text-base text-[#00685d]">verified_user</span>
            <span>অ্যাডমিন ম্যানেজমেন্ট পোর্টাল • লাইভ অর্ডার লিস্ট</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#5dfd8a]/20 text-[#007232] text-xs font-semibold border border-[#007232]/10">
              <span className="inline-block w-2 h-2 rounded-full bg-[#006d2f] animate-pulse"></span>
              <span>মোট {toBnNum(orders.length)}টি অর্ডার</span>
            </div>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#8ff4e3] shadow-xs cursor-pointer hover:scale-105 transition-transform"
              src="/src/assets/images/offer_poster_1791950725216.jpg"
              onClick={() => onNavigate('showcase')}
            />
          </div>
        </header>

        <main className="pt-20 px-6 py-6 pb-20 max-w-7xl w-full">
          {/* Header & Stats Cards */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e]">অর্ডার তালিকা ও ট্র্যাকিং</h1>
              <p className="text-xs sm:text-sm text-[#3d4946] mt-1">
                গ্রাহকের হোয়াটসঅ্যাপ অর্ডার পর্যবেক্ষণ, স্ট্যাটাস পরিবর্তন ও কুরিয়ার হ্যান্ডওভার ম্যানেজ করুন।
              </p>
            </div>
            <button
              onClick={() => onNavigate('admin_product')}
              className="px-4 py-2.5 rounded-xl bg-[#00685d] text-white text-xs font-bold hover:bg-[#008376] flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>নতুন প্রোডাক্ট যোগ করুন</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="text-xs text-[#3d4946] font-medium">নতুন অর্ডার</span>
              <p className="text-2xl font-bold text-[#ba1a1a] mt-1">
                {toBnNum(orders.filter((o) => o.status === 'new').length)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="text-xs text-[#3d4946] font-medium">হোয়াটসঅ্যাপে কনফার্মড</span>
              <p className="text-2xl font-bold text-[#007232] mt-1">
                {toBnNum(orders.filter((o) => o.status === 'whatsapp_confirmed').length)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="text-xs text-[#3d4946] font-medium">প্যাকেজিং / শিপিং</span>
              <p className="text-2xl font-bold text-[#00685d] mt-1">
                {toBnNum(orders.filter((o) => o.status === 'packaging' || o.status === 'dispatched').length)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs">
              <span className="text-xs text-[#3d4946] font-medium">ডেলিভারি সম্পন্ন</span>
              <p className="text-2xl font-bold text-[#131b2e] mt-1">
                {toBnNum(orders.filter((o) => o.status === 'delivered').length)}
              </p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="p-4 rounded-xl bg-white border border-[#bdc9c5]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#6d7a77] text-xl">
                search
              </span>
              <input
                type="text"
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00685d]"
                placeholder="অর্ডার নং, নাম বা ফোন দিয়ে খুঁজুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'all', label: 'সকল' },
                { id: 'new', label: 'নতুন' },
                { id: 'whatsapp_confirmed', label: 'কনফার্মড' },
                { id: 'dispatched', label: 'ডেলিভারিতে' },
                { id: 'delivered', label: 'সম্পন্ন' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    filterStatus === f.id
                      ? 'bg-[#00685d] text-white'
                      : 'bg-[#f2f3ff] text-[#3d4946] hover:bg-[#e2e7ff]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="rounded-2xl bg-white border border-[#bdc9c5]/30 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f2f3ff] text-[#3d4946] uppercase font-bold text-[11px] border-b border-[#bdc9c5]/30">
                    <th className="p-3.5">অর্ডার ID</th>
                    <th className="p-3.5">গ্রাহক ও ফোন</th>
                    <th className="p-3.5">প্রোডাক্ট ও পরিমাণ</th>
                    <th className="p-3.5">মোট মূল্য</th>
                    <th className="p-3.5">ডেলিভারি ঠিকানা</th>
                    <th className="p-3.5">বর্তমান স্ট্যাটাস</th>
                    <th className="p-3.5 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bdc9c5]/20 text-[#131b2e]">
                  {filteredOrders.map((ord) => {
                    const cleanPhone = ord.customerPhone.replace(/[^0-9]/g, '');
                    return (
                      <tr key={ord.id} className="hover:bg-[#faf8ff] transition-colors">
                        <td className="p-3.5 font-mono font-bold text-[#00685d] whitespace-nowrap">
                          {ord.id}
                          <span className="block text-[10px] text-[#6d7a77] font-normal font-sans">
                            {ord.orderDate}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold block">{ord.customerName}</span>
                          <span className="text-[11px] text-[#3d4946] font-mono">{ord.customerPhone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold block">{ord.productName}</span>
                          <span className="text-[11px] text-[#6d7a77]">
                            পরিমাণ: {toBnNum(ord.quantity)} পিস
                          </span>
                        </td>
                        <td className="p-3.5 font-bold whitespace-nowrap">
                          <span className="text-[#006d2f] block">{formatPriceBn(ord.totalAmount)}</span>
                          <span className="text-[10px] text-[#6d7a77] font-normal">
                            কুরিয়ার চার্জ: ৳{toBnNum(ord.deliveryCharge)}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-[200px] text-[11px] text-[#3d4946]">
                          {ord.deliveryAddress}
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          {getStatusBadge(ord.status)}
                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="block mt-1 text-[11px] bg-[#f2f3ff] rounded px-1.5 py-0.5 border border-[#bdc9c5]/30 cursor-pointer focus:outline-none"
                          >
                            <option value="new">নতুন</option>
                            <option value="whatsapp_confirmed">কনফার্মড</option>
                            <option value="packaging">প্যাকেজিং</option>
                            <option value="dispatched">ডেলিভারিতে</option>
                            <option value="delivered">সম্পন্ন</option>
                            <option value="cancelled">বাতিল</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `আসসালামু আলাইকুম ${ord.customerName}, আপনার অর্ডার (${ord.id}) সম্পর্কে আপডেট জানাতে যোগাযোগ করছি।`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-xs"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.77.82 2.781.82h.001c3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.77-5.769-5.77zm7.592 5.766c0 4.19-3.407 7.598-7.592 7.598-1.282 0-2.493-.321-3.561-.884l-3.957 1.038 1.056-3.864c-.663-1.127-1.042-2.441-1.042-3.888 0-4.19 3.408-7.598 7.504-7.598 4.185 0 7.592 3.408 7.592 7.598z"></path>
                            </svg>
                            <span>চ্যাট করুন</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="p-10 text-center text-[#6d7a77] text-xs">
                কোনো অর্ডার খুঁজে পাওয়া যায়নি।
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
