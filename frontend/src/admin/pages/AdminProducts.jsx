import { useEffect, useState } from 'react'

import { getAdminProducts } from '@/services/adminProductService'

function AdminProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getAdminProducts()

                setProducts(
                    Array.isArray(data)
                        ? data
                        : data.results || [],
                )
            } catch (error) {
                console.error(
                    'Failed to load admin products:',
                    error,
                )
                setError(
                    'Failed to load products.',
                )
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading products...
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
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-text-secondary">
                        Manage products available in the NEXHOME store.
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    Add Product
                </button>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead className="border-b border-border bg-surface">
                            <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Product
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Brand
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Category
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Price
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Stock
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-surface/50"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-xs text-text-secondary">
                                                    N/A
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-medium text-text-primary">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-xs text-text-secondary">
                                                    ID #{product.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-primary">
                                        {product.brand}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        {product.category_name}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-text-primary">
                                        ₹
                                        {Number(
                                            product.price,
                                        ).toLocaleString(
                                            'en-IN',
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-primary">
                                        {product.stock}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                product.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {product.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm text-text-secondary">
                            No products found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminProducts