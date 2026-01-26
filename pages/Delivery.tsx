
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../App';

const Delivery: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const [tab, setTab] = useState<'Active' | 'History'>('Active');

  return (
    <div className="h-screen bg-[#F8F4EF] flex flex-col overflow-hidden font-cairo">
      {/* Header */}
      <div className="p-6 bg-white sticky top-0 z-30 shadow-sm flex flex-col pt-14 border-b border-[#F3F0EC]">
        <div className={`flex justify-between items-center mb-6 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
          <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl text-lg hover:bg-[#E8E4E0] transition-colors">
            <span className={lang === 'ar' ? 'rotate-0' : 'rotate-180'}>→</span>
          </button>
          <h2 className="text-xl font-black text-[#2C1810]">{t.navOrders}</h2>
          <button className="w-10 h-10 flex items-center justify-center bg-[#F3F0EC] rounded-xl text-lg hover:bg-[#E8E4E0] transition-colors">
            📅
          </button>
        </div>
        
        {/* Tabs */}
        <div className={`flex bg-[#F3F0EC] p-1.5 rounded-2xl gap-2 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={() => setTab('Active')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${tab === 'Active' ? 'bg-[#6B4E31] text-white shadow-lg shadow-[#6B4E31]/20' : 'text-[#8B4513]'}`}
          >
            {t.active}
          </button>
          <button 
            onClick={() => setTab('History')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${tab === 'History' ? 'bg-[#6B4E31] text-white shadow-lg shadow-[#6B4E31]/20' : 'text-[#8B4513]'}`}
          >
            {t.history}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 pb-32">
        {tab === 'Active' ? (
          <div className="space-y-6 animate-fade-up">
            {/* Live Track Card */}
            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-[#6B4E31]/5 p-2 pb-6">
               <div className="h-44 bg-[#F3F0EC] rounded-[32px] relative overflow-hidden mb-6">
                 {/* Mock Map with Driver */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative z-10">
                      <div className="absolute -inset-4 bg-[#6B4E31]/10 rounded-full animate-ping" />
                      <span className="text-4xl">🛵</span>
                    </div>
                    {/* Path Line */}
                    <svg className="absolute inset-0 w-full h-full opacity-30">
                      <path d="M50,140 Q150,80 250,140 T350,80" fill="none" stroke="#6B4E31" strokeWidth="4" strokeDasharray="12 8" strokeLinecap="round" />
                    </svg>
                 </div>
                 <div className={`absolute bottom-4 ${lang === 'ar' ? 'right-4' : 'left-4'} bg-white px-4 py-2 rounded-2xl shadow-sm border border-black/5`}>
                    <span className="text-[11px] font-black text-[#6B4E31]">{t.arrivalIn}</span>
                 </div>
               </div>

               <div className="px-4">
                  <div className={`flex justify-between items-start mb-6 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h4 className="font-black text-lg text-[#2C1810]">{t.orderNum} #12845</h4>
                      <p className="text-xs text-[#8B4513] font-bold mt-1">٢ مشروب • ٨٥ ج.م</p>
                    </div>
                    <span className="bg-[#2D5A27] text-white text-[10px] px-4 py-1.5 rounded-full font-black">
                      {t.outForDelivery}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className={`flex items-center gap-3 mb-10 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                    <div className="h-2 flex-1 bg-[#6B4E31] rounded-full" />
                    <div className="h-2 flex-1 bg-[#6B4E31] rounded-full" />
                    <div className="h-2 flex-1 bg-[#6B4E31]/50 rounded-full" />
                    <div className="h-2 flex-1 bg-[#F3F0EC] rounded-full" />
                  </div>

                  {/* Courier Info */}
                  <div className={`flex items-center justify-between ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${lang === 'en' ? 'flex-row-reverse text-right' : 'text-right'}`}>
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                        <img src="https://picsum.photos/seed/driver/200" className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                        <p className="text-sm font-black text-[#2C1810]">أحمد محمد</p>
                        <p className="text-[10px] text-[#8B4513] font-bold">{t.deliveryCaptain}</p>
                      </div>
                    </div>
                    <div className={`flex gap-3 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                      <button className="w-12 h-12 rounded-2xl bg-[#F3F0EC] flex items-center justify-center text-xl hover:bg-white border border-transparent hover:border-[#F3F0EC] transition-all">💬</button>
                      <button className="w-12 h-12 rounded-2xl bg-[#F3F0EC] flex items-center justify-center text-xl hover:bg-white border border-transparent hover:border-[#F3F0EC] transition-all">📞</button>
                    </div>
                  </div>
               </div>
            </div>

            {/* Support / Quick Actions */}
            <div className={`bg-white p-6 rounded-[32px] flex items-center justify-between border border-[#6B4E31]/5 shadow-sm ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-4 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                <span className="text-2xl filter grayscale brightness-125">🛠️</span>
                <span className="text-sm font-black text-[#2C1810]">{t.problemWithOrder}</span>
              </div>
              <button className="text-[#6B4E31] text-xs font-black px-6 py-2.5 rounded-xl border-2 border-[#6B4E31]/10 border-dashed hover:border-solid hover:bg-[#6B4E31]/5 transition-all">
                {t.contactUs}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center space-y-4 animate-fade-up">
             <span className="text-6xl">☕</span>
             <p className="font-black text-[#2C1810]">{lang === 'ar' ? 'لا توجد طلبات سابقة' : 'No previous orders'}</p>
          </div>
        )}
      </div>

      {/* Navigation - Stylized to match Screenshot */}
      <div className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#F3F0EC] flex justify-around py-5 pt-4 pb-8 z-50 rounded-t-[40px] shadow-[0_-15px_30px_rgba(0,0,0,0.05)] ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 text-[#8B4513]/40 hover:text-[#6B4E31] transition-colors">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-black">{t.navHome}</span>
        </button>
        <button onClick={() => navigate('/menu')} className="flex flex-col items-center gap-1 text-[#8B4513]/40 hover:text-[#6B4E31] transition-colors">
          <span className="text-2xl">📋</span>
          <span className="text-[10px] font-black">{t.navMenu}</span>
        </button>
        <button onClick={() => navigate('/order')} className="flex flex-col items-center gap-1 text-[#8B4513]/40 hover:text-[#6B4E31] transition-colors">
          <span className="text-2xl">👜</span>
          <span className="text-[10px] font-black">{t.navCart}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#6B4E31]">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] font-black">{t.navOrders}</span>
          <div className="w-1 h-1 bg-[#6B4E31] rounded-full" />
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
