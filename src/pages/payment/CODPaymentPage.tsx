import React from "react";
import { useNavigate } from "react-router-dom";

const CODPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6">
      <h1 className="text-2xl font-semibold mb-6">Thanh toán khi nhận hàng (COD)</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-gray-700">
            Đơn hàng của bạn đã được đặt thành công! Bạn sẽ thanh toán khi nhận được hàng.
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium mb-3">Chi tiết đơn hàng</h2>
          {/* Hiển thị chi tiết đơn hàng ở đây */}
          <p className="mb-2">Mã đơn hàng: <span className="font-medium">ORD123456</span></p>
          <p className="mb-2">Ngày đặt: <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
          <p className="mb-2">Phương thức thanh toán: <span className="font-medium">Thanh toán khi nhận hàng (COD)</span></p>
          <p className="mb-2">Tổng tiền: <span className="font-medium">798,000đ</span></p>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CODPaymentPage;