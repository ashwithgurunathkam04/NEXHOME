import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()

    const trimmedQuery = searchQuery.trim()

    if (!trimmedQuery) {
      return
    }

    navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`)
  }

  return (
    <header className="bg-brand-dark text-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex min-h-20 items-center gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-bold tracking-[-0.04em] text-white"
          >
            NEX<span className="text-brand-accent">HOME</span>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden min-w-0 flex-1 md:block"
          >
            <label htmlFor="header-search" className="sr-only">
              Search products
            </label>

            <div className="mx-auto max-w-2xl">
              <input
                id="header-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products, brands and categories"
                className="h-11 w-full rounded-lg border border-white/15 bg-white px-4 text-sm text-brand-dark outline-none placeholder:text-gray-500 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-6">
            <Link
              to="/wishlist"
              className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white lg:block"
            >
              Wishlist
            </Link>

            <Link
              to="/login"
              className="hidden text-sm font-medium text-white/80 transition-colors hover:text-white sm:block"
            >
              Account
            </Link>

            <Link
              to="/cart"
              className="rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Bag
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-white/10">
          <nav className="flex h-12 items-center gap-7 overflow-x-auto">
            <Link
              to="/products"
              className="shrink-0 text-sm font-semibold text-white"
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
              to="/products?category=cleaning"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Cleaning
            </Link>

            <Link
              to="/products?category=entertainment"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Entertainment
            </Link>

            <Link
              to="/products?category=technology"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Technology
            </Link>

            <Link
              to="/products?category=gaming"
              className="shrink-0 text-sm text-white/70 transition-colors hover:text-white"
            >
              Gaming
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header