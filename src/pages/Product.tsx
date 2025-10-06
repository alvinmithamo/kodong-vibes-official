import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function ProductPage() {
  const { slug = "" } = useParams();
  const { data: product, isLoading } = useQuery({ queryKey: ["product", slug], queryFn: () => api.getProduct(slug) });
  const addMutation = useMutation({ mutationFn: (payload: { productId: string; quantity?: number }) => api.addToCart(payload) });

  if (isLoading || !product) return <div className="container mx-auto px-4 mt-24">Loading...</div>;

  return (
    <div className="container mx-auto px-4 mt-24">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-muted aspect-square">
          {Array.isArray(product.images) && product.images[0] ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" /> : null}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-muted-foreground mb-4">{product.brand?.name}</div>
          <div className="text-2xl text-primary font-semibold mb-4">KES {(product.priceCents / 100).toFixed(2)}</div>
          <div className="mb-4">ABV: {product.abv}% • Volume: {product.volumeMl}ml</div>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => addMutation.mutate({ productId: product.id, quantity: 1 })}
          >
            Add to cart
          </button>
          <div className="mt-6 prose" dangerouslySetInnerHTML={{ __html: product.description || "" }} />
        </div>
      </div>
    </div>
  );
}
