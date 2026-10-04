import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from '@/admin/components/AdminRoute'
import AdminLayout from '@/admin/components/AdminLayout'
import MainLayout from '@/components/layout/MainLayout'
import AdminProducts from '@/admin/pages/AdminProducts'
import AdminCategories from '@/admin/pages/AdminCategories'
import AdminOrders from '@/admin/pages/AdminOrders'
import AdminUsers from '@/admin/pages/AdminUsers'
import AdminPayments from '@/admin/pages/AdminPayments'

import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetails from '@/pages/ProductDetails'
import Cart from '@/pages/Cart'
import Wishlist from '@/pages/Wishlist'
import Account from '@/pages/Account'
import AccountDetails from '@/pages/AccountDetails'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Checkout from '@/pages/Checkout'
import Payment from '@/pages/Payment'
import OrderSuccess from '@/pages/OrderSuccess'
import Orders from '@/pages/Orders'
import OrderDetails from '@/pages/OrderDetails'

import AdminDashboard from '@/admin/pages/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Customer Application */}
        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/account"
            element={<Account />}
          />

          <Route
            path="/account/details"
            element={<AccountDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

        </Route>

<Route element={<AdminRoute />}>
  <Route element={<AdminLayout />}>
  <Route
    path="/admin/payments"
    element={<AdminPayments />}
/>
  <Route
    path="/admin/users"
    element={<AdminUsers />}
/>
  <Route
    path="/admin/orders"
    element={<AdminOrders />}
/>
  <Route
    path="/admin/categories"
    element={<AdminCategories />}
/>
  <Route
    path="/admin/products"
    element={<AdminProducts />}
/>
    <Route
      path="/admin"
      element={<AdminDashboard />}
    />
  </Route>
</Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App