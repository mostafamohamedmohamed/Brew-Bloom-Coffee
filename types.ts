
export interface CoffeeItem {
  id: string;
  name: string;
  subName: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  category: string;
}

export interface OrderItem extends CoffeeItem {
  quantity: number;
  selectedSize: 'S' | 'M' | 'L';
  sugarLevel?: string;
}

export type PaymentMethod = 'Card' | 'Vodafone' | 'Fawry' | 'Cash';

export type OrderStatus = 'Prep' | 'Out' | 'Arrived';

export type Language = 'ar' | 'en';

export interface OrderRecord {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
}
