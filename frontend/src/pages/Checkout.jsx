import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { useCart } from '@/context/CartContext'

import { createAddress } from '@/services/addressService'

function Checkout() {
    const navigate = useNavigate()

    const { cartItems, cartSubtotal } = useCart()

    const [address, setAddress] = useState({
        fullName: '',
        phone: '',
        addressLine: '',
        city: '',
        state: '',
        pincode: '',
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

        setAddress((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')

        const hasEmptyField =
            Object.values(address).some(
                (value) => !value.trim(),
            )

        if (hasEmptyField) {
            setError(
                'Please fill in all delivery address details.',
            )
            return
        }

        if (!/^[0-9]{10}$/.test(address.phone)) {
            setError(
                'Please enter a valid 10-digit phone number.',
            )
            return
        }

        if (!/^[0-9]{6}$/.test(address.pincode)) {
            setError(
                'Please enter a valid 6-digit PIN code.',
            )
            return
        }

        try {
            setIsSubmitting(true)

            const createdAddress =
                await createAddress({
                    addressType: 'home',

                    fullName:
                        address.fullName,

                    phone:
                        address.phone,

                    addressLine:
                        address.addressLine,

                    city:
                        address.city,

                    state:
                        address.state,

                    pincode:
                        address.pincode,

                    isDefault: false,
                })

            if (!createdAddress?.id) {
                setError(
                    'Unable to save your delivery address.',
                )
                return
            }

            sessionStorage.setItem(
                'nexhome-checkout-address-id',
                String(createdAddress.id),
            )

            navigate('/payment')
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
                        'Unable to save your delivery address.',
                )
            } else {
                setError(
                    'Unable to save your delivery address. Please try again.',
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
                        Checkout
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold text-text-primary">
                        Your cart is empty
                    </h1>

                    <p className="mt-3 text-text-secondary">
                        Add some products before proceeding to checkout.
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
                    Checkout
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                    Complete your order
                </h1>

                <p className="mt-3 text-base text-text-secondary">
                    Enter your delivery details and review your order before payment.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                {/* Delivery details */}

                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">
                            Step 1
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                            Delivery details
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
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
                                value={address.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-semibold text-text-primary"
                            >
                                Phone number
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={address.phone}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                maxLength="10"
                                className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="addressLine"
                                className="block text-sm font-semibold text-text-primary"
                            >
                                Address
                            </label>

                            <textarea
                                id="addressLine"
                                name="addressLine"
                                value={address.addressLine}
                                onChange={handleChange}
                                placeholder="House / flat number, street, locality"
                                rows="4"
                                className="mt-2 w-full resize-none rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                            />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-semibold text-text-primary"
                                >
                                    City
                                </label>

                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={address.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="state"
                                    className="block text-sm font-semibold text-text-primary"
                                >
                                    State
                                </label>

                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={address.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="pincode"
                                className="block text-sm font-semibold text-text-primary"
                            >
                                PIN code
                            </label>

                            <input
                                id="pincode"
                                name="pincode"
                                type="text"
                                inputMode="numeric"
                                value={address.pincode}
                                onChange={handleChange}
                                placeholder="6-digit PIN code"
                                maxLength="6"
                                className="mt-2 h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                            />
                        </div>

                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {isSubmitting
                                ? 'Saving address...'
                                : 'Continue to Payment'}
                        </button>
                    </form>
                </div>

                {/* Order summary */}

                <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-accent">
                        Order Summary
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                        Your order
                    </h2>

                    <div className="mt-6 divide-y divide-border">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 py-4 first:pt-0"
                            >
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-center">
                                    <span className="text-xs font-medium text-text-muted">
                                        Image
                                    </span>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold leading-5 text-text-primary">
                                        {item.name}
                                    </p>

                                    <p className="mt-1 text-xs text-text-secondary">
                                        Qty: {item.quantity}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-brand-accent">
                                        ₹
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 border-t border-border pt-5">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary">
                                Subtotal
                            </span>

                            <span className="font-medium text-text-primary">
                                ₹
                                {cartSubtotal.toLocaleString(
                                    'en-IN',
                                )}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-text-secondary">
                                Delivery
                            </span>

                            <span className="font-medium text-text-primary">
                                {deliveryCharge === 0
                                    ? 'FREE'
                                    : `₹${deliveryCharge}`}
                            </span>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                            <span className="text-base font-semibold text-text-primary">
                                Total
                            </span>

                            <span className="text-xl font-bold text-text-primary">
                                ₹
                                {orderTotal.toLocaleString(
                                    'en-IN',
                                )}
                            </span>
                        </div>
                    </div>

                    <Link
                        to="/cart"
                        className="mt-6 block text-center text-sm font-medium text-text-secondary transition-colors hover:text-brand-accent"
                    >
                        ← Back to cart
                    </Link>
                </aside>
            </div>
        </section>
    )
}

export default Checkout