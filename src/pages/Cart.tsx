import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: cart, isLoading } = useQuery({ queryKey: ["cart"], queryFn: () => api.getCart() });
  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => api.updateCartItem(id, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
  const removeMutation = useMutation({
    mutationFn: (id: string) => api.removeCartItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const subtotal = (cart?.items || []).reduce((sum: number, i: any) => sum + i.quantity * i.priceCents, 0);

  const startCheckout = async () => {
    if (!cart?.id) return;
    const { checkoutId } = await api.startCheckout(cart.id);
    navigate(`/checkout/${checkoutId}`);
  };

  if (isLoading) return <div className="container mx-auto px-4 mt-24">Loading...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-24">
        <div>Your cart is empty.</div>
        <Link to="/shop" className="text-primary hover:underline">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24">
      <h1 className="text-2xl font-bold mb-4">Your cart</h1>
      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4 border p-3 rounded">
            <div className="w-16 h-16 bg-muted">
              {item.product?.images?.[0] ? <img src={item.product.images[0]} className="w-full h-full object-cover" /> : null}
            </div>
            <div className="flex-1">
              <div className="font-medium">{item.product?.name}</div>
              <div className="text-sm text-muted-foreground">KES {(item.priceCents / 100).toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 border" onClick={() => updateMutation.mutate({ id: item.id, quantity: Math.max(1, item.quantity - 1) })}>-</button>
              <span>{item.quantity}</span>
              <button className="px-2 border" onClick={() => updateMutation.mutate({ id: item.id, quantity: item.quantity + 1 })}>+</button>
              <button className="px-2 border" onClick={() => removeMutation.mutate(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Subtotal: KES {(subtotal / 100).toFixed(2)}</div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded" onClick={startCheckout}>Checkout</button>
      </div>
    </div>
  );
}
