import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCart, formatKsh } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  fullName: z.string().min(2, "Enter full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(9, "Enter phone number"),
  address: z.string().min(5, "Enter delivery address"),
  city: z.string().min(2, "Enter city"),
});

type FormValues = z.infer<typeof schema>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, cartTotalKsh, clearCart } = useCart();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { fullName: "", email: "", phone: "", address: "", city: "" } });

  const onSubmit = (data: FormValues) => {
    // Simulate payment/checkout success
    toast.success("Payment successful", { description: `Order total ${formatKsh(cartTotalKsh)}` });
    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
    const summary = {
      orderId,
      totalKsh: cartTotalKsh,
      items: state.items,
      customer: data,
    };
    // Persist a simple order snapshot for success page
    sessionStorage.setItem("kk_last_order", JSON.stringify(summary));
    clearCart();
    navigate("/order-success");
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card rounded-xl p-6 card-gradient">
          <h2 className="text-xl font-semibold mb-4">Shipping details</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0712 345 678" {...field} />
                  </FormControl>
                  <FormDescription>For delivery updates</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Nairobi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street, estate, building, apartment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="sm:col-span-2 flex justify-end mt-2">
                <Button type="submit" className="btn-hero">Pay Now</Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="bg-card rounded-xl p-6 card-gradient h-fit">
          <h2 className="text-xl font-semibold mb-4">Order summary</h2>
          <div className="space-y-3">
            {state.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span className="font-medium">{formatKsh(item.priceKsh * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4 flex items-center justify-between">
            <span className="text-foreground font-medium">Total</span>
            <span className="text-foreground font-semibold">{formatKsh(cartTotalKsh)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Shipping calculated at delivery. Secure checkout.</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
