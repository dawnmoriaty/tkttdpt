import React from 'react';
import { Button } from "@/components/ui/button";
import { useCheckout } from '@/context/CheckoutContext';

export const OrderSummary: React.FC = () => {
  const { 
    totalPrice, 
    discount, 
    shippingFee, 
    finalPrice, 
    formatPrice,
    selectedPromotion,
    selectedPayment,
    setShowPromotionPopup,
    setShowPaymentPopup,
    placeOrder
  } = useCheckout();

  return (
    <div className="lg:sticky lg:top-4 w-full lg:w-[436px] h-fit space-y-4 rounded-lg border border-gray-200 p-6 bg-white">
      <div className="space-y-3">
        {/* Promotion selector */}
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 p-3 hover:border-gray-300"
          onClick={() => setShowPromotionPopup(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
            <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-blue-500">{selectedPromotion}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-auto w-5 h-5 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        
        {/* Payment method selector */}
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 p-3 hover:border-gray-300"
          onClick={() => setShowPaymentPopup(true)}
        >
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          <p className="text-sm">{selectedPayment}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-auto w-5 h-5 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
      
      {/* Price summary */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Chi tiết đơn hàng</h2>
        <div className="flex justify-between">
          <p className="text-gray-700">Tổng tiền</p>
          <p className="text-gray-700">{formatPrice(totalPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Giảm giá</p>
          <p className="text-gray-700">{formatPrice(discount)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Phí vận chuyển</p>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <p className="text-gray-700">Miễn phí</p>
          </div>
        </div>
        <div className="border border-dashed border-gray-200"></div>
        <div className="flex justify-between">
          <p className="text-gray-700">Thành tiền</p>
          <div className="flex flex-col items-end gap-1">
            <p className="text-lg font-medium text-purple-500">{formatPrice(finalPrice)}</p>
            <p className="text-xs text-gray-500">Mua nhiều giảm nhiều</p>
          </div>
        </div>
      </div>
      
      {/* Order button */}
      <Button 
        onClick={placeOrder}
        className="w-full h-11 rounded-full bg-purple-500 hover:bg-purple-600"
      >
        Đặt hàng
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Button>
    </div>
  );
};