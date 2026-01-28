
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../App';

const Delivery: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const [tab, setTab] = useState<'Active' | 'History'>('Active');

  return (
    <div className="h-screen bg-[#FDF9F4] flex flex-col overflow-hidden font-cairo">
      {/* Header - EXACT SCREENSHOT LAYOUT */}
      <div className="p-6 bg-white sticky top-0 z-30 flex justify-between items-center pt-14 border-b border-[#F3F0EC]">
        <button className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl text-lg hover:bg-[#E8E4E0] transition-colors">
          📅
        </button>
        <h2 className="text-xl font-black text-[#2C1810]">طلباتي</h2>
        <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl text-lg hover:bg-[#E8E4E0] transition-colors">
          →
        </button>
      </div>
      
      {/* Tabs - EXACT SCREENSHOT LAYOUT */}
      <div className="px-6 mt-4">
        <div className="flex bg-[#F3F0EC] p-1.5 rounded-2xl gap-2">
          <button 
            onClick={() => setTab('History')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${tab === 'History' ? 'bg-[#6B4E31] text-white shadow-lg' : 'text-[#8B4513]'}`}
          >
            سجل الطلبات
          </button>
          <button 
            onClick={() => setTab('Active')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${tab === 'Active' ? 'bg-[#6B4E31] text-white shadow-lg' : 'text-[#8B4513]'}`}
          >
            نشط
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 pb-32">
        {tab === 'Active' ? (
          <div className="space-y-6 animate-fade-up">
            {/* Live Track Card */}
            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-[#6B4E31]/5 p-2 pb-6 relative">
               <div className="h-32 rounded-[32px] relative overflow-hidden mb-4">
                 {/* Mock Map Background */}
                 <div className="absolute inset-0 bg-[#F3F0EC] flex items-center justify-center">
                    <div className="relative z-10 opacity-20">
                      <span className="text-6xl">🗺️</span>
                    </div>
                    {/* Animated Path */}
                    <svg className="absolute inset-0 w-full h-full opacity-30">
                      <path d="M50,100 Q150,40 250,100 T350,40" fill="none" stroke="#6B4E31" strokeWidth="4" strokeDasharray="12 8" strokeLinecap="round" />
                    </svg>
                 </div>
                 <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-black/5">
                    <span className="text-[11px] font-black text-[#6B4E31]">تصل خلال ١٢ دقيقة</span>
                 </div>
               </div>

               <div className="px-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#B7C4B1] text-white text-[10px] px-3 py-1.5 rounded-xl font-black">
                      خارج للتوصيل
                    </span>
                    <div className="text-right">
                      <h4 className="font-black text-lg text-[#2C1810]">طلب رقم #12845</h4>
                      <p className="text-xs text-[#8B4513] font-bold mt-1">٢ مشروب • ٨٥ ج.م</p>
                    </div>
                  </div>

                  {/* Progress Line Segments */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-2 flex-1 bg-[#F3F0EC] rounded-full" />
                    <div className="h-2 flex-1 bg-[#6B4E31] rounded-full" />
                    <div className="h-2 flex-1 bg-[#6B4E31] rounded-full" />
                  </div>

                  {/* Courier Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <button className="w-12 h-12 rounded-2xl bg-[#FDF9F4] flex items-center justify-center text-xl hover:bg-white border border-[#F3F0EC] transition-all">💬</button>
                      <button className="w-12 h-12 rounded-2xl bg-[#FDF9F4] flex items-center justify-center text-xl hover:bg-white border border-[#F3F0EC] transition-all text-red-400">📞</button>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <p className="text-sm font-black text-[#2C1810]">أحمد محمد</p>
                        <p className="text-[10px] text-[#8B4513] font-bold">كابتن التوصيل</p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border-2 border-white bg-[#F3F0EC]">
                        <img src="https://picsum.photos/seed/driver/200" className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Support / Quick Actions - DASHED BOX SECTION FROM SCREENSHOT */}
            <div className="bg-white p-6 rounded-[32px] flex items-center justify-between border border-[#6B4E31]/5 shadow-sm">
              <button 
                onClick={() => navigate('/support')}
                className="text-[#6B4E31] text-xs font-black px-6 py-2.5 rounded-xl border-2 border-[#6B4E31]/10 border-dashed hover:border-solid hover:bg-[#6B4E31]/5 transition-all"
              >
                تواصل معنا
              </button>
              <div className="flex items-center gap-4 text-right">
                <span className="text-sm font-black text-[#2C1810]">هل لديك مشكلة في الطلب؟</span>
                <span className="text-2xl filter grayscale brightness-125">🛠️</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center space-y-4 animate-fade-up">
             <span className="text-6xl">☕</span>
             <p className="font-black text-[#2C1810]">لا توجد طلبات سابقة</p>
          </div>
        )}
      </div>

      {/* Navigation - EXACT SCREENSHOT STYLE */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#F3F0EC] flex justify-around py-5 pt-4 pb-8 z-50 rounded-t-[40px] shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 text-[#8B4513]/40">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] font-black">حسابي</span>
        </button>
        <button onClick={() => navigate('/order')} className="flex flex-col items-center gap-1 text-[#8B4513]/40">
          <span className="text-2xl">👜</span>
          <span className="text-[10px] font-black">السلة</span>
        </button>
        <button onClick={() => navigate('/menu')} className="flex flex-col items-center gap-1 text-[#8B4513]/40">
          <span className="text-2xl">📋</span>
          <span className="text-[10px] font-black">المنيو</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#6B4E31]">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-black">الرئيسية</span>
          <div className="w-1.5 h-1.5 bg-[#6B4E31] rounded-full" />
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Delivery;
