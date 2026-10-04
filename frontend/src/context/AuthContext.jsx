import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import {
    getProfile,
    logoutUser,
} from '@/services/authService'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            const accessToken =
                localStorage.getItem(
                    'nexhome-access-token',
                )

            if (!accessToken) {
                setLoading(false)
                return
            }

            try {
                const profile =
                    await getProfile()
                
                console.log('NEXHOME PROFILE:', profile)

                setUser(profile)
            } catch (error) {
                console.error(
                    'Failed to load authenticated user:',
                    error,
                )

                logoutUser()
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    const login = (profile) => {
        setUser(profile)
    }

    const logout = () => {
        logoutUser()
        setUser(null)
    }

    const value = {
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context =
        useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider',
        )
    }

    return context
}

export default AuthProvider