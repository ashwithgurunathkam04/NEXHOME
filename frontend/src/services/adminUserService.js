import api from './api'

export const getAdminUsers = async () => {
    const response = await api.get('/admin/users/')
    return response.data
}

export const updateAdminUser = async (
    userId,
    userData,
) => {
    const response = await api.patch(
        `/admin/users/${userId}/`,
        userData,
    )
    return response.data
}