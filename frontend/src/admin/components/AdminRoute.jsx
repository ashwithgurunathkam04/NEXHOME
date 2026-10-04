import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

function AdminRoute() {
    const {
        user,
        isAuthenticated,
        loading,
    } = useAuth()

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-surface">
                <p className="text-sm text-text-secondary">
                    Checking admin access...
                </p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (!user?.is_staff) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default AdminRoute