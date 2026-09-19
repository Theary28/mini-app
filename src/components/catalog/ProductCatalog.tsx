import { useEffect, useState, type ChangeEvent } from 'react'
import AddProductForm from './AddProductForm'
import ProductItem from './ProductItem'
import { fetchProducts } from '@/lib/fetchProducts'
import { toPublicProduct } from '@/lib/toPublicProduct'
import type { Product } from '@/types'

type LoadStatus = 'loading' | 'ready' | 'error'

// Shared by every card.
const cardDisplay = {
  currency: 'USD',
  discountPrecent: 20,
}

function ProductCatalog() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [loadError, setLoadError] = useState<string | null>(null)
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts(controller.signal)
      .then((data) => {
        setProducts(data)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setLoadError(error instanceof Error ? error.message : String(error))
        setStatus('error')
      })

    return () => controller.abort()
  }, [])

  const publicProducts = products!.map(toPublicProduct)
  const visibleProducts = inStockOnly
    ? publicProducts.filter((product) => product.inStock)
    : publicProducts
  const saleCount = visibleProducts.filter((product) => product.onSale).length

  function handleAdd(product: Product) {
    setProducts((prev) => [...prev!, product])
  }

  function handleToggleSale(id: string) {
    setProducts((prev) =>
      prev!.map((product) =>
        product.id === id ? { ...product, onSale: !product.onSale } : product,
      ),
    )
  }

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    setInStockOnly(e.target.checked)
  }

  return (
    <div className="space-y-6">
      <AddProductForm onAdd={handleAdd} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-gray-700">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'product' : 'products'}
          </p>
          {saleCount > 0 && (
            <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              {saleCount} on sale
            </span>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={handleFilterChange}
            className="size-4 accent-blue-600"
          />
          In stock only
        </label>
      </div>

      {status === 'loading' && (
        <p className="text-sm text-gray-500">Loading products…</p>
      )}

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          Could not load products: {loadError}
        </p>
      )}

      {status === 'ready' && visibleProducts.length === 0 && (
        <p className="text-sm text-gray-500">No products match this filter.</p>
      )}

      {visibleProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onToggleSale={handleToggleSale}
              {...cardDisplay}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCatalog
