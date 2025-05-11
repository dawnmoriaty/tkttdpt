import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([
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
    {
      id: 3,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617ee1422ec6d35fec5dc2a_sunflower-bouquet-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
      name: "Sunflower Bouquet",
      type: "",
      size: "Simple",
      price: 599000,
      quantity: 1,
      checked: true,
    },
  ]);

  const [showVariantPopup, setShowVariantPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = 0;
  const finalPrice = totalPrice - discount;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleItemSelect = (id: number, checked: boolean) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setCartItems(
      cartItems.map((item) => ({ ...item, checked }))
    );
  };

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.checked);
  const anySelected = cartItems.some((item) => item.checked);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setShowDeletePopup(false);
  };

  const handleProceedToCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      return;
    }
    navigate("/checkout");
  };

  const handleUpdateSize = () => {
    if (selectedItemId && selectedSize) {
      setCartItems(
        cartItems.map((item) =>
          item.id === selectedItemId ? { ...item, size: selectedSize } : item
        )
      );
    }
    setShowVariantPopup(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-36">
      {/* Cart Items Section */}
      <div className="flex-1 space-y-4 bg-white pt-5 pb-6 lg:rounded-lg lg:border lg:border-gray-200 lg:p-6 lg:h-fit lg:space-y-6">
        <div className="flex flex-col gap-4 bg-white px-3 lg:h-fit lg:gap-6 lg:p-0">
          <div className="inline-flex items-center space-x-2">
            <button
              type="button"
              role="checkbox"
              aria-checked={allSelected}
              onClick={() => handleSelectAll(!allSelected)}
              className={`group h-4 w-4 rounded-sm shrink-0 border border-gray-300 outline-none hover:border-gray-400 ${allSelected ? "bg-[#6750A4] border-transparent" : ""
                }`}
            >
              {allSelected && (
                <span className="flex items-center justify-center text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-3 scale-125">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0303 5.21967C12.3232 5.51256 12.3232 5.98744 12.0303 6.28033L7.53033 10.7803C7.23744 11.0732 6.76256 11.0732 6.46967 10.7803L4.21967 8.53033C3.92678 8.23744 3.92678 7.76256 4.21967 7.46967C4.51256 7.17678 4.98744 7.17678 5.28033 7.46967L7 9.18934L10.9697 5.21967C11.2626 4.92678 11.7374 4.92678 12.0303 5.21967Z" fill="#ffffff" />
                  </svg>
                </span>
              )}
            </button>
            <label className="text-sm cursor-pointer">Chọn tất cả</label>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-4 h-44">
                <div className="inline-flex items-center">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={item.checked}
                    onClick={() => handleItemSelect(item.id, !item.checked)}
                    className={`group h-4 w-4 rounded-sm shrink-0 border border-gray-300 outline-none hover:border-gray-400 ${item.checked ? "bg-[#6750A4] border-transparent" : ""
                      }`}
                  >
                    {item.checked && (
                      <span className="flex items-center justify-center text-white">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-3 scale-125">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.0303 5.21967C12.3232 5.51256 12.3232 5.98744 12.0303 6.28033L7.53033 10.7803C7.23744 11.0732 6.76256 11.0732 6.46967 10.7803L4.21967 8.53033C3.92678 8.23744 3.92678 7.76256 4.21967 7.46967C4.51256 7.17678 4.98744 7.17678 5.28033 7.46967L7 9.18934L10.9697 5.21967C11.2626 4.92678 11.7374 4.92678 12.0303 5.21967Z" fill="#ffffff" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>

                <div className="h-44 w-[132px] flex-shrink-0">
                  <img
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover rounded-sm"
                    src={item.imageUrl}
                  />
                </div>

                <div className="flex flex-1 flex-col h-full relative pb-1">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium line-clamp-2 flex-1 pr-6">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setShowDeletePopup(true);
                      }}
                      className="absolute top-0 right-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>

                  <button
                    className="inline-flex items-center whitespace-nowrap rounded-md font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-6 gap-1 px-3 py-1 text-xs justify-between w-fit mt-2"
                    onClick={() => {
                      setSelectedItemId(item.id);
                      setSelectedSize(item.size);
                      setShowVariantPopup(true);
                    }}
                  >
                    {item.size}
                    <span className="inline-flex items-center gap-2 whitespace-nowrap size-3 min-w-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-700">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>

                  <div className="mt-auto flex items-center justify-between w-full">
                    <div className="w-[138px]">
                      <div className="flex items-center justify-between border border-gray-300 rounded-2xl bg-white h-10 px-4">
                        <button
                          className="text-gray-500 cursor-pointer select-none"
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                          </svg>
                        </button>
                        <input
                          className="w-12 border-none bg-transparent outline-none text-center"
                          inputMode="numeric"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value >= 1) {
                              handleQuantityChange(item.id, value);
                            }
                          }}
                        />
                        <button
                          className="cursor-pointer select-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <p className="text-lg font-medium">{(item.price).toLocaleString()}đ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky top-0 w-full lg:w-[436px] h-fit max-h-[300px] space-y-3 rounded-lg border border-gray-200 p-6 bg-white">
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <p className="text-sm">Đơn được miễn phí vận chuyển nhé!</p>
        </div>
        <button
          onClick={handleProceedToCheckout}
          disabled={!anySelected}
          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-md font-medium text-white h-11 px-4 py-3 text-base w-full justify-center ${anySelected ? "bg-[#6750A4] hover:bg-[#6a559f]" : "bg-gray-300 cursor-not-allowed"
            }`}
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

      {/* Variant Selection Popup - 420x301 */}
      {showVariantPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-[420px] h-[301px] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-base font-medium">Cập nhật sản phẩm</h3>
              <button
                onClick={() => setShowVariantPopup(false)}
                className="focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center p-4">
              {/* Image container with padding */}
              <div className="p-[17px]">
                <img
                  src={cartItems.find(item => item.id === selectedItemId)?.imageUrl || ""}
                  alt="Product"
                  className="w-[88px] h-[117px] object-cover rounded"
                />
              </div>
              {/* Information on the right */}
              <div className="flex-1 pl-4 flex flex-col justify-between">
                <h4 className="text-sm font-medium mb-2">
                  {cartItems.find(item => item.id === selectedItemId)?.name || ""}
                </h4>
                <div className="flex justify-end gap-2">
                  <button
                    className={`border rounded-[16px] text-[14px] w-[85px] h-[20px] flex items-center justify-center font-medium ${selectedSize === "Simple" ? "border-purple-500 text-purple-500" : "border-gray-300 text-gray-700"}`}
                    onClick={() => setSelectedSize("Simple")}
                  >
                    Simple
                  </button>
                  <button
                    className={`border rounded-[16px] text-[14px] w-[85px] h-[20px] flex items-center justify-center font-medium ${selectedSize === "Special" ? "border-purple-500 text-purple-500" : "border-gray-300 text-gray-700"}`}
                    onClick={() => setSelectedSize("Special")}
                  >
                    Special
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleUpdateSize}
                disabled={!selectedSize}
                className={`w-full h-[40px] text-sm rounded-md text-white font-medium ${selectedSize ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup - 420x242 */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md w-[420px] h-[242px] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-base font-medium">Xóa sản phẩm</h3>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="24" fill="#F2F2F2" />
                  <path d="M32 18L16 34" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 18L32 34" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-center text-sm">Bạn có chắc muốn xóa sản phẩm này không?</p>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="w-1/2 py-3 text-gray-700 border border-gray-300 rounded-md mr-2 hover:bg-gray-50 text-sm bg-white"
              >
                Không
              </button>
              <button
                onClick={() => selectedItemId && handleRemoveItem(selectedItemId)}
                className="w-1/2 py-3 bg-gray-200 text-gray-700 rounded-md ml-2 hover:bg-gray-300 text-sm"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartPage;