import type { CartItem } from '@/data/cartData';

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  note: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface PromotionOption {
  id: string;
  label: string;
  discount: number;
}