import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCheckout } from '@/context/CheckoutContext';
import { cn } from "@/lib/utils";
import { MapPin, Store, ChevronRight } from "lucide-react";

export const DeliveryMethod: React.FC = () => {
  const { 
    deliveryMethod, 
    setDeliveryMethod,
    selectedAddress,
    selectedBranch,
    setShowAddressPopup,
    setShowBranchPopup,
    customerInfo,
    updateCustomerInfo
  } = useCheckout();

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCustomerInfo('note', e.target.value);
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
        </svg>
        <h2 className="text-lg font-medium">Hình thức nhận hàng</h2>
      </div>
      
      {/* Improved Delivery Method Tabs */}
      <div className="relative rounded-full bg-gray-100 border border-gray-200 grid w-full grid-cols-2 p-1">
        {/* Sliding background */}
        <div 
          className="absolute inset-y-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
          style={{ 
            left: deliveryMethod === 'delivery' ? '0.25rem' : '50%',
            right: deliveryMethod === 'pickup' ? '0.25rem' : 'auto',
          }}
        />
        
        {/* Delivery Tab */}
        <button 
          type="button" 
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 rounded-full py-2 px-4 text-sm font-medium transition-colors duration-300",
            deliveryMethod === 'delivery' 
              ? "text-purple-600" 
              : "text-gray-600 hover:text-gray-800"
          )}
          onClick={() => setDeliveryMethod('delivery')}
        >
          <MapPin className="w-4 h-4" />
          Giao tận nơi
        </button>
        
        {/* Pickup Tab */}
        <button 
          type="button" 
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 rounded-full py-2 px-4 text-sm font-medium transition-colors duration-300",
            deliveryMethod === 'pickup' 
              ? "text-purple-600" 
              : "text-gray-600 hover:text-gray-800"
          )}
          onClick={() => setDeliveryMethod('pickup')}
        >
          <Store className="w-4 h-4" />
          Nhận tại cửa hàng
        </button>
      </div>
      
      {/* Improved Delivery Address Section */}
      {deliveryMethod === 'delivery' && (
        <div className="mt-4 space-y-1">
          <Label htmlFor="address">Địa chỉ giao hàng</Label>
          <div
            className="flex items-center justify-between w-full h-11 px-4 rounded-full border border-gray-300 bg-white hover:border-gray-400 cursor-pointer transition-colors"
            onClick={() => setShowAddressPopup(true)}
          >
            <div className="flex-1 truncate text-sm">
              {selectedAddress || "Chọn địa chỉ giao hàng"}
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
          </div>
        </div>
      )}
      
      {/* Improved Pickup Branch Section */}
      {deliveryMethod === 'pickup' && (
        <div className="mt-4 space-y-1">
          <Label htmlFor="branch">Cửa hàng nhận hàng</Label>
          <div
            className="flex items-center justify-between w-full h-11 px-4 rounded-full border border-gray-300 bg-white hover:border-gray-400 cursor-pointer transition-colors"
            onClick={() => setShowBranchPopup(true)}
          >
            <div className="flex-1 truncate text-sm">
              {selectedBranch || "Chọn cửa hàng nhận hàng"}
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
          </div>
        </div>
      )}
      
      {/* Note Section */}
      <div className="space-y-1 mt-4">
        <Label htmlFor="note">Ghi chú (không bắt buộc)</Label>
        <Textarea
          id="note"
          name="note"
          value={customerInfo.note}
          onChange={handleNoteChange}
          placeholder="Nhập ghi chú"
          className="h-20 resize-none rounded-lg focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};