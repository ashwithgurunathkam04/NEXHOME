import api from './api'

export const registerUser = async ({
    username,
    email,
    password,
    first_name,
    last_name,
}) => {
    const response = await api.post(
        '/auth/register/',
        {
            username,
            email,
            password,
            first_name,
            last_name,
        },
    )

    return response.data
}

export const loginUser = async ({
    username,
    password,
}) => {
    const response = await api.post(
        '/auth/login/',
        {
            username,
            password,
        },
    )

    return response.data
}

export const getProfile = async () => {
    const response = await api.get(
        '/auth/profile/',
    )

    return response.data
}

export const logoutUser = () => {
    localStorage.removeItem(
        'nexhome-access-token',
    )

    localStorage.removeItem(
        'nexhome-refresh-token',
    )
}