import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link, useSearchParams } from "react-router-dom";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const brand = params.get("brand") || "";

  const { data, isLoading } = useQuery({
    queryKey: ["products", { q, category, brand }],
    queryFn: () => api.listProducts({ q, category, brand }),
  });

  return (
    <div className="container mx-auto px-4 mt-24">
      <div className="flex items-center gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setParams({ q: e.target.value, category, brand })}
          placeholder="Search products..."
          className="border rounded px-3 py-2 w-full max-w-md"
        />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.items?.map((p: any) => (
            <Link key={p.id} to={`/product/${p.slug}`} className="border rounded-lg overflow-hidden hover:shadow">
              <div className="aspect-square bg-muted">
                {Array.isArray(p.images) && p.images[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="p-3">
                <div className="text-sm text-muted-foreground">{p.brand?.name || p.category?.name}</div>
                <div className="font-medium">{p.name}</div>
                <div className="text-primary font-semibold">KES {(p.priceCents / 100).toFixed(2)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
