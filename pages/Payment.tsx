
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderItem, PaymentMethod } from '../types';
import { PAYMENT_ICONS } from '../constants';

interface PaymentProps {
  cart: OrderItem[];
  onComplete: () => void;
}

const Payment: React.FC<PaymentProps> = ({ cart, onComplete }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>('Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 15; // EGP
  const total = subtotal + deliveryFee;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      onComplete();
      setTimeout(() => navigate('/delivery'), 2000);
    }, 1500);
  };

  return (
    <div className="h-screen bg-[#F8F4EF] flex flex-col animate-fade-up overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="p-6 bg-white flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl">→</button>
        <h2 className="text-xl font-black">طريقة الدفع</h2>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Summary Card */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm space-y-3 border border-[#6B4E31]/5">
          <h3 className="text-lg font-black mb-4">ملخص الطلب</h3>
          <div className="flex justify-between text-sm">
            <span className="text-[#8B4513]">قيمة المنتجات</span>
            <span className="font-bold">{subtotal} ج.م</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8B4513]">رسوم التوصيل</span>
            <span className="font-bold">{deliveryFee} ج.م</span>
          </div>
          <div className="h-px bg-[#F3F0EC] my-2" />
          <div className="flex justify-between text-lg font-black">
            <span>الإجمالي</span>
            <span className="text-[#6B4E31]">{total} ج.م</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-black">اختر وسيلة الدفع</h3>
          
          {/* Card Option */}
          <div 
            onClick={() => setMethod('Card')}
            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${method === 'Card' ? 'border-[#6B4E31] bg-white' : 'border-transparent bg-white/50'}`}
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <img src={PAYMENT_ICONS.visa} className="h-4" alt="Visa" />
                <img src={PAYMENT_ICONS.mastercard} className="h-4" alt="Mastercard" />
              </div>
              <span className="font-bold text-sm">بطاقة بنكية</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'Card' ? 'border-[#6B4E31]' : 'border-gray-300'}`}>
              {method === 'Card' && <div className="w-2.5 h-2.5 bg-[#6B4E31] rounded-full" />}
            </div>
          </div>

          {/* Vodafone Cash */}
          <div 
            onClick={() => setMethod('Vodafone')}
            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${method === 'Vodafone' ? 'border-[#6B4E31] bg-white' : 'border-transparent bg-white/50'}`}
          >
            <div className="flex items-center gap-4">
              <img src={PAYMENT_ICONS.vodafone} className="h-6" alt="Vodafone" />
              <span className="font-bold text-sm">فودافون كاش</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'Vodafone' ? 'border-[#6B4E31]' : 'border-gray-300'}`}>
              {method === 'Vodafone' && <div className="w-2.5 h-2.5 bg-[#6B4E31] rounded-full" />}
            </div>
          </div>

          {/* Fawry */}
          <div 
            onClick={() => setMethod('Fawry')}
            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${method === 'Fawry' ? 'border-[#6B4E31] bg-white' : 'border-transparent bg-white/50'}`}
          >
            <div className="flex items-center gap-4">
              <img src={PAYMENT_ICONS.fawry} className="h-6" alt="Fawry" />
              <span className="font-bold text-sm">ادفع عبر فوري</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'Fawry' ? 'border-[#6B4E31]' : 'border-gray-300'}`}>
              {method === 'Fawry' && <div className="w-2.5 h-2.5 bg-[#6B4E31] rounded-full" />}
            </div>
          </div>
        </div>

        {/* Dynamic Inputs Based on Method */}
        {method === 'Vodafone' && (
          <div className="animate-fade-up">
            <input 
              type="tel" 
              placeholder="أدخل رقم فودافون كاش"
              className="w-full bg-white p-4 rounded-2xl border border-[#6B4E31]/10 focus:ring-2 focus:ring-[#6B4E31] outline-none text-right font-bold"
            />
            <p className="text-[10px] text-[#8B4513] mt-2 mr-2">سيتم إرسال رمز OTP لتأكيد الدفع</p>
          </div>
        )}

        {method === 'Fawry' && (
          <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-[#6B4E31]/20 flex flex-col items-center gap-4 animate-fade-up">
            <div className="w-32 h-32 bg-[#F3F0EC] flex items-center justify-center rounded-xl text-4xl">📱</div>
            <p className="text-center text-xs font-bold text-[#8B4513]">امسح الكود أو استخدم رقم المرجعي التالي للدفع في أقرب فرع</p>
            <span className="text-2xl font-black tracking-widest text-[#6B4E31]">#998765</span>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-8 bg-white rounded-t-[48px] shadow-2xl">
        <button 
          onClick={handleConfirm}
          disabled={isProcessing}
          className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${isProcessing ? 'bg-gray-200' : 'bg-[#6B4E31] text-white shadow-xl active:scale-95'}`}
        >
          {isProcessing ? 'جاري المعالجة...' : `تأكيد الدفع (${total} ج.م)`}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center space-y-6 animate-fade-up max-w-xs w-full">
            <div className="text-6xl animate-bounce-subtle">🎉</div>
            <h2 className="text-2xl font-black text-[#6B4E31]">تم بنجاح!</h2>
            <p className="text-[#8B4513] font-bold">تم استلام طلبك وهو الآن قيد التحضير.</p>
            <p className="text-[10px] text-gray-400">سيتم توجيهك إلى صفحة التتبع...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
