
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from '../types';

interface OrderProps {
  cart: OrderItem[];
  updateQuantity: (id: string, size: string, delta: number) => void;
}

const Order: React.FC<OrderProps> = ({ cart, updateQuantity }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'Deliver' | 'Pick Up'>('Deliver');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = method === 'Deliver' ? 15.0 : 0;
  const discount = 5.0;

  return (
    <div className="pb-32 flex flex-col h-screen overflow-y-auto no-scrollbar bg-[#F8F4EF]">
      <div className="p-6 flex justify-between items-center bg-white sticky top-0 z-10 pt-14 border-b border-[#6B4E31]/5">
        <button onClick={() => navigate(-1)} className="text-[#2C1810] text-xl bg-[#F3F0EC] w-10 h-10 rounded-xl flex items-center justify-center">→</button>
        <h2 className="text-[#2C1810] font-black text-xl">سلة المشتريات</h2>
        <div className="w-10" />
      </div>

      <div className="px-6 mt-6">
        {/* Toggle */}
        <div className="bg-[#F3F0EC] p-1.5 rounded-2xl flex gap-1 shadow-inner">
          {(['Deliver', 'Pick Up'] as const).map(m => (
            <button 
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${method === m ? 'bg-[#6B4E31] text-white shadow-lg' : 'text-[#8B4513]'}`}
            >
              {m === 'Deliver' ? 'توصيل' : 'استلام من الفرع'}
            </button>
          ))}
        </div>

        {/* Address */}
        <div className="mt-8 bg-white p-6 rounded-[32px] border border-[#6B4E31]/5 shadow-sm">
          <h3 className="text-[#2C1810] font-black mb-3">عنوان التوصيل</h3>
          <div className="flex justify-between items-start">
            <div className="text-right">
              <p className="text-[#2C1810] font-black text-sm">القاهرة، المعادي</p>
              <p className="text-[#8B4513] text-xs mt-1">شارع ٩، مبنى رقم ٢٤، الدور الثالث</p>
            </div>
            <button className="text-[#6B4E31] text-xs font-black bg-[#F3F0EC] px-3 py-1.5 rounded-lg">تعديل</button>
          </div>
        </div>

        {/* List */}
        <div className="mt-8 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-[#8B4513] italic bg-white/50 rounded-3xl border border-dashed border-[#6B4E31]/20">السلة فارغة حالياً</div>
          ) : (
            cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between bg-white p-4 rounded-[28px] shadow-sm border border-[#6B4E31]/5">
                <div className="flex items-center gap-4">
                  <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                  <div className="text-right">
                    <h4 className="text-[#2C1810] font-black text-sm">{item.name}</h4>
                    <p className="text-[#8B4513] text-[10px] font-bold mt-1">حجم {item.selectedSize === 'S' ? 'صغير' : item.selectedSize === 'M' ? 'وسط' : 'كبير'}</p>
                    <p className="text-[#6B4E31] font-black text-sm mt-2">{item.price} ج.م</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                    className="w-8 h-8 rounded-xl bg-[#F3F0EC] text-[#6B4E31] flex items-center justify-center font-bold"
                  >+</button>
                  <span className="text-[#2C1810] font-black w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                    className="w-8 h-8 rounded-xl bg-[#F3F0EC] text-[#6B4E31] flex items-center justify-center font-bold"
                  >-</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Discount Code */}
        <div className="mt-8">
          <div className="flex items-center justify-between bg-white border border-[#6B4E31]/5 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏷️</span>
              <span className="text-[#2C1810] text-sm font-black">كود الخصم: CAIRO2024</span>
            </div>
            <span className="text-[#2D5A27] text-xs font-black">مفعل ✓</span>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white p-6 rounded-[32px] border border-[#6B4E31]/5 shadow-sm space-y-4">
          <h3 className="text-[#2C1810] font-black mb-2">تفاصيل الدفع</h3>
          <div className="flex justify-between text-sm">
            <span className="text-[#8B4513]">السعر</span>
            <span className="text-[#2C1810] font-black">{subtotal.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8B4513]">رسوم التوصيل</span>
            <span className="text-[#2C1810] font-black">{deliveryFee.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between text-sm text-[#2D5A27]">
            <span>خصم</span>
            <span className="font-black">- {discount.toFixed(2)} ج.م</span>
          </div>
          <div className="h-px bg-[#F3F0EC] my-2" />
          <div className="flex justify-between text-lg font-black">
            <span>الإجمالي</span>
            <span className="text-[#6B4E31]">{(subtotal + deliveryFee - discount).toFixed(2)} ج.م</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#6B4E31]/5 p-8 rounded-t-[48px] shadow-2xl flex items-center gap-6">
        <div className="flex flex-col text-right">
           <span className="text-[#8B4513] text-[10px] font-bold">المجموع النهائي</span>
           <span className="text-[#2C1810] text-2xl font-black">{(subtotal + deliveryFee - discount).toFixed(2)} ج.م</span>
        </div>
        <button 
          onClick={() => navigate('/payment')}
          disabled={cart.length === 0}
          className="flex-1 bg-[#6B4E31] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-950/20 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
        >
          الدفع والاستلام
        </button>
      </div>
    </div>
  );
};

export default Order;
