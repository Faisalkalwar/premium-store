import React, { useState } from 'react';
import { getUserProfile, loginWithEmailPassword, sendPasswordReset, signOutUser } from '../../services/firebaseService';
import {
  LayoutDashboard as DashIcon,
  Package as ProdIcon,
  FolderTree as CatIcon,
  Layers as CollIcon,
  Boxes as InvIcon,
  ShoppingBag as OrdIcon,
  Users as CustIcon,
  FileText as ContentIcon,
  Settings as SetIcon,
  ArrowLeft as BackIcon,
  ShieldAlert as AlertIcon,
  Key as KeyIcon,
  Mail as MailIcon,
  Loader2 as LoaderIcon,
  LogOut as ExitIcon,
  ExternalLink as LinkIcon,
  ChevronRight as ChevronIcon,
  Sparkles as SparkleIcon,
  Lock as LockIcon,
  UserCheck as UserCheckIcon
} from 'lucide-react';
import { useShop, ViewType } from '../../context/ShopContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeSection }) => {
  const {
    currentView,
    navigateTo,
    isAdminSession,
    lockAdminSession,
    user,
    userProfile,
    showToast,
  } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setResetMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Enter the administrator email and password.');
      return;
    }

    setIsLoading(true);
    const result = await loginWithEmailPassword(email.trim(), password);

    if (!result.user) {
      setIsLoading(false);
      setErrorMsg(result.error || 'Unable to sign in.');
      return;
    }

    // The Firestore rules also enforce the admin role. The UI check only provides
    // a clear message and prevents non-admin accounts from entering the console.
    const profile = await getUserProfile(result.user.uid);
    if (profile?.role !== 'admin') {
      await signOutUser();
      setIsLoading(false);
      setErrorMsg('This account is not authorized as an administrator.');
      return;
    }

    setIsLoading(false);
    showToast('Admin login successful.');
  };

  const handlePasswordReset = async () => {
    setErrorMsg('');
    setResetMsg('');
    if (!email.trim()) {
      setErrorMsg('Enter your admin email first, then click “Forgot password?”.');
      return;
    }

    setIsResetting(true);
    const result = await sendPasswordReset(email.trim());
    setIsResetting(false);
    if (result.success) {
      setResetMsg('Password reset email sent. Check your inbox.');
    } else {
      setErrorMsg(result.error || 'Could not send the password reset email.');
    }
  };

  // IF USER IS NOT AN ADMIN
  if (!isAdminSession) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-2">
              <LockIcon size={28} />
            </div>
            <h2 className="font-syne font-black text-2xl uppercase tracking-tight text-white">
              RESTRICTED ACCESS
            </h2>
            <p className="font-mono text-xs text-neutral-400">
              Only authorized administrators can access the store management dashboard.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">
                ADMIN EMAIL ADDRESS
              </label>
              <div className="relative">
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yourstore.com"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#00e65c] text-white px-4 py-3 font-mono text-sm pl-10 focus:outline-none transition-colors"
                />
                <MailIcon className="absolute left-3 top-3.5 text-neutral-500" size={16} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-mono text-[10px] uppercase text-neutral-400">
                  ADMIN PASSWORD
                </label>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={isResetting}
                  className="font-mono text-[10px] uppercase text-[#00e65c] hover:underline disabled:opacity-50"
                >
                  {isResetting ? 'SENDING...' : 'FORGOT PASSWORD?'}
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#00e65c] text-white px-4 py-3 font-mono text-sm pl-10 focus:outline-none transition-colors"
                />
                <KeyIcon className="absolute left-3 top-3.5 text-neutral-500" size={16} />
              </div>
            </div>

            {errorMsg && (
              <p className="font-mono text-xs text-red-400 flex items-center gap-1">
                <AlertIcon size={12} />
                <span>{errorMsg}</span>
              </p>
            )}
            {resetMsg && (
              <p className="font-mono text-xs text-[#00e65c]">{resetMsg}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00e65c] text-black font-syne font-extrabold py-3 text-xs uppercase tracking-wider hover:bg-[#00ff66] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? <LoaderIcon size={16} className="animate-spin" /> : <UserCheckIcon size={16} />}
              <span>{isLoading ? 'SIGNING IN...' : 'SIGN IN TO ADMIN'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-800 text-center space-y-3">
            <p className="font-mono text-[10px] text-neutral-500">
              Secure Firebase administrator authentication
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <BackIcon size={14} />
              <span>Return to Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { label: string; view: ViewType; icon: React.FC<{ size?: number }> }[] = [
    { label: 'Overview', view: 'admin', icon: DashIcon },
    { label: 'Products', view: 'admin-products', icon: ProdIcon },
    { label: 'Categories', view: 'admin-categories', icon: CatIcon },
    { label: 'Collections', view: 'admin-collections', icon: CollIcon },
    { label: 'Inventory', view: 'admin-inventory', icon: InvIcon },
    { label: 'Orders', view: 'admin-orders', icon: OrdIcon },
    { label: 'Customers', view: 'admin-customers', icon: CustIcon },
    { label: 'Content', view: 'admin-content', icon: ContentIcon },
    { label: 'Settings', view: 'admin-settings', icon: SetIcon },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* ADMIN TOP BAR */}
      <header className="h-16 bg-neutral-900 border-b border-neutral-800 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 font-syne font-black text-sm tracking-tight text-white hover:text-[#00e65c] transition-colors"
          >
            <span className="bg-[#00e65c] text-black text-[10px] font-black px-2 py-0.5 tracking-wider">
              ADMIN
            </span>
            <span className="hidden sm:inline">PREMIUM STORE MANAGEMENT</span>
          </button>
          <span className="text-neutral-700">|</span>
          <span className="font-mono text-xs text-neutral-400 uppercase">{activeSection}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 font-mono text-xs transition-colors"
          >
            <LinkIcon size={13} />
            <span>View Live Store</span>
          </button>

          <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-[#00e65c] animate-pulse"></div>
            <span className="font-mono text-xs text-neutral-300">
              {userProfile?.name || user?.email || 'Administrator'}
            </span>
          </div>

          <button
            onClick={() => {
              lockAdminSession();
              navigateTo('home');
              showToast('Admin Session Locked.');
            }}
            title="Lock Admin Session"
            className="p-2 bg-neutral-800 hover:bg-red-950 hover:text-red-400 text-neutral-400 transition-colors"
          >
            <ExitIcon size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex-shrink-0 hidden md:block">
          <div className="p-4 space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 px-3 pb-2">
              MANAGEMENT CONSOLE
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentView === item.view ||
                (item.view === 'admin-products' &&
                  (currentView === 'admin-product-new' || currentView === 'admin-product-edit'));
              return (
                <button
                  key={item.view}
                  onClick={() => navigateTo(item.view)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 font-mono text-xs transition-colors ${
                    isActive
                      ? 'bg-[#00e65c] text-black font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronIcon size={14} />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MOBILE NAVIGATION BAR */}
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => navigateTo(item.view)}
                className={`px-3 py-1.5 font-mono text-xs whitespace-nowrap border transition-colors ${
                  isActive
                    ? 'bg-[#00e65c] text-black border-[#00e65c] font-bold'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* MAIN ADMIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-8 bg-neutral-950 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
