import categories from '@/data/categories'
import CategoryCard from '@/components/common/CategoryCard'

function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
          Explore
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Shop by category
        </h2>

        <p className="mt-4 text-base leading-7 text-text-secondary">
          Explore products across your home, lifestyle, entertainment,
          technology, gaming, and everyday needs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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