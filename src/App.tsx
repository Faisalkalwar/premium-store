import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategorySection } from './components/home/CategorySection';
import { NewArrivalsSection } from './components/home/NewArrivalsSection';
import { ProductGridFilter } from './components/home/ProductGridFilter';
import { FeaturedCollection } from './components/home/FeaturedCollection';
import { BestSellersSection } from './components/home/BestSellersSection';
import { LookbookSection } from './components/home/LookbookSection';
import { InstagramSection } from './components/home/InstagramSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { ForgotPasswordView } from './components/auth/ForgotPasswordView';
import { AccountView } from './components/auth/AccountView';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CartView } from './components/cart/CartView';
import { WishlistView } from './components/wishlist/WishlistView';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderSuccessView } from './components/checkout/OrderSuccessView';
import { OrdersView } from './components/account/OrdersView';
import { OrderDetailView } from './components/account/OrderDetailView';

// Admin Components
import { AdminDashboardOverview } from './components/admin/AdminDashboardOverview';
import { AdminProductsList } from './components/admin/AdminProductsList';
import { AdminProductForm } from './components/admin/AdminProductForm';
import { AdminCategoriesView } from './components/admin/AdminCategoriesView';
import { AdminCollectionsView } from './components/admin/AdminCollectionsView';
import { AdminInventoryView } from './components/admin/AdminInventoryView';
import { AdminOrdersView } from './components/admin/AdminOrdersView';
import { AdminCustomersView } from './components/admin/AdminCustomersView';
import { AdminContentView } from './components/admin/AdminContentView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';

import { CartDrawer } from './components/ui/CartDrawer';
import { WishlistDrawer } from './components/ui/WishlistDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { AccountModal } from './components/ui/AccountModal';
import { FirebaseStatusWidget } from './components/ui/FirebaseStatusWidget';
import { Toast } from './components/ui/Toast';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  // Admin Views
  if (currentView === 'admin') {
    return <AdminDashboardOverview />;
  }

  if (currentView === 'admin-products') {
    return <AdminProductsList />;
  }

  if (currentView === 'admin-product-new') {
    return <AdminProductForm mode="new" />;
  }

  if (currentView === 'admin-product-edit') {
    return <AdminProductForm mode="edit" />;
  }

  if (currentView === 'admin-categories') {
    return <AdminCategoriesView />;
  }

  if (currentView === 'admin-collections') {
    return <AdminCollectionsView />;
  }

  if (currentView === 'admin-inventory') {
    return <AdminInventoryView />;
  }

  if (currentView === 'admin-orders') {
    return <AdminOrdersView />;
  }

  if (currentView === 'admin-customers') {
    return <AdminCustomersView />;
  }

  if (currentView === 'admin-content') {
    return <AdminContentView />;
  }

  if (currentView === 'admin-settings') {
    return <AdminSettingsView />;
  }

  // Storefront Views
  if (currentView === 'login') {
    return <LoginView />;
  }

  if (currentView === 'register') {
    return <RegisterView />;
  }

  if (currentView === 'forgot-password') {
    return <ForgotPasswordView />;
  }

  if (currentView === 'account') {
    return <AccountView />;
  }

  if (currentView === 'product') {
    return <ProductDetailView />;
  }

  if (currentView === 'cart') {
    return <CartView />;
  }

  if (currentView === 'wishlist') {
    return <WishlistView />;
  }

  if (currentView === 'checkout') {
    return <CheckoutView />;
  }

  if (currentView === 'order-success') {
    return <OrderSuccessView />;
  }

  if (currentView === 'account-orders') {
    return <OrdersView />;
  }

  if (currentView === 'account-order-detail') {
    return <OrderDetailView />;
  }

  return (
    <>
      <HeroSection />
      <CategorySection />
      <NewArrivalsSection />
      <ProductGridFilter />
      <FeaturedCollection />
      <BestSellersSection />
      <LookbookSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
};

const AppInner: React.FC = () => {
  const { currentView } = useShop();

  const isAdminView = currentView.startsWith('admin');

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-[#00e65c] selection:text-black">
        <MainContent />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#00e65c] selection:text-black">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <MainContent />
      </main>
      <Footer />

      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <AccountModal />
      <FirebaseStatusWidget />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppInner />
    </ShopProvider>
  );
}
