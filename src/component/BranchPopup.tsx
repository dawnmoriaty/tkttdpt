import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import axios from 'axios';
import { Search, MapPin, Phone, X } from 'lucide-react';

interface BranchPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBranchSelect: (branch: string) => void;
  setDataa: (value: string) => void;
}

type TabKey = 'province' | 'district' | 'branch';

const flowerShops = [
  { 
    code: 1, 
    name: 'Hoa Xuân Garden', 
    address: '123 Đường Hoa, Quận 1, TP. Hồ Chí Minh',
    phone: '0901 234 567',
  },
  { 
    code: 2, 
    name: 'Hoa Nhiệm Màu Florist', 
    address: '456 Đường Hồng, Quận 3, TP. Hồ Chí Minh',
    phone: '0902 345 678',
  },
  { 
    code: 3, 
    name: 'Hoa Tươi Nguyễn Bouquet', 
    address: '789 Đường Lan, Quận 5, TP. Hồ Chí Minh',
    phone: '0903 456 789',
  },
  { 
    code: 4, 
    name: 'Phương Flower Shop', 
    address: '101 Đường Hướng Dương, Quận Gò Vấp, TP. Hồ Chí Minh',
    phone: '0904 567 890',
  },
  { 
    code: 5, 
    name: 'Mỹ Tho Flowers & Gifts', 
    address: '202 Đường Hoa Đào, Quận Bình Thạnh, TP. Hồ Chí Minh',
    phone: '0905 678 901',
  }
];

// CSS để ẩn thanh cuộn
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const BranchPopup: React.FC<BranchPopupProps> = ({
  open,
  onOpenChange,
  onBranchSelect,
  setDataa,
}) => {
  const [selectedTab, setSelectedTab] = useState<TabKey>('province');
  const [searchTerm, setSearchTerm] = useState('');
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);

  // Thêm styles để ẩn scrollbar khi component mount
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = scrollbarHideStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    if (open) {
      axios.get('https://provinces.open-api.vn/api/p/').then(res => setProvinces(res.data));
    }
  }, [open]);

  // Reset everything when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedTab('province');
      setSearchTerm('');
      setSelectedProvince(null);
      setSelectedDistrict(null);
      setBranches([]);
      setSelectedBranch(null);
    }
  }, [open]);

  const handleSelect = (item: any) => {
    if (selectedTab === 'province') {
      setSelectedProvince(item);
      setSelectedTab('district');
      setSearchTerm('');
      axios.get(`https://provinces.open-api.vn/api/p/${item.code}?depth=2`)
        .then(res => setDistricts(res.data.districts));
    } else if (selectedTab === 'district') {
      setSelectedDistrict(item);
      setSelectedTab('branch');
      setSearchTerm('');
      // Simulate fetching flower shops by location
      const filteredShops = flowerShops.filter(shop => 
        shop.address.includes(item.name) && 
        shop.address.includes(selectedProvince.name)
      );
      setBranches(filteredShops.length > 0 ? filteredShops : flowerShops.slice(0, 3));
    }
  };

  const handleBranchSelect = (branchCode: number) => {
    setSelectedBranch(branchCode);
  };

  const handleConfirm = () => {
    if (selectedBranch !== null) {
      const shop = flowerShops.find(s => s.code === selectedBranch);
      if (shop) {
        const fullAddress = `${shop.name}, ${shop.address}`;
        onBranchSelect(shop.name);
        setDataa(fullAddress);
        onOpenChange(false);
      }
    }
  };

  const filteredItems = () => {
    const term = searchTerm.toLowerCase();
    if (selectedTab === 'province') return provinces.filter(p => p.name.toLowerCase().includes(term));
    if (selectedTab === 'district') return districts.filter(d => d.name.toLowerCase().includes(term));
    if (selectedTab === 'branch') return branches.filter(b => 
      b.name.toLowerCase().includes(term) || 
      b.address.toLowerCase().includes(term)
    );
    return [];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[420px] h-[620px] m-auto bg-white rounded-lg shadow-xl text-left overflow-hidden flex flex-col p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-100 p-4">
          <div className="flex items-center gap-2">
            <p className="text-base font-medium text-purple-800">Chọn cửa hàng nhận hàng</p>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-hidden">
          {/* Tab List */}
          <div role="tablist" className="grid grid-cols-3 rounded-full bg-purple-50 border border-purple-100 p-1 h-12">
            {[
              { key: 'province', label: 'Tỉnh/TP' },
              { key: 'district', label: 'Quận/Huyện', disabled: !selectedProvince },
              { key: 'branch', label: 'Cửa hàng', disabled: !selectedDistrict },
            ].map(({ key, label, disabled }) => {
              const isActive = selectedTab === key;
              return (
                <button
                  key={key}
                  disabled={disabled}
                  onClick={() => !disabled && setSelectedTab(key as TabKey)}
                  className={`
                    flex justify-center items-center text-sm rounded-full transition-all duration-200 
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-purple-100'}
                    ${isActive ? 'bg-purple-600 text-white font-medium' : ''}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Address preview */}
          {selectedProvince && selectedDistrict && (
            <div className="flex items-center gap-1 text-sm mt-2 mb-1 pl-2 text-purple-700">
              <MapPin className="w-4 h-4" />
              <p>{`${selectedDistrict.name}, ${selectedProvince.name}`}</p>
            </div>
          )}

          {/* Search Input */}
          <div className="flex items-center border border-purple-200 rounded-full bg-white px-4 py-2 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-300">
            <Search className="w-5 h-5 text-purple-400" />
            <input
              type="text"
              placeholder={`Tìm ${
                selectedTab === 'province' ? 'tỉnh/thành' :
                selectedTab === 'district' ? 'quận/huyện' : 'cửa hàng'
              }...`}
              className="w-full ml-2 bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Items - Thêm class scrollbar-hide để ẩn thanh cuộn */}
          <div className="space-y-3 h-[330px] overflow-y-auto scrollbar-hide pr-1">
            {filteredItems().length > 0 ? (
              selectedTab === 'branch' ? (
                <div role="radiogroup" className="space-y-3">
                  {filteredItems().map(item => (
                    <div
                      key={item.code}
                      role="radio"
                      aria-checked={selectedBranch === item.code}
                      onClick={() => handleBranchSelect(item.code)}
                      className="flex cursor-pointer items-start gap-2 rounded-md border border-border-primary p-2 hover:bg-theme-surface"
                    >
                      <button 
                        type="button"
                        role="radio"
                        aria-checked={selectedBranch === item.code}
                        className={`aspect-square h-4 w-4 rounded-full border border-border-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${selectedBranch === item.code ? 'border-purple-600 flex items-center justify-center' : ''} mt-1`}
                      >
                        {selectedBranch === item.code && (
                          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                        )}
                      </button>
                      
                      <label className="cursor-pointer space-y-1">
                        <p className="text-theme-text text-label-md">{item.name}</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="size-3 min-w-3" />
                          <p className="text-theme-text text-body-sm">{item.address}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="size-3 min-w-3" />
                          <p className="text-theme-text text-body-sm">{item.phone}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                filteredItems().map(item => (
                  <div
                    key={item.code}
                    onClick={() => handleSelect(item)}
                    className="text-sm px-4 py-3 rounded-md cursor-pointer hover:bg-purple-50 transition duration-200"
                  >
                    {item.name}
                  </div>
                ))
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <p>Không tìm thấy kết quả phù hợp</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer when on branch tab */}
        {selectedTab === 'branch' && (
          <div className="mt-auto border-t border-purple-100 p-4">
            <button
              onClick={handleConfirm}
              disabled={selectedBranch === null}
              className={`w-full h-11 rounded-md font-medium flex items-center justify-center ${
                selectedBranch !== null 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              Xác nhận
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BranchPopup;