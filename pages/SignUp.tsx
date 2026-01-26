
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../App';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Simulate registration
    navigate('/home');
  };

  return (
    <div className="h-screen bg-[#F8F4EF] flex flex-col p-8 pt-20 animate-fade-up overflow-y-auto no-scrollbar">
      <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} space-y-4 mb-12`}>
        <h2 className="text-4xl font-black text-[#2C1810]">{t.signUpTitle}</h2>
        <p className="text-[#8B4513] font-bold">{t.signUpDesc}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className={`block ${lang === 'ar' ? 'text-right' : 'text-left'} text-xs font-black text-[#6B4E31] uppercase tracking-widest`}>{t.nameLabel}</label>
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'أدخل اسمك هنا' : 'Enter your name'}
              className={`w-full bg-white p-5 rounded-2xl outline-none ring-1 ring-[#6B4E31]/10 focus:ring-[#6B4E31]/30 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'} font-bold text-sm`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className={`block ${lang === 'ar' ? 'text-right' : 'text-left'} text-xs font-black text-[#6B4E31] uppercase tracking-widest`}>{t.emailLabel}</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              className={`w-full bg-white p-5 rounded-2xl outline-none ring-1 ring-[#6B4E31]/10 focus:ring-[#6B4E31]/30 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'} font-bold text-sm`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className={`block ${lang === 'ar' ? 'text-right' : 'text-left'} text-xs font-black text-[#6B4E31] uppercase tracking-widest`}>{t.passwordLabel}</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className={`w-full bg-white p-5 rounded-2xl outline-none ring-1 ring-[#6B4E31]/10 focus:ring-[#6B4E31]/30 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'} font-bold text-sm`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={handleSignUp}
          className="w-full bg-[#6B4E31] text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-950/20 active:scale-95 transition-all"
        >
          {t.confirmSignUp}
        </button>

        <div className={`text-center`}>
          <Link to="/signin" className="text-[#8B4513] font-bold text-sm hover:underline">{t.alreadyHaveAccount}</Link>
        </div>

        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-[#6B4E31]/10" />
          <span className="text-[#8B4513] text-xs font-bold">{t.orSignInWith}</span>
          <div className="flex-1 h-px bg-[#6B4E31]/10" />
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-white p-4 rounded-2xl flex items-center justify-center gap-2 border border-[#6B4E31]/5 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
            <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" className="w-5 h-5" alt="Google" />
            <span className="text-xs font-black">{t.googleLogin}</span>
          </button>
          <button className="flex-1 bg-white p-4 rounded-2xl flex items-center justify-center gap-2 border border-[#6B4E31]/5 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
            <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" className="w-5 h-5" alt="Hotmail" />
            <span className="text-xs font-black">{t.microsoftLogin}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
