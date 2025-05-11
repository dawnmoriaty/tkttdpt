import React, { useState } from "react";

type CartItemProps = {
  id: number;
  imageUrl: string;
  name: string;
  productType: string;
  price: number;
  quantity: number;
  checked: boolean;
  onQuantityChange: (id: number, qty: number) => void;
  onCheckedChange: (id: number, checked: boolean) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, newType: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  imageUrl,
  name,
  productType,
  price,
  quantity,
  checked,
  onQuantityChange,
  onCheckedChange,
  onRemove,
  onUpdate,
}) => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedType, setSelectedType] = useState(productType);

  const handleUpdateConfirm = () => {
    onUpdate(id, selectedType);
    setShowUpdatePopup(false);
  };

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4">
      {/* Checkbox */}
      <button
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(id, !checked)}
        className={`w-4 h-4 rounded-sm border ${
          checked ? "bg-[#B2A8DA] border-[#B2A8DA]" : "border-gray-300"
        } flex items-center justify-center cursor-pointer`}
        aria-label={`Select product ${name}`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Image */}
      <img src={imageUrl} alt={name} className="w-[132px] h-44 object-cover rounded-sm" />

      {/* Info */}
      <div className="flex-1 flex flex-col h-full relative">
        <div className="flex justify-between">
          <p className="text-gray-900 font-medium line-clamp-2 pr-6">{name}</p>
          
          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            aria-label="Remove product"
            className="absolute top-0 right-0 text-gray-400 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a2.25 2.25 0 0 0-1.022-.166m-7.5 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201m-7.5 0c-1.18.037-2.09 1.022-2.09 2.201v.916"
              />
            </svg>
          </button>
        </div>

        {/* Variant button */}
        <button
          onClick={() => setShowUpdatePopup(true)}
          className="inline-flex items-center whitespace-nowrap rounded-md font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-6 gap-1 px-3 py-1 text-xs justify-between w-fit mt-2"
        >
          {productType}
          <span className="inline-flex items-center gap-2 whitespace-nowrap size-3 min-w-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-700">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        <div className="mt-auto flex items-center justify-between w-full">
          {/* Quantity */}
          <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden w-[138px] h-10">
            <button
              onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
              className="px-4 text-gray-600 font-bold disabled:opacity-50"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              className="w-12 text-center border-none outline-none"
              value={quantity}
              min={1}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1) onQuantityChange(id, val);
              }}
              aria-label="Quantity input"
            />
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="px-4 text-gray-600 font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price */}
          <p className="text-right font-semibold text-gray-900 text-lg">{(price * quantity).toLocaleString()}đ</p>
        </div>
      </div>

      {/* Popup Update */}
      {showUpdatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Chọn loại sản phẩm</h3>
            <select
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Đơn giản">Đơn giản</option>
              <option value="Đặc biệt">Đặc biệt</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUpdatePopup(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateConfirm}
                className="px-4 py-2 rounded bg-[#7E66BC] text-white hover:bg-[#6a559f]"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Delete Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-72">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa sản phẩm?</h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  onRemove(id);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
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

export default CartItem;