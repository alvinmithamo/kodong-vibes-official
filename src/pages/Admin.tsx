import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function AdminPage() {
  const { data: summary } = useQuery({ queryKey: ["admin:summary"], queryFn: api.adminReportSummary });
  const { data: orders } = useQuery({ queryKey: ["admin:orders"], queryFn: api.adminListOrders });

  return (
    <div className="container mx-auto px-4 mt-24">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border p-4 rounded">Orders: {summary?.ordersCount ?? "-"}</div>
        <div className="border p-4 rounded">Payments: {summary?.paymentsCount ?? "-"}</div>
        <div className="border p-4 rounded">Sales: KES {((summary?.totalSalesCents ?? 0) / 100).toFixed(2)}</div>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Recent Orders</h2>
        <div className="space-y-2">
          {orders?.map((o: any) => (
            <div key={o.id} className="border p-3 rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{o.orderNumber}</div>
                <div className="text-sm text-muted-foreground">{o.status}</div>
              </div>
              <div>Total KES {(o.totalCents / 100).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
