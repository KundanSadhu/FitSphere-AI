import { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, ShieldCheck, Zap, Shirt } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onSelect?: () => void;
  key?: any;
}

export const ProductCard = ({ product, onAddToCart, onSelect }: ProductCardProps) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div 
      onClick={onSelect}
      className="bg-white rounded-[24px] border-2 border-[#191A23] h-full shadow-[4px_4px_0px_0px_#191A23] overflow-hidden flex flex-col justify-between transition-all text-left cursor-pointer hover:border-[#B9FF66] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#191A23]"
    >
      <div>
        {/* Product image with stateful fallback overlay options */}
        <div className="relative aspect-square w-full bg-[#F3F3F3] border-b-2 border-[#191A23] overflow-hidden flex items-center justify-center">
          {imgFailed ? (
            <div className="absolute inset-0 bg-[#F3F3F3] flex flex-col items-center justify-center p-6 text-center select-none">
              <div className="p-3 bg-white border-2 border-[#191A23] rounded-2xl shadow-[2px_2px_0px_#191A23] mb-2">
                {product.category === 'Supplements' && <Zap className="w-8 h-8 text-[#191A23] fill-[#B9FF66]" />}
                {product.category === 'Equipment' && <ShieldCheck className="w-8 h-8 text-[#191A23]" />}
                {product.category === 'Apparel' && <Shirt className="w-8 h-8 text-[#191A23]" />}
              </div>
              <h5 className="font-extrabold text-[11px] text-[#191A23] tracking-tight leading-tight uppercase px-1 line-clamp-1 max-w-[150px]">
                {product.name}
              </h5>
              <span className="text-[8px] font-mono font-black text-slate-500 mt-1 uppercase tracking-widest leading-none">
                LOCAL STOCK ACTIVE
              </span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          )}

          <span className="absolute top-3 left-3 bg-[#B9FF66] text-[#191A23] text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider font-mono border-2 border-[#191A23] shadow-[1.5px_1.5px_0px_#191A23]">
            {product.category}
          </span>
          {product.rating >= 4.8 && (
            <span className="absolute top-3 right-3 bg-white text-[#191A23] text-[9px] font-black px-2 py-0.5 rounded-md border-2 border-[#191A23] flex items-center gap-0.5 shadow-[1.5px_1.5px_0px_#191A23]">
              ★ BESTSELLER
            </span>
          )}
          {product.amazonChoice && (
            <span className="absolute bottom-3 left-3 bg-[#0F1111] text-[#FFAC0A] text-[8px] font-mono font-black px-2 py-1 rounded border border-[#191A23] flex items-center gap-1 shadow-md uppercase select-none leading-none">
              ⚡ Amazon's Choice
            </span>
          )}
        </div>

        {/* Info content */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 select-none mb-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-[10px] font-mono text-slate-500 font-black ml-1">({product.rating.toFixed(1)})</span>
            </div>

            {product.isPrime && (
              <div className="inline-flex items-center gap-0.5 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 text-[8px] text-blue-700 font-black tracking-tight uppercase select-none leading-none shrink-0">
                <span className="text-blue-500 font-extrabold font-sans">✓</span> prime
              </div>
            )}
          </div>

          {product.brandName && (
            <span className="text-[9px] font-mono text-slate-400 font-bold block mb-1 uppercase tracking-wider">
              {product.brandName}
            </span>
          )}

          <h4 className="font-black text-[#191A23] tracking-tight text-sm leading-tight line-clamp-2 h-10">
            {product.name}
          </h4>
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-semibold">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t-2 border-[#191A23]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[9px] font-black text-slate-500 block tracking-wider uppercase font-mono leading-none">
            {product.amazonUrl ? 'AMAZON PRICE' : 'ATHLETE PRICE'}
          </span>
          <span className="text-xl font-black text-[#191A23] font-mono">${product.price.toFixed(2)}</span>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-[#191A23] text-[#191A23] cursor-pointer transition-all shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none shrink-0"
            title="Add locally to baggage cart"
          >
            <ShoppingCart className="w-4 h-4 text-[#191A23] stroke-[2.5]" />
          </button>

          {product.amazonUrl ? (
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-grow sm:flex-grow-0 px-3.5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-500 border-2 border-[#191A23] text-[#191A23] font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-y-1 active:shadow-none transition-all font-mono leading-none tracking-wide text-center"
            >
              <span>Buy on Amazon</span>
              <span className="text-[10px] opacity-80">↗</span>
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex-grow sm:flex-grow-0 px-4 py-2.5 rounded-xl bg-[#B9FF66] border-2 border-[#191A23] text-[#191A23] font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-y-1 active:shadow-none transition-all text-center"
            >
              <span>Add to Bag</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
