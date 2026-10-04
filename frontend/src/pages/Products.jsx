import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Link,
  useSearchParams,
} from 'react-router-dom'

import categories from '@/data/categories'
import ProductCard from '@/components/product/ProductCard'
import { getProducts } from '@/services/productService'

const carouselSlides = [
  {
    id: 1,
    eyebrow: 'ENTERTAINMENT',
    title: 'Bring better entertainment home.',
    description:
      'Upgrade your living space with modern TVs and entertainment technology designed for immersive everyday viewing.',
    button: 'Explore Entertainment',
    category: 'entertainment',
    image:
      'https://images.unsplash.com/photo-1631048501813-f9eda5b0b527?auto=format&fit=crop&w=1800&q=90',
  },

  {
    id: 2,
    eyebrow: 'KITCHEN APPLIANCES',
    title: 'A smarter kitchen starts here.',
    description:
      'Discover modern appliances that make cooking simpler, faster and more enjoyable.',
    button: 'Explore Kitchen',
    category: 'kitchen',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=90',
  },

  {
    id: 3,
    eyebrow: 'HOME APPLIANCES',
    title: 'Refresh your home with better appliances.',
    description:
      'From refrigeration to laundry, discover reliable appliances built for modern homes.',
    button: 'Explore Appliances',
    category: '',
    image:
      'https://images.unsplash.com/photo-1627362690344-ae340f342ac0?auto=format&fit=crop&w=1800&q=90',
  },

  {
    id: 4,
    eyebrow: 'MODERN HOME',
    title: 'Better appliances for modern living.',
    description:
      'Discover thoughtfully designed appliances and technology made to make everyday life more comfortable and convenient.',
    button: 'Explore Home',
    category: '',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90',
  },

  {
    id: 5,
    eyebrow: 'CLEANING APPLIANCES',
    title: 'A cleaner home with less effort.',
    description:
      'Powerful vacuum cleaners and cleaning appliances designed to make everyday cleaning easier.',
    button: 'Explore Cleaning',
    category: 'cleaning',
    image:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1800&q=90',
  },

  {
    id: 6,
    eyebrow: 'LAUNDRY',
    title: 'Laundry that works around you.',
    description:
      'Discover modern washing machines designed for efficient everyday laundry.',
    button: 'Explore Laundry',
    category: 'laundry',
    image:
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1800&q=90',
  },

  {
    id: 7,
    eyebrow: 'SMALL KITCHEN',
    title: 'Small appliances. Big convenience.',
    description:
      'Upgrade your kitchen with practical appliances made for everyday cooking.',
    button: 'Explore Small Kitchen',
    category: 'small-kitchen',
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1800&q=90',
  },
]

function Products() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams()

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState(() => {
    return searchParams.getAll(
      'category',
    )
  })

  const [sortOption, setSortOption] =
    useState('featured')

  const [activeSlide, setActiveSlide] =
    useState(0)

  const [filtersOpen, setFiltersOpen] =
    useState(false)

  const searchQuery =
    searchParams.get('search') || ''

  /*
    Keep the selected category state
    synchronized with the URL.

    This is important because category
    links in the Header change the URL
    directly.
  */
  useEffect(() => {
    setSelectedCategories(
      searchParams.getAll(
        'category',
      ),
    )
  }, [searchParams])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const data =
          await getProducts()

        setProducts(data)
      } catch (error) {
        console.error(
          'Failed to load products:',
          error,
        )

        setError(
          'Unable to load products. Please try again.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    const interval =
      setInterval(() => {
        setActiveSlide(
          (currentSlide) => {
            return (
              (currentSlide + 1) %
              carouselSlides.length
            )
          },
        )
      }, 5000)

    return () =>
      clearInterval(interval)
  }, [])

  const handleCategoryChange = (
    categoryId,
  ) => {
    const currentCategories =
      searchParams.getAll(
        'category',
      )

    let nextCategories

    if (
      currentCategories.includes(
        categoryId,
      )
    ) {
      nextCategories =
        currentCategories.filter(
          (category) =>
            category !== categoryId,
        )
    } else {
      nextCategories = [
        ...currentCategories,
        categoryId,
      ]
    }

    setSelectedCategories(
      nextCategories,
    )

    const nextParams =
      new URLSearchParams(
        searchParams,
      )

    nextParams.delete(
      'category',
    )

    nextCategories.forEach(
      (category) => {
        nextParams.append(
          'category',
          category,
        )
      },
    )

    setSearchParams(
      nextParams,
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSortOption('featured')

    const nextParams =
      new URLSearchParams(
        searchParams,
      )

    nextParams.delete(
      'category',
    )

    setSearchParams(
      nextParams,
    )
  }

  const searchedProducts =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase()

      if (!query) {
        return products
      }

      return products.filter(
        (product) => {
          return (
            product.name
              .toLowerCase()
              .includes(query) ||
            product.brand
              .toLowerCase()
              .includes(query) ||
            product.category
              .toLowerCase()
              .includes(query)
          )
        },
      )
    }, [
      products,
      searchQuery,
    ])

  const filteredProducts =
    useMemo(() => {
      if (
        selectedCategories.length ===
        0
      ) {
        return searchedProducts
      }

      return searchedProducts.filter(
        (product) =>
          selectedCategories.includes(
            product.category,
          ),
      )
    }, [
      searchedProducts,
      selectedCategories,
    ])

  const sortedProducts =
    useMemo(() => {
      const productsToSort = [
        ...filteredProducts,
      ]

      if (
        sortOption ===
        'price-low'
      ) {
        return productsToSort.sort(
          (a, b) =>
            a.price - b.price,
        )
      }

      if (
        sortOption ===
        'price-high'
      ) {
        return productsToSort.sort(
          (a, b) =>
            b.price - a.price,
        )
      }

      if (
        sortOption ===
        'rating'
      ) {
        return productsToSort.sort(
          (a, b) =>
            b.rating - a.rating,
        )
      }

      if (
        sortOption ===
        'reviews'
      ) {
        return productsToSort.sort(
          (a, b) =>
            b.reviews - a.reviews,
        )
      }

      return productsToSort
    }, [
      filteredProducts,
      sortOption,
    ])

  const goToPreviousSlide =
    () => {
      setActiveSlide(
        (currentSlide) => {
          return (
            (currentSlide -
              1 +
              carouselSlides.length) %
            carouselSlides.length
          )
        },
      )
    }

  const goToNextSlide = () => {
    setActiveSlide(
      (currentSlide) => {
        return (
          (currentSlide + 1) %
          carouselSlides.length
        )
      },
    )
  }

  const handleSlideAction = (
    category,
  ) => {
    if (!category) {
      return
    }

    const nextParams =
      new URLSearchParams(
        searchParams,
      )

    nextParams.delete(
      'category',
    )

    nextParams.set(
      'category',
      category,
    )

    setSelectedCategories([
      category,
    ])

    setSearchParams(
      nextParams,
    )
  }

  return (
    <div className="bg-surface">

      {/* Hero Carousel */}

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">

        <div className="relative h-[360px] overflow-hidden rounded-2xl border border-border bg-brand-dark shadow-sm">

          {carouselSlides.map(
            (slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === activeSlide
                    ? 'opacity-100'
                    : 'pointer-events-none opacity-0'
                }`}
              >

                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-brand-dark/35" />

                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/65 via-brand-dark/25 to-transparent" />

                <div className="relative z-10 flex h-full items-start">

                  <div className="w-full max-w-7xl px-8 pt-10 sm:px-12 sm:pt-12 lg:px-14 lg:pt-14">

                    <div className="max-w-xl">

                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
                        {slide.eyebrow}
                      </p>

                      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {slide.title}
                      </h1>

                      <p className="mt-4 max-w-lg text-sm leading-6 text-white/85 sm:text-base">
                        {slide.description}
                      </p>

                      {slide.category ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleSlideAction(
                              slide.category,
                            )
                          }
                          className="mt-6 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
                        >
                          {slide.button}
                        </button>
                      ) : (
                        <Link
                          to="/products"
                          className="mt-6 inline-flex rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
                        >
                          {slide.button}
                        </Link>
                      )}

                    </div>

                  </div>

                </div>

              </div>
            ),
          )}

          <button
            type="button"
            onClick={
              goToPreviousSlide
            }
            aria-label="Previous slide"
            className="absolute left-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-brand-dark/70 text-lg text-white backdrop-blur-sm transition-colors hover:bg-brand-dark"
          >
            ←
          </button>

          <button
            type="button"
            onClick={goToNextSlide}
            aria-label="Next slide"
            className="absolute right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-brand-dark/70 text-lg text-white backdrop-blur-sm transition-colors hover:bg-brand-dark"
          >
            →
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

            {carouselSlides.map(
              (slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() =>
                    setActiveSlide(
                      index,
                    )
                  }
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? 'w-8 bg-brand-accent'
                      : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                />
              ),
            )}

          </div>

        </div>

      </section>

      {/* Page Header */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-6 border-b border-border pb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
                NEXHOME
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : 'All products'}
              </h1>

              <p className="mt-3 text-sm text-text-secondary">
                {loading
                  ? 'Loading products...'
                  : `${sortedProducts.length} products available`}
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              <button
                type="button"
                onClick={() =>
                  setFiltersOpen(
                    (current) =>
                      !current,
                  )
                }
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  filtersOpen ||
                  selectedCategories.length >
                    0
                    ? 'border-brand-accent bg-brand-accent text-white'
                    : 'border-border bg-surface-card text-text-primary hover:border-brand-accent hover:text-brand-accent'
                }`}
              >
                Filters

                {selectedCategories.length >
                  0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-brand-accent">
                    {
                      selectedCategories.length
                    }
                  </span>
                )}

                <span className="text-xs">
                  {filtersOpen
                    ? '▲'
                    : '▼'}
                </span>
              </button>

              <div className="flex items-center gap-2">

                <label
                  htmlFor="sort-products"
                  className="hidden text-sm font-medium text-text-secondary sm:block"
                >
                  Sort by
                </label>

                <select
                  id="sort-products"
                  value={sortOption}
                  onChange={(
                    event,
                  ) =>
                    setSortOption(
                      event.target
                        .value,
                    )
                  }
                  className="rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm font-medium text-text-primary outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                >

                  <option value="featured">
                    Featured
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>

                  <option value="reviews">
                    Most Reviewed
                  </option>

                </select>

              </div>

            </div>

          </div>

          {filtersOpen && (
            <div className="rounded-2xl border border-border bg-surface-card p-6">

              <div className="flex flex-col gap-6">

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <h2 className="text-base font-semibold text-text-primary">
                      Filter products
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                      Choose one or more categories.
                    </p>

                  </div>

                  {selectedCategories.length >
                    0 && (
                    <button
                      type="button"
                      onClick={
                        clearFilters
                      }
                      className="w-fit text-sm font-semibold text-brand-accent transition-colors hover:text-brand-accent-dark"
                    >
                      Clear filters
                    </button>
                  )}

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                  {categories.map(
                    (category) => (
                      <label
                        key={
                          category.id
                        }
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                          selectedCategories.includes(
                            category.id,
                          )
                            ? 'border-brand-accent bg-brand-accent/5'
                            : 'border-border bg-white hover:border-brand-accent'
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(
                            category.id,
                          )}
                          onChange={() =>
                            handleCategoryChange(
                              category.id,
                            )
                          }
                          className="h-4 w-4 rounded border-border accent-brand-accent"
                        />

                        <span className="text-sm font-medium text-text-primary">
                          {
                            category.name
                          }
                        </span>

                      </label>
                    ),
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-border bg-surface-card">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-border border-t-brand-accent" />

              <p className="mt-4 text-sm font-medium text-text-secondary">
                Loading products...
              </p>

            </div>

          </div>
        ) : error ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-danger/30 bg-surface-card px-6 text-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-danger">
                NEXHOME
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-text-primary">
                Something went wrong
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-6 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
              >
                Try Again
              </button>

            </div>

          </div>
        ) : sortedProducts.length >
          0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {sortedProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ),
            )}

          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-border bg-surface-card px-6 text-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
                NEXHOME
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-text-primary">
                No products found
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
                Try changing your search or clearing the selected filters.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="mt-6 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
              >
                Clear Filters
              </button>

            </div>

          </div>
        )}

      </section>

    </div>
  )
}

export default Products