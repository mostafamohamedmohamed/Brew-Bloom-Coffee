
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoffeeItem } from '../types';

interface DetailProps {
  coffee: CoffeeItem;
  onAddToCart: (coffee: CoffeeItem, size: 'S' | 'M' | 'L') => void;
}

const Detail: React.FC<DetailProps> = ({ coffee, onAddToCart }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [sugar, setSugar] = useState(2); // 0-4

  const handleBuy = () => {
    onAddToCart(coffee, selectedSize);
    navigate('/order');
  };

  return (
    <div className="pb-36 bg-[#F8F4EF] min-h-screen text-[#2C1810]">
      {/* Navbar */}
      <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="text-[#2C1810] text-2xl w-10 h-10 flex items-center justify-center rounded-xl bg-[#F3F0EC]">
          <span className="rotate-0">→</span>
        </button>
        <h2 className="text-lg font-black">تفاصيل المشروب</h2>
        <button className="text-[#6B4E31] text-xl w-10 h-10 flex items-center justify-center rounded-xl bg-[#F3F0EC]">❤️</button>
      </div>

      <div className="px-6 mt-6">
        <div className="relative overflow-hidden rounded-[40px] shadow-2xl border-4 border-white aspect-square">
          <img src={coffee.image} className="w-full h-full object-cover" alt={coffee.name} />
          <div className="absolute bottom-6 right-6 bg-white/40 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-3 border border-white/20">
            <div className="text-right">
              <p className="text-[#2C1810] text-[10px] font-bold opacity-70">التقييم</p>
              <p className="text-[#2C1810] text-lg font-black">{coffee.rating} ⭐</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-right">
          <h1 className="text-3xl font-black mb-1">{coffee.name}</h1>
          <p className="text-[#8B4513] text-sm font-bold font-inter mb-4">{coffee.subName}</p>
          
          <div className="flex gap-4 mb-8">
            <span className="bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-[#6B4E31]/5">☕ حبوب فاخرة</span>
            <span className="bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-[#6B4E31]/5">🥛 حليب طازج</span>
          </div>

          <h3 className="text-[#2C1810] text-lg font-black mb-3">الوصف</h3>
          <p className="text-[#8B4513] text-sm leading-relaxed mb-8">
            {coffee.description}
          </p>

          <h3 className="text-[#2C1810] text-lg font-black mb-5">مستوى السكر</h3>
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl mb-8 shadow-sm">
             {['بدون', 'خفيف', 'وسط', 'زيادة', 'كنكة'].map((label, idx) => (
               <button 
                key={idx}
                onClick={() => setSugar(idx)}
                className={`flex-1 text-[11px] font-black py-2 rounded-lg transition-all ${sugar === idx ? 'bg-[#6B4E31] text-white' : 'text-[#8B4513]'}`}
               >
                 {label}
               </button>
             ))}
          </div>

          <h3 className="text-[#2C1810] text-lg font-black mb-5">اختر الحجم</h3>
          <div className="flex gap-4">
            {(['S', 'M', 'L'] as const).map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 py-4 rounded-2xl border-2 text-sm font-black transition-all ${
                  selectedSize === size 
                    ? 'bg-[#6B4E31] border-[#6B4E31] text-white shadow-xl' 
                    : 'border-[#6B4E31]/10 text-[#8B4513] bg-white hover:border-[#6B4E31]/30'
                }`}
              >
                {size === 'S' ? 'صغير' : size === 'M' ? 'وسط' : 'كبير'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-8 pb-10 flex justify-between items-center z-40 rounded-t-[48px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col text-right">
          <span className="text-[#8B4513] text-xs font-bold mb-1">السعر الإجمالي</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[#2C1810] text-3xl font-black">{coffee.price}</span>
            <span className="text-[#6B4E31] font-black text-lg">ج.م</span>
          </div>
        </div>
        <button 
          onClick={handleBuy}
          className="bg-[#6B4E31] text-white px-14 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all active:scale-95"
        >
          اطلب الآن
        </button>
      </div>
    </div>
  );
};

export default Detail;
