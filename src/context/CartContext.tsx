import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  id: number | string;
  name: string;
  priceKsh: number; // price in KSh (whole shillings)
  quantity: number;
  category?: string;
};

export type CartState = {
  items: CartItem[];
};

const CART_STORAGE_KEY = "kk_cart_v1";

const initialState: CartState = {
  items: [],
};

// Actions
 type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: CartItem["id"] } }
  | { type: "UPDATE_QTY"; payload: { id: CartItem["id"]; quantity: number } }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex((i) => i.id === action.payload.id);
      if (existingIndex !== -1) {
        const clone = [...state.items];
        clone[existingIndex] = {
          ...clone[existingIndex],
          quantity: clone[existingIndex].quantity + action.payload.quantity,
        };
        return { items: clone };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM": {
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    }
    case "UPDATE_QTY": {
      return {
        items: state.items
          .map((i) => (i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    }
    case "CLEAR": {
      return { items: [] };
    }
    default:
      return state;
  }
}

// Context value
 type CartContextValue = {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: CartItem["id"]) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
  clearCart: () => void;
  cartCount: number; // total quantity across items
  cartTotalKsh: number; // total in KSh
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (defaultState) => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return defaultState;
      const parsed = JSON.parse(raw) as CartState;
      if (!parsed || !Array.isArray(parsed.items)) return defaultState;
      return parsed;
    } catch {
      return defaultState;
    }
  });

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence errors
    }
  }, [state]);

  const cartCount = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items]);
  const cartTotalKsh = useMemo(() => state.items.reduce((sum, i) => sum + i.priceKsh * i.quantity, 0), [state.items]);

  const value = useMemo<CartContextValue>(() => ({
    state,
    addItem: (item, quantity = 1) => {
      dispatch({ type: "ADD_ITEM", payload: { ...item, quantity } });
    },
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
    updateQuantity: (id, quantity) => dispatch({ type: "UPDATE_QTY", payload: { id, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    cartCount,
    cartTotalKsh,
  }), [state, cartCount, cartTotalKsh]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatKsh(ksh: number): string {
  return `KSh ${ksh.toLocaleString("en-KE")}`;
}
