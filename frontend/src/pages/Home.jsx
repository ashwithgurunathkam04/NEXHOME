import CategorySection from '@/components/common/CategorySection'
import FeaturedProducts from '@/components/product/FeaturedProducts'

import heroAppliances from '@/assets/hero-appliances.png'

function Home() {
  return (
    <div className="bg-surface">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-3xl bg-brand-dark text-white">
          <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="flex flex-col justify-center px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  NEXHOME
                </p>

                <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Everything your home and lifestyle need, in one place.
                </h1>

                <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                  Discover appliances, electronics, entertainment, technology,
                  gaming, and everyday essentials for modern living.
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-accent-dark hover:shadow-lg"
                  >
                    Explore Products
                  </button>

                  <button
                    type="button"
                    className="rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                  >
                    Browse Categories
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative min-h-[360px] overflow-hidden bg-white lg:min-h-full">
              <img
                src={heroAppliances}
                alt="Modern home appliances"
                className="h-full w-full object-contain transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute bottom-6 left-6 rounded-xl border border-brand-accent bg-brand-dark/95 px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-accent">
                  Modern Living
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  Designed for the way you live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategorySection />

      <FeaturedProducts />
    </div>
  )
}

export default Home