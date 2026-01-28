
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Detail from './pages/Detail';
import Order from './pages/Order';
import Payment from './pages/Payment';
import Delivery from './pages/Delivery';
import Profile from './pages/Profile';
import Support from './pages/Support';
import { CoffeeItem, OrderItem, Language } from './types';
import { translations } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: typeof translations.ar;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeItem | null>(null);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const addToCart = (item: CoffeeItem, size: 'S' | 'M' | 'L') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedSize === size);
      if (existing) {
        return prev.map(i => i.id === item.id && i.selectedSize === size 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
        );
      }
      return [...prev, { ...item, quantity: 1, selectedSize: size }];
    });
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => 
      (item.id === id && item.selectedSize === size) 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <Router>
        <div className="max-w-md mx-auto bg-[#F8F4EF] min-h-screen shadow-2xl relative overflow-hidden flex flex-col font-cairo">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home onSelectCoffee={setSelectedCoffee} />} />
            <Route path="/menu" element={<Menu onSelectCoffee={setSelectedCoffee} />} />
            <Route 
              path="/detail" 
              element={selectedCoffee ? <Detail coffee={selectedCoffee} onAddToCart={addToCart} /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/order" 
              element={<Order cart={cart} updateQuantity={updateQuantity} />} 
            />
            <Route 
              path="/payment" 
              element={<Payment cart={cart} onComplete={clearCart} />} 
            />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
};

export default App;
