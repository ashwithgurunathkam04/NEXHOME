import api from './api'

export const getAdminProducts = async () => {
    const response = await api.get('/admin/products/')
    return response.data
}

export const createAdminProduct = async (productData) => {
    const response = await api.post(
        '/admin/products/',
        productData,
    )
    return response.data
}

export const updateAdminProduct = async (
    productId,
    productData,
) => {
    const response = await api.patch(
        `/admin/products/${productId}/`,
        productData,
    )
    return response.data
}

export const deactivateAdminProduct = async (
    productId,
) => {
    const response = await api.patch(
        `/admin/products/${productId}/`,
        {
            is_active: false,
        },
    )
    return response.data
}