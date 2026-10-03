import { Link } from 'react-router-dom'

function Account() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

            <div className="mx-auto max-w-3xl">

                <div className="text-center">

                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
                        My Account
                    </p>

                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
                        Welcome to NEXHOME
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
                        Sign in to manage your orders, wishlist, saved details, and
                        account preferences.
                    </p>

                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">

                    {/* Login */}

                    <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark text-lg font-bold text-white">
                            →
                        </div>

                        <h2 className="mt-6 text-xl font-semibold text-text-primary">
                            Already have an account?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                            Sign in to access your NEXHOME account and manage your
                            purchases.
                        </p>

                        <Link
                            to="/login"
                            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-brand-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
                        >
                            Sign In
                        </Link>

                    </div>

                    {/* Register */}

                    <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-lg font-bold text-white">
                            +
                        </div>

                        <h2 className="mt-6 text-xl font-semibold text-text-primary">
                            New to NEXHOME?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                            Create an account to save your details and make future
                            purchases easier.
                        </p>

                        <Link
                            to="/register"
                            className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-border-strong bg-white px-5 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent"
                        >
                            Create Account
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Account