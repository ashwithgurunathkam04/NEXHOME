import { useEffect, useState } from 'react'

import { getAdminCategories } from '@/services/adminCategoryService'

function AdminCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getAdminCategories()

                setCategories(
                    Array.isArray(data)
                        ? data
                        : data.results || [],
                )
            } catch (error) {
                console.error(
                    'Failed to load admin categories:',
                    error,
                )
                setError(
                    'Failed to load categories.',
                )
            } finally {
                setLoading(false)
            }
        }

        loadCategories()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading categories...
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-brand-accent">
                        Management
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold text-text-primary">
                        Categories
                    </h1>

                    <p className="mt-2 text-sm text-text-secondary">
                        Manage product categories in the NEXHOME store.
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    Add Category
                </button>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead className="border-b border-border bg-surface">
                            <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Name
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Slug
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Products
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-surface/50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-text-primary">
                                            {category.name}
                                        </p>

                                        <p className="mt-1 text-xs text-text-secondary">
                                            ID #{category.id}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        {category.slug}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-primary">
                                        {category.product_count ?? 0}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                category.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {category.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categories.length === 0 && (
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm text-text-secondary">
                            No categories found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminCategories