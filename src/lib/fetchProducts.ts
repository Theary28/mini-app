import type { Product } from '@/types'

export const PRODUCTS_URL = '/api/products.json'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

// res.json() is typed as any, so the payload comes in as unknown and has to
// prove its shape here before the rest of the app treats it as Product[].
function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.price === 'number' &&
    typeof value.inStock === 'boolean' &&
    typeof value.onSale === 'boolean'
  )
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(PRODUCTS_URL, { signal })
  if (!res.ok) {
    throw new Error(`GET ${PRODUCTS_URL} failed with ${res.status}`)
  }

  const body: unknown = await res.json()
  if (!Array.isArray(body) || !body.every(isProduct)) {
    throw new Error(`GET ${PRODUCTS_URL} returned an unexpected payload`)
  }
  return body
}
