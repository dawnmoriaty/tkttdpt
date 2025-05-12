import { useState } from 'react';

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    note: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const products = [
    {
      id: 1,
      name: 'Áo Chống Nắng Nam Có Mũ',
      variant: 'Ghi xám, M',
      price: 599000,
      quantity: 1,
      image: '/api/placeholder/88/116'
    },
    {
      id: 2,
      name: 'Áo Polo Nam Airycool Ép Seam Lá Cổ Laser',
      variant: 'Trắng 001, S',
      price: 399000,
      quantity: 1,
      image: '/api/placeholder/88/116'
    }
  ];

  const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const discount = 0;
  const shippingFee = 0;
  const total = subtotal - discount + shippingFee;

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="lg:no-scrollbar mt-px lg:mx-auto lg:mt-0 lg:flex lg:h-[calc(100vh-128px)] lg:max-w-[1248px] lg:gap-8 lg:overflow-y-auto lg:py-12">
      {/* Left Column - Customer Information */}
      <div className="h-[calc(100dvh-256px)] space-y-6 overflow-auto px-3 py-4 lg:h-fit lg:w-full lg:p-0">
        {/* Customer Information Section */}
        <div className="space-y-3 lg:space-y-4 lg:rounded-lg lg:border lg:border-border-primary lg:p-6">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 lg:size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <p className="text-theme-text text-label-md lg:text-label-lg">Thông tin người nhận</p>
          </div>
          
          <div className="space-y-2">
            <div className="text-field-wrapper space-y-1">
              <div className="flex items-center border border-border-primary rounded-full bg-theme-bg has-[:hover]:border-border-secondary has-[:focus]:border-border-brand focus-within:!border-border-brand has-[:disabled]:border-border-secondary has-[:disabled]:bg-theme-surface has-[:disabled]:text-theme-text-secondary data-[error=true]:border-border-negative [&_input]:text-placeholder-md h-[44px] gap-2 px-4 py-3">
                <input 
                  className="size-full border-none bg-transparent outline-none" 
                  placeholder="Nhập tên khách hàng" 
                  name="fullName" 
                  value={customerInfo.fullName} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-field-wrapper space-y-1">
              <div className="flex items-center border border-border-primary rounded-full bg-theme-bg has-[:hover]:border-border-secondary has-[:focus]:border-border-brand focus-within:!border-border-brand has-[:disabled]:border-border-secondary has-[:disabled]:bg-theme-surface has-[:disabled]:text-theme-text-secondary data-[error=true]:border-border-negative [&_input]:text-placeholder-md h-[44px] gap-2 px-4 py-3">
                <input 
                  className="size-full border-none bg-transparent outline-none" 
                  placeholder="Nhập số điện thoại" 
                  name="phone"
                  inputMode="numeric"
                  value={customerInfo.phone} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-field-wrapper space-y-1">
              <div className="flex items-center border border-border-primary rounded-full bg-theme-bg has-[:hover]:border-border-secondary has-[:focus]:border-border-brand focus-within:!border-border-brand has-[:disabled]:border-border-secondary has-[:disabled]:bg-theme-surface has-[:disabled]:text-theme-text-secondary data-[error=true]:border-border-negative [&_input]:text-placeholder-md h-[44px] gap-2 px-4 py-3">
                <input 
                  className="size-full border-none bg-transparent outline-none" 
                  placeholder="Nhập địa chỉ email (không bắt buộc)" 
                  type="email"
                  name="email"
                  value={customerInfo.email} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Delivery Method Section */}
        <div className="space-y-3 lg:space-y-4 lg:rounded-lg lg:border lg:border-border-primary lg:p-6">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 lg:size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            <p className="text-theme-text text-label-md lg:text-label-lg">Hình thức nhận hàng</p>
          </div>
          
          <div className="items-center justify-center rounded-full bg-theme-surface border border-border-primary grid w-full grid-cols-2">
            <button 
              type="button" 
              role="tab" 
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full p-2 text-theme-text-secondary text-label-md ${deliveryMethod === 'delivery' ? 'bg-theme-bg text-theme-text' : ''}`}
              onClick={() => setDeliveryMethod('delivery')}
            >
              Giao tận nơi
            </button>
            <button 
              type="button" 
              role="tab" 
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full p-2 text-theme-text-secondary text-label-md ${deliveryMethod === 'pickup' ? 'bg-theme-bg text-theme-text' : ''}`}
              onClick={() => setDeliveryMethod('pickup')}
            >
              Nhận tại cửa hàng
            </button>
          </div>
          
          {deliveryMethod === 'delivery' && (
            <div className="mt-3 space-y-3 lg:mt-4 lg:space-y-4">
              <div className="cursor-pointer space-y-1 rounded-lg border border-border-primary px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-theme-text text-label-sm">Giao tới</p>
                  <p className="text-label-md text-brandsecondary-text">Thay đổi</p>
                </div>
                <p className="text-theme-text text-placeholder-md line-clamp-2">
                  Thư viện Dương liễu, Xã Dương Liễu, Huyện Hoài Đức, TP. Hà Nội
                </p>
              </div>
            </div>
          )}
          
          {deliveryMethod === 'pickup' && (
            <div className="mt-3 space-y-3 lg:mt-4 lg:space-y-4">
              {/* Pickup store selection would go here */}
            </div>
          )}
          
          <div className="space-y-1 h-20">
            <div className="flex items-center gap-1 border border-border-primary rounded-lg bg-theme-bg has-[:hover]:border-border-secondary has-[:focus]:border-border-brand has-[:disabled]:border-border-secondary has-[:disabled]:bg-theme-surface has-[:disabled]:text-theme-text-secondary px-4 py-3 text-placeholder-md h-20">
              <textarea 
                className="size-full resize-none border-none bg-transparent outline-none" 
                placeholder="Nhập ghi chú (không bắt buộc)"
                name="note"
                value={customerInfo.note}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        {/* Order Details Section */}
        <div className="space-y-3 lg:space-y-4 lg:rounded-lg lg:border lg:border-border-primary lg:p-6">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 lg:size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="text-theme-text text-label-md lg:text-label-lg">Chi tiết đơn hàng</p>
          </div>
          
          {products.map(product => (
            <div key={product.id} className="flex flex-1 gap-3">
              <div className="relative h-[116px] min-w-[88px] w-[88px] lg:h-[176px] lg:min-w-[132px] lg:w-[132px] aspect-[3/4]">
                <img 
                  alt={product.name} 
                  width="88" 
                  height="116" 
                  className="size-full rounded-sm object-cover" 
                  src={product.image} 
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <p className="text-theme-text text-body-md line-clamp-2 lg:text-body-lg">{product.name}</p>
                </div>
                <p className="text-theme-text text-body-md lg:text-placeholder-md">{product.variant}</p>
                <div className="mt-auto flex items-end justify-between">
                  <p className="text-theme-text text-body-md lg:text-label-md">X{product.quantity}</p>
                  <div className="flex flex-col items-end gap-[2px]">
                    <p className="text-theme-text text-price-md lg:text-price-lg">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Column - Order Summary */}
      <div className="sticky top-0 h-fit min-w-[436px] space-y-6 rounded-lg border border-border-primary p-6">
        <div className="space-y-3">
          <div className="flex cursor-pointer items-center gap-1 p-3 lg:gap-2 lg:rounded-md lg:border lg:border-border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-info-text lg:size-6">
              <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
            </svg>
            <p className="text-body-sm text-info-text lg:text-body-md">Chọn khuyến mãi</p>
            <div className="ml-auto flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-theme-text-secondary">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
          
          <div className="flex cursor-pointer items-center gap-1 p-3 lg:gap-2 lg:rounded-md lg:border lg:border-border-primary">
            <div className="size-4 lg:size-6 bg-gray-200 rounded-full"></div>
            <p className="text-theme-text text-body-sm line-clamp-1 lg:text-body-md">(COD) Thanh toán khi nhận hàng</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-auto size-4 text-theme-text-secondary">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-theme-text text-heading-md">Chi tiết đơn hàng</p>
          
          <div className="flex justify-between">
            <p className="text-theme-text text-body-md">Tổng tiền</p>
            <p className="text-theme-text text-price-md">{formatPrice(subtotal)}</p>
          </div>
          
          <div className="flex justify-between">
            <p className="text-theme-text text-body-md">Giảm giá</p>
            <p className="text-theme-text text-price-md">{formatPrice(discount)}</p>
          </div>
          
          <div className="flex justify-between">
            <p className="text-theme-text text-body-md">Phí vận chuyển</p>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-success-text">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <p className="text-theme-text text-price-md">miễn phí</p>
            </div>
          </div>
          
          <div className="border border-dashed border-border-primary"></div>
          
          <div className="flex w-full justify-between">
            <p className="text-theme-text text-body-md">Thành tiền</p>
            <div className="flex flex-col items-end justify-end gap-[2px]">
              <p className="text-price-xl text-brandsecondary-text">{formatPrice(total)}</p>
              <div className="flex items-center gap-[2px]">
                <p className="text-theme-text text-label-sm">Mua nhiều giảm nhiều</p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="focus-visible:ring-ring inline-flex items-center gap-2 whitespace-nowrap rounded-rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-brand-surface text-theme-text hover:bg-brand-surface-hover [&_svg]:text-theme-text h-11 px-4 py-3 text-label-md [&_svg]:size-5 w-full justify-center" 
          type="submit" 
          aria-label="submit order"
        >
          Đặt hàng
          <span className="focus-visible:ring-ring inline-flex items-center gap-2 whitespace-nowrap rounded-rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 size-5 min-w-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}