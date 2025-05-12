import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddressPopup from '@/component/AddressPopup';

type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: string;
  price: number;
  quantity: number;
  checked: boolean;
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  // State for customer information
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    note: ''
  });

  // State for delivery method and popups
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showPromotionPopup, setShowPromotionPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('Thư viện Dương Liễu, Xã Dương Liễu, Huyện Hoài Đức, TP. Hà Nội');
  const [selectedPromotion, setSelectedPromotion] = useState('Không có khuyến mãi');
  const [selectedPayment, setSelectedPayment] = useState('Thanh toán khi nhận hàng (COD)');

  // Order summary data pulled from CartPage
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

  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const shippingFee = 0;
  const finalPrice = totalPrice - discount + shippingFee;

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Handle input change for customer info
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle address selection
  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setShowAddressPopup(false);
  };

  // Handle promotion selection
  const handlePromotionSelect = (promotion: string) => {
    setSelectedPromotion(promotion);
    setShowPromotionPopup(false);
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

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-36 min-h-screen">
      {/* Left Column - Customer Information and Order Details */}
      <div className="flex-1 space-y-6 py-4 lg:py-6">
        {/* Customer Information Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <h2 className="text-lg font-medium">Thông tin người nhận</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="fullName">Tên khách hàng</Label>
              <Input
                id="fullName"
                name="fullName"
                value={customerInfo.fullName}
                onChange={handleInputChange}
                placeholder="Nhập tên khách hàng"
                className="h-11 rounded-full focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                value={customerInfo.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
                className="h-11 rounded-full focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email (không bắt buộc)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ email"
                className="h-11 rounded-full focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Delivery Method Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            <h2 className="text-lg font-medium">Hình thức nhận hàng</h2>
          </div>
          <div className="relative items-center justify-center rounded-full bg-gray-100 border border-gray-200 grid w-full grid-cols-2 p-1">
            {/* Sliding background */}
            <div 
              className="absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
              style={{ 
                transform: deliveryMethod === 'delivery' 
                  ? 'translateX(0%)' 
                  : 'translateX(100%)'
              }}
            />
            
            {/* Delivery Tab */}
            <button 
              type="button" 
              role="tab" 
              aria-selected={deliveryMethod === 'delivery'} 
              aria-controls="delivery-content" 
              data-state={deliveryMethod === 'delivery' ? 'active' : 'inactive'} 
              id="delivery-trigger" 
              className={`relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full p-2 text-sm transition-colors duration-300 ${
                deliveryMethod === 'delivery' 
                  ? 'text-black' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setDeliveryMethod('delivery')}
              tabIndex={-1}
              data-orientation="horizontal"
            >
              Giao tận nơi
            </button>
            
            {/* Pickup Tab */}
            <button 
              type="button" 
              role="tab" 
              aria-selected={deliveryMethod === 'pickup'} 
              aria-controls="pickup-content" 
              data-state={deliveryMethod === 'pickup' ? 'active' : 'inactive'} 
              id="pickup-trigger" 
              className={`relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full p-2 text-sm transition-colors duration-300 ${
                deliveryMethod === 'pickup' 
                  ? 'text-black' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setDeliveryMethod('pickup')}
              tabIndex={-1}
              data-orientation="horizontal"
            >
              Nhận tại cửa hàng
            </button>
          </div>
          {deliveryMethod === 'delivery' && (
            <div className="mt-4 space-y-2 animate-fade-in">
              <div
                className="cursor-pointer rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-all duration-300"
                onClick={() => setShowAddressPopup(true)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Giao tới</p>
                  <p className="text-sm text-purple-500">Thay đổi</p>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{selectedAddress}</p>
              </div>
            </div>
          )}
          {deliveryMethod === 'pickup' && (
            <div className="mt-4 space-y-2 animate-fade-in">
              <div
                className="cursor-pointer rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-all duration-300"
                onClick={() => setShowAddressPopup(true)}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Chọn cửa hàng</p>
                  <p className="text-sm text-purple-500">Chọn</p>
                </div>
                <p className="mt-1 text-sm text-gray-600">Chọn địa điểm nhận hàng</p>
              </div>
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="note">Ghi chú (không bắt buộc)</Label>
            <Textarea
              id="note"
              name="note"
              value={customerInfo.note}
              onChange={handleInputChange}
              placeholder="Nhập ghi chú"
              className="h-20 resize-none rounded-lg focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Order Details Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <h2 className="text-lg font-medium">Chi tiết đơn hàng</h2>
          </div>
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-3">
              <div className="h-[116px] w-[88px] flex-shrink-0">
                <img
                  alt={item.name}
                  className="h-full w-full rounded-sm object-cover"
                  src={item.imageUrl}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="text-base font-medium line-clamp-2">{item.name}</p>
                <p className="text-sm text-gray-600">{item.size}</p>
                <div className="mt-auto flex items-end justify-between">
                  <p className="text-sm">x{item.quantity}</p>
                  <p className="text-base font-medium">{formatPrice(item.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="lg:sticky lg:top-4 w-full lg:w-[436px] h-fit space-y-4 rounded-lg border border-gray-200 p-6 bg-white">
        <div className="space-y-3">
          <div
            className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 p-3 hover:border-gray-300"
            onClick={() => setShowPromotionPopup(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
              <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-500">{selectedPromotion}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-auto w-5 h-5 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div
            className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 p-3 hover:border-gray-300"
            onClick={() => setShowPaymentPopup(true)}
          >
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <p className="text-sm">{selectedPayment}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-auto w-5 h-5 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Chi tiết đơn hàng</h2>
          <div className="flex justify-between">
            <p className="text-gray-700">Tổng tiền</p>
            <p className="text-gray-700">{formatPrice(totalPrice)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Giảm giá</p>
            <p className="text-gray-700">{formatPrice(discount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Phí vận chuyển</p>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <p className="text-gray-700">Miễn phí</p>
            </div>
          </div>
          <div className="border border-dashed border-gray-200"></div>
          <div className="flex justify-between">
            <p className="text-gray-700">Thành tiền</p>
            <div className="flex flex-col items-end gap-1">
              <p className="text-lg font-medium text-purple-500">{formatPrice(finalPrice)}</p>
              <p className="text-xs text-gray-500">Mua nhiều giảm nhiều</p>
            </div>
          </div>
        </div>
        <Button className="w-full h-11 rounded-full bg-purple-500 hover:bg-purple-600">
          Đặt hàng
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Button>
      </div>

      <AddressPopup 
        open={showAddressPopup}
        onOpenChange={setShowAddressPopup}
        onAddressSelect={handleAddressSelect} setDataa={function (value: string): void {
          throw new Error('Function not implemented.');
        } }/>


      {/* Promotion Selection Popup */}
      <Dialog open={showPromotionPopup} onOpenChange={setShowPromotionPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chọn khuyến mãi</DialogTitle>
          </DialogHeader>
          <RadioGroup value={selectedPromotion} onValueChange={handlePromotionSelect}>
            {['Không có khuyến mãi', 'Giảm 10% cho đơn hàng trên 1 triệu', 'Miễn phí vận chuyển'].map((promotion) => (
              <div key={promotion} className="flex items-center space-x-2">
                <RadioGroupItem value={promotion} id={promotion} />
                <Label htmlFor={promotion}>{promotion}</Label>
              </div>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button onClick={() => setShowPromotionPopup(false)}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Method Selection Popup */}
      <Dialog open={showPaymentPopup} onOpenChange={setShowPaymentPopup}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
          </DialogHeader>
          <RadioGroup value={selectedPayment} onValueChange={handlePaymentSelect}>
            {['Thanh toán khi nhận hàng (COD)', 'Thanh toán qua ngân hàng', 'Thanh toán qua ví điện tử'].map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <RadioGroupItem value={method} id={method} />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button onClick={() => setShowPaymentPopup(false)}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;