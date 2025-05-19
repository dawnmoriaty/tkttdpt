import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./component/Header";
import StepProcess, { type Step } from "./component/StepProcess";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import CODPaymentPage from "./pages/payment/CODPaymentPage";

import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import EWalletPaymentPage from "./pages/payment/EWalletPaymentPage";
import BankingPaymentPage from "./pages/payment/BankingPaymentPage";
import PaymentFailedPage from "./pages/payment/PaymentFailedPage";

// Constants for layout
const HEADER_HEIGHT = 65; // Updated to match your requirement
const STEPPROCESS_HEIGHT = 63; // Updated to match your requirement

const steps: Step[] = [
  { id: 1, title: "Giỏ hàng", description: "Chi tiết giỏ hàng" },
  { id: 2, title: "Xác nhận đặt hàng", description: "Nhập thông tin" },
  { id: 3, title: "Thanh toán", description: "Thanh toán" },
];

function App() {
  const location = useLocation();

  // Determine current step based on URL
  const getCurrentStep = () => {
    const path = location.pathname;
    if (path === "/" || path === "/cart") return 1;
    if (path === "/checkout") return 2;
    if (path === "/payment") return 3;
    return 1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixed */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-headerbackground"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="max-w-[1536px] mx-auto px-4 lg:px-10 h-full flex items-center">
          <Header />
        </div>
      </header>

      {/* Step Process fixed */}
      <nav
        className="fixed left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200 flex justify-center items-center"
        style={{ height: `${STEPPROCESS_HEIGHT}px`, top: `${HEADER_HEIGHT}px` }}
      >
        <div className="max-w-[1536px] w-full flex justify-center items-center">
          <div className="w-max mx-auto">
            <StepProcess
              steps={steps}
              currentStep={currentStep}
            />
          </div>
        </div>
      </nav>


      {/* Main content with padding to avoid overlap */}
      <main
        className="max-w-[1536px] mx-auto px-4 lg:px-10"
        style={{ paddingTop: HEADER_HEIGHT + STEPPROCESS_HEIGHT + 24 }} // Added extra padding for spacing
      >
        <Routes>
          <Route path="/" element={<Navigate to="/cart" replace />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/cod" element={<CODPaymentPage />} />
          <Route path="/payment/ewallet" element={<EWalletPaymentPage />} />
          <Route path="/payment/banking" element={<BankingPaymentPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/failed" element={<PaymentFailedPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;