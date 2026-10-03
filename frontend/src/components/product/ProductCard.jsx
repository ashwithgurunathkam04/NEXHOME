import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const isAcProduct = product.category === 'cooling-climate'

  return (
    <article className="group overflow-hidden rounded-2xl border-2 border-brand-accent bg-[#263238] text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
      <Link to={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-white">
          <span className="absolute left-5 top-5 z-10 rounded-md bg-brand-accent px-3 py-1.5 text-xs font-bold text-white">
            {discount}% OFF
          </span>

          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover object-center transition-transform duration-500 ${
              isAcProduct
                ? 'scale-[1.45] group-hover:scale-[1.52]'
                : 'group-hover:scale-105'
            }`}
          />
        </div>

        {/* Product Details */}
        <div className="p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
            {product.brand}
          </p>

          <h3 className="mt-3 min-h-[56px] text-lg font-semibold leading-7 text-white">
            {product.name}
          </h3>

          <div className="mt-5 flex items-center gap-3">
            <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
              ★ {product.rating}
            </span>

            <span className="text-xs text-white/50">
              {product.reviews} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-bold tracking-tight text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            <span className="text-sm text-white/40 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </Link>

      {/* Add To Cart */}
      <div className="px-7 pb-7">
        <button
          type="button"
          className="w-full rounded-lg bg-brand-accent px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-accent-dark hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard