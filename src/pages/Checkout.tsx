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

  const onSubmit = async (data: FormValues) => {
    try {
      // Convert phone to 2547XXXXXXXX format if provided as 07XXXXXXXX
      const normalizePhone = (p: string) => {
        const digits = p.replace(/\D/g, "");
        if (digits.startsWith("0")) return `254${digits.slice(1)}`;
        if (digits.startsWith("254")) return digits;
        return digits; // assume already normalized
      };

      const phone = normalizePhone(data.phone);
      const amount = cartTotalKsh;
      toast("Initiating M-PESA STK push...");

      const startRes = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount, accountReference: "KKMerch", transactionDesc: "Merch Purchase" }),
      });
      const startData = await startRes.json();
      if (!startRes.ok) {
        throw new Error(startData?.errorMessage || startData?.error || "Failed to start STK push");
      }

      const checkoutId: string | undefined = startData.CheckoutRequestID;
      if (!checkoutId) throw new Error("No CheckoutRequestID returned");

      // Poll status for up to ~90 seconds
      const startedAt = Date.now();
      const deadlineMs = 90_000;
      let resultCode: string | undefined;
      let receipt: string | undefined;

      while (Date.now() - startedAt < deadlineMs) {
        await new Promise((r) => setTimeout(r, 5000));
        const qRes = await fetch("/api/mpesa/stkquery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ CheckoutRequestID: checkoutId }),
        });
        const qData = await qRes.json();
        if (!qRes.ok) throw new Error(qData?.errorMessage || qData?.error || "Query failed");

        resultCode = qData?.ResultCode ?? qData?.resultCode;
        // 0 means success
        if (resultCode === "0" || resultCode === 0) {
          // Safaricom does not return receipt here; it's in callback. We'll proceed as paid.
          break;
        }

        // For common failures, stop early
        if (["1032", 1032, "2001", 2001, "1", 1].includes(resultCode as any)) {
          throw new Error("Payment not completed. Please try again.");
        }
      }

      if (!(resultCode === "0" || resultCode === 0)) {
        throw new Error("Payment timeout or not completed.");
      }

      toast.success("Payment successful", { description: `Order total ${formatKsh(cartTotalKsh)}` });
      const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
      const summary = {
        orderId,
        totalKsh: cartTotalKsh,
        items: state.items,
        customer: data,
        receipt,
      };
      sessionStorage.setItem("kk_last_order", JSON.stringify(summary));
      clearCart();
      navigate("/order-success");
    } catch (e: any) {
      toast.error("Payment failed", { description: e.message || String(e) });
    }
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
