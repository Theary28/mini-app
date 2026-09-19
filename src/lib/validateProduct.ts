import type { ProductDraft, ProductFormErrors } from '@/types'

// Pure function: reads the draft, returns a fresh errors object.
// It never touches React state — the caller decides what to do with the result.
export function validateProduct(draft: ProductDraft): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if ((draft.name?.trim() ?? '') === '') {
    errors.name = 'Name is required.'
  }

  const price = draft.price?.trim() ?? ''
  if (price === '') {
    errors.price = 'Price is required.'
  } else if (!Number.isFinite(Number(price))) {
    errors.price = 'Price must be a number.'
  } else if (Number(price) < 0) {
    errors.price = 'Price cannot be negative.'
  }

  return errors
}

export function hasErrors(errors: ProductFormErrors): boolean {
  return Object.keys(errors).length > 0
}
