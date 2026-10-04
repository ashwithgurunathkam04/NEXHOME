import {
  useEffect,
  useState,
} from 'react'

import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

function Header() {
  const [searchQuery, setSearchQuery] =
    useState('')

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams()

  const navigate = useNavigate()

  const {
    isAuthenticated,
  } = useAuth()

  const { cartCount } =
    useCart()

  const { wishlistCount } =
    useWishlist()

  const urlSearchQuery =
    searchParams.get('search') || ''

  useEffect(() => {
    setSearchQuery(
      urlSearchQuery,
    )
  }, [urlSearchQuery])

  const handleSearch = (
    event,
  ) => {
    event.preventDefault()

    const trimmedQuery =
      searchQuery.trim()

    const nextParams =
      new URLSearchParams(
        searchParams,
      )

    if (!trimmedQuery) {
      nextParams.delete(
        'search',
      )

      setSearchParams(
        nextParams,
      )

      return
    }

    nextParams.set(
      'search',
      trimmedQuery,
    )

    setSearchParams(
      nextParams,
    )

    navigate(
      `/products?${nextParams.toString()}`,
    )
  }

  const handleSearchChange = (
    event,
  ) => {
    const value =
      event.target.value

    setSearchQuery(value)

    if (!value.trim()) {
      const nextParams =
        new URLSearchParams(
          searchParams,
        )

      nextParams.delete(
        'search',
      )

      setSearchParams(
        nextParams,
      )
    }
  }

  return (
    <header className="bg-[#202124] text-white shadow-sm">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex min-h-20 items-center gap-6">

          <Link
            to="/"
            className="shrink-0 text-2xl font-bold tracking-[-0.04em] text-white"
          >
            NEX<span className="text-[#d97736]">HOME</span>
          </Link>

          <form
            onSubmit={
              handleSearch
            }
            className="hidden min-w-0 flex-1 md:block"
          >
            <label
              htmlFor="header-search"
              className="sr-only"
            >
              Search products
            </label>

            <div className="mx-auto max-w-2xl">

              <input
                id="header-search"
                type="search"
                value={
                  searchQuery
                }
                onChange={
                  handleSearchChange
                }
                placeholder="Search products, brands and categories"
                className="h-11 w-full rounded-lg border border-white/15 bg-white px-4 text-sm text-[#202124] outline-none placeholder:text-gray-500 transition focus:border-[#d97736] focus:ring-2 focus:ring-[#d97736]/30"
              />

            </div>

          </form>

          <div className="ml-auto flex shrink-0 items-center gap-6">

            <Link
              to="/wishlist"
              className="hidden items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white lg:flex"
            >
              Wishlist

              {wishlistCount > 0 && (
                <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#d97736] px-1.5 py-0.5 text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              )}

            </Link>

            <Link
              to="/orders"
              className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white lg:block"
            >
              Orders
            </Link>

            {isAuthenticated ? (
              <Link
                to="/account"
                className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:block"
              >
                Account
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:block"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/cart"
              className="relative rounded-md bg-[#d97736] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b85d24]"
            >
              Bag

              {cartCount > 0 && (
                <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-xs font-bold text-[#202124]">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>

        <div className="border-t border-white/10">

          <nav className="flex h-12 items-center gap-7 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            <Link
              to="/products"
              className="shrink-0 text-sm font-semibold text-white transition-colors hover:text-[#d97736]"
            >
              Shop All
            </Link>

            <Link
              to="/products?category=cooling-climate"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Cooling & Climate
            </Link>

            <Link
              to="/products?category=refrigeration"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Refrigeration
            </Link>

            <Link
              to="/products?category=laundry"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Laundry
            </Link>

            <Link
              to="/products?category=kitchen"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Kitchen
            </Link>

            <Link
              to="/products?category=small-kitchen"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Small Kitchen
            </Link>

            <Link
              to="/products?category=cleaning"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Cleaning
            </Link>

            <Link
              to="/products?category=water"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Water
            </Link>

            <Link
              to="/products?category=personal-care"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Personal Care
            </Link>

            <Link
              to="/products?category=entertainment"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Entertainment
            </Link>

            <Link
              to="/products?category=lighting-electrical"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Lighting & Electrical
            </Link>

            <Link
              to="/products?category=gaming"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Gaming
            </Link>

            <Link
              to="/products?category=accessories"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Accessories
            </Link>

          </nav>

        </div>

      </div>

    </header>
  )
}

export default Header