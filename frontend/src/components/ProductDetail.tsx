import { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShoppingCart, ShieldCheck, Zap, Shirt, Star, Check, Truck, Info, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [imgFailed, setImgFailed] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddMultiple = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#191A23]/50 backdrop-blur-sm cursor-pointer"
        id="product-detail-backdrop"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-white rounded-[32px] border-4 border-[#191A23] shadow-[8px_8px_0px_0px_#191A23] overflow-hidden z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
        id="product-detail-modal-container"
      >
        {/* Header Bar */}
        <div className="p-5 border-b-2 border-[#191A23] flex items-center justify-between bg-white relative z-25">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#B9FF66] border border-[#191A23] font-mono uppercase px-2 py-0.5 rounded font-black shadow-[1.5px_1.5px_0px_#191A23]">
              {product.category}
            </span>
            {product.isPrime && (
              <span className="text-[10px] bg-[#00A8E1] text-white font-mono uppercase px-2 py-0.5 rounded font-black shadow-[1.5px_1.5px_0px_#191A23]">
                ✓ Prime Link
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            id="btn-close-product-detail"
            className="p-2 bg-white hover:bg-rose-50 border-2 border-[#191A23] rounded-xl shadow-[3px_3px_0px_#191A23] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <X className="w-5 h-5 text-[#191A23] stroke-[3]" />
          </button>
        </div>

        {/* Modal Scrollable Content Container */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6 flex-1 text-left bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Product Image */}
            <div className="w-full flex flex-col gap-3">
              <div className="aspect-square w-full rounded-2xl border-2 border-[#191A23] shadow-[4px_4px_0px_0px_#191A23] overflow-hidden bg-[#F3F3F3] relative flex items-center justify-center">
                {imgFailed ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center select-none">
                    <div className="p-4 bg-white border-2 border-[#191A23] rounded-3xl shadow-[3px_3px_0px_#191A23] mb-4">
                      {product.category === 'Supplements' && <Zap className="w-12 h-12 text-[#191A23] fill-[#B9FF66]" />}
                      {product.category === 'Equipment' && <ShieldCheck className="w-12 h-12 text-[#191A23]" />}
                      {product.category === 'Apparel' && <Shirt className="w-12 h-12 text-[#191A23]" />}
                    </div>
                    <h4 className="font-extrabold text-sm text-[#191A23] uppercase">{product.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500 mt-2 tracking-widest font-black uppercase">
                      VERIFIED PREMIUM QUALITY
                    </span>
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                )}

                {product.rating >= 4.8 && (
                  <div className="absolute top-4 right-4 bg-white border-2 border-[#191A23] shadow-[2px_2px_0px_#191A23] rounded-xl px-3 py-1 font-black text-[10px] text-[#191A23] tracking-wider uppercase font-mono">
                    ★ Premium Product
                  </div>
                )}
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 border border-[#191A23]/10 bg-slate-50 rounded-xl flex flex-col justify-center items-center">
                  <ShieldCheck className="w-4 h-4 text-[#191A23] mb-1" />
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-wider font-mono">Authentic</span>
                </div>
                <div className="p-2 border border-[#191A23]/10 bg-slate-50 rounded-xl flex flex-col justify-center items-center">
                  <Truck className="w-4 h-4 text-[#191A23] mb-1" />
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-wider font-mono">Safe Delivery</span>
                </div>
                <div className="p-2 border border-[#191A23]/10 bg-slate-50 rounded-xl flex flex-col justify-center items-center">
                  <Check className="w-4 h-4 text-emerald-500 mb-1" />
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-wider font-mono font-sans">{product.inStock ? 'In Stock' : 'Ordered'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Details */}
            <div className="space-y-6">
              <div>
                {product.brandName && (
                  <span className="text-xs font-mono font-black text-emerald-600 block uppercase tracking-widest mb-1">
                    {product.brandName}
                  </span>
                )}
                <h1 className="text-xl md:text-2xl font-black text-[#191A23] tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating segment */}
                <div className="flex items-center gap-2 mt-3 select-none">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4.5 h-4.5 ${
                          i < Math.floor(product.rating)
                            ? 'text-amber-400 fill-amber-450'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-black text-slate-600">
                    {product.rating.toFixed(1)} / 5.0 (Athlete Approved)
                  </span>
                </div>
              </div>

              {/* Price Tag Box */}
              <div className="p-4 bg-slate-50 border-2 border-[#191A23] rounded-2xl flex items-center justify-between shadow-[2px_2px_0px_#191A23]">
                <div className="text-left">
                  <span className="text-[9px] font-black font-mono text-slate-500 block uppercase tracking-wider">
                    RETAIL ESTIMATE
                  </span>
                  <span className="text-2xl font-extrabold text-[#191A23] font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black font-mono text-slate-500 block uppercase tracking-wider">
                    AVAILABILITY
                  </span>
                  <span className={`text-xs font-black inline-block px-2.5 py-0.5 border border-[#191A23] rounded-lg mt-0.5 font-mono shadow-[1px_1px_0px_#191A23] ${
                    product.inStock ? 'bg-[#B9FF66] text-[#191A23]' : 'bg-amber-100 text-[#191A23]'
                  }`}>
                    {product.inStock ? 'READY TO ORDER' : 'REPLENISHING'}
                  </span>
                </div>
              </div>

              {/* Overview Description */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs font-black uppercase text-[#191A23] tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#191A23]" />
                  <span>Product Specifications</span>
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Spec Items Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-[#191A23]/10 pt-4">
                <div className="flex justify-between items-center py-1 border-b border-[#191A23]/5">
                  <span className="text-slate-450 font-bold">Category</span>
                  <span className="font-extrabold text-[#191A23] font-mono">{product.category}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#191A23]/5">
                  <span className="text-slate-450 font-bold">Standard Size</span>
                  <span className="font-extrabold text-[#191A23] font-mono">30oz / 1 Pack</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#191A23]/5">
                  <span className="text-slate-450 font-bold">Authenticity</span>
                  <span className="font-extrabold text-emerald-600 font-mono">Verified Hub</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#191A23]/5">
                  <span className="text-slate-450 font-bold">Shipping Speed</span>
                  <span className="font-extrabold text-[#191A23] font-mono">{product.isPrime ? 'Next Day' : '3-4 Days'}</span>
                </div>
              </div>

              {/* Interactions area */}
              <div className="border-t-2 border-[#191A23]/10 pt-5 space-y-4">
                <div className="flex items-center gap-4 justify-between">
                  <span className="text-xs font-mono font-black text-slate-500 uppercase tracking-wider">
                    Select Quantity:
                  </span>
                  
                  {/* Quantity selector button block */}
                  <div className="flex items-center border-2 border-[#191A23] rounded-xl shadow-[3px_3px_0px_#191A23] overflow-hidden bg-white select-none">
                    <button
                      onClick={handleDecrement}
                      className="px-3 py-2 text-center font-bold hover:bg-slate-100 border-r-2 border-[#191A23] transition-colors cursor-pointer text-[#191A23]"
                    >
                      -
                    </button>
                    <span className="px-5 font-mono font-black text-sm text-[#191A23] text-center min-w-[50px]">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-2 text-center font-bold hover:bg-slate-100 border-l-2 border-[#191A23] transition-colors cursor-pointer text-[#191A23]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Confirm messages */}
                {addedMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 text-center flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Appended {quantity}x item(s) to Baggage Cart successfully!</span>
                  </motion.div>
                )}

                {/* Call to action panel */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddMultiple}
                    id="btn-detail-add-to-bag"
                    className="flex-1 py-3 px-4 bg-[#B9FF66] hover:bg-[#aef052] border-2 border-[#191A23] text-[#191A23] font-black text-xs rounded-xl shadow-[3px_3px_0px_#191A23] active:translate-y-0.5 active:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#191A23]" />
                    <span>Add {quantity} to Local Baggage</span>
                  </button>

                  {product.amazonUrl && (
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 bg-emerald-400 hover:bg-emerald-500 border-2 border-[#191A23] text-[#191A23] font-black text-xs rounded-xl shadow-[3px_3px_0px_#191A23] active:translate-y-0.5 active:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all flex items-center justify-center gap-2 text-center font-mono"
                    >
                      <span>Buy Direct On Amazon</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
