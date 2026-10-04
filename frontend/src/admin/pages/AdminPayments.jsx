import { useEffect, useState } from 'react'

import { getAdminPayments } from '@/services/adminPaymentService'

function AdminPayments() {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadPayments = async () => {
            try {
                const data = await getAdminPayments()

                setPayments(
                    Array.isArray(data)
                        ? data
                        : data.results || [],
                )
            } catch (error) {
                console.error(
                    'Failed to load admin payments:',
                    error,
                )
                setError('Failed to load payments.')
            } finally {
                setLoading(false)
            }
        }

        loadPayments()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading payments...
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
                    Payments
                </h1>

                <p className="mt-2 text-sm text-text-secondary">
                    View payment transactions for NEXHOME orders.
                </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1150px] text-left">
                        <thead className="border-b border-border bg-surface">
                            <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Payment
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Customer
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Order
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Method
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {payments.map((payment) => (
                                <tr
                                    key={payment.id}
                                    className="hover:bg-surface/50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-text-primary">
                                            #{payment.id}
                                        </p>

                                        <p className="mt-1 max-w-[180px] truncate text-xs text-text-secondary">
                                            {payment.transaction_id ||
                                                'No transaction ID'}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-text-primary">
                                            {payment.customer_name ||
                                                'Customer'}
                                        </p>

                                        <p className="mt-1 text-xs text-text-secondary">
                                            {payment.customer_email ||
                                                '-'}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-text-primary">
                                        #{payment.order_id}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-text-primary">
                                        ₹
                                        {Number(
                                            payment.amount ?? 0,
                                        ).toLocaleString(
                                            'en-IN',
                                        )}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex rounded-full bg-surface px-2.5 py-1 text-xs font-medium capitalize text-text-primary">
                                            {payment.payment_method ||
                                                '-'}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                                payment.status ===
                                                'success'
                                                    ? 'bg-green-100 text-green-700'
                                                    : payment.status ===
                                                        'failed'
                                                      ? 'bg-red-100 text-red-700'
                                                      : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {payment.status ||
                                                'Pending'}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        {payment.created_at
                                            ? new Date(
                                                  payment.created_at,
                                              ).toLocaleString(
                                                  'en-IN',
                                              )
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {payments.length === 0 && (
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm text-text-secondary">
                            No payments found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminPayments