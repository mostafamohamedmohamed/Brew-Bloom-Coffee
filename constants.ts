
import { CoffeeItem } from './types';

export const COLORS = {
  primary: '#6B4E31',    // Espresso Brown
  secondary: '#D4A574',  // Latte Cream
  accent: '#2D5A27',     // Mint Green
  bg: '#F8F4EF',         // Beige
  text: '#2C1810',       // Dark Cocoa
  muted: '#8B4513',      // Saddle Brown
};

export const PAYMENT_ICONS = {
  vodafone: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Vodafone_Logo.png',
  fawry: 'https://fawry.com/wp-content/uploads/2021/05/fawry-logo-1.png',
  visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
  mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
};

export const CATEGORIES = [
  { ar: 'الكل', en: 'All' },
  { ar: 'قهوة ساخنة', en: 'Hot Coffee' },
  { ar: 'قهوة باردة', en: 'Cold Coffee' },
  { ar: 'شاي ومنعشات', en: 'Tea & Refresh' },
  { ar: 'مخبوزات', en: 'Pastries' }
];

export const COFFEE_ITEMS: CoffeeItem[] = [
  {
    id: '1',
    name: 'قهوة موكا القاهرة',
    subName: 'Caffe Mocha Cairo',
    price: 45.00,
    rating: 4.9,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2000&auto=format&fit=crop',
    description: 'مزيج فاخر من الإسبريسو المركز والحليب المبخر مع طبقة من الشوكولاتة الداكنة، محضرة على الطريقة المصرية الأصيلة.',
    category: 'Hot Coffee',
  },
  {
    id: '2',
    name: 'فلات وايت كريمي',
    subName: 'Creamy Flat White',
    price: 38.00,
    rating: 4.8,
    reviews: 195,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2000&auto=format&fit=crop',
    description: 'حليب حريري ناعم ينساب فوق جرعة مزدوجة من أفضل حبوب البن المحمصة محلياً.',
    category: 'Hot Coffee',
  },
  {
    id: '3',
    name: 'لاتيه الفانيليا',
    subName: 'Vanilla Latte',
    price: 42.00,
    rating: 4.7,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2000&auto=format&fit=crop',
    description: 'نكهة الفانيليا الطبيعية ممزوجة مع الحليب الطازج والإسبريسو الغني.',
    category: 'Hot Coffee',
  },
  {
    id: '4',
    name: 'شاي بالنعناع المنعش',
    subName: 'Fresh Mint Tea',
    price: 25.00,
    rating: 5.0,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2000&auto=format&fit=crop',
    description: 'أوراق الشاي المنتقاة بعناية مع نعناع طازج من مزارعنا، يقدم ساخناً لإنعاش حواسك.',
    category: 'Tea & Refresh',
  }
];

export const PROMO_SLIDES = [
  {
    id: 1,
    title: 'اشترِ واحدة واحصل على الثانية مجاناً',
    enTitle: 'Buy 1 Get 1 Free',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
    badge: 'عرض خاص',
  },
  {
    id: 2,
    title: 'خصم ٣٠٪ على مزيج الخريف الجديد',
    enTitle: '30% Off New Autumn Blend',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop',
    badge: 'لفترة محدودة',
  }
];
