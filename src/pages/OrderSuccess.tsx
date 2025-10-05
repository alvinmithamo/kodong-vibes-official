import React from "react";
import { Link } from "react-router-dom";
import { formatKsh } from "@/context/CartContext";

const OrderSuccess: React.FC = () => {
  const raw = sessionStorage.getItem("kk_last_order");
  const data = raw ? (JSON.parse(raw) as any) : null;

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="bg-card rounded-2xl p-10 card-gradient">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed</h1>
          <p className="text-muted-foreground mb-6">Thank you for your purchase! A confirmation has been sent to your email.</p>
          {data && (
            <div className="text-left bg-background/60 rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-semibold mb-4">{data.orderId}</p>
              <div className="space-y-2 text-sm">
                {data.items?.map((it: any) => (
                  <div key={it.id} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{it.name} × {it.quantity}</span>
                    <span className="font-medium">{formatKsh(it.priceKsh * it.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-4 flex items-center justify-between">
                <span className="text-foreground font-medium">Total</span>
                <span className="text-foreground font-semibold">{formatKsh(data.totalKsh)}</span>
              </div>
            </div>
          )}
          <Link to="/merch" className="btn-hero inline-flex">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
