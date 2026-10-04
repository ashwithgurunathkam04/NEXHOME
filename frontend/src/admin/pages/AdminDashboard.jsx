import { useEffect, useState } from 'react'

import { getAdminDashboard } from '@/services/adminService'

function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await getAdminDashboard()
                setStats(data)
            } catch (error) {
                console.error(
                    'Failed to load admin dashboard:',
                    error,
                )
                setError('Failed to load dashboard data.')
            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading dashboard...
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
                    Overview
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-text-primary">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-text-secondary">
                    Welcome to the NEXHOME admin dashboard.
                </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Products
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        {stats.total_products}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Categories
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        {stats.total_categories}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Users
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        {stats.total_users}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Orders
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        {stats.total_orders}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Revenue
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        ₹{Number(stats.total_revenue).toLocaleString('en-IN')}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Pending Orders
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        {stats.pending_orders}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Successful Payments
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        {stats.successful_payments}
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary">
                        Failed Payments
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                        {stats.failed_payments}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard