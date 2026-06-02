import { Product } from '../types';
import { ShoppingCart, Star, HelpCircle, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  key?: any;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-soft-sm overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01] hover:shadow-soft-md">
      <div>
        {/* Product image with referrerPolicy overlay */}
        <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-slate-900/85 text-white backdrop-blur text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider font-mono border border-slate-800">
            {product.category}
          </span>
          {product.rating >= 4.8 && (
            <span className="absolute top-3 right-3 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
              <Star className="w-3 h-3 fill-white" /> BESTSELLER
            </span>
          )}
        </div>

        {/* Info content */}
        <div className="p-5">
          <div className="flex items-center gap-1 text-amber-500 fill-amber-500 select-none mb-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                }`}
              />
            ))}
            <span className="text-[10px] font-mono text-slate-500 font-bold ml-1">({product.rating.toFixed(1)})</span>
          </div>

          <h4 className="font-extrabold text-slate-950 tracking-tight text-base leading-tight">
            {product.name}
          </h4>
          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-semibold">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between gap-4">
        <div>
          <span className="text-[9px] font-bold text-slate-400 block tracking-wider uppercase font-mono">ATHLETE PRICE</span>
          <span className="text-xl font-extrabold text-slate-900 font-mono">${product.price.toFixed(2)}</span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-150 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
