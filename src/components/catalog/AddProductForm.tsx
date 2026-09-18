import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { hasErrors, validateProduct } from '@/lib/validateProduct'
import type { Product, ProductFormData, ProductFormErrors } from '@/types'

interface AddProductFormProps {
  onAdd: (product: Product) => void
}

const emptyForm: ProductFormData = { name: '', price: '' }

function AddProductForm({ onAdd }: AddProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(emptyForm)
  const [errors, setErrors] = useState<ProductFormErrors>({})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nextErrors = validateProduct(form)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      price: Number(form.price),
      inStock: true,
      onSale: false,
    })
    setForm(emptyForm)
  }

  const inputClass =
    'w-full rounded-md border px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-200'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:grid-cols-[2fr_1fr_auto] sm:items-start"
    >
      <div className="space-y-1">
        <label htmlFor="product-name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="product-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          className={`${inputClass} ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="product-price" className="text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="product-price"
          name="price"
          type="text"
          inputMode="decimal"
          value={form.price}
          onChange={handleChange}
          aria-invalid={Boolean(errors.price)}
          className={`${inputClass} ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
      </div>

      <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 sm:mt-6">
        Add product
      </Button>
    </form>
  )
}

export default AddProductForm
