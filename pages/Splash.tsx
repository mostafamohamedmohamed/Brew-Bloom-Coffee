
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../App';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-[#2C1810] flex flex-col items-center justify-center p-8 text-white relative overflow-hidden font-cairo">
      {/* Background Pattern/Image Overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay scale-125 pointer-events-none"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1506370825238-644d5c0ef484?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slow-pan 30s linear infinite alternate'
        }}
      />

      <div className="relative z-10 flex flex-col items-center animate-fade-up">
        <div className="relative mb-10">
          {/* Animated Steam Rings */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center gap-1">
            <div className="w-1 h-8 bg-gradient-to-t from-[#D4A574]/60 to-transparent rounded-full animate-steam-up opacity-0" style={{ animationDelay: '0s' }} />
            <div className="w-1 h-12 bg-gradient-to-t from-[#D4A574]/40 to-transparent rounded-full animate-steam-up opacity-0" style={{ animationDelay: '0.4s' }} />
            <div className="w-1 h-6 bg-gradient-to-t from-[#D4A574]/60 to-transparent rounded-full animate-steam-up opacity-0" style={{ animationDelay: '0.8s' }} />
          </div>
          
          {/* Logo Icon Container */}
          <div className="w-32 h-32 bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10 flex items-center justify-center text-7xl shadow-2xl ring-8 ring-white/5">
            <span className="drop-shadow-2xl filter contrast-125">☕</span>
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-b from-white to-[#D4A574] bg-clip-text text-transparent">
            {t.appName}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-white/20" />
            <p className="text-[#D4A574] font-black text-xs tracking-[0.3em] uppercase opacity-80">
              {lang === 'ar' ? 'Cairo Coffee' : 'قهوة القاهرة'}
            </p>
            <div className="w-8 h-px bg-white/20" />
          </div>
        </div>
      </div>

      {/* Loading Bar Container */}
      <div className="absolute bottom-24 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#6B4E31] via-[#D4A574] to-[#6B4E31] animate-loading-progress w-0 shadow-[0_0_15px_rgba(212,165,116,0.5)]" />
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        Premium Roasted Excellence
      </div>

      <style>{`
        @keyframes steam-up {
          0% { transform: translateY(0) scaleX(1); opacity: 0; }
          30% { opacity: 0.6; }
          100% { transform: translateY(-40px) scaleX(1.5); opacity: 0; }
        }
        .animate-steam-up {
          animation: steam-up 2.5s infinite ease-out;
        }
        @keyframes loading-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-progress {
          animation: loading-progress 3.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @keyframes slow-pan {
          from { background-position: 0% 50%; transform: scale(1.2); }
          to { background-position: 100% 50%; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default Splash;
