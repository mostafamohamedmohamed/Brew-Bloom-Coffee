
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-[#6B4E31] flex flex-col items-center justify-center p-8 text-white">
      <div className="relative mb-8">
        {/* Steam Animation */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 opacity-60">
          <div className="w-1.5 h-8 bg-white/40 rounded-full animate-[steam_2s_infinite_ease-in-out]" />
          <div className="w-1.5 h-12 bg-white/40 rounded-full animate-[steam_2s_infinite_ease-in-out_0.3s]" />
          <div className="w-1.5 h-8 bg-white/40 rounded-full animate-[steam_2s_infinite_ease-in-out_0.6s]" />
        </div>
        
        {/* Cup */}
        <div className="text-8xl filter drop-shadow-2xl">☕</div>
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter">قهوة القاهرة</h1>
        <p className="text-[#D4A574] font-bold text-sm tracking-[0.2em] uppercase">Cairo Coffee</p>
      </div>

      <div className="absolute bottom-20 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#D4A574] animate-[loading_3s_linear_forwards]" />
      </div>

      <style>{`
        @keyframes steam {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.3; }
          50% { transform: translateY(-10px) scaleX(1.2); opacity: 0.8; }
        }
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Splash;
