import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group flex min-h-[280px] flex-col justify-between rounded-2xl border-2 border-brand-accent bg-[#263238] p-8 text-white transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:border-brand-accent-dark hover:shadow-2xl"
    >
      <div>
        <div className="mb-7 h-1 w-10 rounded-full bg-brand-accent" />

        <h3 className="max-w-[260px] text-2xl font-semibold leading-tight tracking-tight">
          {category.name}
        </h3>

        <p className="mt-4 max-w-[280px] text-sm leading-6 text-white/60">
          {category.description}
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
        <span className="text-sm font-medium text-white/70 transition-colors group-hover:text-white">
          Explore
        </span>

        <span className="text-lg font-medium text-brand-accent transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  )
}

export default CategoryCard