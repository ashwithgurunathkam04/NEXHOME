import { Link, useParams } from 'react-router-dom'
import products from '@/data/products'

function ProductDetails() {
  const { id } = useParams()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    return (
      <div className="bg-surface">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 py-16 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
              NEXHOME
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
              Product not found
            </h1>

            <p className="mt-3 text-text-secondary">
              The product you are looking for does not exist.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Back to products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  )

  return (
    <div className="bg-surface">
      {/* Breadcrumb */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Home
            </Link>

            <span className="text-text-muted">/</span>

            <Link
              to="/products"
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              Products
            </Link>

            <span className="text-text-muted">/</span>

            <span className="truncate font-medium text-text-primary">
              {product.name}
            </span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl border-2 border-brand-accent bg-white">
            <div className="relative aspect-square">
              <span className="absolute left-6 top-6 z-10 rounded-md bg-brand-accent px-3 py-1.5 text-xs font-bold text-white">
                {discount}% OFF
              </span>

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-8"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
              {product.brand}
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-md bg-brand-dark px-3 py-1.5 text-sm font-semibold text-white">
                ★ {product.rating}
              </span>

              <span className="text-sm text-text-secondary">
                {product.reviews} customer reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-8 border-y border-border py-7">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold tracking-tight text-text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>

                <span className="text-lg text-text-muted line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>

                <span className="rounded-md bg-brand-accent/10 px-2.5 py-1 text-sm font-bold text-brand-accent">
                  {discount}% OFF
                </span>
              </div>

              <p className="mt-3 text-sm text-text-secondary">
                Inclusive of applicable taxes
              </p>
            </div>

            {/* Delivery */}
            <div className="mt-7 rounded-xl border border-border bg-surface-card p-5">
              <p className="text-sm font-semibold text-text-primary">
                Delivery available
              </p>

              <p className="mt-1 text-sm text-text-secondary">
                Enter your location at checkout to see delivery options.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex-1 rounded-lg border-2 border-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent hover:text-white"
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="flex-1 rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
              >
                Buy Now
              </button>
            </div>

            {/* Product Information */}
            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-base font-semibold text-text-primary">
                Product information
              </h2>

              <dl className="mt-5 divide-y divide-border">
                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-text-secondary">
                    Brand
                  </dt>

                  <dd className="text-sm font-medium text-text-primary">
                    {product.brand}
                  </dd>
                </div>

                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-text-secondary">
                    Category
                  </dt>

                  <dd className="text-sm font-medium capitalize text-text-primary">
                    {product.category.replaceAll('-', ' ')}
                  </dd>
                </div>

                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-text-secondary">
                    Customer rating
                  </dt>

                  <dd className="text-sm font-medium text-text-primary">
                    {product.rating} / 5
                  </dd>
                </div>

                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-text-secondary">
                    Reviews
                  </dt>

                  <dd className="text-sm font-medium text-text-primary">
                    {product.reviews}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails