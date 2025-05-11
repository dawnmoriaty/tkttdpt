import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartList from "../component/CartList";
import OrderSummary from "../component/OrderSummary";

type Product = {
  id: number;
  imageUrl: string;
  name: string;
  productType: string;
  price: number;
  quantity: number;
  checked: boolean;
};

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Initial products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6619e4a233f1e657c738ab15_peonies-bouquet-main-image-flowers-x-webflow-template-p-500.jpg",
      name: "Áo Polo Nam Airycool Ép Seam Lá Cổ Laser - Trắng 001 - S",
      productType: "Đơn giản",
      price: 399000,
      quantity: 1,
      checked: true,
    },
    {
      id: 2,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6619e4a233f1e657c738ab15_peonies-bouquet-main-image-flowers-x-webflow-template-p-500.jpg",
      name: "Áo Polo Nam Airycool Ép Seam Lá Cổ Laser - Trắng 001 - M",
      productType: "Đặc biệt",
      price: 399000,
      quantity: 2,
      checked: false,
    },
  ]);

  // Calculate total price of selected products
  const totalPrice = products
    .filter((p) => p.checked)
    .reduce((sum, p) => sum + p.price * p.quantity, 0);

  const discount = 0;
  const freeShipThreshold = 498000;

  // Handle order button click
  const handleOrder = () => {
    const selectedItems = products.filter((p) => p.checked && p.quantity > 0);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng.");
      return;
    }
    // Navigate to the next step
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:flex-1">
        <CartList products={products} onProductsChange={setProducts} />
      </div>
      
      <div className="lg:w-[320px]">
        <div className="sticky" style={{ top: 140 }}> {/* Adjusted for header + step process */}
          <OrderSummary
            totalPrice={totalPrice}
            discount={discount}
            freeShipThreshold={freeShipThreshold}
          />
          <div className="mt-4">
            <button
              onClick={handleOrder}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
              aria-label="Tiếp tục đặt hàng"
            >
              Tiếp tục đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;