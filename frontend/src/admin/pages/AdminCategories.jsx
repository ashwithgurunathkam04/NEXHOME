import { useEffect, useState } from 'react'

import CategoryForm from '@/admin/components/CategoryForm'
import {
    createAdminCategory,
    deactivateAdminCategory,
    getAdminCategories,
    updateAdminCategory,
} from '@/services/adminCategoryService'

function AdminCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [showForm, setShowForm] = useState(false)
    const [editingCategory, setEditingCategory] =
        useState(null)

    const [submitting, setSubmitting] =
        useState(false)

    const loadCategories = async () => {
        try {
            setLoading(true)
            setError('')

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

            setError('Failed to load categories.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const handleAddCategory = () => {
        setEditingCategory(null)
        setShowForm(true)
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category)
        setShowForm(true)
    }

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true)
            setError('')

            if (editingCategory) {
                await updateAdminCategory(
                    editingCategory.id,
                    formData,
                )
            } else {
                await createAdminCategory(formData)
            }

            setShowForm(false)
            setEditingCategory(null)

            await loadCategories()
        } catch (error) {
            console.error(
                'Failed to save category:',
                error,
            )

            setError(
                error?.response?.data
                    ? JSON.stringify(
                          error.response.data,
                      )
                    : 'Failed to save category.',
            )
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeactivateCategory = async (category) => {
    const confirmed = window.confirm(
        `Deactivate "${category.name}"?`,
    )

    if (!confirmed) {
        return
    }

    try {
        setError('')

        await deactivateAdminCategory(category.id)

        await loadCategories()
    } catch (error) {
        console.error(
            'Failed to deactivate category:',
            error,
        )

        setError(
            error?.response?.data
                ? JSON.stringify(
                      error.response.data,
                  )
                : 'Failed to deactivate category.',
        )
    }
}

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading categories...
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
                    onClick={handleAddCategory}
                    className="rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    Add Category
                </button>
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
                    <table className="w-full min-w-[800px] text-left">
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

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Action
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
                                        {category.product_count ??
                                            0}
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

                                  <td className="px-5 py-4">
    <div className="flex items-center gap-3">
        <button
            type="button"
            onClick={() => handleEditCategory(category)}
            className="text-sm font-medium text-brand-accent hover:underline"
        >
            Edit
        </button>

        {category.is_active ? (
            <button
                type="button"
                onClick={() => handleDeactivateCategory(category)}
                className="text-sm font-medium text-red-600 hover:underline"
            >
                Deactivate
            </button>
        ) : (
            <span className="text-sm font-medium text-text-secondary">
                Inactive
            </span>
        )}
    </div>
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

            {showForm && (
                <CategoryForm
                    category={editingCategory}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false)
                        setEditingCategory(null)
                    }}
                    submitting={submitting}
                />
            )}
        </div>
    )
}

export default AdminCategories