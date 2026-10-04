import { useEffect, useState } from 'react'

import { getAdminOrders } from '@/services/adminOrderService'

function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadOrders = async () => {
            try {
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

        loadOrders()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading orders...
                </p>
            </div>
        )
    }

    if (error) {
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
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                order.status ===
                                                'delivered'
                                                    ? 'bg-green-100 text-green-700'
                                                    : order.status ===
                                                        'cancelled'
                                                      ? 'bg-red-100 text-red-700'
                                                      : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {order.status || 'Pending'}
                                        </span>
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