import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const WishlistContext = createContext(null)

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem(
      'nexhome-wishlist'
    )

    if (!savedWishlist) {
      return []
    }

    try {
      return JSON.parse(savedWishlist)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'nexhome-wishlist',
      JSON.stringify(wishlistItems)
    )
  }, [wishlistItems])

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item.id === productId
    )
  }

  const toggleWishlist = (product) => {
    if (!product || product.id === undefined) {
      return
    }

    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) => item.id === product.id
      )

      if (exists) {
        return currentItems.filter(
          (item) => item.id !== product.id
        )
      }

      return [
        ...currentItems,
        product,
      ]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    )
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const wishlistCount = useMemo(() => {
    return wishlistItems.length
  }, [wishlistItems])

  const wishlistValue = {
    wishlistItems,
    wishlistCount,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  }

  return (
    <WishlistContext.Provider value={wishlistValue}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error(
      'useWishlist must be used inside a WishlistProvider'
    )
  }

  return context
}

export default WishlistProvider