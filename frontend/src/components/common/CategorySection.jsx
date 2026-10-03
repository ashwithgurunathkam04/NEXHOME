import { Link } from 'react-router-dom'

const categories = [
  {
    id: 'cooling-climate',
    name: 'Cooling & Climate',
    description:
      'Air conditioners, air coolers, fans, heaters, and climate solutions.',
  },
  {
    id: 'refrigeration',
    name: 'Refrigeration',
    description:
      'Refrigerators, freezers, and modern cooling solutions for your home.',
  },
  {
    id: 'laundry',
    name: 'Laundry',
    description:
      'Washing machines, dryers, and appliances for everyday laundry.',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description:
      'Microwaves, ovens, dishwashers, and essential kitchen appliances.',
  },
  {
    id: 'small-kitchen',
    name: 'Small Kitchen',
    description:
      'Air fryers, mixers, kettles, toasters, and everyday cooking essentials.',
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    description:
      'Vacuum cleaners and practical appliances for a cleaner home.',
  },
  {
    id: 'water',
    name: 'Water',
    description:
      'Water purifiers, dispensers, and solutions for clean drinking water.',
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    description:
      'Hair dryers, trimmers, grooming products, and personal care appliances.',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description:
      'Televisions, speakers, headphones, and devices for entertainment.',
  },
  {
    id: 'lighting-electrical',
    name: 'Lighting & Electrical',
    description:
      'Lighting products, electrical essentials, and smart home accessories.',
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description:
      'Gaming consoles, controllers, accessories, and gaming essentials.',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description:
      'Useful electronics, cables, chargers, and everyday tech accessories.',
  },
]

function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

      {/* Section Header */}

      <div className="mb-8">

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
          Shop by Category
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Find what you need
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
              Explore appliances, electronics, gaming, and everyday essentials
              across our product categories.
            </p>

          </div>

        </div>

      </div>

      {/* Category Grid */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.id}`}
            className="group"
          >

            <article className="relative flex min-h-[210px] h-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#263238] hover:shadow-xl">

              {/* Content */}

              <div className="pr-12">

                <h3 className="text-xl font-semibold leading-7 text-white">
                  {category.name}
                </h3>

                <p className="mt-4 text-sm leading-6 text-white/60">
                  {category.description}
                </p>

              </div>

              {/* Arrow */}

              <div className="mt-7 flex items-center justify-between">

                <span className="text-sm font-semibold text-brand-accent">
                  Explore
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent text-lg text-brand-accent transition-all duration-300 group-hover:bg-brand-accent group-hover:text-white">
                  →
                </span>

              </div>

            </article>

          </Link>
        ))}

      </div>

    </section>
  )
}

export default CategorySection