import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronDown, Plus, Minus } from "lucide-react";
import type { CartItem as CartItemType } from "@/data/cartData";

interface CartItemProps {
  item: CartItemType;
  onItemSelect: (id: number, checked: boolean) => void;
  onQuantityChange: (id: number, newQuantity: number) => void;
  openVariantDialog: (item: CartItemType) => void;
  openDeleteDialog: (itemId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onItemSelect,
  onQuantityChange,
  openVariantDialog,
  openDeleteDialog,
}) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex items-center gap-4 h-44">
        <div className="inline-flex items-center">
          <Checkbox 
            checked={item.checked}
            onCheckedChange={(checked) => onItemSelect(item.id, !!checked)}
            className="h-4 w-4 rounded-sm border-gray-300 hover:border-gray-400 data-[state=checked]:bg-[#6750A4] data-[state=checked]:border-transparent"
          />
        </div>

        <div className="h-44 w-[132px] flex-shrink-0">
          <img
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover rounded-sm"
            src={item.imageUrl}
          />
        </div>

        <div className="flex flex-1 flex-col h-full relative pb-1">
          <div className="flex justify-between">
            <h3 className="text-base font-medium line-clamp-2 flex-1 pr-6">
              {item.name}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-6 w-6 text-gray-500 hover:text-gray-700"
              onClick={() => openDeleteDialog(item.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="inline-flex items-center whitespace-nowrap rounded-md font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-6 gap-1 px-3 py-1 text-xs justify-between w-fit mt-2"
            onClick={() => openVariantDialog(item)}
          >
            {item.size}
            <ChevronDown className="ml-1 h-3 w-3 text-gray-700" />
          </Button>

          <div className="mt-auto flex items-center justify-between w-full">
            <div className="w-[120px]">
              <div className="flex items-center justify-between border border-gray-300 rounded-[999px] bg-white h-[34px] px-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 text-gray-500 hover:bg-transparent hover:text-gray-700"
                  onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  className="w-10 border-none bg-transparent text-center p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="number"
                  inputMode="numeric"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1) {
                      onQuantityChange(item.id, value);
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 hover:bg-transparent hover:text-gray-700"
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-lg font-medium">{(item.price).toLocaleString()}đ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};