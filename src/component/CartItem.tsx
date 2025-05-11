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
          checked ? "bg-blue-600 border-blue-600" : "border-gray-300"
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
      <img src={imageUrl} alt={name} className="w-20 h-28 object-cover rounded-sm" />

      {/* Info */}
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-gray-900 font-medium line-clamp-2">{name}</p>
        <button
          onClick={() => setShowUpdatePopup(true)}
          className="inline-block text-sm text-blue-600 underline hover:text-blue-800"
          aria-label="Update product type"
        >
          {productType}
        </button>
      </div>

      {/* Quantity */}
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-[100px]">
        <button
          onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
          className="px-3 text-orange-600 font-bold disabled:opacity-50"
          disabled={quantity <= 0}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          type="number"
          className="w-full text-center border-none outline-none"
          value={quantity}
          min={0}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) onQuantityChange(id, val);
          }}
          aria-label="Quantity input"
        />
        <button
          onClick={() => onQuantityChange(id, quantity + 1)}
          className="px-3 text-orange-600 font-bold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Price */}
      <p className="w-24 text-right font-semibold text-gray-900">{(price * quantity).toLocaleString()}đ</p>

      {/* Delete */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        aria-label="Remove product"
        className="text-gray-400 hover:text-gray-700"
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
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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
