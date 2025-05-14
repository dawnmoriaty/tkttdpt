import React from 'react';
import { useCheckout } from '@/context/CheckoutContext';

export const OrderDetails: React.FC = () => {
  const { cartItems, formatPrice } = useCheckout();

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h2 className="text-lg font-medium">Chi tiết đơn hàng</h2>
      </div>
      
      {cartItems.map(item => (
        <div key={item.id} className="flex gap-3">
          <div className="h-[116px] w-[88px] flex-shrink-0">
            <img
              alt={item.name}
              className="h-full w-full rounded-sm object-cover"
              src={item.imageUrl}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="text-base font-medium line-clamp-2">{item.name}</p>
            <p className="text-sm text-gray-600">{item.size}</p>
            <div className="mt-auto flex items-end justify-between">
              <p className="text-sm">x{item.quantity}</p>
              <p className="text-base font-medium">{formatPrice(item.price)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};