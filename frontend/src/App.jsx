import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from '@/components/layout/MainLayout'

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

function App() {
  return (
    <BrowserRouter>
      <Routes>

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

      </Routes>
    </BrowserRouter>
  )
}

export default App