import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderSummary } from "@/components/payment/OrderSummary";

const BankingPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  
  const orderInfo = {
    orderId: "ORD" + Math.floor(Math.random() * 1000000),
    date: new Date().toLocaleDateString(),
    totalPrice: 998000,
    discount: 0,
    shippingFee: 0
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Giả lập quá trình thanh toán
    setTimeout(() => {
      setLoading(false);
      
      // 80% cơ hội thành công, 20% thất bại
      if (Math.random() > 0.2) {
        navigate("/payment/success", { 
          state: { 
            method: 'banking',
            orderInfo 
          } 
        });
      } else {
        navigate("/payment/failed", { 
          state: { 
            method: 'banking',
            orderInfo,
            reason: "Giao dịch bị từ chối bởi ngân hàng" 
          } 
        });
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:flex-1">
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          <h2 className="text-xl font-semibold mb-4">Thanh toán bằng thẻ ngân hàng</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số thẻ
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chủ thẻ
              </label>
              <input
                type="text"
                name="cardHolder"
                value={cardInfo.cardHolder}
                onChange={handleInputChange}
                placeholder="NGUYEN VAN A"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày hết hạn
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardInfo.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV/CVC
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardInfo.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex flex-col lg:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/payment")}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Đang xử lý...' : 'Thanh toán'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="lg:w-[320px]">
        <div className="sticky" style={{ top: 140 }}>
          <OrderSummary 
            subtotal={orderInfo.totalPrice} 
            discount={orderInfo.discount}
            shippingFee={orderInfo.shippingFee}
          />
        </div>
      </div>
    </div>
  );
};

export default BankingPaymentPage;