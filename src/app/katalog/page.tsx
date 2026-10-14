import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function KatalogPage({ searchParams }: PageProps) {
  const { search, category } = await searchParams;
  const allProducts = await getAllProducts();

  // Query search
  const query = search?.toLowerCase().trim() || '';
  const activeCategory = category?.toLowerCase().trim() || '';

  // Filter produk berdasarkan search + kategori
  let products = allProducts;
  if (query) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
    );
  }
  if (activeCategory) {
    products = products.filter(
      (p) => p.category?.toLowerCase() === activeCategory
    );
  }

  // Daftar kategori untuk filter pill
  const categories = [
    { id: 'semua', label: 'Semua Produk' },
    { id: 'kripik', label: 'Keripik Khas' },
    { id: 'kue', label: 'Kue Tradisional' },
    { id: 'bagiak', label: 'Bagiak Banyuwangi' },
    { id: 'ting-ting', label: 'Ting-Ting' },
    { id: 'krupuk', label: 'Kerupuk & Olahan' },
    { id: 'bolu', label: 'Bolu Khas' },
  ];

  return (
    <div className="relative min-h-screen text-gray-800 font-sans antialiased pb-20 bg-[#FAF6F0]">
      
      {/* ================= BACKGROUND TEKSTUR ================= */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.jpeg')`,
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#FAF6F0]/30 backdrop-blur-[0.5px]" />

      <div className="relative z-10">
        
        {/* ================= 1. HEADER JUDUL ================= */}
        <section className="pt-24 sm:pt-28 pb-6 sm:pb-8 border-b border-[#EBE3D5]/80 bg-[#FAF6F0]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 bg-[#5c0f1c]/10 text-[#5c0f1c] text-[11px] font-extrabold px-3.5 py-1 rounded-full tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#5c0f1c]" />
                  Oleh-Oleh Resmi Banyuwangi
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                  Katalog <span className="text-[#5c0f1c]">Surya Snack</span>
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Jelajahi kelezatan camilan gurih, renyah, dan jajanan tradisional khas Banyuwangi berkualitas premium yang dibuat fresh setiap hari.
                </p>
              </div>

              {/* Total Produk Ringkasan */}
              <div className="shrink-0 bg-white/90 border border-[#EBE3D5] rounded-2xl px-4 py-2.5 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-[#5c0f1c] flex items-center justify-center font-black text-lg">
                  {products.length}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold text-gray-900">Varian Camilan</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Tersedia Siap Kirim</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. BAR FILTER & PENCARIAN (NORMAL SCROLL / TIDAK MELAYANG) ================= */}
        <div className="w-full bg-[#FAF6F0]/90 border-b border-[#EBE3D5] shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">

            {/* Filter Kategori Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
              {categories.map((cat) => {
                const isActive =
                  (cat.id === 'semua' && !activeCategory && !query) ||
                  cat.id === activeCategory;
                return (
                  <Link
                    key={cat.id}
                    href={cat.id === 'semua' ? '/katalog' : `/katalog?category=${cat.id}`}
                    className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#5c0f1c] text-white shadow-md shadow-[#5c0f1c]/20'
                        : 'bg-white/90 hover:bg-amber-100/80 text-gray-700 hover:text-[#5c0f1c] border border-[#EBE3D5]'
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* Search Box */}
            <form
              action="/katalog"
              method="GET"
              className="relative w-full md:w-72 shrink-0"
            >
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Cari camilan favoritmu..."
                className="w-full bg-white/90 border border-[#EBE3D5] text-gray-800 text-xs placeholder:text-gray-400 pl-4 pr-10 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5c0f1c]/30 focus:border-[#5c0f1c] focus:bg-white transition shadow-inner"
              />
              <button
                type="submit"
                aria-label="Cari Produk"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#5c0f1c] text-white hover:bg-[#7a1425] active:scale-95 flex items-center justify-center transition shadow-xs"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

          </div>
        </div>

        {/* ================= 3. GRID PRODUK ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8">

          {/* Info Pencarian & Action Reset */}
          {(query || activeCategory) && (
            <div className="mb-6 bg-white/90 p-4 rounded-2xl border border-[#EBE3D5] shadow-xs flex items-center justify-between flex-wrap gap-3">
              <p className="text-xs sm:text-sm text-gray-600">
                Menampilkan <span className="font-extrabold text-[#5c0f1c]">{products.length} produk</span>
                {query && (
                  <>
                    {' '}untuk pencarian <span className="font-extrabold text-[#5c0f1c]">&ldquo;{search}&rdquo;</span>
                  </>
                )}
                {activeCategory && (
                  <>
                    {' '}dalam kategori <span className="font-extrabold text-[#5c0f1c]">{categories.find((c) => c.id === activeCategory)?.label || activeCategory}</span>
                  </>
                )}
              </p>
              <Link
                href="/katalog"
                className="text-xs font-bold text-[#5c0f1c] bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Reset Filter
              </Link>
            </div>
          )}

          {/* Grid Produk atau Empty State */}
          {products.length === 0 ? (
            <div className="bg-white/90 rounded-3xl p-8 sm:p-16 text-center border border-[#EBE3D5] shadow-sm space-y-4 my-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-amber-50 text-[#5c0f1c] rounded-2xl flex items-center justify-center shadow-xs">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Produk Tidak Ditemukan</h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                  {query
                    ? `Tidak ada jajanan yang cocok dengan kata kunci "${search}". Coba gunakan kata kunci lainnya.`
                    : 'Belum ada produk yang tersedia untuk kategori ini.'}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/katalog"
                  className="inline-flex items-center gap-2 bg-[#5c0f1c] hover:bg-[#7a1425] text-white font-extrabold text-xs px-5 py-3 rounded-xl transition shadow-md active:scale-95"
                >
                  ← Tampilkan Semua Produk
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </section>
      </div>
    </div>
  );
}