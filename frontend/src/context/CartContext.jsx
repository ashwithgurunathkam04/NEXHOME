import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('nexhome-cart')

    if (!savedCart) {
      return []
    }

    try {
      return JSON.parse(savedCart)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'nexhome-cart',
      JSON.stringify(cartItems)
    )
  }, [cartItems])

  const addToCart = (product) => {
    if (!product || product.stock <= 0) {
      return
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      )

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return currentItems
        }

        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item
        }

        if (item.quantity >= item.stock) {
          return item
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        }
      })
    )
  }

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
  }, [cartItems])

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }, [cartItems])

  const cartValue = {
    cartItems,
    cartCount,
    cartSubtotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside a CartProvider'
    )
  }

  return context
}

export default CartProvider