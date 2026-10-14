'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatRupiah } from '@/lib/products';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col">

      {/* Gambar */}
      <Link
        href={`/katalog/${product.slug}`}
        className="relative w-full aspect-square overflow-hidden bg-gray-50 block"
      >
        <Image
          src={
            product.image_url ||
            'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=400'
          }
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Info Produk */}
      <div className="p-4 flex flex-col flex-grow gap-3">

        {/* Nama Produk */}
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Harga */}
        <p className="text-[#5c0f1c] font-bold text-base mt-auto">
          {formatRupiah(product.price)}
        </p>

        {/* Tombol Lihat Detail */}
        <Link
          href={`/katalog/${product.slug}`}
          className="block text-center w-full border border-[#5c0f1c] text-[#5c0f1c] hover:bg-[#5c0f1c] hover:text-white font-semibold py-2 rounded-lg text-xs transition-all duration-300"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}