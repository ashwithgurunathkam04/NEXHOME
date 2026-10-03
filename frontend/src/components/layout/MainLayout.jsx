import { Outlet } from 'react-router-dom'

import Header from '@/components/layout/Header'

function MainLayout() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">

      <Header />

      <main className="min-h-[calc(100vh-128px)]">
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout