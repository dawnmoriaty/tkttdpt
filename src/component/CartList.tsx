import React, {  } from "react";
import CartItem from "./CartItem";

type Product = {
  id: number;
  imageUrl: string;
  name: string;
  productType: string;
  price: number;
  quantity: number;
  checked: boolean;
};

type CartListProps = {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
};

const CartList: React.FC<CartListProps> = ({ products, onProductsChange }) => {
  const allChecked = products.length > 0 && products.every((p) => p.checked);
  const someChecked = products.some((p) => p.checked) && !allChecked;

  // Handle chọn tất cả
  const toggleAll = () => {
    const newChecked = !allChecked;
    onProductsChange(products.map((p) => ({ ...p, checked: newChecked })));
  };

  // Cập nhật 1 sản phẩm
  const updateProduct = (id: number, newType: string) => {
    onProductsChange(
      products.map((p) => (p.id === id ? { ...p, productType: newType } : p))
    );
  };

  // Cập nhật số lượng
  const updateQuantity = (id: number, qty: number) => {
    if (qty < 0) return;
    onProductsChange(
      products.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  // Xóa sản phẩm
  const removeProduct = (id: number) => {
    onProductsChange(products.filter((p) => p.id !== id));
  };

  // Cập nhật checkbox từng sản phẩm
  const updateChecked = (id: number, checked: boolean) => {
    onProductsChange(
      products.map((p) => (p.id === id ? { ...p, checked } : p))
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 space-y-6 lg:w-full">
      {/* Checkbox chọn tất cả */}
      <div className="flex items-center space-x-2">
        <button
          role="checkbox"
          aria-checked={allChecked}
          aria-label="Chọn tất cả sản phẩm"
          onClick={toggleAll}
          className={`w-4 h-4 rounded-sm border ${
            allChecked ? "bg-blue-600 border-blue-600" : "border-gray-300"
          } flex items-center justify-center cursor-pointer`}
        >
          {allChecked && (
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
        <label className="text-gray-700 text-sm cursor-pointer select-none">Chọn tất cả</label>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {products.map((p) => (
          <CartItem
            key={p.id}
            id={p.id}
            imageUrl={p.imageUrl}
            name={p.name}
            productType={p.productType}
            price={p.price}
            quantity={p.quantity}
            checked={p.checked}
            onQuantityChange={updateQuantity}
            onCheckedChange={updateChecked}
            onRemove={removeProduct}
            onUpdate={updateProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default CartList;
