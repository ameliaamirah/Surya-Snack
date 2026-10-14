import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailClient from '@/components/ProductDetailClient';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import type { Product } from '@/types';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

const formatIDR = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'Harga hubungi CS';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductBySlug(id);

  if (!product) {
    return {
      title: 'Produk tidak ditemukan | Surya Snack',
      description: 'Produk yang kamu cari tidak tersedia atau sudah tidak aktif.',
    };
  }

  const activeCategory = product.category?.trim();
  const priceLabel = formatIDR(product.price);
  const pageTitle = `${product.name} | Surya Snack`;
  const pageDescription =
    product.description?.trim() ||
    `Lihat detail ${product.name}${activeCategory ? ` kategori ${activeCategory}` : ''}. ${priceLabel}. Oleh-oleh khas Banyuwangi dari Surya Snack.`;
  const ogImages = product.image_url?.startsWith('http')
    ? [{ url: product.image_url }]
    : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: { title: pageTitle, description: pageDescription, type: 'website', images: ogImages },
    twitter: { card: 'summary_large_image', title: pageTitle, description: pageDescription, images: ogImages },
  };
}

export default async function DetailProdukPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductBySlug(id);

  if (!product) notFound();

  const allProducts = await getAllProducts();
  const activeCategory = product.category?.trim();

  // Rekomendasi: 优先 kategori sama, lalu produk lain (maks 4)
  const relatedProducts: Product[] = [];
  const addedIds = new Set<Product['id']>([product.id]);

  if (activeCategory) {
    for (const item of allProducts) {
      if (relatedProducts.length >= 4) break;
      if (!addedIds.has(item.id) && item.category?.trim() === activeCategory) {
        relatedProducts.push(item);
        addedIds.add(item.id);
      }
    }
  }
  for (const item of allProducts) {
    if (relatedProducts.length >= 4) break;
    if (!addedIds.has(item.id)) {
      relatedProducts.push(item);
      addedIds.add(item.id);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5] text-neutral-800 antialiased selection:bg-[#5c0f1c] selection:text-white">
      
      {/* ===== BACKGROUND PREMIUM ===== */}
      <div className="absolute inset-0 -z-30 bg-[#FAF8F5]" />
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #5c0f1c 1px, transparent 1px), linear-gradient(to bottom, #5c0f1c 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse at center, transparent 8%, black 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 8%, black 72%)',
        }}
      />
      <div className="pointer-events-none absolute -top-48 -left-24 -z-10 h-[680px] w-[680px] rounded-full bg-gradient-to-br from-amber-200/50 via-orange-100/25 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-[620px] w-[620px] rounded-full bg-gradient-to-bl from-rose-200/40 via-amber-100/20 to-transparent blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-[rgba(92,15,28,0.08)] via-amber-100/25 to-transparent blur-[150px]" />

      {/* ===== KONTEN ===== */}
      <div className="relative z-10">
        
        {/* Detail produk (layout ala referensi) */}
        <ProductDetailClient product={product} />

        {/* Rekomendasi produk lainnya */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                  Rekomendasi Lainnya
                </h2>
                <p className="text-sm text-gray-500">
                  Camilan khas lain yang cocok jadi pelengkap pesananmu.
                </p>
              </div>
              <Link
                href="/katalog"
                className="hidden shrink-0 items-center gap-2 rounded-xl border border-[#EBE3D5] bg-white/80 px-4 py-2.5 text-xs font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5c0f1c]/25 hover:bg-white hover:text-[#5c0f1c] hover:shadow-md sm:inline-flex sm:text-sm"
              >
                Lihat Semua Produk
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <div key={item.id} className="h-full">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}