import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });

  // Simulating total price from cart (this would come from context or state management in a real app)
  const totalPrice = 798000; // Example total from cart
  const discount = 0;
  const freeShipThreshold = 498000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address || 
        !formData.province || !formData.district || !formData.ward) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    
    // Proceed to payment
    navigate("/payment");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:flex-1">
        <div className="bg-white rounded-lg border border-gray-300 p-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tỉnh/Thành phố <span className="text-red-500">*</span>
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quận/Huyện <span className="text-red-500">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Chọn Quận/Huyện</option>
                  <option value="q1">Quận 1</option>
                  <option value="q2">Quận 2</option>
                  <option value="q3">Quận 3</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phường/Xã <span className="text-red-500">*</span>
                </label>
                <select
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Chọn Phường/Xã</option>
                  <option value="p1">Phường 1</option>
                  <option value="p2">Phường 2</option>
                  <option value="p3">Phường 3</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      
      <div className="lg:w-[320px]">
        <div className="sticky" style={{ top: 140 }}> {/* Adjusted for header + step process */}
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
              aria-label="Tiếp tục thanh toán"
            >
              Tiếp tục thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;