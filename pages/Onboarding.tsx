
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../App';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();

  return (
    <div className="h-screen relative flex flex-col justify-end overflow-hidden bg-[#2C1810]">
      {/* Background with parallax-like zoom */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop)',
          animation: 'slow-zoom 20s infinite alternate'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[#2C1810]/70 to-transparent" />
      </div>

      <div className="relative p-10 pb-24 space-y-12 text-center max-w-sm mx-auto w-full">
        <div className="animate-fade-up">
           <div className="inline-block p-5 bg-white/10 backdrop-blur-2xl rounded-[36px] border border-white/20 mb-8 shadow-2xl">
              <span className="text-5xl">☕</span>
           </div>
           <h1 className="text-5xl font-black text-white leading-[1.15] tracking-tight mb-5">
            {lang === 'ar' ? (
              <>
                قهوة <span className="text-[#D4A574]">القاهرة</span>
                <br />
                عشق في كل فنجان
              </>
            ) : (
              <>
                Cairo <span className="text-[#D4A574]">Coffee</span>
                <br />
                Love in Every Cup
              </>
            )}
          </h1>
          <p className="text-[#D4A574] text-lg leading-relaxed font-bold opacity-90 px-2">
            اطلب قهوتك المفضلة في دقائق واستمتع بمذاق القاهرة الأصيل.
          </p>
        </div>
        
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={() => navigate('/signin')}
            className="w-full bg-[#D4A574] text-[#2C1810] font-black py-6 rounded-[32px] shadow-[0_20px_50px_rgba(212,165,116,0.25)] hover:bg-[#c3966a] transition-all active:scale-[0.97] flex items-center justify-center gap-4 group"
          >
            <span className="text-xl">ابدأ الآن</span>
            <span className={`text-2xl transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>→</span>
          </button>

          <div className="flex justify-center gap-3">
             <div className="w-12 h-2.5 bg-[#D4A574] rounded-full shadow-lg" />
             <div className="w-2.5 h-2.5 bg-white/20 rounded-full" />
             <div className="w-2.5 h-2.5 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
