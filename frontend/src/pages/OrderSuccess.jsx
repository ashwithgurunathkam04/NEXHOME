import { Link } from 'react-router-dom'

function OrderSuccess() {
  const orderId = `NEX-${Date.now()
    .toString()
    .slice(-8)}`

  return (
    <section className="mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

      <div className="w-full max-w-2xl">

        <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:p-12">

          {/* Success icon */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-2xl font-bold text-white">
              ✓
            </div>

          </div>

          {/* Heading */}

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-text-secondary">
            Your order has been placed successfully. We will keep you
            updated about your order and delivery.
          </p>

          {/* Order information */}

          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-surface-soft p-5 text-left">

            <div className="flex items-center justify-between gap-4">

              <span className="text-sm text-text-secondary">
                Order ID
              </span>

              <span className="text-sm font-semibold text-text-primary">
                {orderId}
              </span>

            </div>

            <div className="mt-4 flex items-center justify-between gap-4">

              <span className="text-sm text-text-secondary">
                Status
              </span>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-success">
                Confirmed
              </span>

            </div>

            <div className="mt-4 flex items-center justify-between gap-4">

              <span className="text-sm text-text-secondary">
                Payment
              </span>

              <span className="text-sm font-semibold text-text-primary">
                Successful
              </span>

            </div>

          </div>

          {/* Actions */}

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Continue Shopping
            </Link>

            <Link
              to="/account"
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-white px-6 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              Go to Account
            </Link>

          </div>

        </div>

      </div>

    </section>
  )
}

export default OrderSuccess