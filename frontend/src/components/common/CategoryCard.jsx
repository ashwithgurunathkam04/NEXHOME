import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group block rounded-2xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-5">

        <div>
          <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-brand-accent">
            {category.name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            {category.description}
          </p>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-lg text-text-secondary transition-all group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white">
          →
        </span>

      </div>
    </Link>
  )
}

export default CategoryCard