import { useEffect, useState } from 'react'

const initialForm = {
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    original_price: '',
    stock: '',
    rating: '',
    review_count: '',
    image_url: '',
    is_active: true,
}

function ProductForm({
    product,
    categories,
    onSubmit,
    onCancel,
    submitting,
}) {
    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || '',
                brand: product.brand || '',
                category: product.category || '',
                description: product.description || '',
                price: product.price || '',
                original_price:
                    product.original_price || '',
                stock: product.stock ?? '',
                rating: product.rating ?? '',
                review_count:
                    product.review_count ?? '',
                image_url: product.image_url || '',
                is_active:
                    product.is_active ?? true,
            })
        } else {
            setForm(initialForm)
        }
    }, [product])

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
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
                <div className="border-b border-border px-6 py-5">
                    <h2 className="text-xl font-semibold text-text-primary">
                        {product
                            ? 'Edit Product'
                            : 'Add Product'}
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        {product
                            ? 'Update the product details.'
                            : 'Add a new product to NEXHOME.'}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6"
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Product Name
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
                                Brand
                            </label>

                            <input
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            >
                                <option value="">
                                    Select category
                                </option>

                                {categories.map(
                                    (category) => (
                                        <option
                                            key={
                                                category.id
                                            }
                                            value={
                                                category.id
                                            }
                                        >
                                            {
                                                category.name
                                            }
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Image URL
                            </label>

                            <input
                                name="image_url"
                                value={form.image_url}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Price
                            </label>

                            <input
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Original Price
                            </label>

                            <input
                                name="original_price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.original_price}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Stock
                            </label>

                            <input
                                name="stock"
                                type="number"
                                min="0"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Rating
                            </label>

                            <input
                                name="rating"
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={form.rating}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text-primary">
                                Review Count
                            </label>

                            <input
                                name="review_count"
                                type="number"
                                min="0"
                                value={form.review_count}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-accent"
                            />
                        </div>
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
                            Product is active
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
                                : product
                                  ? 'Update Product'
                                  : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm