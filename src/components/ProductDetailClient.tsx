'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft,
  faLocationDot,
  faWeightHanging,
  faStar,
  faBoxOpen,
  faRoute,
  faCircleCheck,
  faFire,
  faTag,
  faMagnifyingGlassPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const waNumber = '6289509604700';
  const instagramUrl = 'https://www.instagram.com/suryasnack.banyuwangi';

  const images: string[] = [
    product.image_url ||
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800',
    ...(product.images || []),
  ]
    .filter(Boolean)
    .slice(0, 4);

  const formatRupiah = (price: number | null): string =>
    price === null || price === undefined
      ? 'Hubungi untuk harga'
      : `Rp ${price.toLocaleString('id-ID')}`;

  const priceText = product.price ? ` (${formatRupiah(product.price)})` : '';

  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo Surya Snack, saya ingin memesan ${product.name}${priceText}`.trim()
  )}`;

  // Lock scroll + tutup pakai Esc saat lightbox terbuka
  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomOpen]);

  // ===== Keunggulan produk =====
  const highlights = [
    'Dibuat fresh setiap hari dengan resep khas turun-temurun',
    'Bahan baku pilihan dari petani dan pengrajin lokal Banyuwangi',
    'Kemasan rapat & food grade, aman untuk pengiriman jarak jauh',
    'Higienis, halal, dan tanpa pengawet berbahaya',
    product.sales > 0
      ? `Sudah dipercaya ${product.sales}+ pelanggan di berbagai kota`
      : null,
    product.badge ? `Termasuk produk unggulan: ${product.badge}` : null,
  ]
    .filter(Boolean)
    .slice(0, 6) as string[];

  // ===== Spesifikasi =====
  const specs = [
    product.category ? `Kategori: ${product.category}` : null,
    product.weight ? `Berat per kemasan: ${product.weight}` : null,
    product.stock > 0
      ? `Stok tersedia: ${product.stock} pcs siap kirim`
      : 'Stok sedang habis — bisa pre-order via WhatsApp',
    product.sales > 0 ? `Total terjual: ${product.sales} pcs` : null,
    product.ingredients ? `Komposisi: ${product.ingredients}` : null,
  ].filter(Boolean) as string[];

  // ===== Alur pemesanan =====
  const orderSteps: [string, string][] = [
    ['Klik Pesan', 'Tombol WhatsApp terbuka dengan format pesanan otomatis berisi nama produk.'],
    ['Konfirmasi', 'Admin membalas ketersediaan stok, total harga, dan pilihan ekspedisi.'],
    ['Pembayaran', 'Transfer bank, e-wallet, atau COD untuk area Banyuwangi.'],
    ['Pengemasan', 'Produk dikemas fresh dan rapat pada hari yang sama.'],
    ['Pengiriman', 'Paket dikirim via ekspedisi pilihan, lengkap dengan nomor resi.'],
  ];

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 pb-28 pt-24 sm:px-6 sm:pt-28 lg:pb-12">
      
      {/* ===== TOMBOL KEMBALI ===== */}
      <Link
        href="/katalog"
        className="inline-flex items-center gap-2 rounded-full border border-[#EBE3D5] bg-white/90 px-4 py-2 text-xs font-bold text-gray-600 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-[#5c0f1c]/30 hover:text-[#5c0f1c] hover:shadow-md sm:text-sm"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
        Kembali ke Katalog
      </Link>

      {/* ===== META ROW ===== */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
        <span className="rounded-full bg-[#5c0f1c] px-3.5 py-1 text-xs font-bold text-white shadow-sm">
          {product.badge || 'Best Seller'}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 text-[#5c0f1c]" />
          Banyuwangi
        </span>

        {product.weight && (
          <span className="inline-flex items-center gap-1.5">
            <FontAwesomeIcon icon={faWeightHanging} className="h-3.5 w-3.5 text-[#5c0f1c]" />
            {product.weight}
          </span>
        )}

        {product.category && (
          <span className="inline-flex items-center gap-1.5 text-gray-500">
            <FontAwesomeIcon icon={faTag} className="h-3 w-3 text-[#5c0f1c]/60" />
            {product.category}
          </span>
        )}
      </div>

      {/* ===== JUDUL PRODUK ===== */}
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {product.name}
      </h1>

      {/* ===== HERO IMAGE (UTUH + BISA DI-ZOOM) ===== */}
      <button
        type="button"
        onClick={() => setZoomOpen(true)}
        aria-label="Perbesar gambar produk"
        className="group relative mt-6 block aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[#EBE3D5] bg-[#FAF6F0] shadow-sm sm:mt-8 sm:aspect-[4/3]"
      >
        <Image
          src={images[selectedImage]}
          alt={product.name}
          fill
          priority
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 64rem"
          className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03] sm:p-6"
        />

        {/* Petunjuk zoom */}
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md transition group-hover:bg-black/60">
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} className="h-3 w-3" />
          Klik untuk memperbesar
        </span>
      </button>

      {/* Thumbnail galeri (lebih besar agar jelas) */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(idx)}
              aria-label={`Lihat gambar ${idx + 1}`}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:h-24 sm:w-24 ${
                selectedImage === idx
                  ? 'border-[#5c0f1c] ring-2 ring-amber-400/40'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ===== GRID 2 KOLOM ===== */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        
        {/* ---------- KOLOM KIRI ---------- */}
        <div className="min-w-0 space-y-12">
          
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Ringkasan Produk
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {product.category ? `Kategori ${product.category}` : 'Oleh-oleh khas Banyuwangi'}
            </p>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-gray-600 sm:text-base">
              {(product.long_description ?? product.description ?? '')
                .split('\n\n')
                .filter((par) => par.trim())
                .map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
            </div>
          </section>

          <section>
            <SectionHeading icon={faStar} title="Keunggulan Produk" />
            <ul className="mt-5 space-y-3.5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-gray-600 sm:text-[15px]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#5c0f1c]/25 bg-white text-[#5c0f1c]">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading icon={faBoxOpen} title="Spesifikasi & Kemasan" />
            <ul className="mt-5 space-y-2.5">
              {specs.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-gray-600 sm:text-[15px]"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#5c0f1c]/60" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading icon={faRoute} title="Alur Pemesanan" />
            <div className="mt-5 space-y-3 rounded-2xl border border-[#EBE3D5] bg-[#FAF6F0]/80 p-5 sm:p-6">
              {orderSteps.map(([label, text], i) => (
                <p key={label} className="text-sm leading-relaxed text-gray-600">
                  <span className="font-bold text-[#5c0f1c]">
                    {i + 1}. {label}
                  </span>
                  {' — '}
                  {text}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* ---------- KOLOM KANAN: SIDEBAR STICKY (DESKTOP) ---------- */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="space-y-4 rounded-2xl border border-[#EBE3D5] bg-white p-5 shadow-sm">
            
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Harga
              </span>
              <div className="mt-1 text-2xl font-extrabold tracking-tight text-[#5c0f1c] sm:text-3xl">
                {formatRupiah(product.price)}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-gray-100 py-3 text-xs font-semibold text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                <FontAwesomeIcon icon={faBoxOpen} className="h-3.5 w-3.5 text-[#5c0f1c]" />
                {product.stock > 0 ? `${product.stock} pcs siap kirim` : 'Stok habis'}
              </span>
              {product.sales > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faFire} className="h-3.5 w-3.5 text-[#5c0f1c]" />
                  {product.sales} terjual
                </span>
              )}
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
              Pesan via WhatsApp
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#5c0f1c]/20 py-3 text-sm font-bold text-[#5c0f1c] transition-all duration-300 hover:border-[#5c0f1c] hover:bg-[#5c0f1c] hover:text-white"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
              Kunjungi Instagram
            </a>

            <p className="text-center text-[11px] leading-relaxed text-gray-400">
              Respon cepat pada jam operasional 08.00–20.00 WIB.
            </p>
          </div>
        </aside>
      </div>

      {/* ===== STICKY BOTTOM BAR (MOBILE & TABLET) ===== */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#EBE3D5] bg-white/95 shadow-[0_-10px_30px_-15px_rgba(92,15,28,0.35)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-6">
          <div className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Harga
            </span>
            <span className="block truncate text-base font-extrabold text-[#5c0f1c] sm:text-lg">
              {formatRupiah(product.price)}
            </span>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all duration-200 active:scale-95"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
            Pesan Sekarang
          </a>
        </div>
      </div>

      {/* ===== LIGHTBOX ZOOM (FULLSCREEN) ===== */}
      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gambar ${product.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setZoomOpen(false)}
        >
          {/* Tombol close */}
          <button
            type="button"
            aria-label="Tutup gambar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>

          {/* Gambar fullscreen (utuh, object-contain) */}
          <div
            className="relative h-[70vh] w-full max-w-4xl sm:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              quality={90}
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Navigasi antar gambar di dalam lightbox */}
          {images.length > 1 && (
            <div
              className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  aria-label={`Gambar ${idx + 1}`}
                  className={`relative h-14 w-14 overflow-hidden rounded-lg border-2 transition ${
                    selectedImage === idx
                      ? 'border-white'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ SUB-COMPONENT: JUDUL SECTION ============ */
function SectionHeading({ icon, title }: { icon: IconDefinition; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <FontAwesomeIcon icon={icon} className="h-4 w-4 text-[#5c0f1c]" />
      <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">{title}</h2>
    </div>
  );
}