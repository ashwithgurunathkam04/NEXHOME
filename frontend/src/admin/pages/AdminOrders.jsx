import { useEffect, useState } from 'react'

import {
    getAdminOrders,
    updateAdminOrder,
} from '@/services/adminOrderService'

const ORDER_STATUSES = [
    'pending',
    'confirmed',
    'shipped',
    'delivered',
    'cancelled',
]

function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingOrderId, setUpdatingOrderId] =
        useState(null)

    const loadOrders = async () => {
        try {
            setError('')

            const data = await getAdminOrders()

            setOrders(
                Array.isArray(data)
                    ? data
                    : data.results || [],
            )
        } catch (error) {
            console.error(
                'Failed to load admin orders:',
                error,
            )
            setError('Failed to load orders.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const handleStatusChange = async (
        orderId,
        newStatus,
    ) => {
        try {
            setError('')
            setUpdatingOrderId(orderId)

            await updateAdminOrder(orderId, {
                status: newStatus,
            })

            await loadOrders()
        } catch (error) {
            console.error(
                'Failed to update order status:',
                error,
            )
            setError(
                'Failed to update order status. Please try again.',
            )
        } finally {
            setUpdatingOrderId(null)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading orders...
                </p>
            </div>
        )
    }

    if (error && orders.length === 0) {
        return (
            <div className="p-6 lg:p-8">
                <p className="text-sm text-red-600">
                    {error}
                </p>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8">
            <div>
                <p className="text-sm font-medium text-brand-accent">
                    Management
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-text-primary">
                    Orders
                </h1>

                <p className="mt-2 text-sm text-text-secondary">
                    View and manage customer orders.
                </p>
            </div>

            {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-left">
                        <thead className="border-b border-border bg-surface">
                            <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Order
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Customer
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Payment
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Created
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-surface/50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-text-primary">
                                            #{order.id}
                                        </p>

                                        <p className="mt-1 text-xs text-text-secondary">
                                            {order.items_count ?? 0}{' '}
                                            item
                                            {order.items_count === 1
                                                ? ''
                                                : 's'}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-text-primary">
                                            {order.customer_name ||
                                                order.user_name ||
                                                'Customer'}
                                        </p>

                                        <p className="mt-1 text-xs text-text-secondary">
                                            {order.customer_email ||
                                                order.user_email ||
                                                ''}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-text-primary">
                                        ₹
                                        {Number(
                                            order.total_amount ?? 0,
                                        ).toLocaleString(
                                            'en-IN',
                                        )}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                order.payment_status ===
                                                'paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : order.payment_status ===
                                                        'failed'
                                                      ? 'bg-red-100 text-red-700'
                                                      : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {order.payment_status ||
                                                'Pending'}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <select
                                            value={
                                                order.status ||
                                                'pending'
                                            }
                                            onChange={(event) =>
                                                handleStatusChange(
                                                    order.id,
                                                    event.target.value,
                                                )
                                            }
                                            disabled={
                                                updatingOrderId ===
                                                order.id
                                            }
                                            className={`rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium outline-none transition focus:border-brand-accent ${
                                                order.status ===
                                                'delivered'
                                                    ? 'text-green-700'
                                                    : order.status ===
                                                        'cancelled'
                                                      ? 'text-red-700'
                                                      : order.status ===
                                                          'shipped'
                                                        ? 'text-blue-700'
                                                        : order.status ===
                                                            'confirmed'
                                                          ? 'text-brand-accent'
                                                          : 'text-yellow-700'
                                            }`}
                                        >
                                            {ORDER_STATUSES.map(
                                                (status) => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            status.slice(
                                                                1,
                                                            )}
                                                    </option>
                                                ),
                                            )}
                                        </select>

                                        {updatingOrderId ===
                                            order.id && (
                                            <p className="mt-1 text-xs text-text-secondary">
                                                Updating...
                                            </p>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        {order.created_at
                                            ? new Date(
                                                  order.created_at,
                                              ).toLocaleDateString(
                                                  'en-IN',
                                              )
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {orders.length === 0 && (
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm text-text-secondary">
                            No orders found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminOrders