import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faSun,
  faLocationDot,
  faClock,
  faPhone,
  faArrowUp,
  faChevronRight,
  faBuildingColumns,
  faWallet,
  faHandHoldingDollar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/katalog', label: 'Katalog Produk' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/kontak', label: 'Kontak & Lokasi' },
];

const payments = [
  { icon: faBuildingColumns, label: 'Transfer Bank' },
  { icon: faWallet, label: 'E-Wallet' },
  { icon: faHandHoldingDollar, label: 'COD Banyuwangi' },
];

export default function Footer(): React.ReactElement {
  const waUrl = 'https://wa.me/6289509604700';
  const igUrl = 'https://www.instagram.com/suryasnack.banyuwangi';

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#3b0912] to-[#26050b] text-gray-300">
      
      {/* Garis aksen premium di puncak footer */}
      <div className="h-1 w-full bg-gradient-to-r from-[#5c0f1c] via-amber-400 to-[#5c0f1c]" />

      {/* Pattern titik halus */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Glow dekoratif */}
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#5c0f1c]/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-14">
          
          {/* ===== KOLOM BRAND ===== */}
          <div className="space-y-5 md:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-[#3b0912] shadow-lg shadow-amber-500/20">
                <FontAwesomeIcon icon={faSun} className="h-5 w-5" />
              </span>
              <div className="space-y-2.5">
                <p className="text-lg font-extrabold tracking-tight text-white">
                  Surya Snack
                </p>
                <p className="text-[13px] font-semibold uppercase tracking-widest text-amber-300/80">
                  Oleh-oleh Khas Banyuwangi
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-9 text-gray-400">
              Menghadirkan kelezatan jajanan tradisional Banyuwangi dengan
              kualitas terbaik, dibuat fresh setiap hari sejak 1998.
            </p>

            {/* Sosial media */}
            <div className="flex gap-3 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Surya Snack"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-[#3b0912]"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
              </a>
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Surya Snack"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-[#3b0912]"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ===== KOLOM NAVIGASI ===== */}
          <nav className="lg:col-span-2" aria-label="Navigasi footer">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Navigasi
            </h4>
            <ul className="mt-8 space-y-5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-gray-400 transition hover:text-amber-300"
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="h-2.5 w-2.5 text-amber-400/60 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== KOLOM KONTAK & JAM BUKA ===== */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Kontak & Jam Buka
            </h4>
            <ul className="mt-8 space-y-6 text-sm leading-6 text-gray-400">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>Banyuwangi, Jawa Timur, Indonesia</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faClock} className="mt-1 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>Setiap hari, 08.00–20.00 WIB</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faPhone} className="mt-1 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>0895-0960-4700</span>
              </li>
            </ul>
          </div>

          {/* ===== KOLOM METODE PEMBAYARAN ===== */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Metode Pembayaran
            </h4>
            <div className="mt-6 flex flex-wrap gap-3">
              {payments.map((method) => (
                <span
                  key={method.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-gray-200 transition hover:border-amber-400/40 hover:bg-white/10"
                >
                  <FontAwesomeIcon icon={method.icon} className="h-3.5 w-3.5 text-amber-300" />
                  {method.label}
                </span>
              ))}
            </div>
            <p className="mt-4 max-w-xs text-xs leading-7 text-gray-500">
              Transaksi aman, transparan, dan dikonfirmasi langsung oleh admin.
            </p>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row sm:justify-between sm:gap-4">
          <p className="text-xs leading-6 text-gray-500">
            © 2026 Surya Snack. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-gray-500">
            <Link href="#" className="transition hover:text-amber-300">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="transition hover:text-amber-300">
              Kebijakan Privasi
            </Link>
            <span className="inline-flex items-center gap-1.5">
              Dibuat dengan
              <FontAwesomeIcon icon={faHeart} className="h-3 w-3 text-amber-400" />
              di Banyuwangi
            </span>
          </div>

          {/* Kembali ke atas */}
          <a
            href="#"
            aria-label="Kembali ke atas"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-[#3b0912]"
          >
            <FontAwesomeIcon icon={faArrowUp} className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}