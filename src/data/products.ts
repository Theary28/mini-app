import type { Product } from '@/types'

export const initialProducts: Product[] = [
  { id: 'p-1', name: 'Mechanical Keyboard', price: 89.99, inStock: true, onSale: true },
  { id: 'p-2', name: 'Wireless Mouse', price: 24.5, inStock: true, onSale: false },
  { id: 'p-3', name: '27" 4K Monitor', price: 329, inStock: false, onSale: false },
  { id: 'p-4', name: 'USB-C Hub', price: 39.99, inStock: true, onSale: true },
  { id: 'p-5', name: 'Noise-Cancelling Headphones', price: 199, inStock: false, onSale: true },
  { id: 'p-6', name: 'Laptop Stand', price: 34, inStock: true, onSale: false },
]
