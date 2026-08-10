export type ProductCategory = 'shirts' | 'caps' | 'jeans' | 'new-arrivals' | 'best-sellers';

// UI Product representation
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  discountPercent?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage: string;
  images?: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  fabric?: string;
  fit?: string;
  care?: string;
  shippingInfo?: string;
  returnInfo?: string;
  tags?: string[];
  sku?: string;
  slug?: string;
  stock?: number;
  lowStockThreshold?: number;
  variants?: Array<{
    size: string;
    color: string;
    sku: string;
    stock: number;
  }>;
}

// Firestore Product Data Model
export interface FirestoreProduct {
  productId: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  collectionIds: string[];
  images: string[];
  price: number;
  salePrice?: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  variants: Array<{
    size: string;
    color: string;
    sku: string;
    stock: number;
  }>;
  stock: number;
  lowStockThreshold?: number;
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  status: 'active' | 'draft' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// Firestore Category Data Model
export interface FirestoreCategory {
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Firestore Collection Data Model
export interface FirestoreCollection {
  collectionId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Convert FirestoreProduct to UI Product model
export function mapFirestoreProductToProduct(fp: FirestoreProduct): Product {
  const allImages = fp.images && fp.images.length > 0 ? fp.images : [];
  const primaryImage = allImages.length > 0 ? allImages[0] : '';
  const hoverImage = allImages.length > 1 ? allImages[1] : primaryImage;
  
  let categoryKey: ProductCategory = 'shirts';
  const cat = (fp.categoryId || '').toLowerCase();
  if (cat === 'caps' || cat === 'jeans' || cat === 'shirts' || cat === 'new-arrivals' || cat === 'best-sellers') {
    categoryKey = cat as ProductCategory;
  }

  const originalPrice = fp.salePrice && fp.salePrice < fp.price ? fp.price : undefined;
  const effectivePrice = fp.salePrice && fp.salePrice < fp.price ? fp.salePrice : fp.price;
  const discountPercent = originalPrice ? Math.round(((originalPrice - effectivePrice) / originalPrice) * 100) : undefined;

  return {
    id: fp.productId,
    name: fp.name,
    category: categoryKey,
    price: effectivePrice,
    originalPrice,
    salePrice: fp.salePrice,
    discountPercent,
    isNew: fp.newArrival,
    isBestSeller: fp.bestSeller,
    isFeatured: fp.featured,
    rating: 4.9,
    reviewsCount: 38,
    image: primaryImage,
    hoverImage: hoverImage,
    images: allImages.length > 0 ? allImages : [primaryImage],
    sizes: fp.sizes && fp.sizes.length > 0 ? fp.sizes : ['S', 'M', 'L', 'XL'],
    colors: fp.colors && fp.colors.length > 0 ? fp.colors : [{ name: 'Black', hex: '#000000' }],
    description: fp.description || '',
    fabric: '100% Premium Heavyweight Cotton Canvas / 320 GSM',
    fit: 'Oversized Boxy Dropped-Shoulder Silhouette',
    care: 'Machine wash cold with like colors inside out. Do not bleach. Lay flat to dry or tumble dry low. Cool iron on reverse.',
    shippingInfo: 'Standard dispatch within 24 hours. Free worldwide express shipping on orders over $150 via DHL Express.',
    returnInfo: '30-day effortless return and exchange policy. Items must be unworn, unwashed with original hangtags attached.',
    tags: fp.tags || [],
    sku: fp.sku || `PS-${fp.productId.slice(0, 6).toUpperCase()}`,
    slug: fp.slug,
    stock: typeof fp.stock === 'number' ? fp.stock : 15,
    lowStockThreshold: typeof fp.lowStockThreshold === 'number' ? fp.lowStockThreshold : 10,
    variants: fp.variants || [],
  };
}

export interface CartItem {
  id: string; // unique key combining product.id + selectedSize + selectedColor
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface LookbookHotspot {
  id: string;
  productId: string;
  topPercent: number; // e.g. 45
  leftPercent: number; // e.g. 60
}

export interface LookbookItem {
  id: string;
  title: string;
  tagline: string;
  season: string;
  image: string;
  hotspots: LookbookHotspot[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  tagline: string;
  image: string;
  itemCount: number;
  slug: string;
}

export interface InstagramPost {
  id: string;
  username: string;
  image: string;
  likes: number;
  comments: number;
  productTag?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentStatus = 'Pending' | 'Paid' | 'Refunded';

export interface OrderShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  area: string;
  completeAddress: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface OrderInternalNote {
  id: string;
  note: string;
  createdAt: string;
  author: string;
}

export interface Order {
  id: string; // Firestore doc ID
  orderNumber: string; // e.g. PS-2026-00001
  userId: string | null;
  customerName: string;
  phone: string;
  email: string;
  items: OrderItem[];
  shippingAddress: OrderShippingAddress;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'Cash on Delivery';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  internalNotes?: OrderInternalNote[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}


