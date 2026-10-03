import { Link } from 'react-router-dom'
import { useState } from 'react'

function AccountDetails() {
  const [formData, setFormData] = useState({
    fullName: 'Guest User',
    email: 'guest@example.com',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setSaved(false)

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setSaved(true)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      {/* Header */}

      <div className="mb-8">

        <Link
          to="/account"
          className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-accent"
        >
          ← Back to Account
        </Link>

        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Account Details
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
          Manage your personal information and saved delivery address.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Personal information */}

        <div className="overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-6 text-white shadow-sm sm:p-8">

          <div className="border-b border-white/10 pb-5">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Personal Information
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Your details
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Keep your contact information up to date.
            </p>

          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            {/* Full name */}

            <div className="sm:col-span-2">

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
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
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
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            {/* Phone */}

            <div>

              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-white"
              >
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

          </div>

        </div>

        {/* Address */}

        <div className="overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-6 text-white shadow-sm sm:p-8">

          <div className="border-b border-white/10 pb-5">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Delivery Address
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              Saved address
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/50">
              This address can be used when placing future orders.
            </p>

          </div>

          <div className="mt-6 space-y-5">

            {/* Address */}

            <div>

              <label
                htmlFor="address"
                className="block text-sm font-semibold text-white"
              >
                Address
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                placeholder="House / flat number, street, locality"
                className="mt-2 w-full resize-none rounded-lg border border-white/15 bg-[#263238] px-4 py-3 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />

            </div>

            {/* City / State / PIN */}

            <div className="grid gap-5 sm:grid-cols-3">

              {/* City */}

              <div>

                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-white"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                />

              </div>

              {/* State */}

              <div>

                <label
                  htmlFor="state"
                  className="block text-sm font-semibold text-white"
                >
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                />

              </div>

              {/* PIN */}

              <div>

                <label
                  htmlFor="pincode"
                  className="block text-sm font-semibold text-white"
                >
                  PIN code
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit PIN"
                  maxLength="6"
                  className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                />

              </div>

            </div>

          </div>

        </div>

        {/* Save */}

        <div className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-surface-soft p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            {saved && (
              <p className="text-sm font-semibold text-success">
                Your details have been saved.
              </p>
            )}

            {!saved && (
              <p className="text-sm text-text-secondary">
                Review your information before saving.
              </p>
            )}

          </div>

          <button
            type="submit"
            className="rounded-lg bg-brand-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Save Details
          </button>

        </div>

      </form>

    </section>
  )
}

export default AccountDetails