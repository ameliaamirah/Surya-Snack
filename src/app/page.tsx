import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faSmile,
  faUtensils,
  faStore,
  faHeadset,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export const revalidate = 60;

export default async function HomePage() {
  const products = await getFeaturedProducts(4);

  const features = [
    { icon: faSmile, title: 'Rasa Yang Autentik', desc: 'Resep asli khas daerah yang selalu diminati banyak orang.' },
    { icon: faUtensils, title: 'Bahan Pilihan', desc: 'Menggunakan bahan baku segar dan diproses secara higienis.' },
    { icon: faStore, title: 'Dibuat Fresh Setiap Hari', desc: 'Produksi rutin sehingga barang selalu baru dan tetap renyah.' },
    { icon: faHeadset, title: 'Pelayanan Ramah', desc: 'Layanan pemesanan mudah dan respon cepat via Whatsapp.' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased overflow-x-hidden">
      
      {/* ================= 1. HERO SECTION (FULL SCREEN MENTOK KE ATAS) ================= */}
      <section className="relative w-full h-screen min-h-[650px] flex items-center justify-start overflow-hidden pt-20 sm:pt-24">
        {/* Background Image - Mentok Penuh 1 Layar */}
        <Image
          src="/hero-background.jpg"
          alt="Surya Snack Hero Background"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-12 sm:pt-8">
          <div className="max-w-2xl space-y-4 sm:space-y-6 text-white">
            
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-[#5c0f1c]/90 backdrop-blur-md text-amber-300 text-[11px] sm:text-xs font-bold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full tracking-wide border border-amber-400/30 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Khas Dari Banyuwangi, Jawa Timur
            </span>

            {/* Title */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] sm:leading-[1.1] tracking-tight drop-shadow-md">
              Nikmati Cita Rasa <span className="text-amber-400">Khas</span> Berbagai Olahan Makanan
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-xs sm:text-base leading-relaxed max-w-xl font-normal">
              Nikmati cita rasa khas gurih & renyah dari Surya Snack yang diolah dengan resep tradisional dan bahan alami berkualitas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/katalog" 
                className="group bg-amber-400 hover:bg-amber-300 text-[#5c0f1c] font-bold px-7 py-3.5 rounded-lg shadow-xl transition-all text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 active:scale-95"
              >
                Lihat Produk
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a 
                href="https://wa.me/6289509604700" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 backdrop-blur-sm hover:bg-white/15 text-white border border-white/70 hover:border-white font-semibold px-7 py-3.5 rounded-lg transition-all text-sm hover:-translate-y-0.5 active:scale-95"
              >
                Pelajari Selengkapnya
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. PRODUK UNGGULAN ================= */}
      <section className="relative py-12 sm:py-20 overflow-hidden bg-white">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M 48 0 L 0 0 0 48' fill='none' stroke='%23d1d5db' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-4 sm:pb-6">
            <div>
              <span className="inline-block text-[#5c0f1c] text-xs font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2">
                Katalog Kami
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                Produk <span className="text-[#5c0f1c]">Unggulan</span> Kami
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
                Pilihan camilan terbaik favorit pelanggan kami.
              </p>
            </div>
            <Link
              href="/katalog"
              className="group text-[#5c0f1c] hover:text-[#7a1425] font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition shrink-0 self-start sm:self-auto"
            >
              Lihat Semua Produk
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs sm:text-sm bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              Belum ada produk. Silakan tambahkan di Supabase.
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= 3. TENTANG KAMI ================= */}
      <section className="relative bg-gradient-to-b from-amber-50/80 to-amber-50/30 py-12 sm:py-20 border-y border-amber-100/60 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 sm:w-64 h-48 sm:h-64 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-5 order-2 md:order-1">
            <div className="w-12 sm:w-14 h-1 bg-[#5c0f1c] rounded-full" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Menerima Pesanan, <span className="text-[#5c0f1c]">Menjaga Kualitas</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
              Surya Snack didirikan dengan komitmen untuk menyajikan makanan olahan khas lokal yang berkualitas tinggi, dibuat dari bahan-bahan pilihan tanpa pengawet buatan sehingga aman dikonsumsi seluruh keluarga.
            </p>
            <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
              Setiap varian makanan dari Surya Snack diproduksi dengan higienis dan standar kualitas tinggi untuk mempertahankan cita rasa asli khas Banyuwangi yang renyah dan gurih alami.
            </p>
            <div className="pt-2">
              <Link
                href="/tentang"
                className="group inline-flex items-center gap-2 text-[#5c0f1c] font-bold text-xs sm:text-sm hover:text-[#7a1425] transition"
              >
                Pelajari Lebih Lanjut
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 order-1 md:order-2">
            <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-md group border border-amber-100">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500"
                alt="Proses Pembuatan"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
              <div className="relative h-28 sm:h-36 rounded-2xl overflow-hidden shadow-md group border border-amber-100">
                <Image
                  src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=400"
                  alt="Produk Surya Snack"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-gradient-to-br from-[#5c0f1c] to-[#7a1425] text-white p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 h-24 sm:h-32 shadow-md">
                <span className="text-2xl sm:text-3xl font-black text-amber-300">100%</span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-white/90">
                  Produk Lokal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. KENAPA MEMILIH ================= */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center space-y-8 sm:space-y-14">
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Kenapa Memilih Surya Snack?
          </h2>
          <p className="text-gray-500 text-xs sm:text-base">
            Kami berkomitmen memberikan kualitas terbaik untuk pelanggan.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group space-y-3 sm:space-y-4 flex flex-col items-center p-5 sm:p-6 rounded-2xl bg-gray-50/60 hover:bg-amber-50/60 border border-gray-100 hover:border-amber-200/60 transition-all duration-300"
            >
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-rose-100 to-amber-100 text-[#5c0f1c] rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xs group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. CTA WHATSAPP ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-20">
        <div className="relative bg-gradient-to-br from-[#420913] via-[#5c0f1c] to-[#7a1425] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl overflow-hidden">
          <div className="absolute -top-16 -right-16 w-40 sm:w-48 h-40 sm:h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 sm:w-48 h-40 sm:h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative space-y-2 sm:space-y-3 text-center md:text-left max-w-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
              Tertarik Untuk Memesan Produk Surya Snack?
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed">
              Pesan sekarang melalui katalog atau langsung hubungi kami via WhatsApp.
            </p>
          </div>

          <div className="relative flex flex-col xs:flex-row gap-3 w-full md:w-auto justify-center">
            <Link
              href="/katalog"
              className="bg-amber-400 hover:bg-amber-300 text-[#5c0f1c] font-extrabold px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm text-center transition-all hover:-translate-y-0.5 active:scale-95 shadow-md"
            >
              Lihat Semua Produk
            </Link>
            <a
              href="https://wa.me/6289509604700"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all hover:-translate-y-0.5 active:scale-95 shadow-md"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
              <span>Pesan via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}