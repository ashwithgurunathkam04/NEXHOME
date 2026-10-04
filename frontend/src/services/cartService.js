import api from './api'

const normalizeProduct = (product) => {
    if (!product) {
        return null
    }

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

const normalizeCartItem = (item) => {
    return {
        id: item.id,

        quantity: Number(
            item.quantity,
        ),

        product:
            normalizeProduct(
                item.product,
            ),

        subtotal: Number(
            item.subtotal ||
            0,
        ),
    }
}

const normalizeCart = (cart) => {
    const items =
        cart?.items ||
        []

    return {
        id: cart?.id,

        items: items.map(
            normalizeCartItem,
        ),

        total: Number(
            cart?.total ||
            0,
        ),
    }
}

export const getCart = async () => {
    const response =
        await api.get('/cart/')

    return normalizeCart(
        response.data,
    )
}

export const addToCart = async (
    productId,
    quantity = 1,
) => {
    const response =
        await api.post(
            '/cart/add/',
            {
                product_id:
                    productId,

                quantity,
            },
        )

    return normalizeCart(
        response.data,
    )
}

export const updateCartItem = async (
    cartItemId,
    quantity,
) => {
    const response =
        await api.patch(
            `/cart/items/${cartItemId}/`,
            {
                quantity,
            },
        )

    return normalizeCartItem(
        response.data,
    )
}

export const deleteCartItem = async (
    cartItemId,
) => {
    await api.delete(
        `/cart/items/${cartItemId}/delete/`,
    )
}

export const clearCart = async () => {
    await api.delete(
        '/cart/clear/',
    )
}