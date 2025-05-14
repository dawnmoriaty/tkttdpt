import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/data/cartData";

interface VariantSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItemId: number | null;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  handleUpdateSize: () => void;
  cartItems: CartItem[];
}

export const VariantSelectionDialog: React.FC<VariantSelectionDialogProps> = ({
  open,
  onOpenChange,
  selectedItemId,
  selectedSize,
  setSelectedSize,
  handleUpdateSize,
  cartItems,
}) => {
  const selectedItem = cartItems.find(item => item.id === selectedItemId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[420px] p-0 rounded-md">
        <DialogHeader className="p-4 border-b border-gray-200">
          <DialogTitle className="text-base font-medium">Cập nhật sản phẩm</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex p-4">
          {/* Image container with padding */}
          <div className="p-[17px]">
            <img
              src={selectedItem?.imageUrl || ""}
              alt="Product"
              className="w-[88px] h-[117px] object-cover rounded"
            />
          </div>
          {/* Information on the right - aligned at top */}
          <div className="flex-1 pl-4 flex flex-col justify-start space-y-4 h-full">
            <h4 className="text-sm font-medium pt-[17px]">
              {selectedItem?.name || ""}
            </h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-[20px] rounded-[16px] text-[14px] w-[85px] font-medium px-2 py-0",
                  selectedSize === "Simple" 
                    ? "border-purple-500 text-purple-500" 
                    : "border-gray-300 text-gray-700"
                )}
                onClick={() => setSelectedSize("Simple")}
              >
                Simple
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-[20px] rounded-[16px] text-[14px] w-[85px] font-medium px-2 py-0",
                  selectedSize === "Special" 
                    ? "border-purple-500 text-purple-500" 
                    : "border-gray-300 text-gray-700"
                )}
                onClick={() => setSelectedSize("Special")}
              >
                Special
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="flex p-4 border-t border-gray-200">
          <Button
            onClick={handleUpdateSize}
            disabled={!selectedSize}
            className={cn(
              "w-full h-[40px] text-sm rounded-[16px] text-white font-medium",
              selectedSize 
                ? "bg-purple-600 hover:bg-purple-700" 
                : "bg-gray-300 cursor-not-allowed hover:bg-gray-300 "
            )}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};