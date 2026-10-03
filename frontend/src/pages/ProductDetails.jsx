import { Link, useParams } from 'react-router-dom'

import products from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

function ProductDetails() {
  const { id } = useParams()

  const product = products.find(
    (item) => String(item.id) === String(id)
  )

  const { addToCart } = useCart()

  const {
    isInWishlist,
    toggleWishlist,
  } = useWishlist()

  if (!product) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Product not found
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-text-primary">
            We couldn't find that product.
          </h1>

          <p className="mt-3 text-text-secondary">
            The product may have been removed or the link may be incorrect.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Browse products
          </Link>

        </div>
      </section>
    )
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100,
  )

  const productInWishlist =
    isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleWishlistToggle = () => {
    toggleWishlist(product)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
        <Link
          to="/"
          className="transition-colors hover:text-brand-accent"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          to="/products"
          className="transition-colors hover:text-brand-accent"
        >
          Products
        </Link>

        <span>/</span>

        <span className="text-text-primary">
          {product.name}
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

        {/* Product image area */}

        <div className="overflow-hidden rounded-3xl border border-border bg-white">

          <div className="relative flex min-h-[480px] items-center justify-center bg-[#f5f2ec] p-10">

            <span className="absolute left-6 top-6 rounded-md bg-brand-accent px-3 py-1.5 text-xs font-bold text-white">
              {discount}% OFF
            </span>

            <div className="flex h-full min-h-[400px] w-full items-center justify-center text-center">

              <p className="max-w-xs text-sm font-medium text-text-secondary">
                Product image will be added later
              </p>

            </div>

          </div>

        </div>

        {/* Product information */}

        <div className="flex flex-col justify-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            {product.brand}
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">

            <span className="rounded-md bg-brand-dark px-3 py-1.5 text-sm font-semibold text-white">
              ★ {product.rating}
            </span>

            <span className="text-sm text-text-secondary">
              {product.reviews} reviews
            </span>

            {product.stock > 0 && (
              <span className="rounded-md bg-green-50 px-3 py-1.5 text-sm font-semibold text-success">
                In stock
              </span>
            )}

          </div>

          <div className="mt-8 flex items-baseline gap-4">

            <span className="text-4xl font-bold tracking-tight text-text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            <span className="text-lg text-text-muted line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>

          </div>

          <p className="mt-2 text-sm font-semibold text-brand-accent">
            Save ₹
            {(
              product.originalPrice -
              product.price
            ).toLocaleString('en-IN')}
          </p>

          <div className="mt-8 border-t border-border pt-8">

            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-text-primary">
              Product information
            </h2>

            <dl className="mt-5 space-y-4">

              <div className="flex justify-between gap-6 border-b border-border pb-4">
                <dt className="text-sm text-text-secondary">
                  Category
                </dt>

                <dd className="text-right text-sm font-medium text-text-primary">
                  {product.category}
                </dd>
              </div>

              <div className="flex justify-between gap-6 border-b border-border pb-4">
                <dt className="text-sm text-text-secondary">
                  Brand
                </dt>

                <dd className="text-right text-sm font-medium text-text-primary">
                  {product.brand}
                </dd>
              </div>

              <div className="flex justify-between gap-6">
                <dt className="text-sm text-text-secondary">
                  Availability
                </dt>

                <dd className="text-right text-sm font-medium text-text-primary">
                  {product.stock > 0
                    ? `${product.stock} units available`
                    : 'Out of stock'}
                </dd>
              </div>

            </dl>

          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex-1 rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleWishlistToggle}
              className={`rounded-lg border px-6 py-3.5 text-sm font-semibold transition-colors ${
                productInWishlist
                  ? 'border-brand-accent bg-brand-accent text-white'
                  : 'border-border-strong bg-white text-text-primary hover:border-brand-accent hover:text-brand-accent'
              }`}
            >
              {productInWishlist
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'}
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default ProductDetails