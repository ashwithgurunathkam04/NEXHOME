import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  useState,
} from 'react'

import {
  getProfile,
  loginUser,
} from '@/services/authService'

import { useAuth } from '@/context/AuthContext'

function Login() {
  const navigate = useNavigate()

  const {
    login,
  } = useAuth()

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    })

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleChange = (
    event,
  ) => {
    const {
      name,
      value,
    } = event.target

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      }),
    )
  }

  const getErrorMessage = (
    error,
  ) => {
    const responseData =
      error?.response?.data

    if (!responseData) {
      return 'Unable to sign in. Please try again.'
    }

    if (
      typeof responseData ===
      'string'
    ) {
      return responseData
    }

    if (
      responseData.detail
    ) {
      return responseData.detail
    }

    const firstError =
      Object.values(
        responseData,
      ).flat()[0]

    if (firstError) {
      return String(
        firstError,
      )
    }

    return 'Invalid email or password.'
  }

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault()

    setError('')

    const trimmedEmail =
      formData.email.trim()

    if (
      !trimmedEmail ||
      !formData.password
    ) {
      setError(
        'Please enter your email and password.',
      )

      return
    }

    try {
      setLoading(true)

      const data =
        await loginUser({
          username:
            trimmedEmail,
          password:
            formData.password,
        })

      if (
        !data?.access ||
        !data?.refresh
      ) {
        setError(
          'Login succeeded but authentication tokens were not returned.',
        )

        return
      }

      localStorage.setItem(
        'nexhome-access-token',
        data.access,
      )

      localStorage.setItem(
        'nexhome-refresh-token',
        data.refresh,
      )

      const profile =
        await getProfile()

      login(profile)

      navigate('/account')
    } catch (error) {
      console.error(
        'Login failed:',
        error,
      )

      setError(
        getErrorMessage(error),
      )
    } finally {
      setLoading(false)
    }
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
            Welcome back
          </h1>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Sign in to continue to your NEXHOME account.
          </p>

        </div>

        {/* Login panel */}

        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-7 text-white shadow-sm sm:p-8">

          <div className="mb-7">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Sign In
            </p>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Enter your account credentials below.
            </p>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

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
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
              />

            </div>

            {/* Password */}

            <div>

              <div className="flex items-center justify-between gap-4">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white"
                >
                  Password
                </label>

                <button
                  type="button"
                  disabled={loading}
                  className="text-sm font-medium text-brand-accent transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
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
              disabled={loading}
              className="w-full rounded-lg bg-brand-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Signing in...'
                : 'Sign In'}
            </button>

          </form>

          {/* Divider */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/35">
              New here?
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* Register */}

          <Link
            to="/register"
            className="flex w-full items-center justify-center rounded-lg border border-brand-accent bg-transparent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
          >
            Create an Account
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

export default Login