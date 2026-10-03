import { Link } from 'react-router-dom'

import products from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

function FeaturedProducts() {
  const featuredProducts = products
    .filter((product) => product.rating >= 4.5)
    .slice(0, 8)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Featured Collection
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Popular products
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
            Explore some of the highest-rated products available at NEXHOME.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex w-fit items-center rounded-lg bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
        >
          View all products
        </Link>

      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featuredProducts.map((product) => (
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