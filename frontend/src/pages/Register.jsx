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

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            NEXHOME Account
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text-primary">
            Create your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Join NEXHOME and make your shopping experience easier.
          </p>

        </div>

        <div className="mt-8 rounded-2xl border border-border bg-white p-7 shadow-sm sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-text-primary"
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
                className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary"
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
                className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text-primary"
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
                className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

              <p className="mt-2 text-xs text-text-muted">
                Use at least 6 characters.
              </p>

            </div>

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-text-primary"
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
                className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Create Account
            </button>

          </form>

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-border" />

            <span className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
              Already registered?
            </span>

            <div className="h-px flex-1 bg-border" />

          </div>

          <Link
            to="/login"
            className="flex w-full items-center justify-center rounded-lg border border-border-strong bg-white px-5 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent"
          >
            Sign In
          </Link>

        </div>

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