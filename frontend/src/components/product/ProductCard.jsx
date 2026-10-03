import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

const imageExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
]

function getNextImagePath(currentPath, extensionIndex) {
  const pathWithoutExtension =
    currentPath.replace(
      /\.(jpg|jpeg|png|webp|avif)$/i,
      '',
    )

  const nextExtension =
    imageExtensions[extensionIndex]

  if (!nextExtension) {
    return null
  }

  return `${pathWithoutExtension}${nextExtension}`
}

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [imageSrc, setImageSrc] = useState(
    product.image,
  )

  const [imageExtensionIndex, setImageExtensionIndex] =
    useState(0)

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

  const handleWishlistToggle = (event) => {
    event.preventDefault()
    event.stopPropagation()

    toggleWishlist(product)
  }

  const handleImageError = () => {
    const nextIndex =
      imageExtensionIndex + 1

    const nextImagePath =
      getNextImagePath(
        product.image,
        nextIndex,
      )

    if (nextImagePath) {
      setImageExtensionIndex(nextIndex)
      setImageSrc(nextImagePath)
    }
  }

  return (
    <article className="group overflow-hidden rounded-2xl border-2 border-brand-accent bg-[#263238] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <Link to={`/products/${product.id}`}>

        <div className="relative h-72 w-full overflow-hidden bg-[#f5f2ec]">

          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            onError={handleImageError}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute left-5 top-5 z-20 rounded-md bg-brand-accent px-3 py-1.5 text-xs font-bold text-white shadow-md">
            {discount}% OFF
          </span>

          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={
              productInWishlist
                ? 'Remove product from wishlist'
                : 'Add product to wishlist'
            }
            className={`absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border bg-white text-xl shadow-md transition ${productInWishlist
                ? 'border-brand-accent text-brand-accent'
                : 'border-border text-text-primary hover:border-brand-accent hover:text-brand-accent'
              }`}
          >
            {productInWishlist
              ? '♥'
              : '♡'}
          </button>

        </div>

        <div className="p-6">

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
            {product.brand}
          </p>

          <h3 className="mt-3 min-h-[52px] text-lg font-semibold leading-7 text-white">
            {product.name}
          </h3>

          <div className="mt-4 flex items-center gap-3">

            <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold">
              ★ {product.rating}
            </span>

            <span className="text-xs text-white/50">
              {product.reviews} reviews
            </span>

          </div>

          <div className="mt-5 flex items-baseline gap-3">

            <span className="text-2xl font-bold">
              ₹
              {product.price.toLocaleString(
                'en-IN',
              )}
            </span>

            <span className="text-sm text-white/40 line-through">
              ₹
              {product.originalPrice.toLocaleString(
                'en-IN',
              )}
            </span>

          </div>

        </div>

      </Link>

      <div className="px-6 pb-6">

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full rounded-lg bg-brand-accent px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-accent-dark hover:shadow-lg"
        >
          Add to Cart
        </button>

      </div>

    </article>
  )
}

export default ProductCard