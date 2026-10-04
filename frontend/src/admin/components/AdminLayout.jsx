import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

const navigationItems = [
    {
        label: 'Dashboard',
        path: '/admin',
    },
    {
        label: 'Products',
        path: '/admin/products',
    },
    {
        label: 'Categories',
        path: '/admin/categories',
    },
    {
        label: 'Orders',
        path: '/admin/orders',
    },
    {
        label: 'Users',
        path: '/admin/users',
    },
    {
        label: 'Payments',
        path: '/admin/payments',
    },
]

function AdminLayout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-surface text-text-primary">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="hidden w-64 shrink-0 border-r border-border bg-brand-dark lg:flex lg:flex-col">
                    {/* Brand */}
                    <div className="border-b border-white/10 px-6 py-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                            NEXHOME
                        </p>

                        <h1 className="mt-1 text-xl font-semibold text-white">
                            Admin Panel
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6">
                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                            Management
                        </p>

                        <div className="space-y-1">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/admin'}
                                    className={({ isActive }) =>
                                        `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-brand-accent text-white'
                                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    {/* Bottom Actions */}
                    <div className="border-t border-white/10 p-4">
                        <div className="mb-4 rounded-lg bg-white/5 px-3 py-3">
                            <p className="text-xs text-white/40">
                                Signed in as
                            </p>

                            <p className="mt-1 truncate text-sm font-medium text-white">
                                {user?.username}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="mb-2 w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            ← Back to Store
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-brand-accent transition-colors hover:bg-brand-accent/10"
                        >
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="min-w-0 flex-1">
                    {/* Mobile Header */}
                    <header className="border-b border-border bg-brand-dark px-5 py-4 lg:hidden">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                                    NEXHOME
                                </p>

                                <h1 className="text-lg font-semibold text-white">
                                    Admin Panel
                                </h1>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-sm font-medium text-brand-accent"
                            >
                                Sign Out
                            </button>
                        </div>

                        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/admin'}
                                    className={({ isActive }) =>
                                        `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium ${
                                            isActive
                                                ? 'bg-brand-accent text-white'
                                                : 'bg-white/10 text-white/70'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </header>

                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout