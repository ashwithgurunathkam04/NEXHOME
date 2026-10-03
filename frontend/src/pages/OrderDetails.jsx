import { Link, useParams } from 'react-router-dom'

const demoOrder = {
  id: 'NEX-48273105',
  date: '03 October 2026',
  status: 'Delivered',
  payment: 'Paid',
  paymentMethod: 'UPI',
  subtotal: 42990,
  delivery: 0,
  total: 42990,

  customer: {
    name: 'Guest User',
    phone: '9876543210',
    address: 'House No. 12-3, Main Road',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
  },

  items: [
    {
      id: 1,
      name: '1.5 Ton 5 Star Split Inverter AC',
      brand: 'LG',
      quantity: 1,
      price: 42990,
    },
  ],
}

function OrderDetails() {
  const { id } = useParams()

  /*
    Real order information will be fetched from Django
    using the order ID later.
  */

  const order = {
    ...demoOrder,
    id: id || demoOrder.id,
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      {/* Header */}

      <div className="mb-8">

        <Link
          to="/orders"
          className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-accent"
        >
          ← Back to Orders
        </Link>

        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
              Order Details
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              {order.id}
            </h1>

            <p className="mt-2 text-sm text-text-secondary">
              Placed on {order.date}
            </p>

          </div>

          <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-success">
            {order.status}
          </span>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        {/* Main content */}

        <div className="space-y-6">

          {/* Order status */}

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                  Order Status
                </p>

                <h2 className="mt-2 text-xl font-semibold text-text-primary">
                  {order.status}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl font-bold text-success">
                ✓
              </div>

            </div>

            <div className="mt-7">

              <div className="relative">

                <div className="absolute left-4 right-4 top-4 h-0.5 bg-border" />

                <div className="relative flex justify-between">

                  <div className="flex flex-col items-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                      ✓
                    </div>

                    <p className="mt-2 text-xs font-semibold text-text-primary">
                      Ordered
                    </p>

                  </div>

                  <div className="flex flex-col items-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                      ✓
                    </div>

                    <p className="mt-2 text-xs font-semibold text-text-primary">
                      Processing
                    </p>

                  </div>

                  <div className="flex flex-col items-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                      ✓
                    </div>

                    <p className="mt-2 text-xs font-semibold text-text-primary">
                      Shipped
                    </p>

                  </div>

                  <div className="flex flex-col items-center">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-xs font-bold text-white">
                      ✓
                    </div>

                    <p className="mt-2 text-xs font-semibold text-text-primary">
                      Delivered
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Products */}

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Items
            </p>

            <h2 className="mt-2 text-xl font-semibold text-text-primary">
              Products in this order
            </h2>

            <div className="mt-6 divide-y divide-border">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-5 first:pt-0"
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

                    <h3 className="mt-1 text-base font-semibold text-text-primary">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-text-secondary">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-text-primary">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Delivery address */}

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Delivery
            </p>

            <h2 className="mt-2 text-xl font-semibold text-text-primary">
              Delivery address
            </h2>

            <div className="mt-5 rounded-xl bg-surface-soft p-5">

              <p className="text-sm font-semibold text-text-primary">
                {order.customer.name}
              </p>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {order.customer.address}
                <br />
                {order.customer.city}, {order.customer.state}
                <br />
                PIN: {order.customer.pincode}
              </p>

              <p className="mt-3 text-sm text-text-secondary">
                Phone: {order.customer.phone}
              </p>

            </div>

          </div>

        </div>

        {/* Summary */}

        <aside className="h-fit space-y-6 lg:sticky lg:top-6">

          {/* Payment */}

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Payment
            </p>

            <h2 className="mt-2 text-xl font-semibold text-text-primary">
              Payment information
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between gap-4">

                <span className="text-sm text-text-secondary">
                  Method
                </span>

                <span className="text-sm font-semibold text-text-primary">
                  {order.paymentMethod}
                </span>

              </div>

              <div className="flex items-center justify-between gap-4">

                <span className="text-sm text-text-secondary">
                  Status
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-success">
                  {order.payment}
                </span>

              </div>

            </div>

          </div>

          {/* Order total */}

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Order Summary
            </p>

            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between gap-4 text-sm">

                <span className="text-text-secondary">
                  Subtotal
                </span>

                <span className="font-medium text-text-primary">
                  ₹{order.subtotal.toLocaleString('en-IN')}
                </span>

              </div>

              <div className="flex items-center justify-between gap-4 text-sm">

                <span className="text-text-secondary">
                  Delivery
                </span>

                <span className="font-medium text-text-primary">
                  {order.delivery === 0
                    ? 'FREE'
                    : `₹${order.delivery.toLocaleString('en-IN')}`}
                </span>

              </div>

              <div className="border-t border-border pt-5">

                <div className="flex items-center justify-between gap-4">

                  <span className="font-semibold text-text-primary">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-text-primary">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>

                </div>

              </div>

            </div>

          </div>

          <Link
            to="/products"
            className="flex w-full items-center justify-center rounded-lg bg-brand-accent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Continue Shopping
          </Link>

        </aside>

      </div>

    </section>
  )
}

export default OrderDetails