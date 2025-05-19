import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderSummary } from "@/components/payment/OrderSummary";

const EWalletPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWallet, setSelectedWallet] = useState("momo");
  const [loading, setLoading] = useState(false);
  
  const orderInfo = {
    orderId: "ORD" + Math.floor(Math.random() * 1000000),
    date: new Date().toLocaleDateString(),
    totalPrice: 998000,
    discount: 0,
    shippingFee: 0
  };

  const wallets = [
    { id: "momo", name: "MoMo", image: "/assets/202505131549/method_momo-Bmqob2xc.png" },
    { id: "zalopay", name: "ZaloPay", image: "/assets/202505131549/method_zalopay-DX7l5k2F.png" },
    { id: "vnpay", name: "VNPay", image: "/assets/202505131549/method_vnpay-Bz5pyml2.png" }
  ];
  
  const handlePay = () => {
    setLoading(true);
    
    // Giả lập quy trình thanh toán
    setTimeout(() => {
      setLoading(false);
      
      // 80% cơ hội thành công, 20% thất bại
      if (Math.random() > 0.2) {
        navigate("/payment/success", { 
          state: { 
            method: 'ewallet',
            wallet: selectedWallet,
            orderInfo 
          } 
        });
      } else {
        navigate("/payment/failed", { 
          state: { 
            method: 'ewallet',
            wallet: selectedWallet,
            orderInfo,
            reason: "Thanh toán bị hủy bởi người dùng" 
          } 
        });
      }
    }, 2000);
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:flex-1">
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          <h2 className="text-xl font-semibold mb-4">Thanh toán qua ví điện tử</h2>
          
          <div className="space-y-5">
            <p className="text-gray-700 mb-4">Vui lòng chọn ví điện tử để thanh toán:</p>
            
            <div className="space-y-3">
              {wallets.map(wallet => (
                <div 
                  key={wallet.id}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    selectedWallet === wallet.id ? "border-purple-500 bg-purple-50" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedWallet(wallet.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedWallet === wallet.id ? "border-purple-500" : "border-gray-400"
                    }`}>
                      {selectedWallet === wallet.id && (
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={wallet.image} alt={wallet.name} className="w-8 h-8" />
                      <span className="font-medium">{wallet.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* QR Code Section */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex flex-col items-center">
                <p className="text-gray-700 mb-4">Quét mã QR để thanh toán</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  {/* Placeholder QR code - in real app, generate actual QR code */}
                  <div className="w-48 h-48 mx-auto bg-white p-3 rounded-lg border border-gray-300 flex items-center justify-center">
                    <img 
                      src={`/assets/qr-${selectedWallet}.png`} 
                      alt="QR Code" 
                      className="w-full h-full"
                      // Placeholder image - add fallback
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/200x200?text=QR+Code";
                      }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Sử dụng ứng dụng {
                    selectedWallet === "momo" ? "MoMo" : 
                    selectedWallet === "zalopay" ? "ZaloPay" : "VNPay"
                  } để quét mã QR và hoàn tất thanh toán
                </p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-3 mt-6">
              <button
                onClick={() => navigate("/payment")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Quay lại
              </button>
              <button
                onClick={handlePay}
                disabled={loading}
                className={`flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Đang xử lý...' : 'Xác nhận đã thanh toán'}
              </button>
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
        </div>
      </div>
    </div>
  );
};

export default EWalletPaymentPage;