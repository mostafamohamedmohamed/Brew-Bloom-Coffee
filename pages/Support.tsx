
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../App';

const Support: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useTranslation();

  const handleWhatsApp = () => {
    window.open('https://wa.me/201023456789', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+201023456789';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@cairocoffee.com';
  };

  const handleFAQ = (question: string) => {
    alert(`${lang === 'ar' ? 'سؤال:' : 'Question:'} ${question}\n\n${lang === 'ar' ? 'سيتم إضافة الإجابة قريباً في تحديث مركز المساعدة.' : 'The answer will be added soon in the help center update.'}`);
  };

  return (
    <div className="h-screen bg-[#FDF9F4] flex flex-col font-cairo overflow-hidden">
      {/* Header - Back button on Left, Title in Center */}
      <div className="p-6 bg-white sticky top-0 z-30 shadow-sm flex items-center pt-14 rounded-b-[48px]">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl text-lg hover:bg-[#E8E4E0] transition-all active:scale-90"
        >
          <span className={lang === 'ar' ? '' : 'rotate-180'}>→</span>
        </button>
        <h2 className="flex-1 text-center text-xl font-black text-[#2C1810] pr-10">مركز الدعم</h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 pb-10">
        {/* Support Buttons - Icon Right, Text Center, Arrow Left */}
        <div className="space-y-4">
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-white p-5 rounded-[32px] flex items-center shadow-sm border border-[#6B4E31]/5 active:scale-[0.98] transition-all group"
          >
            <span className="text-[#8B4513] font-black opacity-30 text-sm">→</span>
            <div className="flex-1 text-right px-4">
              <p className="font-black text-[#2C1810]">واتساب</p>
              <p className="text-[10px] text-[#8B4513] font-bold opacity-60">تواصل معنا عبر رسائل الواتساب</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">📱</div>
          </button>

          <button 
            onClick={handleCall}
            className="w-full bg-white p-5 rounded-[32px] flex items-center shadow-sm border border-[#6B4E31]/5 active:scale-[0.98] transition-all group"
          >
            <span className="text-[#8B4513] font-black opacity-30 text-sm">→</span>
            <div className="flex-1 text-right px-4">
              <p className="font-black text-[#2C1810]">اتصال مباشر</p>
              <p className="text-[10px] text-[#8B4513] font-bold opacity-60">تحدث مع خدمة العملاء</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">📞</div>
          </button>

          <button 
            onClick={handleEmail}
            className="w-full bg-white p-5 rounded-[32px] flex items-center shadow-sm border border-[#6B4E31]/5 active:scale-[0.98] transition-all group"
          >
            <span className="text-[#8B4513] font-black opacity-30 text-sm">→</span>
            <div className="flex-1 text-right px-4">
              <p className="font-black text-[#2C1810]">بريد إلكتروني</p>
              <p className="text-[10px] text-[#8B4513] font-bold opacity-60">أرسل لنا ملاحظاتك</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">✉️</div>
          </button>
        </div>

        {/* FAQ Section - Matches Screenshot exactly */}
        <div className="bg-[#F3F0EC] p-6 rounded-[40px] space-y-4">
           <h4 className="font-black text-[#2C1810] text-lg text-center mb-6">الأسئلة الشائعة</h4>
           <div className="space-y-3">
             {[
               "متى سيصل طلبي؟",
               "كيف يمكنني إلغاء الطلب؟",
               "هل تتوفر عروض للطلبات الكبيرة؟"
             ].map((q, idx) => (
               <button 
                key={idx}
                onClick={() => handleFAQ(q)}
                className="w-full bg-white p-5 rounded-[24px] text-sm font-black text-[#2C1810] text-center shadow-sm border border-transparent hover:border-[#6B4E31]/10 active:scale-[0.99] transition-all"
               >
                 {q}
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
