import React, { useState } from "react";
import Header from "./component/Header"; // Giả sử bạn đã có component Header
import StepProcess, { type Step } from "./component/StepProcess";
import CartList from "./component/CartList";
import OrderSummary from "./component/OrderSummary";

const steps: Step[] = [
  { id: 1, title: "Giỏ hàng", description: "Chi tiết giỏ hàng" },
  { id: 2, title: "Xác nhận đặt hàng", description: "Nhập thông tin" },
  { id: 3, title: "Thanh toán", description: "Thanh toán" },
];

const initialProducts = [
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
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [products, setProducts] = useState(initialProducts);

  const totalPrice = products
    .filter((p) => p.checked)
    .reduce((sum, p) => sum + p.price * p.quantity, 0);

  const discount = 0;
  const freeShipThreshold = 498000;
  const HEADER_HEIGHT = 63;
  const STEPPROCESS_HEIGHT = 65;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixed */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-10 h-full flex items-center">
          <Header />
        </div>
      </header>
      <nav
        className="w-full bg-white shadow-sm border-b border-gray-200 flex justify-center items-center fixed left-0 right-0 z-40"
        style={{ height: STEPPROCESS_HEIGHT, top: HEADER_HEIGHT }}
      >
        <div className="max-w-screen-xl w-full flex justify-center items-center">
          <StepProcess
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
      </nav>
      <main
        className="max-w-screen-xl mx-auto px-4 lg:px-10"
        style={{ paddingTop: HEADER_HEIGHT + STEPPROCESS_HEIGHT }}
      >
        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <CartList products={products} onProductsChange={setProducts} />
          <OrderSummary
            totalPrice={totalPrice}
            discount={discount}
            freeShipThreshold={freeShipThreshold}
          />
        </div>
      </main>
    </div>



  );
}

export default App;
