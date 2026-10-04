import {
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import ProductCard from '@/components/product/ProductCard'
import { getProducts } from '@/services/productService'

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {
    const loadFeaturedProducts =
      async () => {
        try {
          setLoading(true)
          setError('')

          const products =
            await getProducts()

          const featured =
            products
              .filter(
                (product) =>
                  product.rating >= 4.5,
              )
              .slice(0, 8)

          setFeaturedProducts(
            featured,
          )
        } catch (error) {
          console.error(
            'Failed to load featured products:',
            error,
          )

          setError(
            'Unable to load featured products.',
          )
        } finally {
          setLoading(false)
        }
      }

    loadFeaturedProducts()
  }, [])

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

      {loading && (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-2xl border border-border bg-surface-card"
              />
            ),
          )}

        </div>
      )}

      {!loading && error && (
        <div className="mt-10 rounded-2xl border border-border bg-surface-card px-6 py-16 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
            NEXHOME
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-text-primary">
            Something went wrong
          </h3>

          <p className="mt-3 text-sm text-text-secondary">
            {error}
          </p>

        </div>
      )}

      {!loading &&
        !error &&
        featuredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border bg-surface-card px-6 py-16 text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
              NEXHOME
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-text-primary">
              No featured products
            </h3>

            <p className="mt-3 text-sm text-text-secondary">
              There are currently no products with a rating of 4.5 or higher.
            </p>

          </div>
        )}

      {!loading &&
        !error &&
        featuredProducts.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {featuredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ),
            )}

          </div>
        )}

    </section>
  )
}

export default FeaturedProducts