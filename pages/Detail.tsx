
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoffeeItem } from '../types';
import { useTranslation } from '../App';

interface DetailProps {
  coffee: CoffeeItem;
  onAddToCart: (coffee: CoffeeItem, size: 'S' | 'M' | 'L') => void;
}

const Detail: React.FC<DetailProps> = ({ coffee, onAddToCart }) => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [sugar, setSugar] = useState(2); 

  const handleBuy = () => {
    onAddToCart(coffee, selectedSize);
    navigate('/order');
  };

  const sugarLabels = ['بدون', 'خفيف', 'وسط', 'زيادة', 'كنكة'];

  return (
    <div className="pb-44 bg-[#FDF9F4] min-h-screen text-[#2C1810] font-cairo overflow-x-hidden">
      {/* Dynamic Header */}
      <div className="p-6 flex justify-between items-center bg-white/90 backdrop-blur-3xl sticky top-0 z-40 border-b border-[#6B4E31]/5 pt-14">
        <button 
          onClick={() => navigate(-1)} 
          className="text-[#2C1810] text-xl w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F3F0EC] transition-all active:scale-90"
        >
          <span className={lang === 'ar' ? 'rotate-0' : 'rotate-180'}>→</span>
        </button>
        <h2 className="text-lg font-black">{t.drinkDetails}</h2>
        <button className="text-[#6B4E31] text-xl w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F3F0EC] transition-all active:scale-90">❤️</button>
      </div>

      <div className="px-6 mt-8 space-y-12">
        {/* Hero Image Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#6B4E31]/10 blur-[80px] rounded-full scale-90 opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="relative overflow-hidden rounded-[56px] shadow-2xl border-[8px] border-white aspect-square bg-white">
            <img src={coffee.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={coffee.name} />
            
            <div className={`absolute bottom-8 ${lang === 'ar' ? 'right-8' : 'left-8'} bg-white/30 backdrop-blur-2xl rounded-[32px] px-8 py-4 flex items-center gap-4 border border-white/40 shadow-2xl`}>
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <p className="text-[#2C1810] text-[10px] font-black opacity-60 uppercase tracking-widest">التقييم</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#2C1810] text-2xl font-black">{coffee.rating}</span>
                  <span className="text-yellow-500 text-base">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`text-right ${lang === 'en' ? 'text-left' : ''}`}>
          <h1 className="text-5xl font-black mb-3 text-[#2C1810] leading-tight">{lang === 'ar' ? coffee.name : coffee.subName}</h1>
          <p className="text-[#8B4513] text-lg font-bold opacity-60 mb-8">{lang === 'ar' ? coffee.subName : coffee.name}</p>
          
          {/* Features Pills */}
          <div className={`flex gap-3 mb-10 overflow-x-auto no-scrollbar pb-1 ${lang === 'en' ? 'flex-row-reverse justify-end' : ''}`}>
             <span className="bg-[#F3F0EC] px-5 py-3 rounded-full text-[11px] font-black shadow-sm border border-black/5 whitespace-nowrap flex items-center gap-2">
               محمص محلياً 🍎
             </span>
             <span className="bg-[#F3F0EC] px-5 py-3 rounded-full text-[11px] font-black shadow-sm border border-black/5 whitespace-nowrap flex items-center gap-2">
               حليب طازج 🥛
             </span>
             <span className="bg-[#F3F0EC] px-5 py-3 rounded-full text-[11px] font-black shadow-sm border border-black/5 whitespace-nowrap flex items-center gap-2">
               حبوب فاخرة ☕
             </span>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-[#2C1810] text-xl font-black mb-4">الوصف</h3>
              <p className="text-[#8B4513] text-base leading-relaxed font-bold opacity-80">
                {coffee.description}
              </p>
            </section>

            {/* Sugar Selection Slider - Matches Screenshot */}
            <section>
              <h3 className="text-[#2C1810] text-xl font-black mb-6">مستوى السكر</h3>
              <div className="relative bg-[#F3F0EC] h-16 rounded-full flex items-center px-2">
                 {/* Sliding Indicator */}
                 <div 
                   className="absolute h-12 bg-white rounded-full shadow-lg transition-all duration-300 ease-out"
                   style={{ 
                     width: 'calc(20% - 8px)', 
                     right: `calc(${sugar * 20}% + 4px)`,
                     zIndex: 0
                   }}
                 />
                 {sugarLabels.map((label, idx) => (
                   <button 
                    key={idx}
                    onClick={() => setSugar(idx)}
                    className={`relative z-10 flex-1 text-xs font-black transition-all duration-300 ${sugar === idx ? 'text-[#2C1810]' : 'text-[#8B4513]/40'}`}
                   >
                     {label}
                   </button>
                 ))}
              </div>
            </section>

            {/* Size Selection Buttons - Matches Screenshot Styling */}
            <section>
              <h3 className="text-[#2C1810] text-xl font-black mb-6">اختر الحجم</h3>
              <div className="flex gap-4">
                {(['L', 'M', 'S'] as const).map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-5 rounded-[40px] text-lg font-black transition-all border-2 ${
                      selectedSize === size 
                        ? 'bg-[#6B4E31] border-[#6B4E31] text-white shadow-xl' 
                        : 'bg-[#F3F0EC] border-transparent text-[#2C1810]/60'
                    }`}
                  >
                    {size === 'S' ? 'صغير' : size === 'M' ? 'وسط' : 'كبير'}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Luxury Bottom Checkout Bar - Matches Screenshot Exactly */}
      <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto z-50 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-2xl p-6 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white flex justify-between items-center pointer-events-auto">
          {/* Order Button on the Left */}
          <button 
            onClick={handleBuy}
            className="bg-[#6B4E31] text-white px-10 py-5 rounded-[32px] font-black text-xl shadow-2xl shadow-[#6B4E31]/30 active:scale-95 transition-all hover:bg-[#5a4128]"
          >
            اطلب الآن
          </button>

          {/* Price Info on the Right */}
          <div className="flex flex-col text-right">
            <span className="text-[#8B4513] text-[11px] font-black opacity-60 mb-0.5">السعر الإجمالي</span>
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-[#2C1810] text-4xl font-black tracking-tighter">{coffee.price.toFixed(2)}</span>
              <span className="text-[#6B4E31] font-black text-xs">ج.م</span>
            </div>
          </div>
        </div>

        {/* Blueprint-style annotation overlay if needed, but here we just implement the UI */}
        <div className="absolute inset-0 border-2 border-dashed border-blue-400/0 rounded-[48px] pointer-events-none" />
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Detail;
