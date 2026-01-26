
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen relative flex flex-col justify-end overflow-hidden bg-[#F8F4EF]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop)',
          animation: 'slow-zoom 20s infinite alternate'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[#2C1810]/40 to-transparent" />
      </div>

      <div className="relative p-8 pb-20 space-y-8 text-right max-w-sm mx-auto">
        <div className="space-y-4 animate-fade-up">
          <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
            قهوة <span className="text-[#D4A574]">القاهرة</span>
            <br />
            عشق في كل فنجان
          </h1>
          <p className="text-[#D4A574] text-lg leading-relaxed font-medium">
            اطلب قهوتك المفضلة في دقائق واستمتع بمذاق القاهرة الأصيل.
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/signin')}
          className="w-full bg-[#6B4E31] text-white font-bold py-5 rounded-2xl shadow-2xl hover:bg-[#5a4128] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
        >
          <span className="text-xl">ابدأ الآن</span>
          <span className="group-hover:-translate-x-1 transition-transform rotate-180">→</span>
        </button>

        <div className="flex justify-center gap-2">
           <div className="w-8 h-1.5 bg-[#D4A574] rounded-full" />
           <div className="w-2 h-1.5 bg-[#D4A574]/30 rounded-full" />
           <div className="w-2 h-1.5 bg-[#D4A574]/30 rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
