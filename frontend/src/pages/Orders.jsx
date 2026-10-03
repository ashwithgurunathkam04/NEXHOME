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

      {/* Page header */}

      <div className="mb-10">

        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
          Account
        </p>

        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
              View your purchases, payment status, and order information.
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

      {/* Orders */}

      <div className="space-y-6">

        {demoOrders.map((order) => (
          <article
            key={order.id}
            className="overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark text-white shadow-sm"
          >

            {/* Order header */}

            <div className="border-b border-white/10 bg-[#263238] p-5 sm:p-6">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="grid gap-5 sm:grid-cols-3 sm:gap-10">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                      Order ID
                    </p>

                    <p className="mt-2 text-sm font-semibold text-white">
                      {order.id}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Order Date
                    </p>

                    <p className="mt-2 text-sm font-medium text-white/85">
                      {order.date}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      Order Total
                    </p>

                    <p className="mt-2 text-sm font-bold text-white">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>

                  </div>

                </div>

                <span className="w-fit rounded-md border border-brand-accent bg-brand-accent px-3 py-1.5 text-xs font-bold text-white">
                  {order.status}
                </span>

              </div>

            </div>

            {/* Order items */}

            <div className="p-5 sm:p-6">

              <div className="space-y-5">

                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.name}`}
                    className="flex flex-col gap-4 sm:flex-row"
                  >

                    {/* Product image placeholder */}

                    <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#f5f2ec] sm:h-24 sm:w-24">

                      <span className="text-xs font-semibold text-text-secondary">
                        Product Image
                      </span>

                    </div>

                    {/* Product information */}

                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                        {item.brand}
                      </p>

                      <h2 className="mt-2 text-base font-semibold leading-6 text-white sm:text-lg">
                        {item.name}
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-4">

                        <p className="text-sm text-white/55">
                          Quantity: {item.quantity}
                        </p>

                        <span className="h-1 w-1 rounded-full bg-white/25" />

                        <p className="text-sm font-semibold text-white">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* Bottom actions */}

              <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <span className="text-sm text-white/55">
                    Payment
                  </span>

                  <span className="rounded-md border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent">
                    {order.payment}
                  </span>

                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="inline-flex w-fit items-center rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
                >
                  View Order Details
                  <span className="ml-2">→</span>
                </Link>

              </div>

            </div>

          </article>
        ))}

      </div>

    </section>
  )
}

export default Orders