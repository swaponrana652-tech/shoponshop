import { useState, useEffect } from 'react';
import {
  Product,
  Order,
  OrderStatus,
  AppSettings,
  ActiveScreen,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_SETTINGS,
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StorefrontView } from './components/StorefrontView';
import { ProductDetailView } from './components/ProductDetailView';
import { AdminProductView } from './components/AdminProductView';
import { AdminOrdersView } from './components/AdminOrdersView';
import { ShowcaseView } from './components/ShowcaseView';
import { ScreenSwitcher } from './components/ScreenSwitcher';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('storefront');

  // Persistence in local storage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amardokan_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    return products[0] || INITIAL_PRODUCTS[0];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amardokan_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('amardokan_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.brandName = 'Shoponshop';
        parsed.brandTagline = 'Shop Smart • Live Better | সরাসরি হোয়াটসঅ্যাপে অর্ডার';
        if (parsed.whatsappNumber === '+880 1700-000000' || !parsed.whatsappNumber) {
          parsed.whatsappNumber = '01316287964';
          parsed.helplineDisplay = '01316287964';
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SETTINGS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem('amardokan_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('amardokan_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync settings
  useEffect(() => {
    try {
      localStorage.setItem('amardokan_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (screen: ActiveScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    showToast(`"${product.nameBn}" (${quantity} টি) কার্টে যোগ করা হয়েছে!`);
  };

  const handleOrderPlaced = (product: Product, quantity: number) => {
    const isDhaka = true;
    const deliveryCharge = isDhaka ? settings.deliveryDhaka : settings.deliveryOutside;
    const unitPrice = product.discountPrice;
    const totalAmount = unitPrice * quantity + deliveryCharge;

    const newOrder: Order = {
      id: `#ORD-${Math.floor(1100 + Math.random() * 8900)}`,
      customerName: 'হোয়াটসঅ্যাপ গ্রাহক',
      customerPhone: '+880 17XX-XXXXXX',
      deliveryAddress: 'চ্যাট থেকে সংগ্রহ করা হবে',
      city: 'dhaka',
      productId: product.id,
      productName: product.nameBn,
      quantity,
      unitPrice,
      deliveryCharge,
      totalAmount,
      status: 'new',
      orderDate: 'এইমাত্র',
      viaWhatsApp: true,
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`WhatsApp অর্ডার রেকর্ড হয়েছে! (অর্ডার ID: ${newOrder.id})`);
  };

  const handleSaveProduct = (newProd: Product) => {
    setProducts((prev) => {
      const exists = prev.findIndex((p) => p.id === newProd.id);
      if (exists >= 0) {
        const copy = [...prev];
        copy[exists] = newProd;
        return copy;
      }
      return [newProd, ...prev];
    });
    setSelectedProduct(newProd);
    showToast(`"${newProd.nameBn}" সফলভাবে পাবলিশ হয়েছে!`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`অর্ডার ${orderId}-এর স্ট্যাটাস আপডেট হয়েছে!`);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const isAdminView = currentScreen === 'admin_product' || currentScreen === 'admin_orders';

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col relative font-sans">
      {/* Quick Screen Switcher Floating Pill */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-base text-[#5dfd8a]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Screen Routing */}
      {isAdminView ? (
        currentScreen === 'admin_product' ? (
          <AdminProductView
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onSaveProduct={handleSaveProduct}
            onNavigate={handleNavigate}
            existingProduct={selectedProduct}
          />
        ) : (
          <AdminOrdersView
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onNavigate={handleNavigate}
          />
        )
      ) : (
        <>
          <Header
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            whatsappNumber={settings.whatsappNumber}
          />

          <main className="flex-1 w-full">
            {currentScreen === 'storefront' && (
              <StorefrontView
                products={products}
                settings={settings}
                onSelectProduct={handleSelectProduct}
                onNavigate={handleNavigate}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOrderPlaced={handleOrderPlaced}
              />
            )}

            {currentScreen === 'product_detail' && (
              <ProductDetailView
                product={selectedProduct}
                reviews={INITIAL_REVIEWS}
                settings={settings}
                onNavigate={handleNavigate}
                onAddToCart={handleAddToCart}
                onOrderPlaced={handleOrderPlaced}
              />
            )}

            {currentScreen === 'showcase' && (
              <ShowcaseView onNavigate={handleNavigate} />
            )}
          </main>

          <Footer
            onNavigate={handleNavigate}
            whatsappNumber={settings.whatsappNumber}
          />
        </>
      )}
    </div>
  );
}
