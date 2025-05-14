import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCheckout } from '@/context/CheckoutContext';
import { X, Search, Tag, Check } from 'lucide-react';

// Danh sách các khuyến mãi mẫu
const promotions = [
  {
    id: '1',
    type: 'shipping',
    title: 'Giảm tối đa 50k',
    subtitle: 'Đơn tối thiểu 100k',
    value: '50k',
    text: 'FREE\nSHIP',
    expiryDate: 'HSD: 31.05.2025',
    promoValue: 'Miễn phí vận chuyển'
  },
  {
    id: '2',
    type: 'shipping',
    title: 'Giảm tối đa 30k',
    subtitle: 'Đơn tối thiểu 150k',
    value: '30k',
    text: 'FREE\nSHIP',
    expiryDate: 'HSD: 31.05.2025',
    promoValue: 'Miễn phí vận chuyển'
  },
  {
    id: '3',
    type: 'discount',
    title: 'Giảm 30%',
    subtitle: 'Đơn tối đa 200k',
    value: '30%',
    text: 'OFF',
    expiryDate: 'HSD: 15.06.2025',
    promoValue: 'Giảm 10% cho đơn hàng trên 1 triệu'
  },
  {
    id: '4',
    type: 'discount',
    title: 'Giảm 10%',
    subtitle: 'Đơn tối đa 100k',
    value: '10%',
    text: 'OFF',
    expiryDate: 'HSD: 15.06.2025',
    promoValue: 'Giảm 10% cho đơn hàng trên 1 triệu'
  }
];

export const PromotionPopup: React.FC = () => {
  const { 
    showPromotionPopup, 
    setShowPromotionPopup, 
    selectedPromotion, 
    setSelectedPromotion 
  } = useCheckout();

  const [searchTerm, setSearchTerm] = useState('');
  const [tempSelectedPromo, setTempSelectedPromo] = useState<string | null>(selectedPromotion);

  // Find the matched promotion based on promoValue
  const matchSelectedPromoId = () => {
    if (!selectedPromotion) return null;
    
    const promo = promotions.find(p => p.promoValue === selectedPromotion);
    return promo?.id || null;
  };
  
  const [selectedPromoId, setSelectedPromoId] = useState<string | null>(matchSelectedPromoId());

  const handleSelectPromotion = (id: string) => {
    const isAlreadySelected = id === selectedPromoId;
    setSelectedPromoId(isAlreadySelected ? null : id);
    
    if (!isAlreadySelected) {
      const promo = promotions.find(p => p.id === id);
      if (promo) {
        setTempSelectedPromo(promo.promoValue);
      }
    } else {
      setTempSelectedPromo(null);
    }
  };

  const handleApply = () => {
    if (tempSelectedPromo !== null) {
      setSelectedPromotion(tempSelectedPromo);
    }
    setShowPromotionPopup(false);
  };

  // Lọc khuyến mãi theo từ khóa tìm kiếm
  const filteredPromotions = promotions.filter(promo => 
    promo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    promo.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tách ra các nhóm khuyến mãi theo loại
  const shippingPromotions = filteredPromotions.filter(promo => promo.type === 'shipping');
  const discountPromotions = filteredPromotions.filter(promo => promo.type === 'discount');

  return (
    <Dialog open={showPromotionPopup} onOpenChange={setShowPromotionPopup}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium">Chọn mã khuyến mãi</DialogTitle>
          <button 
            className="h-7 w-7 rounded-full inline-flex items-center justify-center text-slate-400 hover:text-slate-500"
            onClick={() => setShowPromotionPopup(false)}
          >
            <X size={18} />
          </button>
        </DialogHeader>

        {/* Search input */}
        <div className="px-4 py-3 border-b">
          <div className="flex items-center border rounded-md px-3 py-2 bg-slate-50 focus-within:ring-1 focus-within:ring-purple-400 focus-within:border-purple-400">
            <Search size={18} className="text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Tìm mã khuyến mãi..."
              className="w-full bg-transparent outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Coupon list */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4 scrollbar-hide">
          {/* Free shipping coupons */}
          {shippingPromotions.length > 0 && (
            <>
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Tag size={16} className="text-slate-500" />
                <span>Mã miễn phí vận chuyển</span>
              </div>
              
              <div className="space-y-4">
                {shippingPromotions.map(promo => (
                  <CouponItem
                    key={promo.id}
                    promotion={promo}
                    isSelected={selectedPromoId === promo.id}
                    onSelect={() => handleSelectPromotion(promo.id)}
                    bgColor="bg-gray-600"
                    tagColor="border-gray-400 text-gray-700"
                    checkboxColor="border-gray-400"
                    activeCheckboxBg="bg-gray-700"
                  />
                ))}
              </div>
            </>
          )}

          {/* Discount coupons */}
          {discountPromotions.length > 0 && (
            <>
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 pt-2">
                <Tag size={16} className="text-purple-500" />
                <span>Mã giảm giá</span>
              </div>
              
              <div className="space-y-4">
                {discountPromotions.map(promo => (
                  <CouponItem
                    key={promo.id}
                    promotion={promo}
                    isSelected={selectedPromoId === promo.id}
                    onSelect={() => handleSelectPromotion(promo.id)}
                    bgColor="bg-purple-600" 
                    tagColor="border-purple-400 text-purple-700"
                    checkboxColor="border-purple-500"
                    activeCheckboxBg="bg-purple-600"
                  />
                ))}
              </div>
            </>
          )}

          {filteredPromotions.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p>Không tìm thấy mã khuyến mãi phù hợp</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 border-t bg-slate-50">
          <div className="flex w-full justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowPromotionPopup(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={handleApply}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Áp dụng
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component CouponItem trong cùng file
interface CouponItemProps {
  promotion: {
    id: string;
    type: string;
    title: string;
    subtitle: string;
    value: string;
    text: string;
    expiryDate: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  bgColor: string;
  tagColor: string;
  checkboxColor: string;
  activeCheckboxBg: string;
}

const CouponItem: React.FC<CouponItemProps> = ({ 
  promotion, 
  isSelected, 
  onSelect,
  bgColor,
  tagColor,
  checkboxColor,
  activeCheckboxBg
}) => {
  const scallops = [
    { top: "6px" },
    { top: "28px" },
    { top: "50px" },
    { top: "72px" },
    { top: "94px" },
  ];
  
  return (
    <div
      className="w-full max-w-[387px] h-[110px] flex rounded-lg shadow-md overflow-hidden relative cursor-pointer"
      style={{ '--right-panel-bg': 'white' } as React.CSSProperties}
      onClick={onSelect}
    >
      {/* Left Section (110px width) */}
      <div
        className={`w-[110px] h-full ${bgColor} text-white flex flex-col items-center justify-center p-1 relative`}
      >
        <div className="text-center">
          <div className="text-3xl font-bold leading-tight">{promotion.value}</div>
          <div className="text-xl font-bold leading-tight -mt-1 whitespace-pre-line">{promotion.text}</div>
          <div className="text-[10px] mt-1.5 opacity-90">
            {promotion.type === 'shipping' ? 'Mã vận chuyển' : 'Mã giảm giá'}
          </div>
        </div>

        {/* Scalloped edge simulation */}
        {scallops.map((scallop, i) => (
          <div
            key={i}
            className="absolute -right-[7px] w-[14px] h-[14px] rounded-full bg-[var(--right-panel-bg)]"
            style={{ top: scallop.top }}
          ></div>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex-1 p-3.5 flex justify-between items-start bg-white">
        <div className="flex flex-col h-full justify-between">
          {/* Top part of right section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 leading-tight">
              {promotion.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{promotion.subtitle}</p>
          </div>
          {/* Bottom part of right section */}
          <div>
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 py-0.5 h-auto font-medium border ${tagColor} bg-transparent`}
            >
              Dành riêng cho bạn
            </Badge>
            <p className="text-[10px] text-gray-500 mt-1">{promotion.expiryDate}</p>
          </div>
        </div>

        {/* Checkbox/Radio icon */}
        <div className="pt-0.5">
          {isSelected ? (
            <div
              className={`w-5 h-5 ${activeCheckboxBg} rounded-full flex items-center justify-center`}
            >
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
          ) : (
            <div className={`w-5 h-5 border-2 ${checkboxColor} rounded-full`}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionPopup;