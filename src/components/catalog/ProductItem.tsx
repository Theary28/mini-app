import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductCardDisplay, PublicProduct } from '@/types'

interface ProductItemProps extends ProductCardDisplay {
  product: PublicProduct
  onToggleSale: (id: string) => void
}

function ProductItem({
  product,
  onToggleSale,
  currency,
  discountPercent,
}: ProductItemProps) {
  const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ?? 'USD',
  })
  const discount = product.onSale ? (discountPercent ?? 0) : 0
  const finalPrice = product.price * (1 - discount / 100)

  return (
    <article className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <Badge
            className={
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-200 text-gray-600'
            }
          >
            {product.inStock ? 'In stock' : 'Sold out'}
          </Badge>
        </div>

        <p className="text-sm text-gray-500">
          {product.description ?? 'No description yet.'}
        </p>

        <p className="text-lg font-semibold text-gray-900">
          {priceFormat.format(finalPrice)}
          {discount > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400 line-through">
              {priceFormat.format(product.price)}
            </span>
          )}
          {product.onSale && (
            <span className="ml-2 text-xs font-medium text-red-600">SALE</span>
          )}
        </p>

        <p className="text-xs text-gray-500">
          ★ {product.rating?.average.toFixed(1) ?? '–'} (
          {product.rating?.count ?? 0} reviews)
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleSale(product.id)}
      >
        {product.onSale ? 'Remove from sale' : 'Put on sale'}
      </Button>
    </article>
  )
}

export default ProductItem
