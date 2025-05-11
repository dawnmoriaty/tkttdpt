import React from "react";

type OrderSummaryProps = {
  totalPrice: number;
  discount: number;
  freeShipThreshold: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalPrice, discount, freeShipThreshold }) => {
  const finalPrice = totalPrice - discount;
  const isFreeShip = finalPrice >= freeShipThreshold;

  return (
    <div className="sticky top-0 rounded-lg border border-gray-300 p-6 min-w-[280px] space-y-3">
      <p className="text-gray-900 text-lg font-semibold">Chi tiết đơn hàng</p>
      <div className="flex justify-between text-gray-700">
        <p>Tổng tiền</p>
        <p>{totalPrice.toLocaleString()}đ</p>
      </div>
      <div className="flex justify-between text-gray-700">
        <p>Giảm giá</p>
        <p>{discount.toLocaleString()}đ</p>
      </div>
      <div className="border border-dashed border-gray-300"></div>
      <div className="flex justify-between items-end">
        <p className="text-gray-900 font-semibold text-lg">Thành tiền</p>
        <div className="flex flex-col items-end">
          <p className="text-gray-900 font-semibold text-xl">{finalPrice.toLocaleString()}đ</p>
          <p className="text-gray-600 text-xs">Mua nhiều giảm nhiều</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <p>Đơn từ {freeShipThreshold.toLocaleString()}đ được miễn phí vận chuyển nhé!</p>
      </div>
      <button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
        aria-label="Đặt hàng"
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default OrderSummary;
