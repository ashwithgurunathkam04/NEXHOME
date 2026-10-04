import { useEffect, useState } from 'react'

const initialForm = {
    name: '',
    slug: '',
    description: '',
    is_active: true,
}

function CategoryForm({
    category,
    onSubmit,
    onCancel,
    submitting,
}) {
    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        if (category) {
            setForm({
                name: category.name || '',
                slug: category.slug || '',
                description:
                    category.description || '',
                is_active:
                    category.is_active ?? true,
            })
        } else {
            setForm(initialForm)
        }
    }, [category])

    const handleChange = (event) => {
        const { name, value, type, checked } =
            event.target

        setForm((current) => ({
            ...current,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
                <div className="border-b border-border px-6 py-5">
                    <h2 className="text-xl font-semibold text-text-primary">
                        {category
                            ? 'Edit Category'
                            : 'Add Category'}
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        {category
                            ? 'Update the category details.'
                            : 'Add a new product category.'}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-text-primary">
                            Category Name
                        </label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text-primary">
                            Slug
                        </label>

                        <input
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            required
                            placeholder="example-category"
                            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-text-primary">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                        />
                    </div>

                    <label className="flex items-center gap-3">
                        <input
                            name="is_active"
                            type="checkbox"
                            checked={form.is_active}
                            onChange={handleChange}
                            className="h-4 w-4 accent-brand-accent"
                        />

                        <span className="text-sm font-medium text-text-primary">
                            Category is active
                        </span>
                    </label>

                    <div className="flex justify-end gap-3 border-t border-border pt-5">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={submitting}
                            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                        >
                            {submitting
                                ? 'Saving...'
                                : category
                                  ? 'Update Category'
                                  : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm