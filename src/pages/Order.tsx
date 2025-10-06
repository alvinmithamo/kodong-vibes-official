import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function OrderPage() {
  const { orderNumber = "" } = useParams();
  const { data: order, isLoading } = useQuery({ queryKey: ["order", orderNumber], queryFn: () => api.getOrder(orderNumber) });
  if (isLoading || !order) return <div className="container mx-auto px-4 mt-24">Loading...</div>;
  return (
    <div className="container mx-auto px-4 mt-24">
      <h1 className="text-2xl font-bold mb-2">Order {order.orderNumber}</h1>
      <div className="mb-4">Status: {order.status}</div>
      <div className="space-y-2">
        {order.items?.map((i: any) => (
          <div key={i.id} className="flex items-center justify-between border p-2 rounded">
            <div>{i.productName}</div>
            <div>x{i.quantity}</div>
            <div>KES {(i.priceCents / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
