import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

const categoryFilters = [
  {
    id: 'cooling-climate',
    name: 'Cooling & Climate',
  },
  {
    id: 'refrigeration',
    name: 'Refrigeration',
  },
  {
    id: 'laundry',
    name: 'Laundry',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
  },
  {
    id: 'small-kitchen',
    name: 'Small Kitchen',
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
  },
  {
    id: 'water',
    name: 'Water Appliances',
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
  },
  {
    id: 'lighting-electrical',
    name: 'Lighting & Electrical',
  },
  {
    id: 'gaming',
    name: 'Gaming',
  },
  {
    id: 'accessories',
    name: 'Accessories',
  },
]

const carouselSlides = [
  {
    id: 1,
    eyebrow: 'COOLING & CLIMATE',
    title: 'Comfort starts with the right climate.',
    description:
      'Explore modern air conditioners and cooling solutions designed for comfortable everyday living.',
    button: 'Explore Cooling',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=90',
  },
  {
    id: 2,
    eyebrow: 'KITCHEN APPLIANCES',
    title: 'A smarter kitchen starts here.',
    description:
      'Discover modern appliances that make cooking simpler, faster and more enjoyable.',
    button: 'Explore Kitchen',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=90',
  },
  {
    id: 3,
    eyebrow: 'MODERN HOME',
    title: 'Upgrade every corner of your home.',
    description:
      'From essential appliances to smart technology, find everything you need for modern living.',
    button: 'Explore Home',
    image:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1800&q=90',
  },
]

function Products() {
  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get('search') || ''
  const categoryFromUrl = searchParams.get('category') || ''

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  )

  const [sortOption, setSortOption] = useState('featured')
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((currentSlide) => {
        return (currentSlide + 1) % carouselSlides.length
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handlePreviousSlide = () => {
    setActiveSlide((currentSlide) => {
      if (currentSlide === 0) {
        return carouselSlides.length - 1
      }

      return currentSlide - 1
    })
  }

  const handleNextSlide = () => {
    setActiveSlide(
      (currentSlide) =>
        (currentSlide + 1) % carouselSlides.length
    )
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((currentCategories) => {
      if (currentCategories.includes(categoryId)) {
        return currentCategories.filter(
          (category) => category !== categoryId
        )
      }

      return [...currentCategories, categoryId]
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  const handleSortChange = (event) => {
    setSortOption(event.target.value)
  }

  const searchedProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    if (!normalizedSearch) {
      return products
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.brand,
        product.category,
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(normalizedSearch)
    })
  }, [searchQuery])

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return searchedProducts
    }

    return searchedProducts.filter((product) =>
      selectedCategories.includes(product.category)
    )
  }, [searchedProducts, selectedCategories])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)

      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)

      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)

      case 'featured':
      default:
        return sorted
    }
  }, [filteredProducts, sortOption])

  return (
    <div className="bg-surface">
      {/* Product Carousel */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative h-[360px] overflow-hidden rounded-2xl border border-border bg-brand-dark shadow-sm">
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeSlide
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              {/* Full Background Image */}
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Medium Overlay */}
              <div className="absolute inset-0 bg-brand-dark/35" />

              {/* Subtle Left Gradient For Text */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/65 via-brand-dark/25 to-transparent" />

              {/* Text */}
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

                    <button
                      type="button"
                      className="mt-6 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
                    >
                      {slide.button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePreviousSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-lg text-brand-dark shadow-sm transition-all hover:border-brand-accent hover:bg-brand-accent hover:text-white"
          >
            ←
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-lg text-brand-dark shadow-sm transition-all hover:border-brand-accent hover:bg-brand-accent hover:text-white"
          >
            →
          </button>

          {/* Indicators */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-8 bg-brand-accent'
                    : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Content */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-2xl border border-border bg-surface-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-text-primary">
                  Filters
                </h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-brand-accent transition-colors hover:text-brand-accent-dark"
                >
                  Clear
                </button>
              </div>

              <div className="mt-7 border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-text-primary">
                  Category
                </h3>

                <div className="mt-4 space-y-3">
                  {categoryFilters.map((category) => (
                    <label
                      key={category.id}
                      className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() =>
                          handleCategoryChange(category.id)
                        }
                        className="h-4 w-4 accent-[var(--color-brand-accent)]"
                      />

                      <span className="transition-colors hover:text-text-primary">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Area */}
          <div>
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="text-sm text-text-secondary">
                Showing{' '}
                <span className="font-semibold text-text-primary">
                  {sortedProducts.length}
                </span>{' '}
                {sortedProducts.length === 1
                  ? 'product'
                  : 'products'}
              </p>

              <select
                value={sortOption}
                onChange={handleSortChange}
                className="rounded-lg border border-border bg-surface-card px-4 py-2.5 text-sm font-medium text-text-primary outline-none transition focus:border-brand-accent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-surface-card px-6 py-20 text-center">
                <h2 className="text-xl font-semibold text-text-primary">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-text-secondary">
                  Try a different search or category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-lg bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products