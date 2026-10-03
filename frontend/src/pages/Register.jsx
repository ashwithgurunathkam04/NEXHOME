import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setError('')

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all the fields.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    /*
      User registration will be connected to Django later.
      For now, this only validates the frontend form.
    */

    navigate('/login')
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

      <div className="w-full max-w-md">

        {/* Heading */}

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            NEXHOME Account
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            Create your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Join NEXHOME and make your shopping experience easier.
          </p>

        </div>

        {/* Registration panel */}

        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-7 text-white shadow-sm sm:p-8">

          <div className="mb-7">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Create Account
            </p>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Enter your details to create your NEXHOME account.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Full name */}

            <div>

              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-white"
              >
                Full name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

              <p className="mt-2 text-xs text-white/40">
                Use at least 6 characters.
              </p>

            </div>

            {/* Confirm password */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-white"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password again"
                autoComplete="new-password"
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            {/* Error */}

            {error && (
              <div className="rounded-lg border border-brand-accent/40 bg-brand-accent/10 px-4 py-3 text-sm font-medium text-brand-accent">
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Create Account
            </button>

          </form>

          {/* Divider */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/35">
              Already registered?
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* Login */}

          <Link
            to="/login"
            className="flex w-full items-center justify-center rounded-lg border border-brand-accent bg-transparent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
          >
            Sign In
          </Link>

        </div>

        {/* Back */}

        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-accent"
          >
            ← Continue shopping
          </Link>

        </div>

      </div>

    </section>
  )
}

export default Register