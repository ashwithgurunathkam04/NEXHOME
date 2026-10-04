import api from './api'

const normalizeProduct = (product) => {
    return {
        id: product.id,

        name: product.name,

        brand: product.brand,

        category:
            product.category?.slug ||
            product.category?.name ||
            '',

        description:
            product.description || '',

        price: Number(product.price),

        originalPrice: Number(
            product.original_price,
        ),

        stock: product.stock,

        rating: Number(product.rating),

        reviews: product.review_count,

        image:
            product.image_url ||
            '',

        imageBackground:
            '#f5f2ec',

        imageScale:
            1,

        imagePosition:
            'center',
    }
}

const normalizeNextUrl = (nextUrl) => {
    if (!nextUrl) {
        return null
    }

    try {
        const url = new URL(nextUrl)

        let path =
            `${url.pathname}${url.search}`

        if (path.startsWith('/api/')) {
            path = path.substring(4)
        }

        return path
    } catch {
        return nextUrl
    }
}

export const getProducts = async () => {
    let url = '/products/'

    const allProducts = []

    while (url) {
        const response = await api.get(url)

        const data = response.data

        const results =
            data?.results ||
            data ||
            []

        allProducts.push(
            ...results,
        )

        url = normalizeNextUrl(
            data?.next,
        )
    }

    return allProducts.map(
        normalizeProduct,
    )
}

export const getProductById = async (
    id,
) => {
    const response = await api.get(
        `/products/${id}/`,
    )

    return normalizeProduct(
        response.data,
    )
}

export const getProductsByCategory = async (
    category,
) => {
    let url = '/products/'

    const allProducts = []

    while (url) {
        const response = await api.get(
            url,
            {
                params:
                    url === '/products/'
                        ? { category }
                        : undefined,
            },
        )

        const data = response.data

        const results =
            data?.results ||
            data ||
            []

        allProducts.push(
            ...results,
        )

        url = normalizeNextUrl(
            data?.next,
        )
    }

    return allProducts.map(
        normalizeProduct,
    )
}

export const searchProducts = async (
    searchTerm,
) => {
    let url = '/products/'

    const allProducts = []

    while (url) {
        const response = await api.get(
            url,
            {
                params:
                    url === '/products/'
                        ? {
                            search: searchTerm,
                        }
                        : undefined,
            },
        )

        const data = response.data

        const results =
            data?.results ||
            data ||
            []

        allProducts.push(
            ...results,
        )

        url = normalizeNextUrl(
            data?.next,
        )
    }

    return allProducts.map(
        normalizeProduct,
    )
}