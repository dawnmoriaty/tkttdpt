import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

interface OrderInfo {
  orderId: string;
  date: string;
  totalPrice: number;
  discount: number;
  shippingFee: number;
}

interface LocationState {
  method: string;
  wallet?: string;
  orderInfo: OrderInfo;
}

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Fallback data nếu không có state
  const defaultOrderInfo: OrderInfo = {
    orderId: "ORD" + Math.floor(Math.random() * 1000000),
    date: new Date().toLocaleDateString(),
    totalPrice: 998000,
    discount: 0,
    shippingFee: 0
  };
  
  const { method = 'cod', wallet, orderInfo = defaultOrderInfo } = state || {};
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };
  
  const finalPrice = orderInfo.totalPrice - orderInfo.discount + orderInfo.shippingFee;
  
  const getPaymentMethodText = () => {
    switch (method) {
      case 'cod':
        return 'Thanh toán khi nhận hàng (COD)';
      case 'banking':
        return 'Thẻ ATM/Internet Banking';
      case 'ewallet':
        return wallet === 'momo' ? 'Ví MoMo' : 
               wallet === 'zalopay' ? 'Ví ZaloPay' : 
               wallet === 'vnpay' ? 'Ví VNPay' : 'Ví điện tử';
      default:
        return 'Thanh toán khi nhận hàng (COD)';
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-300 p-6 flex flex-col items-center">
        <div className="text-green-500 mb-4">
          <CheckCircle size={64} />
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-6 text-center">
          Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
        </p>
        
        <div className="w-full border rounded-lg p-6 bg-gray-50 mb-6">
          <h2 className="text-lg font-medium mb-4 text-center">Chi tiết đơn hàng</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Mã đơn hàng:</p>
              <p className="font-medium">{orderInfo.orderId}</p>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Ngày đặt:</p>
              <p className="font-medium">{orderInfo.date}</p>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Phương thức thanh toán:</p>
              <p className="font-medium">{getPaymentMethodText()}</p>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Tổng tiền:</p>
              <p className="font-medium">{formatPrice(orderInfo.totalPrice)}</p>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Giảm giá:</p>
              <p className="font-medium">{formatPrice(orderInfo.discount)}</p>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Phí vận chuyển:</p>
              <p className="font-medium">Miễn phí</p>
            </div>
            <div className="flex justify-between pt-1">
              <p className="text-gray-800 font-medium">Thành tiền:</p>
              <p className="text-lg font-semibold text-purple-600">{formatPrice(finalPrice)}</p>
            </div>
          </div>
        </div>
        
        {method === 'cod' && (
          <div className="w-full mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Bạn sẽ thanh toán số tiền <span className="font-semibold">{formatPrice(finalPrice)}</span> khi nhận hàng.
            </p>
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

// Trong App.tsx, thêm route này
// <Route path="/payment/success" element={<PaymentSuccessPage />} />