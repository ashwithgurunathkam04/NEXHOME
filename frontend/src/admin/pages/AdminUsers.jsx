import { useEffect, useState } from 'react'

import {
    getAdminUsers,
    updateAdminUser,
} from '@/services/adminUserService'

function AdminUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingUserId, setUpdatingUserId] =
        useState(null)

    const loadUsers = async () => {
        try {
            setError('')

            const data = await getAdminUsers()

            setUsers(
                Array.isArray(data)
                    ? data
                    : data.results || [],
            )
        } catch (error) {
            console.error(
                'Failed to load admin users:',
                error,
            )
            setError('Failed to load users.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const handleStatusChange = async (
        userId,
        isActive,
    ) => {
        try {
            setError('')
            setUpdatingUserId(userId)

            await updateAdminUser(userId, {
                is_active: isActive,
            })

            await loadUsers()
        } catch (error) {
            console.error(
                'Failed to update user status:',
                error,
            )

            setError(
                'Failed to update user status. Please try again.',
            )
        } finally {
            setUpdatingUserId(null)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-text-secondary">
                    Loading users...
                </p>
            </div>
        )
    }

    if (error && users.length === 0) {
        return (
            <div className="p-6 lg:p-8">
                <p className="text-sm text-red-600">
                    {error}
                </p>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8">
            <div>
                <p className="text-sm font-medium text-brand-accent">
                    Management
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-text-primary">
                    Users
                </h1>

                <p className="mt-2 text-sm text-text-secondary">
                    View and manage NEXHOME customer accounts.
                </p>
            </div>

            {error && (
                <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead className="border-b border-border bg-surface">
                            <tr>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    User
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Email
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Role
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                    Joined
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-surface/50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-text-primary">
                                            {user.username}
                                        </p>

                                        <p className="mt-1 text-xs text-text-secondary">
                                            ID #{user.id}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        {user.email || '-'}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-text-primary">
                                            {user.is_staff
                                                ? 'Admin'
                                                : 'Customer'}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <select
                                            value={
                                                user.is_active
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                            disabled={
                                                updatingUserId ===
                                                user.id
                                            }
                                            onChange={(event) =>
                                                handleStatusChange(
                                                    user.id,
                                                    event.target
                                                        .value ===
                                                        'active',
                                                )
                                            }
                                            className={`rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium outline-none transition focus:border-brand-accent ${
                                                user.is_active
                                                    ? 'text-green-700'
                                                    : 'text-red-700'
                                            }`}
                                        >
                                            <option value="active">
                                                Active
                                            </option>

                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </select>

                                        {updatingUserId ===
                                            user.id && (
                                            <p className="mt-1 text-xs text-text-secondary">
                                                Updating...
                                            </p>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-text-secondary">
                                        {user.date_joined
                                            ? new Date(
                                                  user.date_joined,
                                              ).toLocaleDateString(
                                                  'en-IN',
                                              )
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm text-text-secondary">
                            No users found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminUsers