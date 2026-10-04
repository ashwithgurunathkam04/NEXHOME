import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  addToCart as addProductToCart,
  clearCart as clearCartFromServer,
  deleteCartItem,
  getCart,
  updateCartItem,
} from '@/services/cartService'

import { useAuth } from '@/context/AuthContext'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const {
    isAuthenticated,
    loading: authLoading,
  } = useAuth()

  const [cartItems, setCartItems] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const loadCart = async () => {
    if (!isAuthenticated) {
      setCartItems([])
      return
    }

    try {
      setLoading(true)
      setError('')

      const cart = await getCart()

      const items =
        cart.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
          cartItemId: item.id,
        }))

      setCartItems(items)
    } catch (error) {
      console.error(
        'Failed to load cart:',
        error,
      )

      setError(
        'Unable to load your cart.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authLoading) {
      return
    }

    loadCart()
  }, [
    isAuthenticated,
    authLoading,
  ])

  const addToCart = async (
    product,
  ) => {
    if (
      !product ||
      product.stock <= 0 ||
      !isAuthenticated
    ) {
      return
    }

    try {
      setError('')

      const cart =
        await addProductToCart(
          product.id,
          1,
        )

      const items =
        cart.items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
          cartItemId: item.id,
        }))

      setCartItems(items)
    } catch (error) {
      console.error(
        'Failed to add product to cart:',
        error,
      )

      setError(
        error.response?.data?.error ||
        'Unable to add product to cart.',
      )
    }
  }

  const increaseQuantity = async (
    productId,
  ) => {
    const item =
      cartItems.find(
        (cartItem) =>
          cartItem.id === productId,
      )

    if (!item) {
      return
    }

    if (
      item.quantity >=
      item.stock
    ) {
      return
    }

    try {
      setError('')

      const updatedItem =
        await updateCartItem(
          item.cartItemId,
          item.quantity + 1,
        )

      setCartItems(
        (currentItems) =>
          currentItems.map(
            (currentItem) =>
              currentItem.id ===
                productId
                ? {
                  ...currentItem,
                  quantity:
                    updatedItem.quantity,
                }
                : currentItem,
          ),
      )
    } catch (error) {
      console.error(
        'Failed to increase cart quantity:',
        error,
      )

      setError(
        error.response?.data?.error ||
        'Unable to update cart quantity.',
      )
    }
  }

  const decreaseQuantity = async (
    productId,
  ) => {
    const item =
      cartItems.find(
        (cartItem) =>
          cartItem.id === productId,
      )

    if (!item) {
      return
    }

    if (item.quantity <= 1) {
      return
    }

    try {
      setError('')

      const updatedItem =
        await updateCartItem(
          item.cartItemId,
          item.quantity - 1,
        )

      setCartItems(
        (currentItems) =>
          currentItems.map(
            (currentItem) =>
              currentItem.id ===
                productId
                ? {
                  ...currentItem,
                  quantity:
                    updatedItem.quantity,
                }
                : currentItem,
          ),
      )
    } catch (error) {
      console.error(
        'Failed to decrease cart quantity:',
        error,
      )

      setError(
        error.response?.data?.error ||
        'Unable to update cart quantity.',
      )
    }
  }

  const removeFromCart = async (
    productId,
  ) => {
    const item =
      cartItems.find(
        (cartItem) =>
          cartItem.id === productId,
      )

    if (!item) {
      return
    }

    try {
      setError('')

      await deleteCartItem(
        item.cartItemId,
      )

      setCartItems(
        (currentItems) =>
          currentItems.filter(
            (currentItem) =>
              currentItem.id !==
              productId,
          ),
      )
    } catch (error) {
      console.error(
        'Failed to remove cart item:',
        error,
      )

      setError(
        error.response?.data?.error ||
        'Unable to remove cart item.',
      )
    }
  }

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCartItems([])
      return
    }

    try {
      setError('')

      await clearCartFromServer()

      setCartItems([])
    } catch (error) {
      console.error(
        'Failed to clear cart:',
        error,
      )

      setError(
        error.response?.data?.error ||
        'Unable to clear cart.',
      )
    }
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    )
  }, [cartItems])

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0,
    )
  }, [cartItems])

  const cartValue = {
    cartItems,
    cartCount,
    cartSubtotal,

    loading,
    error,

    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,

    refreshCart:
      loadCart,
  }

  return (
    <CartContext.Provider
      value={cartValue}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context =
    useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside a CartProvider',
    )
  }

  return context
}

export default CartProvider