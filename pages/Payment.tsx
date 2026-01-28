
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderItem, PaymentMethod } from '../types';
import { PAYMENT_ICONS } from '../constants';
import { useTranslation } from '../App';

interface PaymentProps {
  cart: OrderItem[];
  onComplete: () => void;
}

const Payment: React.FC<PaymentProps> = ({ cart, onComplete }) => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const [method, setMethod] = useState<PaymentMethod>('Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Card Details State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 15; // EGP
  const discount = 5;
  const total = subtotal + deliveryFee - discount;

  const handleConfirm = () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      onComplete();
      // Redirect to delivery after seeing success message
      setTimeout(() => navigate('/delivery'), 2500);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="h-screen bg-[#FDF9F4] flex flex-col font-cairo overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-white sticky top-0 z-30 shadow-sm flex justify-between items-center pt-14 rounded-b-[32px]">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl text-lg hover:bg-[#E8E4E0] transition-colors">
          <span className={lang === 'ar' ? 'rotate-0' : 'rotate-180'}>→</span>
        </button>
        <h2 className="text-xl font-black text-[#2C1810]">{t.paymentMethod}</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-40">
        {/* Order Summary Card */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#6B4E31]/5 space-y-4">
          <h3 className="text-lg font-black text-[#2C1810] border-b border-[#F3F0EC] pb-2">{t.orderSummary}</h3>
          <div className={`flex justify-between items-center text-sm ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="text-[#8B4513] font-bold">{t.subtotal}</span>
            <span className="font-black text-[#2C1810]">{subtotal.toFixed(2)} ج.م</span>
          </div>
          <div className={`flex justify-between items-center text-sm ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="text-[#8B4513] font-bold">{t.deliveryFee}</span>
            <span className="font-black text-[#2C1810]">{deliveryFee.toFixed(2)} ج.م</span>
          </div>
          <div className={`flex justify-between items-center text-sm text-[#2D5A27] ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="font-bold">{t.discount}</span>
            <span className="font-black">- {discount.toFixed(2)} ج.م</span>
          </div>
          <div className="h-px bg-[#F3F0EC] my-2" />
          <div className={`flex justify-between items-center text-xl font-black ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="text-[#2C1810]">{t.total}</span>
            <span className="text-[#6B4E31]">{total.toFixed(2)} ج.م</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <h3 className={`text-lg font-black text-[#2C1810] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.choosePayment}</h3>
          
          <div className="grid gap-3">
            {/* Credit Card */}
            <label className={`relative flex items-center gap-4 p-5 rounded-[24px] border-2 transition-all cursor-pointer ${method === 'Card' ? 'border-[#6B4E31] bg-white shadow-md' : 'border-transparent bg-white/50'}`}>
              <input type="radio" name="payment" className="hidden" onChange={() => setMethod('Card')} checked={method === 'Card'} />
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[#F3F0EC] rounded-xl flex items-center justify-center text-xl">💳</div>
                   <span className="font-black text-[#2C1810] text-sm">{t.bankCard}</span>
                </div>
                <div className="flex gap-1.5">
                  <img src={PAYMENT_ICONS.visa} className="h-3" alt="Visa" />
                  <img src={PAYMENT_ICONS.mastercard} className="h-3" alt="Mastercard" />
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'Card' ? 'border-[#6B4E31]' : 'border-[#8B4513]/20'}`}>
                {method === 'Card' && <div className="w-2.5 h-2.5 bg-[#6B4E31] rounded-full" />}
              </div>
            </label>

            {/* Vodafone Cash */}
            <label className={`relative flex items-center gap-4 p-5 rounded-[24px] border-2 transition-all cursor-pointer ${method === 'Vodafone' ? 'border-[#6B4E31] bg-white shadow-md' : 'border-transparent bg-white/50'}`}>
              <input type="radio" name="payment" className="hidden" onChange={() => setMethod('Vodafone')} checked={method === 'Vodafone'} />
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <img src={PAYMENT_ICONS.vodafone} className="w-10 h-10 object-contain rounded-xl bg-white p-1" alt="" />
                   <span className="font-black text-[#2C1810] text-sm">{t.vodafoneCash}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'Vodafone' ? 'border-[#6B4E31]' : 'border-[#8B4513]/20'}`}>
                {method === 'Vodafone' && <div className="w-2.5 h-2.5 bg-[#6B4E31] rounded-full" />}
              </div>
            </label>

            {/* Fawry */}
            <label className={`relative flex items-center gap-4 p-5 rounded-[24px] border-2 transition-all cursor-pointer ${method === 'Fawry' ? 'border-[#6B4E31] bg-white shadow-md' : 'border-transparent bg-white/50'}`}>
              <input type="radio" name="payment" className="hidden" onChange={() => setMethod('Fawry')} checked={method === 'Fawry'} />
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <img src={PAYMENT_ICONS.fawry} className="w-10 h-10 object-contain rounded-xl bg-white p-1" alt="" />
                   <span className="font-black text-[#2C1810] text-sm">{t.fawry}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'Fawry' ? 'border-[#6B4E31]' : 'border-[#8B4513]/20'}`}>
                {method === 'Fawry' && <div className="w-2.5 h-2.5 bg-[#6B4E31] rounded-full" />}
              </div>
            </label>
          </div>
        </div>

        {/* Dynamic Payment Details Section */}
        <div className="animate-fade-up">
          {method === 'Card' && (
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#6B4E31]/5 space-y-4">
              <div className="space-y-2">
                <label className={`block text-[10px] font-black text-[#8B4513] uppercase ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'الاسم على البطاقة' : 'Cardholder Name'}</label>
                <input 
                  type="text" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className={`w-full bg-[#F3F0EC] p-4 rounded-2xl outline-none font-bold text-sm ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  placeholder={lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed'}
                />
              </div>
              <div className="space-y-2">
                <label className={`block text-[10px] font-black text-[#8B4513] uppercase ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'رقم البطاقة' : 'Card Number'}</label>
                <input 
                  type="text" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className={`w-full bg-[#F3F0EC] p-4 rounded-2xl outline-none font-bold text-sm font-inter tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`block text-[10px] font-black text-[#8B4513] uppercase ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}</label>
                  <input 
                    type="text" 
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-[#F3F0EC] p-4 rounded-2xl outline-none font-bold text-sm text-center font-inter"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`block text-[10px] font-black text-[#8B4513] uppercase ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'كود التحقق (CVV)' : 'CVV'}</label>
                  <input 
                    type="password" 
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-[#F3F0EC] p-4 rounded-2xl outline-none font-bold text-sm text-center font-inter"
                    placeholder="***"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'Vodafone' && (
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-[#6B4E31]/5 space-y-4">
              <div className="space-y-2">
                <label className={`block text-[10px] font-black text-[#8B4513] uppercase ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{lang === 'ar' ? 'رقم الموبايل' : 'Phone Number'}</label>
                <input 
                  type="tel" 
                  placeholder="010XXXXXXXX"
                  className={`w-full bg-[#F3F0EC] p-4 rounded-2xl outline-none font-bold text-sm text-center font-inter`}
                />
              </div>
              <p className="text-[10px] text-[#8B4513] font-bold text-center opacity-60">سيتم إرسال كود تأكيد عبر رسالة نصية (SMS)</p>
            </div>
          )}

          {method === 'Fawry' && (
            <div className="bg-white p-8 rounded-[32px] border-2 border-dashed border-[#6B4E31]/20 flex flex-col items-center gap-4 text-center">
              <div className="w-20 h-20 bg-[#FDF9F4] rounded-full flex items-center justify-center text-4xl shadow-inner animate-pulse">📠</div>
              <p className="text-sm font-black text-[#2C1810]">سيظهر لك كود الدفع فور تأكيد الطلب</p>
              <p className="text-[10px] text-[#8B4513] font-bold">يمكنك الدفع في أي فرع فوري أو تطبيق بنكي</p>
            </div>
          )}
        </div>

        {/* Creator Credit */}
        <div className="pt-8 opacity-40 text-center space-y-1">
           <p className="text-[9px] font-black text-[#6B4E31] uppercase tracking-[0.2em]">Cairo Coffee Excellence</p>
           <p className="text-[8px] font-bold text-[#8B4513]">Created by @mostafa2025</p>
        </div>
      </div>

      {/* Floating Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-2xl p-6 rounded-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-white pointer-events-auto">
          <button 
            onClick={handleConfirm}
            disabled={isProcessing || cart.length === 0}
            className={`w-full py-5 rounded-[22px] font-black text-lg transition-all flex items-center justify-center gap-3 ${
              isProcessing 
                ? 'bg-[#F3F0EC] text-[#8B4513]' 
                : 'bg-[#6B4E31] text-white shadow-xl shadow-[#6B4E31]/20 active:scale-95'
            } disabled:opacity-50`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
                <span>جاري معالجة الدفع...</span>
              </>
            ) : (
              `تأكيد الدفع (${total.toFixed(2)} ج.م)`
            )}
          </button>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-lg">
          <div className="bg-white p-10 rounded-[48px] shadow-2xl text-center space-y-6 animate-fade-up max-w-xs w-full border-4 border-[#FDF9F4]">
            <div className="relative inline-block">
               <div className="w-24 h-24 bg-[#2D5A27]/10 rounded-full flex items-center justify-center text-6xl shadow-inner animate-bounce-subtle">🎉</div>
               <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#2D5A27] text-white rounded-full flex items-center justify-center text-xl shadow-lg">✓</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-[#6B4E31]">{t.successTitle}</h2>
              <p className="text-[#8B4513] font-bold leading-relaxed">{t.successDesc}</p>
            </div>
            <div className="pt-4 flex flex-col items-center gap-2">
              <div className="w-12 h-1 bg-[#F3F0EC] rounded-full overflow-hidden">
                <div className="h-full bg-[#6B4E31] animate-[loading-progress_2.5s_linear_forwards]" />
              </div>
              <p className="text-[10px] font-black text-[#6B4E31] opacity-50 uppercase tracking-widest">Redirecting to Tracker</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes loading-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Payment;
