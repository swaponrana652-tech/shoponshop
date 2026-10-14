export type CategoryId = 'all' | 'fashion' | 'electronics' | 'home' | 'watches' | 'gifts';

export type ProductTag = 'hot' | 'bestseller' | 'new' | 'organic' | 'none';

export interface ProductFeature {
  icon: string;
  title: string;
  subtitle: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface SizeSpec {
  size: string;
  chest: string;
  length: string;
  status: string;
}

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  sku: string;
  category: CategoryId;
  categoryLabelBn: string;
  tag: ProductTag;
  tagLabelBn?: string;
  regularPrice: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  ordersCount: number;
  stockQty: number;
  lowStockThreshold: number;
  inStock: boolean;
  warrantyBn?: string;
  images: string[];
  features: ProductFeature[];
  descriptionHtml?: string;
  specs: ProductSpec[];
  sizeTable?: SizeSpec[];
  slug: string;
}

export interface Review {
  id: string;
  author: string;
  initial: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export type OrderStatus = 'new' | 'whatsapp_confirmed' | 'packaging' | 'dispatched' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  city: 'dhaka' | 'outside';
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  deliveryCharge: number;
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  viaWhatsApp: boolean;
}

export interface AppSettings {
  brandName: string;
  brandTagline: string;
  whatsappNumber: string;
  helplineDisplay: string;
  whatsappMessageTemplate: string;
  deliveryDhaka: number;
  deliveryOutside: number;
  freeDeliveryMinItems: number;
}

export type ActiveScreen = 'storefront' | 'product_detail' | 'admin_product' | 'admin_orders' | 'showcase';
