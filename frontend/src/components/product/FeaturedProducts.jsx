import { Link } from 'react-router-dom'
import products from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
            Featured
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Popular products
          </h2>

          <p className="mt-4 text-base leading-7 text-text-secondary">
            Discover some of the products customers are looking at right now.
          </p>
        </div>

        <Link
          to="/products"
          className="hidden shrink-0 text-sm font-semibold text-brand-accent transition-colors hover:text-brand-accent-dark sm:block"
        >
          View all products →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts