import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Product, CartItem } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductDetail } from '../components/ProductDetail';
import { AnimatePresence } from 'motion/react';

interface ShopProps {
  products: Product[];
  cart: CartItem[];
  shopCategory: 'All' | 'Equipment' | 'Apparel';
  setShopCategory: (cat: 'All' | 'Equipment' | 'Apparel') => void;
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6 bg-white p-2 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#191A23] tracking-tight flex items-center gap-2">
            <span>Athletic Gear & Equipment Store</span>
            <span className="text-[10px] bg-amber-400 border border-[#191A23] font-mono uppercase px-2 py-0.5 rounded font-black shadow-[1px_1px_0px_#191A23] inline-block animate-pulse">
              Amazon Hub
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Direct curated access to verified physical gym essentials like premium water flasks, athletic wear, and indoor training equipment.
          </p>
        </div>

        {/* Categories togglers */}
        <div className="flex gap-2 overflow-x-auto pb-1 shrink-0">
          {['All', 'Equipment', 'Apparel'].map((cat) => (
            <button
              key={cat}
              id={`btn-shop-cat-${cat}`}
              onClick={() => setShopCategory(cat as any)}
              className={`px-3.5 py-2 text-xs font-black rounded-xl border-2 border-[#191A23] transition-all cursor-pointer ${
                shopCategory === cat
                  ? 'bg-[#B9FF66] text-[#191A23] shadow-[2px_2px_0px_#191A23]'
                  : 'bg-white text-slate-500 hover:text-[#191A23]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Amazons Curated Promo Banner */}
      <div className="p-5 bg-white border-2 border-[#191A23] rounded-[24px] shadow-[4px_4px_0px_#191A23] flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full filter blur-xl pointer-events-none" />
        
        <div className="flex items-start gap-3.5 text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-[#191A23] shadow-[2px_2px_0px_#191A23] flex items-center justify-center text-xl shrink-0 select-none">
            📦
          </div>
          <div>
            <h4 className="font-extrabold text-sm tracking-tight uppercase font-mono text-[#191A23] flex items-center gap-2">
              <span>Officially Curated Amazon Essentials</span>
              <span className="text-[8px] bg-[#00A8E1] text-white px-1.5 py-0.5 rounded font-black uppercase">✓ Prime Speed</span>
            </h4>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed mt-1 max-w-2xl">
              We have compiled top-performing Amazon gym goods with the highest customer ratings for you. Filter by category, add to your digital baggage, or click <b>"Buy on Amazon"</b> to seamlessly order active elements (such as Water Flasks, Adjustable Dumbbells, and doorway Chin bars) straight to your residence.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="text-center font-mono py-1 px-3 border border-[#191A23]/25 bg-slate-50 rounded-xl">
            <span className="text-[9px] block text-slate-400 font-black uppercase leading-tight">ACTIVE DEPOT</span>
            <span className="text-xs font-black text-[#191A23]">AMAZON-VERIFIED</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Products feed grid (3 products per row on desktop md and up) */}
        <div id="shop-products-feed" className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {products
            .filter((p) => shopCategory === 'All' || p.category === shopCategory)
            .map((prod) => (
              <div key={prod.id}>
                <ProductCard
                  product={prod}
                  onAddToCart={onAddToCart}
                  onSelect={() => setSelectedProduct(prod)}
                />
              </div>
            ))}
        </div>

        {/* Cart items list checkout checkout table */}
        <div id="supplement-baggage-cart" className="lg:col-span-1 bg-white rounded-[24px] border-2 border-[#191A23] p-6 shrink-0 h-fit space-y-4 shadow-[4px_4px_0px_0px_#191A23] text-left">
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#191A23]">
            <h4 className="font-extrabold text-[#191A23] tracking-tight text-sm uppercase font-mono">Baggage Cart</h4>
            <span className="text-[10px] bg-[#B9FF66] border border-[#191A23] text-[#191A23] font-black px-2.5 py-0.5 rounded font-mono shadow-[1px_1px_0px_#191A23]">
              {totalCartItemsCount} ITEMS
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="text-3xl filter grayscale opacity-45 block">🎒</span>
              <p className="text-[10px] font-black text-[#191A23] uppercase tracking-widest font-mono">Bag is empty</p>
              <p className="text-[9px] text-slate-500 font-bold">Pick items on your left to purchase</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="divide-y-2 divide-[#191A23]/10 max-h-[220px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 py-3 text-xs justify-between">
                    <div className="min-w-0 flex-1">
                      <h5 className="font-bold text-[#191A23] truncate leading-tight">{item.product.name}</h5>
                      <span className="text-[9px] text-slate-550 font-mono tracking-wider font-black">QTY: {item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="font-black text-[#191A23] font-mono">${(item.product.price * item.quantity).toFixed(2)}</span>
                      <div className="flex border-2 rounded-lg border-[#191A23] overflow-hidden text-xs bg-white font-black">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, -1)} 
                          className="px-2 py-0.5 hover:bg-slate-150 text-[#191A23]"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, 1)} 
                          className="px-2 py-0.5 hover:bg-slate-150 text-[#191A23]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure price logs breakdown */}
              <div className="border-t-2 border-[#191A23] pt-3 space-y-2 text-xs font-black font-mono">
                <div className="flex justify-between text-slate-550 font-sans">
                  <span>Subtotal</span>
                  <span>${totalCartPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-550 font-sans">
                  <span>Gym Pickup Tax</span>
                  <span className="text-[#191A23] bg-[#B9FF66] border border-[#191A23] px-1.5 py-0.5 rounded text-[9px] font-black uppercase shadow-[1px_1px_0px_#191A23]">
                    Free Pickup
                  </span>
                </div>
                <div className="flex justify-between text-[#191A23] font-black border-t border-[#191A23]/10 pt-2 text-sm">
                  <span>Total Due</span>
                  <span className="text-[#191A23] font-mono">${totalCartPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 border-t-2 border-[#191A23]/10 pt-4">
                <button
                  onClick={onClearCart}
                  id="btn-clear-baggage"
                  className="p-2.5 bg-white hover:bg-rose-50 rounded-xl text-slate-500 hover:text-rose-605 transition-colors cursor-pointer border-2 border-[#191A23] shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none"
                  title="Empty baggage"
                >
                  <Trash2 className="w-4 h-4 text-[#191A23] stroke-[2.5]" />
                </button>
                <button
                  onClick={onCheckout}
                  id="btn-checkout-sec"
                  className="flex-grow py-2.5 bg-[#B9FF66] border-2 border-[#191A23] text-[#191A23] font-black text-xs rounded-xl shadow-[3px_3px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-y-1 active:shadow-none cursor-pointer transition-all text-center"
                >
                  Secure Checkout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
