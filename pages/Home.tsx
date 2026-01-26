
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
      const found = COFFEE_ITEMS.find(c => c.name.includes(rec.recommendedCoffee) || c.subName.includes(rec.recommendedCoffee));
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
      className="bg-[#F8F4EF] h-screen overflow-y-auto no-scrollbar scroll-smooth"
      onScroll={handleScroll}
    >
      <div className="pb-32">
        {/* Header - Profile Left, Location Right */}
        <div className={`p-6 bg-white rounded-b-[40px] shadow-sm pt-14 transition-all duration-500 ${scrolled ? 'translate-y-[-10px]' : ''}`}>
          <div className="flex justify-between items-center mb-8">
            <div className="w-12 h-12 rounded-2xl overflow-hidden ring-4 ring-[#6B4E31]/10 cursor-pointer" onClick={() => navigate('/profile')}>
              <img src="https://picsum.photos/seed/cairo/200" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className={`flex flex-col ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <span className="text-[#8B4513] text-xs font-bold tracking-wider">{t.currentLocation}</span>
              <span className="text-[#2C1810] font-bold flex items-center text-sm mt-0.5">
                {lang === 'ar' ? <span className="ml-1.5 text-[8px] text-[#6B4E31]">▼</span> : null}
                {t.locationCairo}
                {lang === 'en' ? <span className="ml-1.5 text-[8px] text-[#6B4E31]">▼</span> : null}
              </span>
            </div>
          </div>

          {/* Search Bar - Icon Right, AI Left */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className={`w-full bg-[#F3F0EC] text-[#2C1810] py-4 rounded-2xl outline-none ring-1 ring-[#6B4E31]/5 focus:ring-[#6B4E31]/20 transition-all text-sm ${lang === 'ar' ? 'pr-12 pl-32' : 'pl-12 pr-32'}`}
            />
            <span className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-[#8B4513]`}>🔍</span>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 bg-[#6B4E31] px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5`}
            >
              {isAiLoading ? '...' : <>{t.aiRec}</>}
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 px-6 mt-6 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.ar}
              onClick={() => setActiveCategory(lang === 'ar' ? cat.ar : cat.en)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                (lang === 'ar' ? activeCategory === cat.ar : activeCategory === cat.en)
                  ? 'bg-[#6B4E31] text-white shadow-xl scale-105' 
                  : 'bg-white text-[#8B4513] hover:bg-[#F3F0EC]'
              }`}
            >
              {lang === 'ar' ? cat.ar : cat.en}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="px-6 mt-6">
          <div className="relative overflow-hidden rounded-[32px] h-48 shadow-xl border-4 border-white">
            {PROMO_SLIDES.map((slide, idx) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-[#2C1810]/20 to-transparent p-7 flex flex-col justify-end ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <span className="bg-[#2D5A27] text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-2 uppercase">
                    {lang === 'ar' ? slide.badge : (slide.id === 1 ? 'SPECIAL' : 'LIMITED')}
                  </span>
                  <h2 className="text-white text-2xl font-black leading-tight">
                    {lang === 'ar' ? slide.title : slide.enTitle}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Section */}
        <div className="px-6 mt-8">
          <h2 className={`text-xl font-black text-[#2C1810] mb-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.popular}</h2>
          <div className="grid grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[32px] p-3 flex flex-col cursor-pointer active:scale-[0.98] transition-all hover:shadow-xl group"
                onClick={() => {
                  onSelectCoffee(item);
                  navigate('/detail');
                }}
              >
                <div className="relative overflow-hidden rounded-[24px] aspect-square">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.name} />
                  <div className={`absolute top-2 ${lang === 'ar' ? 'right-2' : 'left-2'} bg-black/30 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 border border-white/20`}>
                    <span className="text-yellow-400 text-[10px]">⭐</span>
                    <span className="text-white text-[10px] font-bold">{item.rating}</span>
                  </div>
                </div>
                <div className={`mt-4 px-1 pb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-[#2C1810] font-black text-sm truncate">{lang === 'ar' ? item.name : item.subName}</h3>
                  <p className="text-[#8B4513] text-[10px] font-bold mb-4 font-inter truncate opacity-60">{lang === 'ar' ? item.subName : item.name}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#6B4E31] font-black text-sm leading-none">{item.price}</span>
                      <span className="text-[#8B4513] font-bold text-[9px]">{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                    </div>
                    <button className="bg-[#6B4E31] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-[#5a4128]">
                      <span className="text-xl font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Drink Section */}
        <div className="px-6 mt-10">
          <div className={`flex justify-between items-center mb-4 ${lang === 'ar' ? '' : 'flex-row-reverse'}`}>
            <button className="text-[#6B4E31] text-xs font-bold hover:underline">{t.viewAll}</button>
            <h2 className="text-xl font-black text-[#2C1810]">{t.newDrinks}</h2>
          </div>
          <div 
            className={`bg-white rounded-[40px] p-4 flex gap-6 items-center shadow-lg border-2 border-white cursor-pointer active:scale-[0.99] transition-all ${lang === 'en' ? 'flex-row-reverse' : ''}`}
            onClick={() => {
              onSelectCoffee(COFFEE_ITEMS[0]);
              navigate('/detail');
            }}
          >
            <div className="w-32 h-32 rounded-[28px] overflow-hidden flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1544787210-22bb83063857?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="New Drink" />
            </div>
            <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} flex-1`}>
              <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-[10px] font-black px-3 py-1 rounded-full inline-block mb-2">{t.newBadge}</span>
              <h3 className="text-[#2C1810] font-black text-lg">{lang === 'ar' ? 'كراميل ماكياتو مثلج' : 'Iced Caramel Macchiato'}</h3>
              <p className="text-[#8B4513] text-xs font-medium mt-1">
                {lang === 'ar' ? 'تجربة منعشة مع صوص الكراميل الفاخر والحليب البارد.' : 'A refreshing experience with premium caramel sauce and cold milk.'}
              </p>
              <div className="mt-3 flex justify-between items-center">
                 <span className="text-[#6B4E31] font-black text-lg">٥٥ {lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                 <div className={`w-8 h-8 rounded-full bg-[#F3F0EC] flex items-center justify-center text-[#6B4E31] ${lang === 'en' ? 'rotate-180' : ''}`}>→</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-6 mt-10 mb-8">
          <h2 className={`text-xl font-black text-[#2C1810] mb-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.reviewsTitle}</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {reviews.map(review => (
              <div key={review.id} className="min-w-[280px] bg-white/50 backdrop-blur-md p-5 rounded-[32px] border border-white shadow-sm flex flex-col gap-3">
                <div className={`flex justify-between items-center ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex text-yellow-400 text-xs">
                    {Array.from({ length: review.rating }).map((_, i) => <span key={i}>⭐</span>)}
                  </div>
                  <div className={`flex items-center gap-2 ${lang === 'en' ? 'flex-row-reverse' : ''}`}>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <p className="text-xs font-black text-[#2C1810]">{review.name}</p>
                      <p className="text-[9px] text-[#8B4513]">{t.loyalCustomer}</p>
                    </div>
                    <img src={review.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                  </div>
                </div>
                <p className={`${lang === 'ar' ? 'text-right' : 'text-left'} text-[#2C1810] text-xs leading-relaxed font-medium`}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 mb-12 px-8 flex flex-col items-center gap-6 border-t border-[#6B4E31]/5 pt-10">
          <div className="text-center space-y-2">
             <h3 className="text-lg font-black text-[#6B4E31]">{t.appName}</h3>
             <p className="text-[10px] text-[#8B4513] font-bold max-w-[200px]">{t.footerDesc}</p>
          </div>
          
          <div className="flex gap-5">
             <a href="#" className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-[#6B4E31]/5 active:scale-90 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className="w-6 h-6" alt="Instagram" />
             </a>
             <a href="#" className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-[#6B4E31]/5 active:scale-90 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="w-6 h-6" alt="Facebook" />
             </a>
             <a href="#" className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-[#6B4E31]/5 active:scale-90 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-6 h-6" alt="WhatsApp" />
             </a>
             <a href="#" className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-[#6B4E31]/5 active:scale-90 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" className="w-6 h-6" alt="TikTok" />
             </a>
          </div>

          <div className="flex gap-4 text-[10px] font-black text-[#8B4513]">
             <button>{t.terms}</button>
             <span>•</span>
             <button>{t.privacy}</button>
             <span>•</span>
             <button>{t.contactUs}</button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={`fixed bottom-4 left-4 right-4 max-w-[calc(theme(maxWidth.md)-32px)] mx-auto bg-white/60 backdrop-blur-2xl border border-white/20 flex justify-around py-3 z-50 rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-700 ${scrolled ? 'scale-95 opacity-90 translate-y-2 backdrop-blur-lg' : 'scale-100 opacity-100 translate-y-0'}`}>
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 group">
          <span className="text-xl group-active:scale-125 transition-transform">🏠</span>
          <span className="text-[9px] font-black text-[#6B4E31]">{t.navHome}</span>
        </button>
        <button onClick={() => navigate('/menu')} className="flex flex-col items-center gap-1 text-[#8B4513]/60 group">
          <span className="text-xl group-active:scale-125 transition-transform">📋</span>
          <span className="text-[9px] font-black">{t.navMenu}</span>
        </button>
        <button onClick={() => navigate('/order')} className="flex flex-col items-center gap-1 text-[#8B4513]/60 group">
          <span className="text-xl group-active:scale-125 transition-transform">👜</span>
          <span className="text-[9px] font-black">{t.navCart}</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 text-[#8B4513]/60 group">
          <span className="text-xl group-active:scale-125 transition-transform">👤</span>
          <span className="text-[9px] font-black">{t.navProfile}</span>
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;
