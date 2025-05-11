import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../component/OrderSummary";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Simulating total price from cart (this would come from context or state management in a real app)
  const totalPrice = 798000; // Example total
  const discount = 0;
  const freeShipThreshold = 498000;

  const handleSubmit = () => {
    // In a real app, you would process the payment here
    alert(`Đặt hàng thành công với phương thức thanh toán: ${
      paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : 
      paymentMethod === "banking" ? "Chuyển khoản ngân hàng" : 
      "Thanh toán qua ví điện tử"
    }`);
    
    // After successful payment, redirect to homepage or confirmation page
    navigate("/cart");
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
                paymentMethod === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "cod" ? "border-blue-500" : "border-gray-400"
                }`}>
                  {paymentMethod === "cod" && (
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
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
                paymentMethod === "banking" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("banking")}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "banking" ? "border-blue-500" : "border-gray-400"
                }`}>
                  {paymentMethod === "banking" && (
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <div className="font-medium">Chuyển khoản ngân hàng</div>
              </div>
              {paymentMethod === "banking" && (
                <div className="mt-3 text-sm text-gray-600 pl-8">
                  <p className="mb-2">Thông tin tài khoản:</p>
                  <p>Ngân hàng: BIDV</p>
                  <p>Số tài khoản: 123456789</p>
                  <p>Chủ tài khoản: CÔNG TY ABC</p>
                  <p className="mt-2">Nội dung chuyển khoản: [Mã đơn hàng] - [Số điện thoại]</p>
                </div>
              )}
            </div>
            
            {/* E-wallet Option */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${
                paymentMethod === "ewallet" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("ewallet")}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "ewallet" ? "border-blue-500" : "border-gray-400"
                }`}>
                  {paymentMethod === "ewallet" && (
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
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
        <div className="sticky" style={{ top: 140 }}> {/* Adjusted for header + step process */}
          <OrderSummary
            totalPrice={totalPrice}
            discount={discount}
            freeShipThreshold={freeShipThreshold}
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