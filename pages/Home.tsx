
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, COFFEE_ITEMS, PROMO_SLIDES } from '../constants';
import { CoffeeItem } from '../types';
import { getCoffeeRecommendation } from '../services/gemini';
import { useTranslation } from '../App';

interface HomeProps {
  onSelectCoffee: (coffee: CoffeeItem) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectCoffee }) => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].ar);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % PROMO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrolled(scrollTop > 50);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAiLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const rec = await getCoffeeRecommendation(base64);
      const found = COFFEE_ITEMS.find(c => 
        c.name.toLowerCase().includes(rec.recommendedCoffee.toLowerCase()) || 
        c.subName.toLowerCase().includes(rec.recommendedCoffee.toLowerCase())
      );
      setIsAiLoading(false);
      if (found) {
        onSelectCoffee(found);
        navigate('/detail');
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredItems = activeCategory === 'الكل' || activeCategory === 'All' 
    ? COFFEE_ITEMS 
    : COFFEE_ITEMS.filter(item => {
        const catObj = CATEGORIES.find(c => c.ar === activeCategory || c.en === activeCategory);
        return item.category === catObj?.en;
      });

  const reviews = [
    { id: 1, name: lang === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed', rating: 5, text: lang === 'ar' ? 'أفضل قهوة جربتها في المعادي، الديكور رائع!' : 'Best coffee in Maadi, amazing decor!', avatar: 'https://i.pravatar.cc/150?u=sara' },
    { id: 2, name: lang === 'ar' ? 'ياسين علي' : 'Yassin Ali', rating: 4, text: lang === 'ar' ? 'الخدمة سريعة جداً والموكا طعمها عالمي.' : 'Very fast service and the mocha tastes world-class.', avatar: 'https://i.pravatar.cc/150?u=yassin' },
    { id: 3, name: lang === 'ar' ? 'ليلى محمود' : 'Layla Mahmoud', rating: 5, text: lang === 'ar' ? 'المكان مريح جداً للشغل والقهوة دايماً سخنة.' : 'Cozy place for work, coffee is always hot.', avatar: 'https://i.pravatar.cc/150?u=layla' },
  ];

  return (
    <div 
      className="bg-[#F8F4EF] h-screen overflow-y-auto no-scrollbar scroll-smooth font-cairo"
      onScroll={handleScroll}
    >
      <div className="pb-32">
        {/* Header - Profile Right, Location Left per latest screenshot */}
        <div className="p-6 pt-14 flex justify-between items-center">
          <div className={`flex flex-col ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <span className="text-[#8B4513] text-[10px] font-bold tracking-wider mb-0.5">{t.currentLocation}</span>
            <span className="text-[#2C1810] font-black text-sm flex items-center gap-1">
              {t.locationCairo}
              <span className="text-[8px] text-[#6B4E31]">▼</span>
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white cursor-pointer" onClick={() => navigate('/profile')}>
            <img src="https://picsum.photos/seed/profile-coffee/200" className="w-full h-full object-cover" alt="Profile" />
          </div>
        </div>

        {/* Search Bar - Matches Screenshot: AI Left, Search Icon Right */}
        <div className="px-6 mt-2">
          <div className="relative flex items-center bg-white rounded-[24px] p-2 shadow-sm border border-black/5">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#6B4E31] text-white px-5 py-2.5 rounded-[18px] text-xs font-black flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
            >
              <span>✨</span>
              {isAiLoading ? '...' : t.aiRec}
            </button>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent text-[#2C1810] py-3 px-4 outline-none text-right font-bold text-xs"
            />
            <span className="mx-3 text-[#6B4E31] opacity-50">🔍</span>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 px-6 mt-8 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => {
            const isActive = (lang === 'ar' ? activeCategory === cat.ar : activeCategory === cat.en);
            return (
              <button 
                key={cat.ar}
                onClick={() => setActiveCategory(lang === 'ar' ? cat.ar : cat.en)}
                className={`whitespace-nowrap px-6 py-3 rounded-[20px] text-xs font-black transition-all ${
                  isActive
                    ? 'bg-[#6B4E31] text-white shadow-xl' 
                    : 'bg-white text-[#8B4513] hover:bg-gray-50'
                }`}
              >
                {lang === 'ar' ? cat.ar : cat.en}
              </button>
            );
          })}
        </div>

        {/* Slider - Promo slides with high-quality images from constants.ts */}
        <div className="px-6 mt-8">
          <div className="relative overflow-hidden rounded-[40px] h-52 shadow-2xl group">
            {PROMO_SLIDES.map((slide, idx) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={slide.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={slide.title} />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-8 text-center">
                  <span className="bg-[#2D5A27] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-lg">
                    {slide.badge}
                  </span>
                  <h2 className="text-white text-3xl font-black leading-tight drop-shadow-2xl">
                    {lang === 'ar' ? slide.title : slide.enTitle}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Section */}
        <div className="px-6 mt-10">
          <h2 className="text-xl font-black text-[#2C1810] mb-6 text-right">{t.popular}</h2>
          <div className="grid grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[32px] overflow-hidden shadow-lg p-2 cursor-pointer active:scale-95 transition-all"
                onClick={() => {
                  onSelectCoffee(item);
                  navigate('/detail');
                }}
              >
                <div className="relative rounded-[26px] aspect-square overflow-hidden mb-3">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-400 text-[10px]">⭐</span>
                    <span className="text-white text-[10px] font-black">{item.rating}</span>
                  </div>
                </div>
                <div className="px-2 pb-3 text-right">
                  <h3 className="text-[#2C1810] font-black text-sm truncate">{lang === 'ar' ? item.name : item.subName}</h3>
                  <p className="text-[#8B4513] text-[9px] font-bold opacity-60 truncate">{lang === 'ar' ? item.subName : item.name}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="bg-[#6B4E31] text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-lg font-bold">+</span>
                    </button>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[#6B4E31] font-black text-base">{item.price}</span>
                      <span className="text-[#8B4513] font-bold text-[8px]">{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Drink Section - Updated with High-Definition Coffee Image */}
        <div className="px-6 mt-10">
          <div className={`flex justify-between items-center mb-6 ${lang === 'ar' ? '' : 'flex-row-reverse'}`}>
            <button className="text-[#6B4E31] text-xs font-black hover:underline">{t.viewAll}</button>
            <h2 className="text-xl font-black text-[#2C1810]">{t.newDrinks}</h2>
          </div>
          <div 
            className={`bg-white rounded-[40px] p-4 flex gap-6 items-center shadow-xl border-2 border-white cursor-pointer active:scale-[0.99] transition-all ${lang === 'en' ? 'flex-row-reverse' : ''}`}
            onClick={() => {
              onSelectCoffee(COFFEE_ITEMS[0]);
              navigate('/detail');
            }}
          >
            <div className="w-32 h-32 rounded-[32px] overflow-hidden flex-shrink-0 shadow-lg">
              <img src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="New Drink" />
            </div>
            <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} flex-1`}>
              <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-[10px] font-black px-3 py-1 rounded-full inline-block mb-2">{t.newBadge}</span>
              <h3 className="text-[#2C1810] font-black text-lg">{lang === 'ar' ? 'كراميل ماكياتو مثلج' : 'Iced Caramel Macchiato'}</h3>
              <p className="text-[#8B4513] text-xs font-bold mt-1 opacity-70">
                {lang === 'ar' ? 'تجربة منعشة مع صوص الكراميل الفاخر والحليب البارد.' : 'A refreshing experience with premium caramel sauce and cold milk.'}
              </p>
              <div className="mt-4 flex justify-between items-center">
                 <div className="flex items-baseline gap-1">
                    <span className="text-[#6B4E31] font-black text-xl">٥٥</span>
                    <span className="text-[#8B4513] font-bold text-xs">{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                 </div>
                 <div className={`w-10 h-10 rounded-2xl bg-[#F3F0EC] flex items-center justify-center text-[#6B4E31] shadow-inner ${lang === 'en' ? 'rotate-180' : ''}`}>→</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-6 mt-12 mb-8">
          <h2 className={`text-xl font-black text-[#2C1810] mb-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.reviewsTitle}</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6">
            {reviews.map(review => (
              <div key={review.id} className="min-w-[280px] bg-white/60 backdrop-blur-md p-6 rounded-[32px] border border-white shadow-sm flex flex-col gap-4">
                <div className={`flex justify-between items-center ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex text-yellow-400 text-xs">
                    {Array.from({ length: review.rating }).map((_, i) => <span key={i}>⭐</span>)}
                  </div>
                  <div className={`flex items-center gap-3 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <p className="text-xs font-black text-[#2C1810]">{review.name}</p>
                      <p className="text-[9px] text-[#8B4513] font-bold opacity-60">{t.loyalCustomer}</p>
                    </div>
                    <img src={review.avatar} className="w-12 h-12 rounded-2xl border-2 border-white shadow-md" alt="" />
                  </div>
                </div>
                <p className={`${lang === 'ar' ? 'text-right' : 'text-left'} text-[#2C1810] text-xs leading-relaxed font-bold opacity-80 italic`}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 px-8 flex flex-col items-center gap-8 border-t border-[#6B4E31]/5 pt-12 pb-20">
          <div className="text-center space-y-3">
             <h3 className="text-xl font-black text-[#6B4E31]">{t.appName}</h3>
             <p className="text-[10px] text-[#8B4513] font-bold max-w-[240px] leading-relaxed opacity-60">{t.footerDesc}</p>
          </div>
          
          <div className="flex gap-6">
             <a href="#" className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center border border-[#6B4E31]/5 active:scale-90 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className="w-6 h-6" alt="Instagram" />
             </a>
             <a href="#" className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center border border-[#6B4E31]/5 active:scale-90 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="w-6 h-6" alt="Facebook" />
             </a>
             <a href="#" className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center border border-[#6B4E31]/5 active:scale-90 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-6 h-6" alt="WhatsApp" />
             </a>
          </div>

          <div className="flex gap-5 text-[10px] font-black text-[#8B4513] opacity-60">
             <button className="hover:text-[#6B4E31] transition-colors">{t.terms}</button>
             <span className="opacity-20">•</span>
             <button className="hover:text-[#6B4E31] transition-colors">{t.privacy}</button>
             <span className="opacity-20">•</span>
             <button className="hover:text-[#6B4E31] transition-colors">{t.contactUs}</button>
          </div>
        </div>
      </div>

      {/* Floating Navigation Bar - Matches Screenshot style */}
      <div className={`fixed bottom-6 left-6 right-6 max-w-md mx-auto z-50 transition-all duration-700 ${scrolled ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}>
        <div className="bg-white/95 backdrop-blur-2xl border border-white/60 flex justify-around py-4 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] px-4">
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1.5 text-[#8B4513]/40 transition-transform active:scale-90">
            <span className="text-2xl">👤</span>
            <span className="text-[10px] font-black">حسابي</span>
          </button>
          <button onClick={() => navigate('/order')} className="flex flex-col items-center gap-1.5 text-[#8B4513]/40 transition-transform active:scale-90">
            <span className="text-2xl">👜</span>
            <span className="text-[10px] font-black">السلة</span>
          </button>
          <button onClick={() => navigate('/menu')} className="flex flex-col items-center gap-1.5 text-[#8B4513]/40 transition-transform active:scale-90">
            <span className="text-2xl">📋</span>
            <span className="text-[10px] font-black">المنيو</span>
          </button>
          <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1.5 text-[#6B4E31] transition-transform active:scale-90 relative">
            <span className="text-2xl">🏠</span>
            <span className="text-[10px] font-black">الرئيسية</span>
            <div className="absolute -bottom-1 w-1 h-1 bg-[#6B4E31] rounded-full" />
          </button>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;
