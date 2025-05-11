import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  checked: boolean;
};

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Initial cart items data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      imageUrl: "https://buggy.yodycdn.com/images/product/c320e66c588b288a65e11907f07a60ab.webp",
      name: "Áo Chống Nắng Nam Có Mũ",
      color: "Ghi xám",
      size: "M",
      price: 599000,
      quantity: 1,
      checked: true,
    },
    {
      id: 2,
      imageUrl: "https://buggy.yodycdn.com/images/product/d9abba07223a44f41244f502f8d08071.webp",
      name: "Áo Polo Nam Airycool Ép Seam Lá Cổ Laser",
      color: "Trắng 001",
      size: "S",
      price: 399000,
      quantity: 1,
      checked: true,
    },
  ]);

  // State for handling variant selection popup
  const [showVariantPopup, setShowVariantPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  
  // Calculate total price of selected items
  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = 0;
  const finalPrice = totalPrice - discount;

  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item selection (checkbox)
  const handleItemSelect = (id: number, checked: boolean) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    );
  };
  
  // Handle select all items
  const handleSelectAll = (checked: boolean) => {
    setCartItems(
      cartItems.map((item) => ({ ...item, checked }))
    );
  };

  // Check if all items are selected
  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.checked);

  // Handle item removal
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="lg:flex lg:gap-6">
      {/* Cart Items Section */}
      <div className="space-y-4 bg-white pt-5 pb-[130px] lg:w-full lg:rounded-lg lg:border lg:border-gray-200 lg:p-6 lg:h-fit lg:space-y-6">
        <div className="flex flex-col gap-4 bg-white px-3 lg:h-fit lg:gap-6 lg:p-0">
          {/* Select All Checkbox */}
          <div className="inline-flex items-center space-x-2">
            <button 
              type="button" 
              role="checkbox" 
              aria-checked={allSelected}
              onClick={() => handleSelectAll(!allSelected)}
              className={`group h-4 w-4 rounded-sm shrink-0 border border-gray-300 outline-none hover:border-gray-400 ${
                allSelected ? "bg-blue-600 border-transparent" : ""
              }`}
            >
              {allSelected && (
                <span className="flex items-center justify-center text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-3 scale-125">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0303 5.21967C12.3232 5.51256 12.3232 5.98744 12.0303 6.28033L7.53033 10.7803C7.23744 11.0732 6.76256 11.0732 6.46967 10.7803L4.21967 8.53033C3.92678 8.23744 3.92678 7.76256 4.21967 7.46967C4.51256 7.17678 4.98744 7.17678 5.28033 7.46967L7 9.18934L10.9697 5.21967C11.2626 4.92678 11.7374 4.92678 12.0303 5.21967Z" fill="#ffffff"/>
                  </svg>
                </span>
              )}
            </button>
            <label className="text-sm cursor-pointer">Chọn tất cả</label>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="flex max-h-[116px] items-center gap-2 lg:max-h-[176px]">
                {/* Item Checkbox */}
                <div className="inline-flex items-center">
                  <button 
                    type="button" 
                    role="checkbox" 
                    aria-checked={item.checked}
                    onClick={() => handleItemSelect(item.id, !item.checked)}
                    className={`group h-4 w-4 rounded-sm shrink-0 border border-gray-300 outline-none hover:border-gray-400 ${
                      item.checked ? "bg-blue-600 border-transparent" : ""
                    }`}
                  >
                    {item.checked && (
                      <span className="flex items-center justify-center text-white">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-3 scale-125">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.0303 5.21967C12.3232 5.51256 12.3232 5.98744 12.0303 6.28033L7.53033 10.7803C7.23744 11.0732 6.76256 11.0732 6.46967 10.7803L4.21967 8.53033C3.92678 8.23744 3.92678 7.76256 4.21967 7.46967C4.51256 7.17678 4.98744 7.17678 5.28033 7.46967L7 9.18934L10.9697 5.21967C11.2626 4.92678 11.7374 4.92678 12.0303 5.21967Z" fill="#ffffff"/>
                        </svg>
                      </span>
                    )}
                  </button>
                </div>

                {/* Product Image and Details */}
                <div className="flex flex-1 gap-3">
                  {/* Product Image */}
                  <div className="relative h-[116px] min-w-[88px] w-[88px] lg:aspect-[3/4] lg:h-[176px] lg:min-w-[132px] lg:w-[132px]">
                    <img 
                      alt={item.name} 
                      loading="lazy" 
                      width="88" 
                      height="116" 
                      className="size-full rounded-sm object-cover"
                      src={item.imageUrl}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex justify-between gap-2">
                      <a href="#" target="_blank" rel="noreferrer" aria-label="go to product" className="flex-1">
                        <p className="text-sm lg:text-base line-clamp-2">
                          {item.name} - {item.color} - {item.size}
                        </p>
                      </a>
                      
                      {/* Remove button */}
                      <button onClick={() => handleRemoveItem(item.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 min-w-4 cursor-pointer text-gray-500 lg:mt-0.5 lg:size-5 lg:min-w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>

                    {/* Variant button */}
                    <button 
                      className="inline-flex items-center whitespace-nowrap rounded-md font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-6 gap-1 px-3 py-1 text-xs justify-between w-fit"
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setShowVariantPopup(true);
                      }}
                    >
                      {item.color}, {item.size}
                      <span className="inline-flex items-center gap-2 whitespace-nowrap size-3 min-w-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-700">
                          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </button>

                    {/* Quantity and Price */}
                    <div className="mt-auto flex items-center gap-3">
                      {/* Quantity Adjuster */}
                      <div className="w-[88px] min-w-[88px] lg:min-w-[120px]">
                        <div className="flex items-center border border-gray-300 rounded-full bg-white h-[34px] gap-2 px-4 py-2">
                          <span className="size-4 min-w-4 cursor-pointer select-none text-gray-500" onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </svg>
                          </span>
                          <input 
                            className="size-full border-none bg-transparent outline-none text-center"
                            inputMode="numeric"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value >= 1) {
                                handleQuantityChange(item.id, value);
                              }
                            }}
                          />
                          <span className="size-4 min-w-4 cursor-pointer select-none" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="ml-auto flex flex-col items-end gap-[2px]">
                        <p className="text-base font-medium lg:text-lg">{(item.price).toLocaleString()}đ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="sticky top-0 h-fit min-w-[320px] space-y-3 rounded-lg border border-gray-200 p-6">
        <p className="text-lg font-medium">Chi tiết đơn hàng</p>
        <div className="flex justify-between">
          <p className="text-gray-700">Tổng tiền</p>
          <p className="text-gray-700">{totalPrice.toLocaleString()}đ</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Giảm giá</p>
          <p className="text-gray-700">{discount.toLocaleString()}đ</p>
        </div>
        <div className="border border-dashed border-gray-300"></div>
        <div className="flex w-full justify-between">
          <p className="text-gray-700">Thành tiền</p>
          <div className="flex flex-col items-end justify-end gap-[2px]">
            <p className="text-lg font-medium">{finalPrice.toLocaleString()}đ</p>
            <div className="flex items-center gap-[2px]">
              <p className="text-xs text-gray-500">Mua nhiều giảm nhiều</p>
            </div>
          </div>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <p className="text-sm">Đơn được miễn phí vận chuyển nhé!</p>
        </div>
        <button 
          onClick={handleProceedToCheckout}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 h-11 px-4 py-3 text-base w-full justify-center" 
          aria-label="order"
        >
          Đặt hàng
          <span className="inline-flex items-center gap-2 whitespace-nowrap size-5 min-w-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>
      </div>

      {/* Variant Selection Popup */}
      {showVariantPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-80">
            <h3 className="text-lg font-medium mb-4">Chọn phiên bản</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                  <option value="gray">Ghi xám</option>
                  <option value="white">Trắng 001</option>
                  <option value="black">Đen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kích cỡ</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowVariantPopup(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={() => setShowVariantPopup(false)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;