import React from 'react';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { CustomerInformation } from '@/components/checkout/CustomerInformation';
import { DeliveryMethod } from '@/components/checkout/DeliveryMethod';
import { OrderDetails } from '@/components/checkout/OrderDetails';
import { OrderSummary } from '@/components/checkout/OrderSummary';

import { PaymentPopup } from '@/components/checkout/PaymentPopup';
import AddressPopup from '@/component/AddressPopup';
import BranchPopup from '@/component/BranchPopup';
import { useCheckout } from '@/context/CheckoutContext';
import { PromotionPopup } from '@/components/checkout/PromotionPopup';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CheckoutContent: React.FC = () => {
  const { 
    showAddressPopup, 
    setShowAddressPopup,
    setSelectedAddress,
    showBranchPopup,
    setShowBranchPopup
  } = useCheckout();

  const navigate = useNavigate();

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setShowAddressPopup(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-36 min-h-screen py-4">
      {/* Left Column - Customer Information and Order Details */}
      <div className="flex-1 space-y-6">
        <CustomerInformation />
        <DeliveryMethod />
        <OrderDetails />
      </div>

      {/* Right Column - Order Summary */}
      <OrderSummary />

      {/* Popups */}
      <AddressPopup 
        open={showAddressPopup}
        onOpenChange={setShowAddressPopup}
        onAddressSelect={handleAddressSelect}
        setDataa={function (_value: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      
      <BranchPopup
        open={showBranchPopup}
        onOpenChange={setShowBranchPopup}
        onBranchSelect={function (_branch: string): void {
          throw new Error('Function not implemented.');
        }}
        setDataa={function (_value: string): void {
          throw new Error('Function not implemented.');
        }}
      />

      <PromotionPopup />
      <PaymentPopup />

      
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
};

export default CheckoutPage;