import { supabase } from './supabase';
import type { Product } from '@/types';

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sales', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product:', error.message);
    return null;
  }
  return (data as Product) ?? null;
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .eq('is_active', true);

  if (error) return [];

  const categories = [
    ...new Set(
      (data as { category: string | null }[])
        ?.map((p) => p.category)
        .filter((c): c is string => Boolean(c)) ?? []
    ),
  ];

  return categories;
}

// ✅ FUNGSI YANG DIPERBAIKI
export function formatRupiah(price: number | null): string {
  if (price === null || price === undefined) {
    return 'Hubungi untuk harga';
  }
  return `Rp ${price.toLocaleString('id-ID')}`;
}