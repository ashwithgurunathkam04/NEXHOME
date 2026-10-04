import {
  Link,
  useParams,
} from 'react-router-dom'

import {
  useEffect,
  useState,
} from 'react'

import {
  getOrderById,
} from '@/services/orderService'

import {
  getAddresses,
} from '@/services/addressService'


function OrderDetails() {
  const { id } = useParams()

  const [order, setOrder] =
    useState(null)

  const [address, setAddress] =
    useState(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {
    const fetchOrderDetails =
      async () => {
        if (!id) {
          setError(
            'Order ID is missing.',
          )

          setIsLoading(false)

          return
        }

        try {
          setIsLoading(true)
          setError('')

          const [
            orderData,
            addresses,
          ] = await Promise.all([
            getOrderById(id),
            getAddresses(),
          ])

          setOrder(orderData)

          const matchingAddress =
            addresses.find(
              (item) =>
                Number(item.id) ===
                Number(orderData.address),
            )

          setAddress(
            matchingAddress || null,
          )
        } catch (requestError) {
          console.error(
            'Failed to fetch order details:',
            requestError,
          )

          const responseData =
            requestError?.response?.data

          const backendMessage =
            responseData?.detail ||
            responseData?.error

          setError(
            backendMessage ||
            'Unable to load order details. Please try again.',
          )
        } finally {
          setIsLoading(false)
        }
      }

    fetchOrderDetails()
  }, [id])


  const formatDate = (
    dateString,
  ) => {
    if (!dateString) {
      return 'Unknown date'
    }

    const date =
      new Date(dateString)

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return 'Unknown date'
    }

    return date.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    )
  }


  const formatStatus = (
    status,
  ) => {
    if (!status) {
      return 'Unknown'
    }

    return status
      .charAt(0)
      .toUpperCase() +
      status.slice(1)
  }


  const getStatusStep = (
    status,
  ) => {
    const steps = [
      'pending',
      'confirmed',
      'shipped',
      'delivered',
    ]

    return steps.indexOf(status)
  }


  const statusSteps = [
    {
      key: 'pending',
      label: 'Ordered',
    },
    {
      key: 'confirmed',
      label: 'Processing',
    },
    {
      key: 'shipped',
      label: 'Shipped',
    },
    {
      key: 'delivered',
      label: 'Delivered',
    },
  ]


  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Order Details
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
            Loading order...
          </h1>

          <p className="mt-3 text-text-secondary">
            Fetching your order information.
          </p>
        </div>
      </section>
    )
  }


  if (error || !order) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
            Order Details
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
            Unable to load order
          </h1>

          <p className="mt-3 text-text-secondary">
            {error ||
              'The requested order could not be found.'}
          </p>

          <Link
            to="/orders"
            className="mt-7 inline-flex rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark"
          >
            ← Back to Orders
          </Link>
        </div>
      </section>
    )
  }


  const currentStatus =
    order.status

  const currentStep =
    getStatusStep(
      currentStatus,
    )

  const isCancelled =
    currentStatus ===
    'cancelled'

  const subtotal =
    Math.max(
      0,
      Number(order.totalAmount || 0) -
        Number(
          order.deliveryCharge || 0,
        ),
    )

  const paymentStatus =
    order.paymentStatus ||
    'pending'


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
              #{order.id}
            </h1>

            <p className="mt-2 text-sm text-text-secondary">
              Placed on {formatDate(order.createdAt)}
            </p>

          </div>


          <span
            className={
              isCancelled
                ? 'w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-danger'
                : 'w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-success'
            }
          >
            {formatStatus(
              order.status,
            )}
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
                  {formatStatus(
                    order.status,
                  )}
                </h2>

              </div>


              <div
                className={
                  isCancelled
                    ? 'flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-danger'
                    : 'flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl font-bold text-success'
                }
              >
                {isCancelled
                  ? '!'
                  : '✓'}
              </div>

            </div>


            {!isCancelled && (
              <div className="mt-7">

                <div className="relative">

                  <div className="absolute left-4 right-4 top-4 h-0.5 bg-border" />


                  <div className="relative flex justify-between">

                    {statusSteps.map(
                      (
                        step,
                        index,
                      ) => {

                        const isCompleted =
                          currentStep >=
                          index

                        return (
                          <div
                            key={
                              step.key
                            }
                            className="flex flex-col items-center"
                          >

                            <div
                              className={
                                isCompleted
                                  ? 'flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white'
                                  : 'flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-xs font-bold text-text-muted'
                              }
                            >
                              {isCompleted
                                ? '✓'
                                : ''}
                            </div>

                            <p className="mt-2 text-xs font-semibold text-text-primary">
                              {
                                step.label
                              }
                            </p>

                          </div>
                        )
                      },
                    )}

                  </div>

                </div>

              </div>
            )}


            {isCancelled && (
              <div className="mt-7 rounded-xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm font-medium text-danger">
                  This order has been cancelled.
                </p>
              </div>
            )}

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

              {order.items.map(
                (item) => {

                  const product =
                    item.product

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 py-5 first:pt-0"
                    >

                      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-soft">

                        {product?.image ? (
                          <img
                            src={
                              product.image
                            }
                            alt={
                              product.name
                            }
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs font-medium text-text-muted">
                            Product Image
                          </span>
                        )}

                      </div>


                      <div className="min-w-0 flex-1">

                        {product?.brand && (
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
                            {
                              product.brand
                            }
                          </p>
                        )}


                        <h3 className="mt-1 text-base font-semibold text-text-primary">
                          {
                            product?.name ||
                            'Product'
                          }
                        </h3>


                        <p className="mt-2 text-sm text-text-secondary">
                          Quantity:{' '}
                          {
                            item.quantity
                          }
                        </p>


                        <p className="mt-2 text-sm font-semibold text-text-primary">
                          ₹
                          {Number(
                            item.price || 0,
                          ).toLocaleString(
                            'en-IN',
                          )}
                        </p>

                      </div>

                    </div>
                  )
                },
              )}

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

              {address ? (
                <>
                  <p className="text-sm font-semibold text-text-primary">
                    {
                      address.fullName
                    }
                  </p>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {
                      address.addressLine
                    }
                    <br />
                    {
                      address.city
                    }
                    ,{' '}
                    {
                      address.state
                    }
                    <br />
                    PIN:{' '}
                    {
                      address.pincode
                    }
                  </p>

                  <p className="mt-3 text-sm text-text-secondary">
                    Phone:{' '}
                    {
                      address.phone
                    }
                  </p>
                </>
              ) : (
                <p className="text-sm text-text-secondary">
                  Delivery address information is unavailable.
                </p>
              )}

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
                  Not recorded
                </span>

              </div>


              <div className="flex items-center justify-between gap-4">

                <span className="text-sm text-text-secondary">
                  Status
                </span>

                <span
                  className={
                    paymentStatus ===
                    'paid'
                      ? 'rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-success'
                      : paymentStatus ===
                        'failed'
                      ? 'rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-danger'
                      : 'rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700'
                  }
                >
                  {formatStatus(
                    paymentStatus,
                  )}
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
                  ₹
                  {subtotal.toLocaleString(
                    'en-IN',
                  )}
                </span>

              </div>


              <div className="flex items-center justify-between gap-4 text-sm">

                <span className="text-text-secondary">
                  Delivery
                </span>

                <span className="font-medium text-text-primary">
                  {Number(
                    order.deliveryCharge ||
                      0,
                  ) === 0
                    ? 'FREE'
                    : `₹${Number(
                        order.deliveryCharge ||
                          0,
                      ).toLocaleString(
                        'en-IN',
                      )}`}
                </span>

              </div>


              <div className="border-t border-border pt-5">

                <div className="flex items-center justify-between gap-4">

                  <span className="font-semibold text-text-primary">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-text-primary">
                    ₹
                    {Number(
                      order.totalAmount ||
                        0,
                    ).toLocaleString(
                      'en-IN',
                    )}
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