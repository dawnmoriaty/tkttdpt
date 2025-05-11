import React, { useState, useEffect } from "react";
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

const Cart: React.FC = () => {
  // Giả sử dữ liệu khởi tạo, bạn có thể thay bằng dữ liệu lấy từ API hoặc context
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/80x112.png?text=SP1",
      name: "Sản phẩm 1",
      productType: "Đơn giản",
      price: 120000,
      quantity: 2,
      checked: true,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/80x112.png?text=SP2",
      name: "Sản phẩm 2",
      productType: "Đặc biệt",
      price: 180000,
      quantity: 1,
      checked: false,
    },
  ]);

  // Tổng tiền các sản phẩm được chọn
  const [totalPrice, setTotalPrice] = useState(0);

  // Giảm giá (ví dụ cố định hoặc tính theo logic)
  const discount = 20000;

  // Ngưỡng miễn phí vận chuyển
  const freeShipThreshold = 300000;

  // Tính tổng tiền khi products thay đổi
  useEffect(() => {
    const total = products
      .filter((p) => p.checked)
      .reduce((sum, p) => sum + p.price * p.quantity, 0);
    setTotalPrice(total);
  }, [products]);

  // Cập nhật danh sách sản phẩm khi thay đổi từ CartList
  const handleProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  // Xử lý khi nhấn nút Đặt hàng
  const handleOrder = () => {
    const selectedItems = products.filter((p) => p.checked && p.quantity > 0);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng.");
      return;
    }
    // TODO: Thực hiện điều hướng hoặc gọi API đặt hàng
    alert("Đặt hàng thành công!\n" + JSON.stringify(selectedItems, null, 2));
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 px-4 py-8">
      <div className="flex-1">
        <CartList products={products} onProductsChange={handleProductsChange} />
      </div>

      <div className="lg:w-[320px]">
        <OrderSummary
          totalPrice={totalPrice}
          discount={discount}
          freeShipThreshold={freeShipThreshold}
        />
        {/* Gắn sự kiện cho nút đặt hàng trong OrderSummary */}
        <div className="mt-4">
          <button
            onClick={handleOrder}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
            aria-label="Đặt hàng"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
