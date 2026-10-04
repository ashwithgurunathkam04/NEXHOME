import api from './api'

export const getAdminOrders = async () => {
    const response = await api.get('/admin/orders/')
    return response.data
}

export const updateAdminOrder = async (
    orderId,
    orderData,
) => {
    const response = await api.patch(
        `/admin/orders/${orderId}/`,
        orderData,
    )
    return response.data
}