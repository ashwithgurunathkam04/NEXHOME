import { Link } from 'react-router-dom'

import { useWishlist } from '@/context/WishlistContext'
import ProductCard from '@/components/product/ProductCard'

function Wishlist() {
  const {
    wishlistItems,
    wishlistCount,
    clearWishlist,
  } = useWishlist()

  if (wishlistItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-lg text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Wishlist
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Your wishlist is empty
          </h1>

          <p className="mt-4 text-base leading-7 text-text-secondary">
            Save products you are interested in and find them here whenever you
            need them.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Explore Products
          </Link>

        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Saved products
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Your Wishlist
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            {wishlistCount}{' '}
            {wishlistCount === 1 ? 'product' : 'products'} saved
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="w-fit text-sm font-semibold text-text-secondary transition-colors hover:text-danger"
        >
          Clear wishlist
        </button>

      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  )
}

export default Wishlist