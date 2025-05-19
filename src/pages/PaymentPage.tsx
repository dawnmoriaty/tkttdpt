import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OrderSummary } from "@/components/payment/OrderSummary";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderInfo, setOrderInfo] = useState({
    orderId: "ORD" + Math.floor(Math.random() * 1000000),
    date: new Date().toLocaleDateString(),
    totalPrice: 998000,
    discount: 0,
    shippingFee: 0
  });

  // Lấy phương thức thanh toán từ query params nếu có
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const method = params.get('method');
    if (method) {
      setPaymentMethod(method);
    }
  }, [location]);

  const handleSubmit = () => {
    // Điều hướng dựa trên phương thức thanh toán đã chọn
    switch (paymentMethod) {
      case "cod":
        navigate("/payment/success", { 
          state: { 
            method: 'cod',
            orderInfo: orderInfo 
          } 
        });
        break;
      case "banking":
        navigate("/payment/banking");
        break;
      case "ewallet":
        navigate("/payment/ewallet");
        break;
      default:
        navigate("/payment/cod");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:flex-1">
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
          
          <div className="space-y-4">
            {/* COD Payment Option */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${
                paymentMethod === "cod" ? "border-purple-500 bg-purple-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "cod" ? "border-purple-500" : "border-gray-400"
                }`}>
                  {paymentMethod === "cod" && (
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  )}
                </div>
                <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
              </div>
              {paymentMethod === "cod" && (
                <div className="mt-3 text-sm text-gray-600 pl-8">
                  Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng.
                </div>
              )}
            </div>
            
            {/* Bank Transfer Option */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${
                paymentMethod === "banking" ? "border-purple-500 bg-purple-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("banking")}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "banking" ? "border-purple-500" : "border-gray-400"
                }`}>
                  {paymentMethod === "banking" && (
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  )}
                </div>
                <div className="font-medium">Thẻ ATM/Internet Banking</div>
              </div>
              {paymentMethod === "banking" && (
                <div className="mt-3 text-sm text-gray-600 pl-8">
                  <p className="mb-2">Thanh toán bằng thẻ ngân hàng nội địa hoặc Internet Banking.</p>
                </div>
              )}
            </div>
            
            {/* E-wallet Option */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${
                paymentMethod === "ewallet" ? "border-purple-500 bg-purple-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("ewallet")}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "ewallet" ? "border-purple-500" : "border-gray-400"
                }`}>
                  {paymentMethod === "ewallet" && (
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  )}
                </div>
                <div className="font-medium">Ví điện tử (MoMo, ZaloPay, VNPay)</div>
              </div>
              {paymentMethod === "ewallet" && (
                <div className="mt-3 text-sm text-gray-600 pl-8">
                  <p>Bạn sẽ được chuyển đến trang thanh toán của đối tác sau khi xác nhận đơn hàng.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:w-[320px]">
        <div className="sticky" style={{ top: 140 }}>
          <OrderSummary 
            subtotal={orderInfo.totalPrice} 
            discount={orderInfo.discount}
            shippingFee={orderInfo.shippingFee}
          />
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
              aria-label="Hoàn tất đặt hàng"
            >
              Hoàn tất đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;