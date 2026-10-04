import api from './api'

const normalizeProduct = (
    product,
) => {
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

        price: Number(
            product.price,
        ),

        originalPrice: Number(
            product.original_price,
        ),

        stock: product.stock,

        rating: Number(
            product.rating,
        ),

        reviews:
            product.review_count,

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

const normalizeOrderItem = (
    item,
) => {
    return {
        id: item.id,

        product:
            normalizeProduct(
                item.product,
            ),

        quantity: Number(
            item.quantity,
        ),

        price: Number(
            item.price,
        ),

        subtotal: Number(
            item.subtotal,
        ),
    }
}

const normalizeOrder = (
    order,
) => {
    return {
        id: order.id,

        status:
            order.status,

        paymentStatus:
            order.payment_status,

        totalAmount: Number(
            order.total_amount,
        ),

        deliveryCharge: Number(
            order.delivery_charge,
        ),

        address:
            order.address,

        items:
            order.items?.map(
                normalizeOrderItem,
            ) || [],

        createdAt:
            order.created_at,

        updatedAt:
            order.updated_at,
    }
}

export const createOrder = async (
    addressId,
) => {
    const response =
        await api.post(
            '/orders/create/',
            {
                address_id:
                    addressId,
            },
        )

    return normalizeOrder(
        response.data,
    )
}

export const getOrders =
    async () => {
        const response =
            await api.get(
                '/orders/',
            )

        const data =
            response.data

        const results =
            data?.results ||
            data ||
            []

        return results.map(
            normalizeOrder,
        )
    }

export const getOrderById =
    async (
        orderId,
    ) => {
        const response =
            await api.get(
                `/orders/${orderId}/`,
            )

        return normalizeOrder(
            response.data,
        )
    }

export const cancelOrder =
    async (
        orderId,
    ) => {
        const response =
            await api.post(
                `/orders/${orderId}/cancel/`,
            )

        return normalizeOrder(
            response.data,
        )
    }