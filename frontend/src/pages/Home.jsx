import CategorySection from '@/components/common/CategorySection'

function Home() {
  return (
    <div className="bg-surface">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            NEXHOME
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Everything your home and lifestyle need, in one place.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            Explore thoughtfully selected appliances, electronics,
            entertainment, technology, gaming, and everyday essentials.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Explore Products
            </button>

            <button
              type="button"
              className="rounded-lg border border-border-strong bg-surface-card px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-soft"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </section>

      <CategorySection />
    </div>
  )
}

export default Home