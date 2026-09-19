export interface ProductRating {
  average: number
  count: number
}

export interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
  onSale: boolean
  description?: string
  rating?: ProductRating
  // Internal: which supplier we buy this from. Never shown to shoppers.
  supplierId: string
}

// What a shopper's card is allowed to see — everything except internal fields.
export type PublicProduct = Omit<Product, 'supplierId'>

// Display settings shared by every product card. All optional; cards fall
// back to defaults with ??.
export interface ProductCardDisplay {
  currency?: string
  discountPercent?: number
}

// Form inputs are always strings; price is converted to a number on submit.
export interface ProductFormData {
  name: string
  price: string
}

// While the user is typing, any field may not exist yet.
export type ProductDraft = Partial<ProductFormData>

export type ProductFormErrors = Partial<Record<keyof ProductFormData, string>>
