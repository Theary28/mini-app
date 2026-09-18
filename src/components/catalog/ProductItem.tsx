import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types'

interface ProductItemProps {
  product: Product
  onToggleSale: (id: string) => void
}

const priceFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ProductItem({ product, onToggleSale }: ProductItemProps) {
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

        <p className="text-lg font-semibold text-gray-900">
          {priceFormat.format(product.price)}
          {product.onSale && (
            <span className="ml-2 text-xs font-medium text-red-600">SALE</span>
          )}
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
