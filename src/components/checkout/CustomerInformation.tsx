import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useCheckout } from '@/context/CheckoutContext';

export const CustomerInformation: React.FC = () => {
  const { customerInfo, updateCustomerInfo } = useCheckout();
  const [errors, setErrors] = useState<Record<string, string>>({
    fullName: '',
    phone: '',
    email: ''
  });
  
  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          errorMessage = 'Vui lòng nhập tên khách hàng';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          errorMessage = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10}$/.test(value.trim())) {
          errorMessage = 'Số điện thoại không hợp lệ';
        }
        break;
      case 'email':
        if (value.trim() && !/\S+@\S+\.\S+/.test(value)) {
          errorMessage = 'Email không hợp lệ';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCustomerInfo(name as keyof typeof customerInfo, value);
    // Clear error when typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        <h2 className="text-lg font-medium">Thông tin người nhận</h2>
      </div>
      <div className="space-y-4">
        <div>
          <Input
            id="fullName"
            name="fullName"
            value={customerInfo.fullName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Tên khách hàng"
            className={`h-11 rounded-full ${
              errors.fullName 
                ? 'border-purple-500 ring-1 ring-purple-500' 
                : 'focus:border-purple-600 focus:ring-1 focus:ring-purple-600'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-purple-500 pl-3">{errors.fullName}</p>
          )}
        </div>
        <div>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={customerInfo.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Số điện thoại"
            className={`h-11 rounded-full ${
              errors.phone 
                ? 'border-purple-500 ring-1 ring-purple-500' 
                : 'focus:border-purple-600 focus:ring-1 focus:ring-purple-600'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-purple-500 pl-3">{errors.phone}</p>
          )}
        </div>
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Email (không bắt buộc)"
            className={`h-11 rounded-full ${
              errors.email 
                ? 'border-purple-500 ring-1 ring-purple-500' 
                : 'focus:border-purple-600 focus:ring-1 focus:ring-purple-600'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-purple-500 pl-3">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};