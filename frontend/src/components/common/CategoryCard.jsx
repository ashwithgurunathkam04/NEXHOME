import { Link } from 'react-router-dom'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group block h-full"
    >
      <article className="relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#263238] hover:shadow-xl">

        {/* Content */}

        <div className="pr-14">

          <h3 className="text-xl font-semibold leading-7 text-white">
            {category.name}
          </h3>

          <p className="mt-4 text-sm leading-6 text-white/65">
            {category.description}
          </p>

        </div>

        {/* Arrow */}

        <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent bg-transparent text-xl text-brand-accent transition-all duration-300 group-hover:bg-brand-accent group-hover:text-white">
          →
        </span>

      </article>
    </Link>
  )
}

export default CategoryCard