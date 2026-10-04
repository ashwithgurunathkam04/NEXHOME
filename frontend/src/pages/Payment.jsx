import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { useCart } from '@/context/CartContext'

import { createOrder } from '@/services/orderService'


function Payment() {
  const navigate = useNavigate()

  const { cartItems, cartSubtotal, clearCart } = useCart()

  const [paymentMethod, setPaymentMethod] = useState('upi')

  const [paymentData, setPaymentData] = useState({
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  })

  const [error, setError] = useState('')

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const deliveryCharge =
    cartSubtotal >= 10000 ? 0 : 99

  const orderTotal =
    cartSubtotal + deliveryCharge

  const handleChange = (event) => {
    const { name, value } = event.target

    setPaymentData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handlePayment = async (event) => {
    event.preventDefault()

    setError('')

    if (paymentMethod === 'upi') {
      if (!paymentData.upiId.trim()) {
        setError('Please enter your UPI ID.')
        return
      }

      if (!/^[\w.-]+@[\w.-]+$/.test(paymentData.upiId)) {
        setError('Please enter a valid UPI ID.')
        return
      }
    }

    if (paymentMethod === 'card') {
      if (
        !paymentData.cardNumber ||
        !paymentData.expiry ||
        !paymentData.cvv ||
        !paymentData.cardName
      ) {
        setError('Please fill in all card details.')
        return
      }

      if (!/^[0-9]{16}$/.test(paymentData.cardNumber)) {
        setError('Card number must contain 16 digits.')
        return
      }

      if (!/^[0-9]{2}\/[0-9]{2}$/.test(paymentData.expiry)) {
        setError('Expiry date must be in MM/YY format.')
        return
      }

      if (!/^[0-9]{3,4}$/.test(paymentData.cvv)) {
        setError('Please enter a valid CVV.')
        return
      }
    }

    const storedAddressId =
      sessionStorage.getItem(
        'nexhome-checkout-address-id',
      )

    if (!storedAddressId) {
      setError(
        'Delivery address not found. Please go back and enter your address again.',
      )
      return
    }

    const addressId =
      Number(storedAddressId)

    if (
      !Number.isInteger(addressId) ||
      addressId <= 0
    ) {
      setError(
        'Invalid delivery address. Please go back and enter your address again.',
      )
      return
    }

    try {
      setIsSubmitting(true)

      const order =
        await createOrder(addressId)

      if (!order?.id) {
        setError(
          'Order could not be created. Please try again.',
        )
        return
      }

      clearCart()

      sessionStorage.removeItem(
        'nexhome-checkout-address-id',
      )

      navigate('/order-success')
    } catch (requestError) {
      const responseData =
        requestError?.response?.data

      const backendError =
        responseData?.error

      if (backendError) {
        setError(backendError)
      } else if (
        responseData &&
        typeof responseData === 'object'
      ) {
        const firstError =
          Object.values(responseData)
            .flat()
            .find(
              (value) =>
                typeof value === 'string',
            )

        setError(
          firstError ||
            'Unable to place your order. Please try again.',
        )
      } else {
        setError(
          'Unable to place your order. Please try again.',
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Payment
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            No order to pay for
          </h1>

          <p className="mt-3 text-text-secondary">
            Add products to your cart before proceeding to payment.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            Browse Products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Header */}

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
          Payment
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Choose your payment method
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
          Select how you would like to pay for your NEXHOME order.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Payment section */}

        <div className="overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-6 text-white shadow-sm sm:p-8">
          <div className="border-b border-white/10 pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">
              Step 2
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Payment method
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Choose your preferred payment option.
            </p>
          </div>

          {/* Payment methods */}

          <div className="mt-7 space-y-3">
            {/* UPI */}

            <button
              type="button"
              onClick={() => {
                setPaymentMethod('upi')
                setError('')
              }}
              className={`w-full rounded-xl border-2 p-4 text-left transition ${
                paymentMethod === 'upi'
                  ? 'border-brand-accent bg-brand-accent/10'
                  : 'border-white/10 bg-[#263238] hover:border-brand-accent/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    paymentMethod === 'upi'
                      ? 'border-brand-accent'
                      : 'border-white/30'
                  }`}
                >
                  {paymentMethod === 'upi' && (
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                  )}
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    UPI
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Pay using Google Pay, PhonePe, Paytm or another UPI app.
                  </p>
                </div>
              </div>
            </button>

            {/* Card */}

            <button
              type="button"
              onClick={() => {
                setPaymentMethod('card')
                setError('')
              }}
              className={`w-full rounded-xl border-2 p-4 text-left transition ${
                paymentMethod === 'card'
                  ? 'border-brand-accent bg-brand-accent/10'
                  : 'border-white/10 bg-[#263238] hover:border-brand-accent/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    paymentMethod === 'card'
                      ? 'border-brand-accent'
                      : 'border-white/30'
                  }`}
                >
                  {paymentMethod === 'card' && (
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                  )}
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Credit / Debit Card
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Securely pay using your credit or debit card.
                  </p>
                </div>
              </div>
            </button>

            {/* COD */}

            <button
              type="button"
              onClick={() => {
                setPaymentMethod('cod')
                setError('')
              }}
              className={`w-full rounded-xl border-2 p-4 text-left transition ${
                paymentMethod === 'cod'
                  ? 'border-brand-accent bg-brand-accent/10'
                  : 'border-white/10 bg-[#263238] hover:border-brand-accent/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    paymentMethod === 'cod'
                      ? 'border-brand-accent'
                      : 'border-white/30'
                  }`}
                >
                  {paymentMethod === 'cod' && (
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                  )}
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Cash on Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Pay when your order is delivered.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* UPI form */}

          {paymentMethod === 'upi' && (
            <div className="mt-7">
              <label
                htmlFor="upiId"
                className="block text-sm font-semibold text-white"
              >
                UPI ID
              </label>

              <input
                id="upiId"
                name="upiId"
                type="text"
                value={paymentData.upiId}
                onChange={handleChange}
                placeholder="example@upi"
                className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
              />
            </div>
          )}

          {/* Card form */}

          {paymentMethod === 'card' && (
            <div className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="cardName"
                  className="block text-sm font-semibold text-white"
                >
                  Name on card
                </label>

                <input
                  id="cardName"
                  name="cardName"
                  type="text"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  placeholder="Enter name on card"
                  className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                />
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-semibold text-white"
                >
                  Card number
                </label>

                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  placeholder="16-digit card number"
                  maxLength="16"
                  className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-semibold text-white"
                  >
                    Expiry
                  </label>

                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    value={paymentData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-semibold text-white"
                  >
                    CVV
                  </label>

                  <input
                    id="cvv"
                    name="cvv"
                    type="password"
                    inputMode="numeric"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    maxLength="4"
                    className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-[#263238] px-4 text-sm text-white placeholder:text-white/35 transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* COD */}

          {paymentMethod === 'cod' && (
            <div className="mt-7 rounded-xl border border-brand-accent/40 bg-brand-accent/10 p-5">
              <p className="text-sm font-semibold text-white">
                Cash on Delivery selected
              </p>

              <p className="mt-2 text-sm leading-6 text-white/55">
                You will pay the order amount when the package is delivered
                to your address.
              </p>
            </div>
          )}

          {/* Error */}

          {error && (
            <div className="mt-6 rounded-lg border border-brand-accent/40 bg-brand-accent/10 px-4 py-3 text-sm font-medium text-brand-accent">
              {error}
            </div>
          )}

          {/* Payment action */}

          <form onSubmit={handlePayment}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 w-full rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Placing Order...'
                : paymentMethod === 'cod'
                  ? 'Place Order'
                  : `Pay ₹${orderTotal.toLocaleString('en-IN')}`}
            </button>
          </form>

          <Link
            to="/checkout"
            className="mt-5 block text-center text-sm font-medium text-white/50 transition-colors hover:text-brand-accent"
          >
            ← Back to delivery details
          </Link>
        </div>

        {/* Order summary */}

        <aside className="h-fit overflow-hidden rounded-2xl border-2 border-brand-accent bg-brand-dark p-6 text-white shadow-sm lg:sticky lg:top-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">
            Order Summary
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Total payable
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/55">
                Products
              </span>

              <span className="font-medium text-white">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/55">
                Delivery
              </span>

              <span className="font-medium text-white">
                {deliveryCharge === 0
                  ? 'FREE'
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">
                  Total
                </span>

                <span className="text-2xl font-bold text-white">
                  ₹{orderTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-[#263238] p-4">
            <p className="text-xs leading-5 text-white/45">
              Your payment details are currently handled only by this
              frontend demo. Real payment processing will be integrated
              securely through the backend and payment gateway.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Payment