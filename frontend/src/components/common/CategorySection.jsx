import { Link } from 'react-router-dom'

import categories from '@/data/categories'
import CategoryCard from '@/components/common/CategoryCard'

function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Shop by category
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Everything for your home
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
            Browse appliances, electronics, entertainment, gaming, and everyday
            essentials by category.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex w-fit items-center rounded-lg border border-border-strong bg-white px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent"
        >
          Shop all
        </Link>

      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>

    </section>
  )
}

export default CategorySection