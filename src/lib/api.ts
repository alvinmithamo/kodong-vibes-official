import { API_BASE_URL } from "./utils";

function getOrCreateSessionId(): string {
  try {
    let sid = localStorage.getItem("sessionId");
    if (!sid) {
      // Lightweight random id
      const arr = new Uint8Array(16);
      crypto.getRandomValues(arr);
      sid = Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
      localStorage.setItem("sessionId", sid);
    }
    return sid;
  } catch {
    return "";
  }
}

function getAuthToken(): string | null {
  try {
    return localStorage.getItem("authToken");
  } catch {
    return null;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const sessionId = getOrCreateSessionId();
  if (sessionId) headers["x-session-id"] = sessionId;
  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers, credentials: "include" });
  if (!res.ok) throw new Error((await res.text().catch(() => res.statusText)) || res.statusText);
  return (await res.json()) as T;
}

export const api = {
  // Auth
  signup: (payload: { email: string; password: string; name: string; phone?: string; dateOfBirth?: string }) =>
    request<{ token: string; user: any }>(`/api/auth/signup`, { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    request<{ token: string; user: any }>(`/api/auth/login`, { method: "POST", body: JSON.stringify(payload) }),
  me: () => request<{ auth: { userId: string; role: string } }>(`/api/auth/me`),

  // Products
  listProducts: (query: Record<string, string | number | undefined> = {}) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).length) params.append(k, String(v));
    });
    return request<{ items: any[]; total: number; page: number; pageSize: number }>(`/api/products?${params.toString()}`);
  },
  getProduct: (slug: string) => request<any>(`/api/products/${encodeURIComponent(slug)}`),
  listCategories: () => request<any[]>(`/api/products/categories`),
  listBrands: () => request<any[]>(`/api/products/brands`),

  // Cart
  getCart: (sessionId?: string) => request<{ id: string; items: any[] }>(`/api/cart/`, { headers: sessionId ? { "x-session-id": sessionId } : undefined }),
  addToCart: (payload: { productId: string; quantity?: number }, sessionId?: string) =>
    request(`/api/cart/items`, { method: "POST", body: JSON.stringify(payload), headers: sessionId ? { "x-session-id": sessionId } : undefined }),
  updateCartItem: (id: string, quantity: number) => request(`/api/cart/items/${id}`, { method: "PATCH", body: JSON.stringify({ quantity }) }),
  removeCartItem: (id: string) => request(`/api/cart/items/${id}`, { method: "DELETE" }),

  // Checkout
  startCheckout: (cartId: string) => request<{ checkoutId: string }>(`/api/checkout/start`, { method: "POST", body: JSON.stringify({ cartId }) }),
  setCustomer: (id: string, payload: { email: string; name: string; phone?: string }) => request(`/api/checkout/${id}/customer`, { method: "POST", body: JSON.stringify(payload) }),
  setAddress: (id: string, payload: { line1: string; line2?: string; city: string; state?: string; postalCode?: string; country: string; deliveryNotes?: string; deliverySlot?: string }) => request(`/api/checkout/${id}/address`, { method: "POST", body: JSON.stringify(payload) }),
  setAge: (id: string, payload: { dob: string }) => request(`/api/checkout/${id}/age`, { method: "POST", body: JSON.stringify(payload) }),
  setPayment: (id: string, method: "COD" | "MPESA" | "FLUTTERWAVE") => request(`/api/checkout/${id}/payment`, { method: "POST", body: JSON.stringify({ method }) }),
  applyPromo: (id: string, code: string) => request(`/api/checkout/${id}/promo`, { method: "POST", body: JSON.stringify({ code }) }),
  confirmOrder: (id: string) => request<{ order: any; payment: any }>(`/api/checkout/${id}/confirm`, { method: "POST" }),

  // Payments
  mpesaStk: (payload: { orderId: string; phoneNumber: string }) => request(`/api/payments/mpesa/stk`, { method: "POST", body: JSON.stringify(payload) }),
  flutterwaveInitiate: (payload: { orderId: string; email: string; name: string }) => request<{ link: string }>(`/api/payments/flutterwave/initiate`, { method: "POST", body: JSON.stringify(payload) }),

  // Orders
  myOrders: () => request<any[]>(`/api/orders`),
  getOrder: (orderNumber: string) => request<any>(`/api/orders/${encodeURIComponent(orderNumber)}`),

  // Admin
  adminListOrders: () => request<any[]>(`/api/admin/orders`),
  adminUpdateOrderStatus: (id: string, status: string) => request(`/api/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  adminCreateProduct: (payload: any) => request(`/api/admin/products`, { method: "POST", body: JSON.stringify(payload) }),
  adminUpdateProduct: (id: string, payload: any) => request(`/api/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  adminReportSummary: () => request<{ ordersCount: number; paymentsCount: number; totalSalesCents: number }>(`/api/admin/reports/summary`),
};
