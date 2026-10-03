import { Link } from 'react-router-dom'

const demoOrders = [
  {
    id: 'NEX-48273105',
    date: '03 October 2026',
    status: 'Delivered',
    payment: 'Paid',
    total: 42990,
    items: [
      {
        name: '1.5 Ton 5 Star Split Inverter AC',
        brand: 'LG',
        quantity: 1,
        price: 42990,
      },
    ],
  },
  {
    id: 'NEX-73194208',
    date: '28 September 2026',
    status: 'Processing',
    payment: 'Paid',
    total: 8999,
    items: [
      {
        name: 'Smart Air Fryer',
        brand: 'Philips',
        quantity: 1,
        price: 8999,
      },
    ],
  },
]

function Orders() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      <div className="mb-10">

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
          Account
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-3 text-base text-text-secondary">
              View your previous purchases and track your orders.
            </p>

          </div>

          <Link
            to="/products"
            className="inline-flex w-fit items-center rounded-lg bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

      <div className="space-y-6">

        {demoOrders.map((order) => (
          <article
            key={order.id}
            className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          >

            {/* Order header */}

            <div className="flex flex-col gap-5 border-b border-border bg-surface-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

              <div className="grid gap-4 sm:grid-cols-3 sm:gap-10">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                    Order ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-text-primary">
                    {order.id}
                  </p>

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                    Order Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {order.date}
                  </p>

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                    Total
                  </p>

                  <p className="mt-1 text-sm font-semibold text-text-primary">
                    ₹{order.total.toLocaleString('en-IN')}
                  </p>

                </div>

              </div>

              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                  order.status === 'Delivered'
                    ? 'bg-green-50 text-success'
                    : 'bg-brand-accent/10 text-brand-accent'
                }`}
              >
                {order.status}
              </span>

            </div>

            {/* Order items */}

            <div className="p-5 sm:p-6">

              <div className="space-y-5">

                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.name}`}
                    className="flex gap-4"
                  >

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-surface-soft">

                      <span className="text-xs font-medium text-text-muted">
                        Product Image
                      </span>

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                        {item.brand}
                      </p>

                      <h2 className="mt-1 text-base font-semibold text-text-primary">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-sm text-text-secondary">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-text-primary">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <span className="text-sm text-text-secondary">
                    Payment
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-success">
                    {order.payment}
                  </span>

                </div>

                <button
                  type="button"
                  className="text-left text-sm font-semibold text-brand-accent transition-colors hover:text-brand-accent-dark sm:text-right"
                >
                  View Order Details →
                </button>

              </div>

            </div>

          </article>
        ))}

      </div>

    </section>
  )
}

export default Orders