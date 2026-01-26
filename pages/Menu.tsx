
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, COFFEE_ITEMS } from '../constants';
import { CoffeeItem } from '../types';

interface MenuProps {
  onSelectCoffee: (coffee: CoffeeItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectCoffee }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredItems = activeCategory === 'الكل' 
    ? COFFEE_ITEMS 
    : COFFEE_ITEMS.filter(item => {
        const catObj = CATEGORIES.find(c => c.ar === activeCategory);
        return item.category === catObj?.en;
      });

  return (
    <div className="h-screen bg-[#F8F4EF] flex flex-col overflow-hidden">
      <div className="p-6 bg-white sticky top-0 z-30 shadow-sm flex flex-col pt-14 rounded-b-[40px]">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl">→</button>
          <h2 className="text-xl font-black">قائمة المشروبات</h2>
          <button className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl">🔍</button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.ar}
              onClick={() => setActiveCategory(cat.ar)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeCategory === cat.ar 
                  ? 'bg-[#6B4E31] text-white shadow-xl' 
                  : 'bg-[#F3F0EC] text-[#8B4513]'
              }`}
            >
              {cat.ar}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            onClick={() => { onSelectCoffee(item); navigate('/detail'); }}
            className="bg-white p-4 rounded-[32px] flex items-center justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
              </div>
              <div className="text-right">
                <h4 className="font-black text-[#2C1810]">{item.name}</h4>
                <p className="text-[10px] text-[#8B4513] font-bold">{item.subName}</p>
                <p className="text-[#6B4E31] font-black mt-2">{item.price} ج.م</p>
              </div>
            </div>
            <button className="bg-[#6B4E31] text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all">
              <span className="text-xl">+</span>
            </button>
          </div>
        ))}
      </div>

      {/* Nav */}
      <div className="bg-white border-t border-[#6B4E31]/5 flex justify-around py-5 rounded-t-[40px] shadow-2xl">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 text-[#D4A574]">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-bold">الرئيسية</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <span className="text-2xl">📋</span>
          <span className="text-[10px] font-bold text-[#6B4E31]">المنيو</span>
          <div className="w-1 h-1 bg-[#6B4E31] rounded-full" />
        </button>
        <button onClick={() => navigate('/order')} className="flex flex-col items-center gap-1 text-[#D4A574]">
          <span className="text-2xl">👜</span>
          <span className="text-[10px] font-bold">السلة</span>
        </button>
        <button onClick={() => navigate('/delivery')} className="flex flex-col items-center gap-1 text-[#D4A574]">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] font-bold">طلباتي</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
