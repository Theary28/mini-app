import type { Product, PublicProduct } from '@/types'

// Strips internal fields at runtime too, so they never reach the card's props
// (or React DevTools).
export function toPublicProduct(product: Product): PublicProduct {
  const { supplierId: _supplierId, ...publicFields } = product
  return publicFields
}
