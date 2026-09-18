export interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
  onSale: boolean
}

// Form inputs are always strings; price is converted to a number on submit.
export interface ProductFormData {
  name: string
  price: string
}

export interface ProductFormErrors {
  name?: string
  price?: string
}
