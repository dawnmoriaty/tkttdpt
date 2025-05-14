import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  totalPrice: number;
  discount: number;
  finalPrice: number;
  anySelected: boolean;
  onProceedToCheckout: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  discount,
  finalPrice,
  anySelected,
  onProceedToCheckout,
}) => {
  return (
    <div className="w-full space-y-3 rounded-lg border border-gray-200 p-6 bg-white z-10">
      <p className="text-lg font-medium">Chi tiết đơn hàng</p>
      <div className="flex justify-between">
        <p className="text-gray-700">Tổng tiền</p>
        <p className="text-gray-700">{totalPrice.toLocaleString()}đ</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Giảm giá</p>
        <p className="text-gray-700">{discount.toLocaleString()}đ</p>
      </div>
      <Separator className="border-dashed border-gray-300" />
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
        <Truck className="w-4 h-4 text-green-600" />
        <p className="text-sm">Đơn được miễn phí vận chuyển nhé!</p>
      </div>
      <Button
        onClick={onProceedToCheckout}
        disabled={!anySelected}
        className={cn(
          "w-full h-11 flex items-center justify-center gap-2",
          anySelected ? "bg-[#6750A4] hover:bg-[#6a559f] text-white" : "bg-gray-300 text-white cursor-not-allowed hover:bg-gray-300"
        )}
      >
        Đặt hàng
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};