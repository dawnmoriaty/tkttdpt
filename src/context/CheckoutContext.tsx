import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '@/data/cartData';
import type { CustomerInfo, DeliveryMethod } from '@/types/checkout';

interface CheckoutContextType {
  // Customer information
  customerInfo: CustomerInfo;
  updateCustomerInfo: (field: keyof CustomerInfo, value: string) => void;
  
  // Delivery method
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  
  // Address
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  
  // Branch
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  
  // Promotion
  selectedPromotion: string;
  setSelectedPromotion: (promotion: string) => void;
  
  // Payment
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;
  handlePaymentSelect: (method: string) => void;
  
  // Popups
  showAddressPopup: boolean;
  setShowAddressPopup: (show: boolean) => void;
  showBranchPopup: boolean;
  setShowBranchPopup: (show: boolean) => void;
  showPromotionPopup: boolean;
  setShowPromotionPopup: (show: boolean) => void;
  showPaymentPopup: boolean;
  setShowPaymentPopup: (show: boolean) => void;
  
  // Cart data
  cartItems: CartItem[];
  totalPrice: number;
  discount: number;
  shippingFee: number;
  finalPrice: number;
  
  // Utilities
  formatPrice: (price: number) => string;
  
  // Actions
  placeOrder: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  
  // Customer information state
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    note: ''
  });
  
  // Delivery method state
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  
  // Address and branch state
  const [selectedAddress, setSelectedAddress] = useState(
    'Thư viện Dương Liễu, Xã Dương Liễu, Huyện Hoài Đức, TP. Hà Nội'
  );
  const [selectedBranch, setSelectedBranch] = useState('');
  
  // Promotion and payment state
  const [selectedPromotion, setSelectedPromotion] = useState('Không có khuyến mãi');
  const [selectedPayment, setSelectedPayment] = useState('Thanh toán khi nhận hàng (COD)');
  
  // Popup visibility state
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showBranchPopup, setShowBranchPopup] = useState(false);
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  
  // Cart items (would normally come from cart context)
  const cartItems: CartItem[] = [
    {
      id: 1,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617edf6e72357d9447ab673_love-and-romance-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
      name: "Peonies Bouquet",
      type: "",
      size: "Simple",
      price: 599000,
      quantity: 1,
      checked: true,
    },
    {
      id: 2,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617ee01fa2bee68afc4cdef_red-roses-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
      name: "Red Roses Arrangement",
      type: "",
      size: "Special",
      price: 399000,
      quantity: 1,
      checked: true,
    },
  ];

  // Calculate order totals
  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const shippingFee = 0;
  const finalPrice = totalPrice - discount + shippingFee;

  // Format price with Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };
  
  // Update customer info
  const updateCustomerInfo = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle payment method selection
  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
    setShowPaymentPopup(false);
    
    // Navigate to payment-specific route if needed
    if (method === "Thanh toán qua ngân hàng") {
      navigate('/payment/bank');
    } else if (method === "Thanh toán qua ví điện tử") {
      navigate('/payment/wallet');
    }
  };
  
  // Place order action
  const placeOrder = () => {
    // Validate and submit order
    if (!customerInfo.fullName || !customerInfo.phone) {
      alert('Vui lòng điền đầy đủ thông tin người nhận');
      return;
    }
    
    if (deliveryMethod === 'delivery' && !selectedAddress) {
      alert('Vui lòng chọn địa chỉ giao hàng');
      return;
    }
    
    if (deliveryMethod === 'pickup' && !selectedBranch) {
      alert('Vui lòng chọn cửa hàng để nhận hàng');
      return;
    }
    
    // Submit order logic would go here
    console.log('Order placed!', {
      customerInfo,
      deliveryMethod,
      address: deliveryMethod === 'delivery' ? selectedAddress : null,
      branch: deliveryMethod === 'pickup' ? selectedBranch : null,
      payment: selectedPayment,
      promotion: selectedPromotion,
      items: cartItems.filter(item => item.checked),
      total: finalPrice
    });
    
    // Navigate to confirmation page
    navigate('/order-confirmation');
  };
  
  const contextValue: CheckoutContextType = {
    customerInfo,
    updateCustomerInfo,
    deliveryMethod,
    setDeliveryMethod,
    selectedAddress,
    setSelectedAddress,
    selectedBranch,
    setSelectedBranch,
    selectedPromotion,
    setSelectedPromotion,
    selectedPayment,
    setSelectedPayment,
    handlePaymentSelect,
    showAddressPopup,
    setShowAddressPopup,
    showBranchPopup,
    setShowBranchPopup,
    showPromotionPopup,
    setShowPromotionPopup,
    showPaymentPopup,
    setShowPaymentPopup,
    cartItems,
    totalPrice,
    discount,
    shippingFee,
    finalPrice,
    formatPrice,
    placeOrder
  };
  
  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};