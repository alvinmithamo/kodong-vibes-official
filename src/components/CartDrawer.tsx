import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatKsh, useCart } from "@/context/CartContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

export type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onOpenChange }) => {
  const { state, cartTotalKsh, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>

          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-muted-foreground">
              <div className="text-5xl">🛒</div>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            {item.category && (
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            )}
                          </div>
                          <button className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="font-semibold text-foreground">
                            {formatKsh(item.priceKsh * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-6 space-y-4">
                <div className="flex items-center justify-between text-foreground">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">{formatKsh(cartTotalKsh)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={clearCart}>Clear</Button>
                  <Button asChild>
                    <Link to="/checkout" onClick={() => onOpenChange(false)}>Checkout</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
