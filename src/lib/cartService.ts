// lib/cartStore.ts
'use client';
import { create } from 'zustand';

export interface CartItem {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface CartState {
  cart: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'subtotal'>) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

const useCartStore = create<CartState>((set, get) => {
  const getInitialCart = () => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('ecom_cart');
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  };

  return {
    cart: getInitialCart(),
    total: 0,

    addItem: (item: Omit<CartItem, 'subtotal'>) => {
      const cart = get().cart;
      const existingItemIndex = cart.findIndex((cartItem: CartItem) => cartItem.id === item.id);

      if (existingItemIndex > -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += item?.quantity ?? 1;
        updatedCart[existingItemIndex].subtotal = parseInt(
          (updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].price * 100).toFixed(0)
        );
        set({ cart: updatedCart });
      } else {
        const newItem: CartItem = {
          ...item,
          quantity: 1,
          subtotal: parseInt((item.price * 1 * 100).toFixed(0)),
        };
        set({ cart: [...cart, newItem] });
      }

      localStorage.setItem('ecom_cart', JSON.stringify(get().cart));
      get().calculateTotal();
    },

    removeItem: (itemId: string) => {
      const updatedCart = get().cart.filter((item: CartItem) => item.id !== itemId);
      set({ cart: updatedCart });
      localStorage.setItem('ecom_cart', JSON.stringify(updatedCart));
      get().calculateTotal();
    },

    updateItemQuantity: (itemId: string, quantity: number) => {
      const cart = get().cart;
      const itemIndex = cart.findIndex((item: CartItem) => item.id === itemId);

      if (itemIndex > -1) {
        const updatedCart = [...cart];
        updatedCart[itemIndex].quantity = quantity;
        updatedCart[itemIndex].subtotal = parseInt((updatedCart[itemIndex].price * quantity * 100).toFixed(0));
        set({ cart: updatedCart });
        localStorage.setItem('ecom_cart', JSON.stringify(updatedCart));
        get().calculateTotal();
      }
    },

    clearCart: () => {
      set({ cart: [] });
      localStorage.removeItem('ecom_cart');
    },

    calculateTotal: () => {
      const total = get().cart.reduce((acc: number, item: CartItem) => acc + item.subtotal, 0);
      set({ total });
    },
  };
});

export default useCartStore;
