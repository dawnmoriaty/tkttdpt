import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, ChevronDown, Plus, Minus, ArrowRight, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: string;
  price: number;
  quantity: number;
  checked: boolean;
};

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617edf6e72357d9447ab673_love-and-romance-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
      name: "Peonies Bouquet",
      type: "",
      size: "Simple",
      price: 599000,
      quantity: 1,
      checked: true,
    },
    {
      id: 2,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617ee01fa2bee68afc4cdef_red-roses-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
      name: "Red Roses Arrangement",
      type: "",
      size: "Special",
      price: 399000,
      quantity: 1,
      checked: true,
    },
    {
      id: 3,
      imageUrl: "https://cdn.prod.website-files.com/661302d990875e71045299ee/6617ee1422ec6d35fec5dc2a_sunflower-bouquet-thumbnail-image-flowers-x-webflow-template-p-800.jpg",
      name: "Sunflower Bouquet",
      type: "",
      size: "Simple",
      price: 599000,
      quantity: 1,
      checked: true,
    },
  ]);

  const [showVariantPopup, setShowVariantPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = 0;
  const finalPrice = totalPrice - discount;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleItemSelect = (id: number, checked: boolean) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setCartItems(
      cartItems.map((item) => ({ ...item, checked }))
    );
  };

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.checked);
  const anySelected = cartItems.some((item) => item.checked);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setShowDeletePopup(false);
  };

  const handleProceedToCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      return;
    }
    navigate("/checkout");
  };

  const handleUpdateSize = () => {
    if (selectedItemId && selectedSize) {
      setCartItems(
        cartItems.map((item) =>
          item.id === selectedItemId ? { ...item, size: selectedSize } : item
        )
      );
      setShowVariantPopup(false);
    }
  };

  const openVariantDialog = (item: CartItem) => {
    setSelectedItemId(item.id);
    setSelectedSize(item.size);
    setShowVariantPopup(true);
  };

  const openDeleteDialog = (itemId: number) => {
    setSelectedItemId(itemId);
    setShowDeletePopup(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-36">
      {/* Cart Items Section */}
      <div className="flex-1 space-y-4 bg-white pt-5 pb-6 lg:rounded-lg lg:border lg:border-gray-200 lg:p-6 lg:h-fit lg:space-y-6">
        <div className="flex flex-col gap-4 bg-white px-3 lg:h-fit lg:gap-6 lg:p-0">
          <div className="inline-flex items-center space-x-2">
            <Checkbox 
              checked={allSelected}
              onCheckedChange={handleSelectAll}
              className="h-4 w-4 rounded-sm border-gray-300 hover:border-gray-400 data-[state=checked]:bg-[#6750A4] data-[state=checked]:border-transparent"
            />
            <label className="text-sm cursor-pointer">Chọn tất cả</label>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-4 h-44">
                <div className="inline-flex items-center">
                  <Checkbox 
                    checked={item.checked}
                    onCheckedChange={(checked) => handleItemSelect(item.id, !!checked)}
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
                    <div className="w-[138px]">
                      <div className="flex items-center justify-between border border-gray-300 rounded-2xl bg-white h-10 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 text-gray-500 hover:bg-transparent hover:text-gray-700"
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-5 w-5" />
                        </Button>
                        <Input
                          className="w-12 border-none bg-transparent text-center p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          type="number"
                          inputMode="numeric"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value >= 1) {
                              handleQuantityChange(item.id, value);
                            }
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 hover:bg-transparent hover:text-gray-700"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-5 w-5" />
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
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="sticky top-0 w-full lg:w-[436px] h-fit max-h-[300px] space-y-3 rounded-lg border border-gray-200 p-6 bg-white">
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
          onClick={handleProceedToCheckout}
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

      {/* Variant Selection Dialog */}
      <Dialog open={showVariantPopup} onOpenChange={setShowVariantPopup}>
        <DialogContent className="w-[420px] p-0 rounded-md">
          <DialogHeader className="p-4 border-b border-gray-200">
            <DialogTitle className="text-base font-medium">Cập nhật sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex items-center p-4">
            {/* Image container with padding */}
            <div className="p-[17px]">
              <img
                src={cartItems.find(item => item.id === selectedItemId)?.imageUrl || ""}
                alt="Product"
                className="w-[88px] h-[117px] object-cover rounded"
              />
            </div>
            {/* Information on the right */}
            <div className="flex-1 pl-4 flex flex-col justify-between h-full">
              <h4 className="text-sm font-medium">
                {cartItems.find(item => item.id === selectedItemId)?.name || ""}
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
                "w-full h-[40px] text-sm rounded-md text-white font-medium",
                selectedSize 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
              )}
            >
              Cập nhật
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeletePopup} onOpenChange={setShowDeletePopup}>
        <DialogContent className="w-[420px] p-0 rounded-md">
          <DialogHeader className="p-4 border-b border-gray-200">
            <DialogTitle className="text-base font-medium">Xóa sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="mb-4 bg-gray-100 rounded-full p-3">
              <Trash2 size={24} />
            </div>
            <DialogDescription className="text-center text-sm">
              Bạn có chắc muốn xóa sản phẩm này không?
            </DialogDescription>
          </div>
          <DialogFooter className="flex p-4 border-t border-gray-200 justify-between">
            <Button
              variant="outline"
              onClick={() => setShowDeletePopup(false)}
              className="w-1/2 py-3 text-gray-700 border border-gray-300 rounded-md mr-2 hover:bg-gray-50 text-sm bg-white"
            >
              Không
            </Button>
            <Button
              variant="secondary"
              onClick={() => selectedItemId && handleRemoveItem(selectedItemId)}
              className="w-1/2 py-3 bg-gray-200 text-gray-700 rounded-md ml-2 hover:bg-gray-300 text-sm"
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default CartPage;