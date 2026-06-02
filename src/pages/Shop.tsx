import { Trash2 } from 'lucide-react';
import { Product, CartItem } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopProps {
  products: Product[];
  cart: CartItem[];
  shopCategory: 'All' | 'Supplements' | 'Equipment' | 'Apparel';
  setShopCategory: (cat: 'All' | 'Supplements' | 'Equipment' | 'Apparel') => void;
  onAddToCart: (p: Product) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export function Shop({
  products,
  cart,
  shopCategory,
  setShopCategory,
  onAddToCart,
  onUpdateQuantity,
  onClearCart,
  onCheckout
}: ShopProps) {
  
  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6 bg-white p-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Supplements & Athletic Gear Store
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Pre-order high-quality protein isolates, select home workout hardware, and dry-fit items.
          </p>
        </div>

        {/* Categories togglers */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 shrink-0">
          {['All', 'Supplements', 'Equipment', 'Apparel'].map((cat) => (
            <button
              key={cat}
              id={`btn-shop-cat-${cat}`}
              onClick={() => setShopCategory(cat as any)}
              className={`px-3.5 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                shopCategory === cat
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-soft-sm'
                  : 'bg-white border-slate-205 text-slate-500 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Products feed grid */}
        <div id="shop-products-feed" className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products
            .filter((p) => shopCategory === 'All' || p.category === shopCategory)
            .map((prod) => (
              <div key={prod.id} className="bg-white border border-slate-100 rounded-3xl p-1 shadow-soft-sm">
                <ProductCard
                  product={prod}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
        </div>

        {/* Cart items list checkout checkout table */}
        <div id="supplement-baggage-cart" className="bg-white rounded-3xl border border-slate-150 p-6 shrink-0 h-fit space-y-4 shadow-soft-sm text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-extrabold text-slate-900 tracking-tight text-sm">Gym Checkout Baggage</h4>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2.5 py-0.5 rounded font-mono">
              {totalCartItemsCount} ITEMS
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="text-3xl filter grayscale opacity-45 block">🎒</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Bag is empty</p>
              <p className="text-[9px] text-slate-400 font-bold">Pick items on your left to secure pickup</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="divide-y divide-slate-100 max-h-[220px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 py-2 text-xs justify-between">
                    <div className="min-w-0 flex-1">
                      <h5 className="font-extrabold text-slate-800 truncate leading-tight">{item.product.name}</h5>
                      <span className="text-[9px] text-slate-400 font-mono tracking-wider font-extrabold">QTY: {item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="font-black text-slate-900 font-mono">${(item.product.price * item.quantity).toFixed(2)}</span>
                      <div className="flex border rounded-lg border-slate-205 overflow-hidden text-xs bg-white font-black">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, -1)} 
                          className="px-2 py-0.5 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, 1)} 
                          className="px-2 py-0.5 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure price logs breakdown */}
              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs font-bold font-mono">
                <div className="flex justify-between text-slate-450 font-sans">
                  <span>Affiliate Subtotal</span>
                  <span>${totalCartPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-450 font-sans">
                  <span>Gym pickup tax</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-black uppercase">
                    Free Pickup
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-black border-t border-slate-100 pt-2 text-sm">
                  <span>Total Due</span>
                  <span className="text-indigo-700">${totalCartPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 border-t border-slate-105 pt-4">
                <button
                  onClick={onClearCart}
                  id="btn-clear-baggage"
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-rose-600 transition-colors cursor-pointer border border-slate-200"
                  title="Empty baggage"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onCheckout}
                  id="btn-checkout-sec"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-sm cursor-pointer transition-all hover:shadow text-center"
                >
                  Secure Checkout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
