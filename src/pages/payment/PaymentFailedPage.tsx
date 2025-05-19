import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { XCircle } from "lucide-react";

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
  reason: string;
}

const PaymentFailedPage: React.FC = () => {
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
  
  const { 
    method = 'banking', 
    wallet, 
    orderInfo = defaultOrderInfo,
    reason = "Có lỗi xảy ra trong quá trình thanh toán"
  } = state || {};
  
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
  
  const retryPayment = () => {
    if (method === 'banking') {
      navigate("/payment/banking");
    } else if (method === 'ewallet') {
      navigate("/payment/ewallet");
    } else {
      navigate("/payment");
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-300 p-6 flex flex-col items-center">
        <div className="text-red-500 mb-4">
          <XCircle size={64} />
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Thanh toán không thành công!</h1>
        <p className="text-gray-600 mb-3 text-center">
          Rất tiếc, giao dịch của bạn chưa được hoàn tất.
        </p>
        
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
          <p className="text-red-800 text-sm font-medium">
            Lý do: {reason}
          </p>
        </div>
        
        <div className="w-full border rounded-lg p-6 bg-gray-50 mb-6">
          <h2 className="text-lg font-medium mb-4">Chi tiết đơn hàng</h2>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Mã đơn hàng:</p>
              <p className="font-medium">{orderInfo.orderId}</p>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Phương thức thanh toán:</p>
              <p className="font-medium">{getPaymentMethodText()}</p>
            </div>
            <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
              <p className="text-gray-600">Số tiền:</p>
              <p className="font-medium">{formatPrice(finalPrice)}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/payment")}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Thay đổi phương thức thanh toán
          </button>
          <button
            onClick={retryPayment}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;