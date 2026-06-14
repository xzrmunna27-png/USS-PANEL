/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Menu, Search, User, Home, LayoutGrid, TrendingUp, Bell, Facebook, Youtube, Send, 
  MessageCircle, Wallet, ShoppingCart, Star, List, Download, Share2, HelpCircle, 
  Users, BarChart3, Settings, ShieldCheck, Phone, Mail, Award, Briefcase, Rocket,
  X, ChevronRight, Copy, ArrowLeft, Heart, Image as ImageIcon, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, cloneElement, ReactNode, ReactElement } from 'react';

// --- Types ---
type Screen = 'home' | 'wallet' | 'gmail' | 'products' | 'refer' | 'profile' | 'categories' | 'coming-soon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'wallet':
        return <WalletScreen onBack={() => setActiveScreen('home')} />;
      case 'gmail':
        return <GmailScreen onBack={() => setActiveScreen('home')} />;
      case 'products':
        return <ProductsScreen onBack={() => setActiveScreen('home')} />;
      case 'refer':
        return <ReferralScreen onBack={() => setActiveScreen('home')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setActiveScreen('home')} />;
      case 'categories':
        return <CategoriesScreen onBack={() => setActiveScreen('home')} />;
      case 'coming-soon':
        return <ComingSoonScreen onBack={() => setActiveScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div id="app-root" className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans text-gray-900 pb-20 overflow-x-hidden">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              id="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div 
              id="sidebar-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <Sidebar onClose={toggleSidebar} onNavigate={setActiveScreen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header id="main-app-header" className="bg-[#00a859] text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <button id="sidebar-toggle-btn" onClick={toggleSidebar} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div id="header-branding" className="flex items-center">
            <div className="bg-white p-1 rounded-sm mr-2 shadow-sm">
              <ShoppingCart className="w-5 h-5 text-[#00a859]" />
            </div>
            <div className="flex flex-col">
              <h1 id="app-title" className="text-sm font-black tracking-tighter leading-none">RESELLPONNO</h1>
              <p className="text-[7px] tracking-[0.3em] font-black leading-none opacity-80 mt-1 uppercase text-yellow-300">Reseller App</p>
            </div>
          </div>
        </div>
        <button 
          id="header-wallet-btn"
          onClick={() => setActiveScreen('wallet')}
          className="bg-white/20 hover:bg-white/30 text-white text-xs px-4 py-1.5 rounded-full font-medium transition-colors border border-white/30 backdrop-blur-sm"
        >
          ব্যালেন্স দেখুন
        </button>
      </header>

      {/* Main Content */}
      <main id="main-content-viewport" className="flex-1">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav id="footer-navigation" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <NavItem 
          active={activeTab === 'home'} 
          onClick={() => { setActiveTab('home'); setActiveScreen('home'); }} 
          icon={<Home />} 
          label="হোম" 
        />
        <NavItem 
          active={activeTab === 'category'} 
          onClick={() => { setActiveTab('category'); setActiveScreen('categories'); }} 
          icon={<LayoutGrid />} 
          label="নতুন প্রোডাক্ট" 
        />
        <NavItem 
          active={activeTab === 'profit'} 
          onClick={() => { setActiveTab('profit'); setActiveScreen('wallet'); }} 
          icon={<TrendingUp />} 
          label="প্রফিট" 
        />
        <NavItem 
          active={activeTab === 'account'} 
          onClick={() => { setActiveTab('account'); setActiveScreen('profile'); }} 
          icon={<User />} 
          label="প্রোফাইল" 
        />
      </nav>
    </div>
  );
}

// --- Specific Screens ---

function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <motion.div 
      id="home-screen-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Hero Banner */}
      <section id="hero-promotion-banner" className="px-4 pt-4">
        <div className="relative aspect-[21/10] rounded-2xl overflow-hidden shadow-sm bg-[#00a859]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00a859] to-[#008f4c] flex flex-col justify-center px-6">
            <h2 className="text-white font-bold text-[10px] mb-1 opacity-95 flex items-center gap-1">
              <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              এক অ্যাপেই সব কিছু এক জায়গায়
            </h2>
            <p className="text-white font-black text-2xl leading-[1.1] mb-2 tracking-tighter italic">RESELLPONNO <br/> <span className="text-yellow-300 not-italic">BANGLADESH</span></p>
            <div className="bg-white/10 backdrop-blur-md rounded-lg py-1.5 px-4 w-fit border border-white/20 text-[10px] text-white font-bold flex items-center gap-2">
              <Rocket className="w-3 h-3 text-yellow-300" />
              আপনাকে স্বাগতম
            </div>
          </div>
          {/* Animated Background Element */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </section>

      {/* Notice Bar */}
      <section id="marquee-notice-bar" className="px-4">
        <div className="bg-[#1e40af] text-white rounded-xl py-3 px-4 shadow-lg flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 animate-pulse bg-yellow-400/20 p-1.5 rounded-full">
            <Bell className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-[11px] font-medium flex-1 overflow-hidden relative">
            <motion.p 
              id="notice-scroller"
              animate={{ x: [300, -800] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="whitespace-nowrap"
            >
              📢 গুরুত্বপূর্ণ নোটিশ: ঈদ-উল-ফিতর ছুটির ঘোষণা 🌙 রিসেল পণ্য প্রতিষ্ঠান এর সকল সম্মানিত গ্রাহক... বিস্তারিত দেখুন
            </motion.p>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section id="social-connect-links" className="px-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-center text-xs font-semibold text-gray-400 mb-4 uppercase tracking-[0.2em]">সোশ্যাল লিঙ্ক</h3>
          <div className="flex justify-around items-center">
            <SocialIcon bg="bg-blue-600" icon={<Facebook />} />
            <SocialIcon bg="bg-red-600" icon={<Youtube />} />
            <SocialIcon bg="bg-green-500" icon={<MessageCircle />} />
            <SocialIcon bg="bg-blue-400" icon={<Send />} />
          </div>
        </div>
      </section>

      {/* Action Grid */}
      <section id="home-navigation-grid" className="px-4 grid grid-cols-4 gap-y-8 gap-x-2 pb-10">
        <GridItem icon={<Rocket className="text-blue-600" />} label="রিসেলিং প্রজেক্ট" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<Search className="text-green-600" />} label="প্রোডাক্ট সার্চ" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<ShieldCheck className="text-teal-500" />} label="রিসেলিং প্রো" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<ShoppingCart className="text-orange-500" />} label="ই-কমার্স" onClick={() => setActiveScreen('coming-soon')} />
        
        <GridItem icon={<BarChart3 className="text-indigo-600" />} label="পেন্ডিং রেভিনিউ" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem onClick={() => setActiveScreen('products')} icon={<Star className="text-yellow-500" />} label="ভেরিফাইড প্রোডাক্ট" />
        <GridItem icon={<Phone className="text-blue-500" />} label="মোবাইল রিচার্জ" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem onClick={() => setActiveScreen('refer')} icon={<Users className="text-emerald-500" />} label="লিডারশিপ" />
        
        <GridItem icon={<HelpCircle className="text-pink-500" />} label="সাপোর্ট" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem onClick={() => setActiveScreen('refer')} icon={<TrendingUp className="text-rose-500" />} label="রেফার রিপোর্ট" />
        <GridItem onClick={() => setActiveScreen('wallet')} icon={<Wallet className="text-green-600" />} label="নতুন প্রফিট" />
        <GridItem onClick={() => setActiveScreen('wallet')} icon={<LayoutGrid className="text-blue-500" />} label="ওয়ালেট" />
        
        <GridItem icon={<Heart className="text-red-500" />} label="ফেভারিট প্রডাক্ট" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<List className="text-indigo-600" />} label="অর্ডার লিস্ট" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem onClick={() => setActiveScreen('wallet')} icon={<Share2 className="text-orange-600" />} label="উত্তোলন" />
        <GridItem onClick={() => setActiveScreen('wallet')} icon={<Settings className="text-gray-500" />} label="ব্যালেন্স এড" />
        
        <GridItem icon={<MessageCircle className="text-green-600" />} label="ক্লিনজার" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<Mail className="text-sky-500" />} label="জব পোস্ট" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<Award className="text-amber-600" />} label="বিনিয়োগ" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<Briefcase className="text-red-500" />} label="প্রডাক্ট বিক্রি করুন" onClick={() => setActiveScreen('coming-soon')} />
        
        <GridItem icon={<ShoppingCart className="text-indigo-500" />} label="শপ" onClick={() => setActiveScreen('products')} />
        <GridItem onClick={() => setActiveScreen('gmail')} icon={<Mail className="text-rose-600" />} label="জিমেইল সেল" />
        <GridItem icon={<Users className="text-blue-500" />} label="পার্টনারশিপ" onClick={() => setActiveScreen('coming-soon')} />
        <GridItem icon={<MessageCircle className="text-cyan-500" />} label="অনলাইন সার্ভিস" onClick={() => setActiveScreen('coming-soon')} />
      </section>

      <footer id="home-brand-footer" className="pb-10 text-center">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">প্রয়োজনে যোগাযোগ</p>
        <p className="text-[#00a859] font-black text-xl">01624553129</p>
      </footer>
    </motion.div>
  );
}

function WalletScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div id="wallet-screen-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-[#f3f4f6]">
      <header id="wallet-header" className="p-4 bg-[#00a859] text-white flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button id="wallet-back-btn" onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-white/20 p-1.5 rounded-lg border border-white/20">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h2 id="wallet-page-title" className="text-sm font-black tracking-tight leading-none uppercase">ওয়ালেট দেখুন</h2>
        </div>
        <button id="wallet-check-balance-btn" className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest">ব্যালেন্স দেখুন</button>
      </header>

      <div id="wallet-content-area" className="p-4 space-y-6">
        {/* Balance Card */}
        <div id="wallet-balance-summary-card" className="relative overflow-hidden aspect-[21/9] bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center items-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">বর্তমান ব্যালেন্স</p>
          <div className="flex items-center gap-2">
            <span id="wallet-total-balance" className="text-3xl font-black">৳ বটন ০.০০</span>
          </div>
        </div>

        {/* List Options */}
        <div id="wallet-actions-list" className="space-y-3">
          <WalletListOption icon={<TrendingUp className="text-amber-500" />} label="ইনকাম হিস্ট্রি দেখুন" />
          <WalletListOption icon={<Settings className="text-cyan-500" />} label="ব্যালেন্স এড করুন" />
          <WalletListOption icon={<List className="text-green-500" />} label="ব্যালেন্স এড হিস্ট্রি" />
          <WalletListOption icon={<Wallet className="text-rose-500" />} label="পেমেন্ট মেথড এড করুন" />
          <WalletListOption icon={<Download className="text-blue-500" />} label="ব্যালেন্স উত্তোলন করুন" />
          <WalletListOption icon={<List className="text-purple-500" />} label="উত্তোলনের হিস্ট্রি দেখুন" />
          <WalletListOption icon={<Award className="text-yellow-600" />} label="ইনকাম স্টেটম্যান্ট" />
        </div>
      </div>
    </motion.div>
  );
}

function WalletListOption({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-50 shadow-sm active:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
          {cloneElement(icon as ReactElement, { className: 'w-5 h-5' })}
        </div>
        <span className="text-xs font-bold text-gray-700">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </div>
  );
}

function GmailScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div id="gmail-screen-container" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen bg-[#6a0d2f]">
      <header id="gmail-sales-header" className="p-4 bg-[#00a859] text-white flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button id="gmail-back-btn" onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-white/20 p-1.5 rounded-lg border border-white/20">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <h2 id="gmail-app-logo" className="text-sm font-black italic tracking-tighter">RESELLPONNO</h2>
        </div>
        <button id="gmail-header-balance-btn" className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest">ব্যালেন্স দেখুন</button>
      </header>

      <div id="gmail-sales-content" className="p-4 space-y-4">
        <div id="gmail-tutorial-card" className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center p-2.5">
            <Mail className="w-full h-full text-blue-600" />
          </div>
          <h3 id="gmail-tutorial-title" className="font-black text-gray-800 text-sm">জিমেইল সেলস টিউটোরিয়াল</h3>
        </div>

        <div id="gmail-marketing-rules-card" className="bg-[#8b1539] border border-white/10 rounded-2xl p-6 text-center space-y-4 text-white">
          <h4 id="gmail-marketing-heading" className="text-yellow-400 font-black text-lg">জিমেইল মার্কেটিংঃ</h4>
          <p id="gmail-marketing-msg" className="text-[10px] font-medium opacity-80 leading-relaxed uppercase tracking-wider">সঠিক নিয়মেই কাজ করুন অন্যথায় পেমেন্ট পাবেন না। <br/>ভুল তথ্য দিলে আপনার অ্যাকাউন্ট সাসপেন্ড হতে পারে।</p>
          
          <div id="gmail-stats-grid" className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-xl p-3 border border-white/10">
              <p className="text-[10px] opacity-60 mb-1">লিমিট</p>
              <p id="gmail-limit-count" className="font-black text-lg">100</p>
            </div>
            <div className="bg-black/20 rounded-xl p-3 border border-white/10">
              <p className="text-[10px] opacity-60 mb-1">প্রাইস</p>
              <p id="gmail-price-tag" className="font-black text-lg text-yellow-400">10৳</p>
            </div>
          </div>
          <p id="gmail-report-timer" className="text-[9px] bg-red-600/20 py-1 px-3 rounded-full border border-red-500/20 inline-block font-bold">⏰ রিপোর্ট টাইমঃ ৩-৫ দিন</p>
        </div>

        <div id="gmail-today-info-card" className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h4 id="gmail-today-heading" className="text-yellow-400 text-center text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">আজকের তথ্য</h4>
          <div id="gmail-password-display" className="bg-black/20 p-4 rounded-xl flex items-center justify-between border border-white/5">
            <div>
              <p className="text-[8px] text-yellow-400 font-bold mb-1 uppercase tracking-widest opacity-60">পাসওয়ার্ড</p>
              <p id="gmail-shared-pass" className="text-white font-mono font-bold text-sm">@Nasir8242</p>
            </div>
            <Copy id="gmail-copy-pass-btn" className="w-5 h-5 text-yellow-400 cursor-pointer" />
          </div>
        </div>

        <div id="gmail-submission-form-container" className="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 space-y-4">
          <h4 id="gmail-submit-heading" className="text-yellow-400 text-center font-black text-lg">জিমেইল সাবমিট ফর্ম</h4>
          
          <div id="gmail-input-group" className="space-y-4">
            <div id="gmail-id-field">
              <label className="text-[10px] text-yellow-400 font-bold block mb-2 uppercase tracking-widest">জিমেইল লিখুন</label>
              <input id="gmail-id-input" type="text" placeholder="আপনার Gmail লিখুন" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-yellow-400 outline-none" />
            </div>
            <div id="gmail-pass-field">
              <label className="text-[10px] text-yellow-400 font-bold block mb-2 uppercase tracking-widest">পাসওয়ার্ড লিখুন</label>
              <input id="gmail-pass-input" type="password" placeholder="Gmail পাসওয়ার্ড লিখুন" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-yellow-400 outline-none" />
            </div>
            <button id="gmail-submit-btn" className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl text-sm shadow-xl active:scale-[0.98] transition-transform">
              সাবমিট করুন
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductsScreen({ onBack }: { onBack: () => void }) {
  const products: Product[] = [
    { id: 1, name: "Threepice Dress Exclusive Collection", price: 460, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Mini Portable Air Cooler Fan", price: 1000, image: "https://images.unsplash.com/photo-1591341731326-880629759714?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Wireless Bluetooth Earbuds Pro", price: 670, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Rechargeable Hair Trimmer", price: 370, image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Cotton Casual Mens Shirt", price: 450, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Womens Traditional Party Dress", price: 650, image: "https://images.unsplash.com/photo-1515243061678-14fc14c000af?auto=format&fit=crop&w=300&q=80" },
  ];

  return (
    <motion.div id="products-catalogue-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#f0f2f5] min-h-screen">
      <div id="products-top-nav" className="bg-[#00a859] p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div id="products-nav-branding" className="flex items-center gap-3">
          <button id="products-back-btn" onClick={onBack} className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"><ArrowLeft className="w-5 h-5 text-white" /></button>
          <span id="products-page-title" className="text-white font-black text-sm tracking-tight uppercase">ভেরিফাইড প্রোডাক্ট</span>
        </div>
        <div id="products-count-badge" className="text-[9px] text-white/90 bg-black/20 px-3 py-1.5 rounded-full font-bold border border-white/5 uppercase tracking-widest leading-none">মোট পণ্য: ৬৬৩ টি</div>
      </div>

      <div id="products-display-grid" className="p-3 grid grid-cols-2 gap-3 pb-24">
        {products.map(p => (
          <div id={`product-card-${p.id}`} key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col active:scale-[0.98] transition-transform">
            <div className="relative aspect-square">
              <img id={`product-img-${p.id}`} src={p.image} alt={p.name} className="w-full h-full object-cover" />
              <div id={`product-actions-left-${p.id}`} className="absolute top-2 left-2 flex gap-1.5">
                <button id={`product-download-btn-${p.id}`} className="bg-[#00a859] p-2 rounded-xl text-white shadow-xl shadow-[#00a859]/20"><Download className="w-4 h-4 stroke-[3]" /></button>
              </div>
              <div id={`product-actions-right-${p.id}`} className="absolute top-2 right-2">
                <button id={`product-fav-btn-${p.id}`} className="bg-white p-2 rounded-xl text-rose-500 shadow-xl shadow-black/5"><Heart className="w-4 h-4 stroke-[3]" /></button>
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h4 id={`product-name-${p.id}`} className="text-[10px] font-bold text-gray-700 line-clamp-2 mb-3 leading-snug">{p.name}</h4>
              <button id={`product-price-btn-${p.id}`} className="w-full bg-[#00a859] text-white text-center font-black text-[10px] py-2 rounded-xl shadow-lg shadow-[#00a859]/20 uppercase tracking-wider">
                মূল্য: {p.price} টাকা
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ReferralScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div id="referral-screen-container" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="min-h-screen bg-[#f3f4f6]">
       <header id="referral-header" className="p-4 bg-[#00a859] text-white flex items-center justify-between sticky top-0 z-50">
        <div id="referral-header-branding" className="flex items-center gap-3">
          <button id="referral-back-btn" onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-white/20 p-1.5 rounded-lg border border-white/20">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h2 id="referral-app-logo" className="text-sm font-black italic tracking-tighter">RESELLPONNO</h2>
        </div>
        <button id="referral-balance-btn" className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest">ব্যালেন্স দেখুন</button>
      </header>

      <div id="referral-content-area" className="p-4 space-y-4">
        {/* Referral Card */}
        <div id="referral-code-card" className="bg-white border-b-4 border-[#00a859] rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest leading-none mb-1">আপনার পার্সোনাল রেফারাল কোড</p>
          <div id="referral-code-display" className="bg-gray-50 p-4 rounded-xl flex items-center justify-center gap-4 border border-gray-100 italic">
             <span id="target-referral-code" className="text-xl font-black text-[#00a859]">RPB100</span>
          </div>
          <button id="copy-referral-code-btn" className="w-full bg-[#00a859] text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-[#00a859]/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
            কোড কপি করুন
          </button>
        </div>

        {/* Notice Box */}
        <div id="referral-policy-notice" className="bg-orange-50 border border-orange-100 rounded-2xl p-6 space-y-2">
          <h4 id="referral-policy-heading" className="text-orange-600 font-bold flex items-center gap-2 text-xs">
             <AlertCircle className="w-4 h-4" />
             রেফার কমিশন পলিসিঃ
          </h4>
          <p id="referral-policy-text" className="text-[10px] text-orange-800/80 font-medium leading-relaxed">আপনার রেফারাল কোড ব্যবহার করে কেউ অ্যাকাউন্ট খুললে যখনই তিনি তার অ্যাকাউন্ট ভেরিফাই করবেন সাথে সাথে আপনি আপনার ওয়ালেটে ২০ টাকা কমিশন পাবেন। <br/><span className="bg-orange-200/50 px-2 py-0.5 rounded text-orange-800 text-[9px] font-bold mt-2 inline-block">(সর্বোচ্চ কমিশন অল টাইম পাবেন)</span></p>
        </div>

        {/* Info Grid */}
        <div id="referral-stats-summary" className="grid grid-cols-2 gap-4">
          <ReferralInfoBox color="bg-blue-600" label="মোট রেফার" value="12 জন" />
          <ReferralInfoBox color="bg-emerald-500" label="ভেরিফাইড (ACTIVE)" value="1 জন" />
          <ReferralInfoBox color="bg-rose-500" label="নন-ভেরিফাইড" value="11 জন" />
          <ReferralInfoBox color="bg-purple-600" label="ফ্রি মেম্বার রেজিস্ট্রেশন" value="0 জন" />
        </div>

        <div id="total-referral-income-card" className="bg-orange-500/10 border border-orange-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div id="income-summary-text">
             <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1 leading-none">মোট রেফারাল আয়</p>
             <p id="total-referral-amount" className="text-2xl font-black text-orange-700 leading-none">৳ ২০</p>
          </div>
        </div>

        {/* Member List */}
        <div id="referral-members-list-card" className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <h4 id="members-list-heading" className="text-gray-800 font-black text-xs uppercase tracking-widest border-b pb-4 border-gray-50 mb-4 block text-center">রেফারাল মেম্বার লিস্ট</h4>
          
          <div id="members-list-container" className="space-y-4">
            <ReferralMember name="হাসান" date="18 Feb, 2024" status="PENDING" />
            <ReferralMember name="ইব্রাহিম" date="15 Feb, 2024" status="PENDING" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReferralInfoBox({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div id={`referral-info-box-${label.replace(/\s+/g, '-').toLowerCase()}`} className={`${color} rounded-2xl p-4 text-white shadow-lg`}>
      <p className="text-[9px] font-bold opacity-80 uppercase tracking-widest mb-1 truncate">{label}</p>
      <p className="text-base font-black">{value}</p>
    </div>
  );
}

function ReferralMember({ name, date, status }: { name: string; date: string; status: string }) {
  return (
    <div id={`referral-member-${name.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center justify-between py-2 group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 group-hover:bg-[#00a859]/5 group-hover:border-[#00a859]/20 transition-all">
          <User className="w-5 h-5 text-gray-400 group-hover:text-[#00a859] transition-colors" />
        </div>
        <div>
          <p className="text-[11px] font-black text-gray-700">{name}</p>
          <p className="text-[9px] text-gray-400 mt-0.5">{date}</p>
        </div>
      </div>
      <span className="text-[8px] bg-red-50 text-red-500 font-black px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest">{status}</span>
    </div>
  );
}

function ProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div id="profile-screen-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-6">
      <div id="profile-top-bar" className="flex items-center gap-4">
        <button id="profile-back-btn" onClick={onBack} className="p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 id="profile-page-title" className="text-lg font-bold text-[#00a859]">প্রোফাইল</h2>
      </div>

      <div id="profile-user-card" className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
        <div id="profile-avatar-container" className="w-24 h-24 bg-gray-100 rounded-full mb-4 border-4 border-white shadow-lg overflow-hidden">
          <User id="profile-avatar-placeholder" className="w-full h-full p-4 text-gray-300" />
        </div>
        <h3 id="profile-user-name" className="font-bold text-xl text-gray-800">MD ZAHID HASAN</h3>
        <p id="profile-affiliate-id" className="text-gray-400 text-sm mb-4">RPB100</p>
        <span id="profile-account-type" className="bg-[#00a859] text-white text-xs font-bold px-4 py-1.5 rounded-full">RESELLER ACCOUNT</span>
      </div>

      <div id="profile-options-menu" className="grid gap-3">
        <WalletMenuItem icon={User} color="text-blue-500" label="ব্যক্তিগত তথ্য" />
        <WalletMenuItem icon={ShieldCheck} color="text-green-500" label="পাসওয়ার্ড পরিবর্তন" />
        <WalletMenuItem icon={Settings} color="text-gray-500" label="সিস্টেম সেটিংস" />
      </div>

      <footer id="profile-footer-contact" className="pt-10 pb-6 text-center">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">প্রয়োজনে যোগাযোগ করুন</p>
        <p id="profile-contact-phone" className="text-[#00a859] font-black text-lg">01624553129</p>
      </footer>
    </motion.div>
  );
}

function CategoriesScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div id="categories-screen-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#f3f4f6]">
      <header id="categories-page-header" className="p-4 bg-[#00a859] text-white flex items-center gap-4 sticky top-0 z-50 shadow-md">
        <button id="categories-back-btn" onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 id="categories-page-title" className="text-sm font-black tracking-tight uppercase">ক্যাটাগরি সমূহ</h2>
      </header>
      
      <div id="categories-list-viewport" className="p-4 space-y-6">
        <CategorySection title="মেয়েদের প্রোডাক্ট (২৭৩ টি প্রডাক্ট)" items={[
          { label: 'ইনার ও নাইটি', count: 42 },
          { label: 'ইন্ডিয়ান শাড়ি', count: 12 },
          { label: 'নামাজ পিস', count: 8 },
          { label: 'গাউন ড্রেস', count: 15 },
          { label: 'কাপল ড্রেস', count: 22 },
          { label: 'বাটিক ও কুটি', count: 30 },
        ]} />
        <CategorySection title="বাচ্চাদের প্রোডাক্ট (৫২ টি প্রডাক্ট)" items={[
          { label: 'বয়েজ সেট', count: 12 },
          { label: 'গার্লস সেট', count: 18 },
          { label: 'কিডস সু', count: 10 },
        ]} />
      </div>
    </motion.div>
  );
}

// --- Reusable UI Helpers ---

function Sidebar({ onClose, onNavigate }: { onClose: () => void; onNavigate: (s: Screen) => void }) {
  const menuItems = [
    { icon: <Home />, label: 'হোম', screen: 'home' },
    { icon: <User />, label: 'আমার প্রোফাইল', screen: 'profile' },
    { icon: <Wallet />, label: 'আমার ওয়ালেট', screen: 'wallet' },
    { icon: <Users />, label: 'আমার রেফারি', screen: 'refer' },
    { icon: <ShoppingCart />, label: 'আমার অর্ডার', screen: 'coming-soon' },
    { icon: <List />, label: 'সকল প্রোডাক্ট গ্রূপ', screen: 'categories' },
    { icon: <HelpCircle />, label: 'লাইভ সাপোর্ট', screen: 'coming-soon' },
  ];

  return (
    <div id="sidebar-main-container" className="flex flex-col h-full bg-[#f8f9fa]">
      <div id="sidebar-header-section" className="p-6 bg-white border-b border-gray-100 flex flex-col items-center relative shadow-sm">
        <button id="sidebar-close-btn" onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 transition-colors"><X className="w-5 h-5"/></button>
        
        <div id="sidebar-user-avatar-area" className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center p-1 border-4 border-white shadow-xl mb-4 relative group">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
            <User id="sidebar-user-placeholder" className="w-10 h-10 text-gray-300" />
          </div>
          <div className="absolute bottom-0 right-1 w-5 h-5 bg-[#00a859] border-2 border-white rounded-full" />
        </div>

        <h3 id="sidebar-user-display-name" className="font-black text-gray-800 text-lg mb-1">MD ZAHID HASAN</h3>
        <div id="sidebar-badge-reseller" className="bg-[#00a859] text-white text-[9px] font-black px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-[#00a859]/20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          RESELLER ACCOUNT
        </div>

        <div id="sidebar-affiliate-id-box" className="bg-gray-50 rounded-xl px-5 py-2.5 flex flex-col items-center gap-1 w-full border border-gray-100 shadow-inner">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">এফিলিয়েট আইডি</span>
          <span id="sidebar-target-affiliate-id" className="text-sm font-black text-[#00a859] border-b-2 border-[#00a859]/20">RPB100</span>
        </div>
      </div>

      <nav id="sidebar-navigation-menu" className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item, idx) => (
          <button 
            id={`sidebar-nav-item-${idx}`}
            key={idx}
            onClick={() => {
              onNavigate(item.screen as Screen);
              onClose();
            }}
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white hover:shadow-md hover:shadow-gray-100 transition-all group border border-transparent hover:border-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#00a859] group-hover:scale-110 transition-all">
                {cloneElement(item.icon as ReactElement, { className: 'w-5 h-5' })}
              </div>
              <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#00a859] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </nav>

      <div id="sidebar-footer-actions" className="p-6">
        <button id="sidebar-logout-btn" className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-sm border border-red-100 active:scale-95 transition-transform flex items-center justify-center gap-2">
           লগ-আউট করুন
        </button>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, badge }: { icon: ReactNode; label: string; active?: boolean; badge?: string }) {
  return (
    <button className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all ${active ? 'bg-[#00a859]/10 text-[#00a859]' : 'hover:bg-gray-100 text-gray-600'}`}>
      <div className="flex items-center gap-4">
        <div className={`${active ? 'scale-110' : ''} transition-transform`}>{icon}</div>
        <span className={`text-xs ${active ? 'font-black' : 'font-semibold'}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
        <ChevronRight className={`w-4 h-4 opacity-30 ${active ? 'opacity-100' : ''}`} />
      </div>
    </button>
  );
}

function ComingSoonScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div id="coming-soon-screen-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div id="coming-soon-icon-wrapper" className="w-24 h-24 bg-[#00a859]/10 rounded-full flex items-center justify-center mb-6">
        <Rocket className="w-12 h-12 text-[#00a859] animate-bounce" />
      </div>
      <h2 id="coming-soon-title" className="text-2xl font-black text-gray-800 mb-2">শীঘ্রই আসছে!</h2>
      <p id="coming-soon-desc" className="text-gray-500 mb-8">এই সার্ভিসটি বর্তমানে উন্নয়নের কাজ চলছে। আমাদের সাথেই থাকুন।</p>
      <button 
        id="coming-soon-back-btn"
        onClick={onBack}
        className="bg-[#00a859] text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-[#00a859]/30 active:scale-95 transition-transform"
      >
        ফিরে যান
      </button>
    </motion.div>
  );
}

function GridItem({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <motion.div 
      id={`grid-item-${label.replace(/\s+/g, '-').toLowerCase()}`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2.5 group cursor-pointer"
    >
      <div className="w-[66px] h-[66px] bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-50 flex items-center justify-center p-4 group-hover:shadow-[#00a859]/20 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50" />
        <div className="w-full h-full relative z-10 flex items-center justify-center">
          {cloneElement(icon as ReactElement, { className: 'w-full h-full stroke-[2.2]' })}
        </div>
      </div>
      <span className="text-[10px] font-black text-gray-700 text-center leading-[1.1] tracking-tight px-0.5 max-w-[70px]">
        {label}
      </span>
    </motion.div>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean; icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button 
      id={`nav-item-${label.replace(/\s+/g, '-').toLowerCase()}`}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 min-w-[70px] relative transition-colors ${active ? 'text-[#00a859]' : 'text-gray-400'}`}
    >
      <div className={`p-1.5 rounded-2xl transition-all duration-300 ${active ? 'bg-green-100' : ''}`}>
        {cloneElement(icon as ReactElement, { className: 'w-6 h-6 stroke-[2.5]' })}
      </div>
      <span className={`text-[9px] ${active ? 'font-black' : 'font-bold'}`}>{label}</span>
      {active && <motion.div layoutId="nav-pill" className="absolute -top-2 w-8 h-1 bg-[#00a859] rounded-full" />}
    </button>
  );
}

function SocialIcon({ bg, icon }: { bg: string; icon: ReactNode }) {
  return (
    <motion.a 
      id={`social-link-${bg.replace('bg-', '')}`}
      href="#" 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.9 }}
      className={`p-3 ${bg} rounded-2xl text-white shadow-lg shadow-current/10 transition-transform`}
    >
      {cloneElement(icon as ReactElement, { className: 'w-6 h-6 fill-current' })}
    </motion.a>
  );
}

function WalletMenuItem({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <button id={`wallet-menu-item-${label.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
      <div className="flex items-center gap-4">
        <div id={`wallet-menu-icon-${label.replace(/\s+/g, '-').toLowerCase()}`} className={`${color} bg-gray-50 p-2.5 rounded-xl`}>
          <Icon className="w-5 h-5" />
        </div>
        <span id={`wallet-menu-label-${label.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm font-bold text-gray-700">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </button>
  );
}

function StatCard({ label, value, bg }: { label: string; value: string; bg: string }) {
  return (
    <div className={`${bg} rounded-2xl p-4 text-white shadow-lg flex flex-col justify-between aspect-square`}>
      <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-black">{value}</p>
    </div>
  );
}

function MemberItem({ name, date, status }: { name: string; date: string; status: string }) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00a859]/10 rounded-full flex items-center justify-center font-bold text-[#00a859]">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">{name}</p>
          <p className="text-[10px] text-gray-400">{date}</p>
        </div>
      </div>
      <span className="bg-orange-100 text-orange-700 text-[9px] font-bold px-2 py-1 rounded-md">{status}</span>
    </div>
  );
}

function CategorySection({ title, items }: { title: string; items: { label: string; count: number }[] }) {
  return (
    <div id={`category-section-${title.replace(/\s+/g, '-').toLowerCase()}`} className="space-y-3">
      <div id={`category-section-title-${title.id || title}`} className="bg-[#00a859] text-white px-4 py-2 rounded-xl text-xs font-bold w-fit shadow-md">{title}</div>
      <div id={`category-items-grid-${title.id || title}`} className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div id={`category-item-${item.label.replace(/\s+/g, '-').toLowerCase()}`} key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <div className="p-3 text-center">
              <p className="text-[11px] font-bold text-gray-700">{item.label}</p>
              <p className="text-[9px] text-[#00a859] font-medium">({item.count})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



