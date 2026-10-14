'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBars,
  faXmark,
  faChevronRight,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Navbar(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isSearchOpenMobile) setIsSearchOpenMobile(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpenMobile(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/katalog?search=${encodeURIComponent(query)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
      setIsSearchOpenMobile(false);
    }
  };

  const menuItems = [
    { href: '/', label: 'Beranda' },
    { href: '/katalog', label: 'Produk' },
    { href: '/tentang', label: 'Tentang' },
    { href: '/kontak', label: 'Kontak' },
  ];

  return (
    <>
      {/* ============================== NAVBAR HEADER ============================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2 transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden backdrop-blur-2xl border border-amber-400/20 bg-gradient-to-r from-[#3d0812]/95 via-[#5c0f1c]/95 to-[#3d0812]/95 ${
            isScrolled
              ? 'shadow-2xl shadow-black/40 ring-1 ring-amber-400/30'
              : 'shadow-xl shadow-[#5c0f1c]/20'
          }`}
        >
          {/* Ambient Lighting & Accent Line */}
          <div className="absolute -left-12 -top-12 w-36 h-36 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

          <div className="relative px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3 z-20">
            
            {/* ===== KIRI: Mobile Menu Trigger + Brand Logo ===== */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={toggleMobileMenu}
                aria-label="Buka Menu Navigasi"
                className="lg:hidden w-10 h-10 rounded-xl text-amber-200 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center border border-amber-400/20 shadow-xs"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="w-4 h-4" />
              </button>

              <Link
                href="/"
                className="group flex items-center gap-3 hover:opacity-95 transition"
              >
                <div className="relative shrink-0">
                  <Image
                    src="/logo.jpeg"
                    alt="Surya Snack Logo"
                    width={44}
                    height={44}
                    className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-2xl border border-amber-400/60 ring-2 ring-amber-400/20 shadow-md transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#5c0f1c] shadow-sm animate-pulse" />
                </div>

                <div className="flex flex-col leading-none">
                  <span className="text-base sm:text-lg font-black tracking-wide text-white group-hover:text-amber-300 transition-colors">
                    Surya Snack
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-amber-300/90 mt-1 hidden xs:block">
                    Khas Banyuwangi
                  </span>
                </div>
              </Link>
            </div>

            {/* ===== TENGAH: Navigasi Desktop ===== */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-2xl p-1.5 border border-white/15 shadow-inner">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center ${
                      active
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#420913] shadow-md shadow-amber-400/30 font-extrabold scale-[1.02]'
                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ===== KANAN: Form Pencarian ===== */}
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="relative hidden sm:block group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari jajanan khas..."
                  suppressHydrationWarning
                  className="bg-black/40 text-white text-xs placeholder:text-gray-400 pl-9 pr-12 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400/80 focus:border-transparent focus:bg-black/70 w-44 md:w-56 lg:w-60 transition-all shadow-inner"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-3.5 h-3.5 text-amber-300/80 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-amber-300 transition"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-300 bg-white/15 px-1.5 py-0.5 rounded border border-white/10 pointer-events-none">
                  ⏎
                </span>
              </form>

              {/* Toggle Search Button untuk Layar Kecil */}
              <button
                onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
                aria-label="Cari Produk"
                className="sm:hidden w-10 h-10 rounded-xl text-amber-200 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 transition flex items-center justify-center border border-amber-400/20 shadow-xs"
              >
                <FontAwesomeIcon icon={isSearchOpenMobile ? faXmark : faSearch} className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* 🔍 BAR PENCARIAN MOBILE */}
          {isSearchOpenMobile && (
            <div className="sm:hidden px-4 pb-4 pt-2 border-t border-white/15 bg-black/60 backdrop-blur-md animate-fadeIn">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari jajanan khas Banyuwangi..."
                  suppressHydrationWarning
                  autoFocus
                  className="w-full bg-black/70 text-white text-xs placeholder:text-gray-400 pl-9 pr-16 py-3 rounded-xl border border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-3.5 h-3.5 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-[#420913] text-[11px] font-extrabold px-3.5 py-1.5 rounded-lg shadow-sm"
                >
                  Cari
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* ==================== MOBILE DRAWER OVERLAY ==================== */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300 lg:hidden"
        />
      )}

      {/* ==================== MOBILE DRAWER MENU ==================== */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-xs sm:max-w-sm z-50 transform transition-transform duration-300 ease-out lg:hidden flex flex-col bg-[#FAF8F5] shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Drawer */}
        <div className="relative bg-gradient-to-br from-[#3d0812] via-[#5c0f1c] to-[#3d0812] p-6 text-white shrink-0 overflow-hidden shadow-md">
          <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex items-center justify-between mb-5">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <Image
                src="/logo.jpeg"
                alt="Surya Snack Logo"
                width={44}
                height={44}
                className="w-11 h-11 object-cover rounded-xl border-2 border-amber-400 shadow-md"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-black tracking-wide text-white">
                  Surya Snack
                </span>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-amber-300">
                  Khas Banyuwangi
                </span>
              </div>
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="w-9 h-9 rounded-xl text-gray-200 hover:text-white bg-white/15 flex items-center justify-center active:scale-95 transition shadow-xs"
              aria-label="Tutup menu"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input di Dalam Drawer */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari jajanan favorit..."
              suppressHydrationWarning
              className="w-full bg-black/40 text-white text-xs placeholder:text-gray-300/80 pl-9 pr-4 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="w-3.5 h-3.5 text-amber-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </form>
        </div>

        {/* List Menu */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          <div>
            <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
              Navigasi Utama
            </p>
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-[#5c0f1c] to-[#7a1425] text-white shadow-md shadow-[#5c0f1c]/25'
                        : 'text-gray-700 hover:bg-amber-100/60 hover:text-[#5c0f1c]'
                    }`}
                  >
                    <span className="text-sm font-extrabold">{item.label}</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className={`w-3 h-3 ${active ? 'text-amber-300' : 'text-gray-300'}`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Banner Kontak Cepat */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/60 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-[#5c0f1c] font-bold text-xs">
              <FontAwesomeIcon icon={faStore} className="w-3.5 h-3.5 text-amber-600" />
              <span>Pusat Oleh-Oleh Banyuwangi</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Siap melayani pemesanan langsung & pengiriman ke seluruh Indonesia.
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href="https://wa.me/6289509604700"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/suryasnack.banyuwangi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[11px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Footer Drawer */}
        <div className="bg-gray-100/90 border-t border-gray-200/80 px-5 py-3.5 shrink-0 text-center">
          <p className="text-[10px] font-bold text-gray-500">
            © 2026 Surya Snack Banyuwangi
          </p>
        </div>
      </aside>
    </>
  );
}