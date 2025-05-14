import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { initialCartItems, type CartItem as CartItemType } from "@/data/cartData";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { CartItem } from "@/components/cart/CartItem";
import { VariantSelectionDialog } from "@/components/cart/VariantSelectionDialog";
import { DeleteConfirmationDialog } from "@/components/cart/DeleteConfirmationDialog";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);
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

  const openVariantDialog = (item: CartItemType) => {
    setSelectedItemId(item.id);
    setSelectedSize(item.size);
    setShowVariantPopup(true);
  };

  const openDeleteDialog = (itemId: number) => {
    setSelectedItemId(itemId);
    setShowDeletePopup(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-36 pt-4 pb-20">
      {/* Cart Items Section */}
      <div className="flex-1 space-y-4 bg-white pt-5 pb-6 lg:rounded-lg lg:border lg:border-gray-200 lg:p-6 lg:space-y-6">
        <div className="flex flex-col gap-4 bg-white px-3 lg:gap-6 lg:p-0">
          <div className="inline-flex items-center space-x-2">
            <Checkbox 
              checked={allSelected}
              onCheckedChange={handleSelectAll}
              className="h-4 w-4 rounded-sm border-gray-300 hover:border-gray-400 data-[state=checked]:bg-[#6750A4] data-[state=checked]:border-transparent"
            />
            <label className="text-sm cursor-pointer">Chọn tất cả</label>
          </div>

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onItemSelect={handleItemSelect}
              onQuantityChange={handleQuantityChange}
              openVariantDialog={openVariantDialog}
              openDeleteDialog={openDeleteDialog}
            />
          ))}
        </div>
      </div>

      {/* Placeholder cho OrderSummary - chỉ hiển thị trên desktop */}
      <div className="hidden lg:block lg:w-[436px]"></div>

      {/* OrderSummary fixed position - chỉ hiển thị trên desktop với top=168px */}
      <div 
        className="hidden lg:block lg:fixed lg:right-36 lg:w-[436px] lg:z-30"
        style={{ top: "168px" }}
      >
        <OrderSummary
          totalPrice={totalPrice}
          discount={discount}
          finalPrice={finalPrice}
          anySelected={anySelected}
          onProceedToCheckout={handleProceedToCheckout}
        />
      </div>

      {/* OrderSummary mobile - chỉ hiển thị trên mobile */}
      <div className="lg:hidden w-full">
        <OrderSummary
          totalPrice={totalPrice}
          discount={discount}
          finalPrice={finalPrice}
          anySelected={anySelected}
          onProceedToCheckout={handleProceedToCheckout}
        />
      </div>

      {/* Variant Selection Dialog */}
      <VariantSelectionDialog
        open={showVariantPopup}
        onOpenChange={setShowVariantPopup}
        selectedItemId={selectedItemId}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        handleUpdateSize={handleUpdateSize}
        cartItems={cartItems}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={showDeletePopup}
        onOpenChange={setShowDeletePopup}
        onConfirmDelete={() => selectedItemId && handleRemoveItem(selectedItemId)}
      />
    </div>
  );
};

export default CartPage;