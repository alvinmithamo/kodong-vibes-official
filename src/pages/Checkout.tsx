import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "@/lib/api";

export default function CheckoutPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<"customer" | "address" | "age" | "payment" | "review">("customer");
  const [customer, setCustomer] = useState({ email: "", name: "", phone: "" });
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", postalCode: "", country: "KE", deliveryNotes: "", deliverySlot: "" });
  const [dob, setDob] = useState("");
  const [method, setMethod] = useState<"COD" | "MPESA" | "FLUTTERWAVE">("COD");
  const [promo, setPromo] = useState("");

  const next = async () => {
    if (step === "customer") {
      await api.setCustomer(id, customer);
      setStep("address");
    } else if (step === "address") {
      await api.setAddress(id, address);
      setStep("age");
    } else if (step === "age") {
      await api.setAge(id, { dob });
      setStep("payment");
    } else if (step === "payment") {
      await api.setPayment(id, method);
      if (promo) {
        try { await api.applyPromo(id, promo); } catch {}
      }
      setStep("review");
    } else if (step === "review") {
      const { order, payment } = await api.confirmOrder(id);
      if (payment.provider === "COD") {
        navigate(`/order/${order.orderNumber}`);
      } else if (payment.provider === "MPESA") {
        // Minimal MPESA flow: ask for phone and trigger STK
        const phoneNumber = prompt("Enter your M-Pesa phone number (2547XXXXXXXX)") || "";
        await api.mpesaStk({ orderId: order.id, phoneNumber });
        alert("STK push sent. Complete on your phone.");
        navigate(`/order/${order.orderNumber}`);
      } else if (payment.provider === "FLUTTERWAVE") {
        const { link } = await api.flutterwaveInitiate({ orderId: order.id, email: customer.email, name: customer.name });
        window.location.href = link;
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-24 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-6">Step: {step}</div>

      {step === "customer" && (
        <div className="space-y-3">
          <input className="border rounded px-3 py-2 w-full" placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Full name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Phone (optional)" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
        </div>
      )}

      {step === "address" && (
        <div className="space-y-3">
          <input className="border rounded px-3 py-2 w-full" placeholder="Address line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Address line 2" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2 w-full" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <input className="border rounded px-3 py-2 w-full" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2 w-full" placeholder="Postal code" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
            <input className="border rounded px-3 py-2 w-full" placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
          </div>
          <input className="border rounded px-3 py-2 w-full" placeholder="Delivery notes" value={address.deliveryNotes} onChange={(e) => setAddress({ ...address, deliveryNotes: e.target.value })} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Preferred delivery slot (e.g. 6-8pm)" value={address.deliverySlot} onChange={(e) => setAddress({ ...address, deliverySlot: e.target.value })} />
        </div>
      )}

      {step === "age" && (
        <div className="space-y-3">
          <input className="border rounded px-3 py-2 w-full" placeholder="Date of birth (YYYY-MM-DD)" value={dob} onChange={(e) => setDob(e.target.value)} />
          <div className="text-sm text-muted-foreground">You must be 18+ to purchase alcohol.</div>
        </div>
      )}

      {step === "payment" && (
        <div className="space-y-3">
          <select className="border rounded px-3 py-2 w-full" value={method} onChange={(e) => setMethod(e.target.value as any)}>
            <option value="COD">Cash on Delivery</option>
            <option value="MPESA">M-Pesa (STK Push)</option>
            <option value="FLUTTERWAVE">Bank Card (Flutterwave)</option>
          </select>
          <input className="border rounded px-3 py-2 w-full" placeholder="Promo code (optional)" value={promo} onChange={(e) => setPromo(e.target.value)} />
        </div>
      )}

      {step === "review" && (
        <div className="space-y-2 text-sm">
          <div>Customer: {customer.name} ({customer.email})</div>
          <div>Address: {address.line1}, {address.city}</div>
          <div>Payment: {method}</div>
          <div>Promo: {promo || "-"}</div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded" onClick={next}>
          {step === "review" ? "Place order" : "Continue"}
        </button>
      </div>
    </div>
  );
}
