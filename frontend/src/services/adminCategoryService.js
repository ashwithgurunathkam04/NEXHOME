import api from './api'

export const getAdminCategories = async () => {
    const response = await api.get('/admin/categories/')
    return response.data
}

export const createAdminCategory = async (categoryData) => {
    const response = await api.post(
        '/admin/categories/',
        categoryData,
    )
    return response.data
}

export const updateAdminCategory = async (
    categoryId,
    categoryData,
) => {
    const response = await api.patch(
        `/admin/categories/${categoryId}/`,
        categoryData,
    )
    return response.data
}

export const deactivateAdminCategory = async (
    categoryId,
) => {
    const response = await api.patch(
        `/admin/categories/${categoryId}/`,
        {
            is_active: false,
        },
    )
    return response.data
}