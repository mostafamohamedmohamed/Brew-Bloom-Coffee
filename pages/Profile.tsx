
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../App';
import { COFFEE_ITEMS } from '../constants';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useTranslation();

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  // Mocking favorite drinks by taking a subset of available items
  const favoriteDrinks = COFFEE_ITEMS.slice(0, 3);

  return (
    <div className="h-screen bg-[#F8F4EF] flex flex-col overflow-hidden">
      <div className="p-8 bg-white rounded-b-[48px] shadow-sm pt-20 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-[40px] overflow-hidden ring-4 ring-[#6B4E31]/10">
            <img src="https://picsum.photos/seed/profile/400" className="w-full h-full object-cover" alt="" />
          </div>
          <button className={`absolute -bottom-2 ${lang === 'ar' ? '-right-2' : '-left-2'} bg-[#6B4E31] text-white w-10 h-10 rounded-2xl border-4 border-white flex items-center justify-center text-sm shadow-xl`}>✎</button>
        </div>
        <h2 className="text-2xl font-black text-[#2C1810]">{lang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed'}</h2>
        <p className="text-[#8B4513] font-bold text-sm">ahmed@cairocoffee.com</p>
        
        <div className="flex gap-4 mt-8 w-full">
           <div className="flex-1 bg-[#F3F0EC] p-4 rounded-3xl text-center">
             <p className="text-xl font-black text-[#6B4E31]">١٢</p>
             <p className="text-[10px] font-bold text-[#8B4513]">{lang === 'ar' ? 'طلب ناجح' : 'Orders'}</p>
           </div>
           <div className="flex-1 bg-[#F3F0EC] p-4 rounded-3xl text-center">
             <p className="text-xl font-black text-[#2D5A27]">٤٥٠</p>
             <p className="text-[10px] font-bold text-[#8B4513]">{lang === 'ar' ? 'نقطة ولاء' : 'Points'}</p>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar pb-32">
        {/* Language Toggle */}
        <div className="bg-white p-6 rounded-[32px] border border-[#6B4E31]/5 shadow-sm flex items-center justify-between">
           <div className={`flex items-center gap-3 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
             <span className="text-xl">🌐</span>
             <span className="font-black text-[#2C1810] text-sm">{t.language}</span>
           </div>
           <button 
             onClick={toggleLanguage}
             className="bg-[#6B4E31] text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg"
           >
             {t.switchLang}
           </button>
        </div>

        {/* Favorite Drinks Section */}
        <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h3 className="font-black text-[#2C1810] text-lg px-2">
            {lang === 'ar' ? 'المشروبات المفضلة' : 'Favorite Drinks'}
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {favoriteDrinks.map((drink) => (
              <div 
                key={drink.id} 
                className="min-w-[140px] bg-white p-3 rounded-[28px] shadow-sm border border-[#6B4E31]/5 flex flex-col items-center gap-2"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden">
                  <img src={drink.image} className="w-full h-full object-cover" alt={drink.name} />
                </div>
                <p className="text-[10px] font-black text-[#2C1810] text-center truncate w-full px-1">
                  {lang === 'ar' ? drink.name : drink.subName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Info Section */}
        <div className={`bg-white p-6 rounded-[32px] border border-[#6B4E31]/5 shadow-sm space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h3 className="font-black text-[#2C1810] text-lg border-b border-[#F3F0EC] pb-2">{t.personalInfo}</h3>
          <div className={`flex justify-between items-center ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="font-bold text-[#2C1810]">01023456789</span>
            <span className="text-[#8B4513] text-sm">{t.phoneNumber}</span>
          </div>
          <div className={`flex justify-between items-center ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="font-bold text-[#2C1810]">{lang === 'ar' ? '١٥ مايو ١٩٩٥' : '15 May 1995'}</span>
            <span className="text-[#8B4513] text-sm">{t.birthDate}</span>
          </div>
          <div className={`flex justify-between items-center ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="font-bold text-[#2C1810]">{lang === 'ar' ? 'فلات وايت' : 'Flat White'}</span>
            <span className="text-[#8B4513] text-sm">{t.favDrink}</span>
          </div>
          <div className={`flex justify-between items-center ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
            <span className="font-bold text-[#2D5A27]">{t.goldenMember}</span>
            <span className="text-[#8B4513] text-sm">{t.membership}</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {[
            { icon: '👤', title: lang === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile' },
            { icon: '📍', title: lang === 'ar' ? 'عناويني المسجلة' : 'Saved Addresses' },
            { icon: '💳', title: lang === 'ar' ? 'طرق الدفع' : 'Payment Methods' },
            { icon: '🔔', title: lang === 'ar' ? 'الإشعارات' : 'Notifications' },
            { icon: '📜', title: lang === 'ar' ? 'سجل الطلبات' : 'Order History' },
            { icon: '⚙️', title: lang === 'ar' ? 'الإعدادات' : 'Settings' },
          ].map((item, idx) => (
            <button key={idx} className={`w-full bg-white p-5 rounded-3xl flex items-center justify-between hover:bg-white/80 transition-all border border-[#6B4E31]/5 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-4 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold text-[#2C1810]">{item.title}</span>
              </div>
              <span className={`text-[#8B4513] ${lang === 'ar' ? 'rotate-180' : ''}`}>→</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => navigate('/signin')}
          className="w-full p-5 rounded-3xl flex items-center justify-center gap-3 text-red-500 font-black border-2 border-red-50/50 bg-red-50/20"
        >
          <span>{t.logout}</span>
          <span>🚪</span>
        </button>

        {/* Social Media Footer */}
        <div className="flex flex-col items-center gap-4 pt-4 opacity-70">
          <p className="text-xs font-black text-[#8B4513]">{t.followUs}</p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#6B4E31]/5">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className="w-5 h-5" alt="Instagram" />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#6B4E31]/5">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="w-5 h-5" alt="Facebook" />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#6B4E31]/5">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-5 h-5" alt="WhatsApp" />
            </a>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] font-bold text-[#8B4513] font-inter">© 2024 Cairo Coffee Co.</p>
            <p className="text-[9px] font-black text-[#6B4E31] mt-1">Created by @mostafa2025</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t border-[#6B4E31]/5 flex justify-around py-5 z-50 rounded-t-[40px] shadow-2xl">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 text-[#D4A574]">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-bold">{t.navHome}</span>
        </button>
        <button onClick={() => navigate('/menu')} className="flex flex-col items-center gap-1 text-[#D4A574]">
          <span className="text-2xl">📋</span>
          <span className="text-[10px] font-bold">{t.navMenu}</span>
        </button>
        <button onClick={() => navigate('/order')} className="flex flex-col items-center gap-1 text-[#D4A574]">
          <span className="text-2xl">👜</span>
          <span className="text-[10px] font-bold">{t.navCart}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] font-bold text-[#6B4E31]">{t.navProfile}</span>
          <div className="w-1 h-1 bg-[#6B4E31] rounded-full mt-1" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
