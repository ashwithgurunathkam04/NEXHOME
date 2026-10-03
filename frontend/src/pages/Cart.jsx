import { Link } from 'react-router-dom'

import { useCart } from '@/context/CartContext'

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  const deliveryCharge =
    cartSubtotal >= 10000 || cartSubtotal === 0
      ? 0
      : 99

  const total =
    cartSubtotal + deliveryCharge

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-lg text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Your bag
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-4 text-base leading-7 text-text-secondary">
            Add products you love and they will appear here.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Start shopping
          </Link>

        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Your bag
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Shopping cart
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="w-fit text-sm font-semibold text-text-secondary transition-colors hover:text-danger"
        >
          Clear cart
        </button>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">

        {/* Cart items */}

        <div className="space-y-4">

          {cartItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-border bg-white p-5 sm:p-6"
            >

              <div className="flex flex-col gap-5 sm:flex-row">

                <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-xl bg-[#f5f2ec] sm:w-36">
                  <span className="px-4 text-center text-xs font-medium text-text-secondary">
                    Product image
                  </span>
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                        {item.brand}
                      </p>

                      <Link
                        to={`/products/${item.id}`}
                        className="mt-2 block text-lg font-semibold leading-6 text-text-primary transition-colors hover:text-brand-accent"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="shrink-0 text-sm font-medium text-text-muted transition-colors hover:text-danger"
                    >
                      Remove
                    </button>

                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                    <div className="flex items-center rounded-lg border border-border">

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="flex h-10 w-10 items-center justify-center text-lg text-text-primary transition-colors hover:bg-surface-soft"
                      >
                        −
                      </button>

                      <span className="flex h-10 min-w-10 items-center justify-center border-x border-border px-3 text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        disabled={
                          item.quantity >= item.stock
                        }
                        className="flex h-10 w-10 items-center justify-center text-lg text-text-primary transition-colors hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>

                    </div>

                    <div className="text-right">

                      <p className="text-lg font-bold text-text-primary">
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString('en-IN')}
                      </p>

                      {item.quantity > 1 && (
                        <p className="mt-1 text-xs text-text-muted">
                          ₹
                          {item.price.toLocaleString('en-IN')}
                          {' '}each
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* Order summary */}

        <aside className="h-fit rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-6">

          <h2 className="text-xl font-semibold text-text-primary">
            Order summary
          </h2>

          <div className="mt-6 space-y-4 border-b border-border pb-6">

            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-text-secondary">
                Subtotal
              </span>

              <span className="font-semibold text-text-primary">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-text-secondary">
                Delivery
              </span>

              <span className="font-semibold text-text-primary">
                {deliveryCharge === 0
                  ? 'FREE'
                  : `₹${deliveryCharge}`}
              </span>
            </div>

          </div>

          <div className="mt-6 flex items-center justify-between gap-4">

            <span className="text-base font-semibold text-text-primary">
              Total
            </span>

            <span className="text-2xl font-bold text-text-primary">
              ₹{total.toLocaleString('en-IN')}
            </span>

          </div>

          <Link
            to="/checkout"
            className="mt-7 flex w-full items-center justify-center rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/products"
            className="mt-3 flex w-full items-center justify-center rounded-lg border border-border-strong px-6 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent"
          >
            Continue Shopping
          </Link>

          {cartSubtotal < 10000 && (
            <p className="mt-5 text-center text-xs leading-5 text-text-muted">
              Add ₹
              {(10000 - cartSubtotal).toLocaleString('en-IN')}
              {' '}more to unlock free delivery.
            </p>
          )}

        </aside>

      </div>

    </section>
  )
}

export default Cart