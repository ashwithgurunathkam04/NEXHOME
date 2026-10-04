import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  getProfile,
  logoutUser,
} from '@/services/authService'

function Account() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getProfile()

        setProfile(data)
      } catch (error) {
        console.error(
          'Failed to fetch profile:',
          error,
        )

        setError(
          'Unable to load your account information.',
        )
      } finally {
        setLoading(false)
      }
    }

    const accessToken =
      localStorage.getItem(
        'nexhome-access-token',
      )

    if (accessToken) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    logoutUser()

    setProfile(null)

    navigate('/login')
  }

  const fullName =
    profile
      ? [
        profile.first_name,
        profile.last_name,
      ]
        .filter(Boolean)
        .join(' ') ||
      profile.username ||
      'User'
      : 'Guest User'

  const email =
    profile?.email ||
    'Not signed in'

  const isAuthenticated =
    Boolean(profile)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      {/* Page header */}

      <div className="border-b border-border-strong pb-8">

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
          My Account
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Account Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
          Manage your orders, wishlist, account details, and shopping
          preferences from one place.
        </p>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">

        {/* Account navigation */}

        <aside className="h-fit overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-3 shadow-sm">

          <div className="border-b border-white/10 px-4 py-4">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Account Menu
            </p>

          </div>

          <nav className="mt-2 space-y-1">

            <Link
              to="/account"
              className="flex items-center justify-between rounded-lg bg-brand-accent px-4 py-3 text-sm font-semibold text-white"
            >
              <span>Account Overview</span>
              <span>→</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span>My Orders</span>
              <span>→</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span>Wishlist</span>
              <span>→</span>
            </Link>

            <Link
              to="/account/details"
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span>Account Details</span>
              <span>→</span>
            </Link>

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium text-brand-accent transition-colors hover:bg-brand-accent/10"
              >
                <span>Sign Out</span>
                <span>→</span>
              </button>
            )}

          </nav>

        </aside>

        {/* Dashboard */}

        <div className="space-y-6">

          {/* Welcome panel */}

          <div className="rounded-2xl border-2 border-brand-accent bg-brand-dark p-7 text-white shadow-sm sm:p-8">

            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Welcome back
            </p>

            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              {loading
                ? 'Loading your account...'
                : isAuthenticated
                  ? `Welcome, ${fullName}`
                  : 'Your NEXHOME account'}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
              Keep track of your purchases, save products you like, and
              manage your account information from one place.
            </p>

          </div>

          {/* Quick actions */}

          <div className="grid gap-5 sm:grid-cols-2">

            <Link
              to="/orders"
              className="group rounded-2xl border-2 border-brand-accent bg-[#263238] p-6 text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-lg"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                    Purchases
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    My Orders
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    View your orders, payment status, and delivery information.
                  </p>

                </div>

                <span className="text-lg text-brand-accent transition-transform group-hover:translate-x-1">
                  →
                </span>

              </div>

            </Link>

            <Link
              to="/wishlist"
              className="group rounded-2xl border-2 border-brand-accent bg-[#263238] p-6 text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-lg"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                    Saved Products
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Wishlist
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Quickly access products you've saved for later.
                  </p>

                </div>

                <span className="text-lg text-brand-accent transition-transform group-hover:translate-x-1">
                  →
                </span>

              </div>

            </Link>

          </div>

          {/* Account information */}

          <div className="rounded-2xl border-2 border-brand-accent bg-brand-dark p-6 text-white shadow-sm sm:p-7">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                  Personal Information
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Account details
                </h2>

              </div>

              <Link
                to="/account/details"
                className="w-fit rounded-lg border border-brand-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent hover:text-white"
              >
                Edit Details
              </Link>

            </div>

            <div className="mt-6 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                  Name
                </p>

                <p className="mt-2 text-sm font-medium text-white">
                  {loading
                    ? 'Loading...'
                    : fullName}
                </p>

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                  Email
                </p>

                <p className="mt-2 text-sm font-medium text-white">
                  {loading
                    ? 'Loading...'
                    : email}
                </p>

              </div>

            </div>

            {error && (
              <p className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

          </div>

          {/* Authentication */}

          {!isAuthenticated && !loading && (

            <div className="rounded-2xl border border-border-strong bg-surface-soft p-6 sm:p-7">

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                Account Access
              </p>

              <h2 className="mt-2 text-xl font-semibold text-text-primary">
                Not signed in?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                Sign in to access your personal account information and order
                history.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-white px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent"
                >
                  Create Account
                </Link>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  )
}

export default Account