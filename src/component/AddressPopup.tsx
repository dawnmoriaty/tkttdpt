import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import axios from 'axios';
import { Search, ChevronRight, X } from 'lucide-react';

interface AddressPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressSelect: (address: string) => void;
  setDataa: (value: string) => void;
}

type TabKey = 'province' | 'district' | 'ward';

const AddressPopup: React.FC<AddressPopupProps> = ({
  open,
  onOpenChange,
  onAddressSelect,
  setDataa,
}) => {
  const [selectedTab, setSelectedTab] = useState<TabKey>('province');
  const [searchTerm, setSearchTerm] = useState('');
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  useEffect(() => {
    if (open) {
      axios.get('https://provinces.open-api.vn/api/p/').then(res => setProvinces(res.data));
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
      setSelectedTab('ward');
      setSearchTerm('');
      axios.get(`https://provinces.open-api.vn/api/d/${item.code}?depth=2`)
        .then(res => setWards(res.data.wards));
    } else if (selectedTab === 'ward') {
      const fullAddress = `${item.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`;
      onAddressSelect(fullAddress);
      setDataa(fullAddress);
      onOpenChange(false);
    }
  };

  const handleReset = () => {
    if (selectedTab === 'ward') {
      setSelectedTab('district');
      setWards([]);
    } else if (selectedTab === 'district') {
      setSelectedTab('province');
      setSelectedDistrict(null);
      setDistricts([]);
    }
  };

  const filteredItems = () => {
    const term = searchTerm.toLowerCase();
    if (selectedTab === 'province') return provinces.filter(p => p.name.toLowerCase().includes(term));
    if (selectedTab === 'district') return districts.filter(d => d.name.toLowerCase().includes(term));
    if (selectedTab === 'ward') return wards.filter(w => w.name.toLowerCase().includes(term));
    return [];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[420px] h-[620px] m-auto bg-white rounded-lg shadow-xl text-left overflow-hidden flex flex-col p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary p-4">
          <p className="text-heading-md text-theme-text font-medium">Chọn địa chỉ nhận hàng</p>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {/* <X className="w-5 h-5 text-gray-500" /> */}
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-hidden">
          {/* Tab List */}
          <div role="tablist" className="grid grid-cols-3 rounded-full bg-gray-100 border border-gray-200 p-1 h-12">
            {[
              { key: 'province', label: 'Tỉnh/Thành phố' },
              { key: 'district', label: 'Quận/Huyện', disabled: !selectedProvince },
              { key: 'ward', label: 'Phường/Xã', disabled: !selectedDistrict },
            ].map(({ key, label, disabled }) => {
              const isActive = selectedTab === key;
              return (
                <button
                  key={key}
                  disabled={disabled}
                  onClick={() => !disabled && setSelectedTab(key as TabKey)}
                  className={`
                    flex justify-center items-center text-label-md rounded-full transition-all duration-200 
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-purple-100'}
                    ${isActive ? 'bg-[#6750A4] text-white font-medium' : ''}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Address preview */}
          {(selectedProvince || selectedDistrict) && (
            <div className="flex items-center justify-between bg-purple-50 rounded-lg px-4 py-2">
              <div className="text-sm text-gray-700">
                {selectedProvince && <span>{selectedProvince.name}</span>}
                {selectedDistrict && <span> &gt; {selectedDistrict.name}</span>}
              </div>
              {selectedTab !== 'province' && (
                <button
                  onClick={handleReset}
                  className="text-purple-600 text-sm font-medium hover:underline"
                >
                  Quay lại
                </button>
              )}
            </div>
          )}

          {/* Search Input */}
          <div className="flex items-center border border-gray-300 rounded-full bg-white px-4 py-2 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-200">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder={`Tìm ${
                selectedTab === 'province' ? 'tỉnh/thành' :
                selectedTab === 'district' ? 'quận/huyện' : 'phường/xã'
              }...`}
              className="w-full ml-2 bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Items - with hidden scrollbar */}
          <div className="h-[330px] overflow-y-auto scrollbar-hide">
            <div className="space-y-1 pr-1">
              {filteredItems().map(item => (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-purple-50 transition-colors duration-200 focus:outline-none focus:bg-purple-100"
                >
                  <span className="font-medium">{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
              
              {filteredItems().length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  Không tìm thấy kết quả phù hợp
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Thêm styles để ẩn scrollbar vào global CSS hoặc thêm vào component
// Đây là cách thêm lớp CSS tùy chỉnh trong Tailwind
const addScrollbarHideStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  document.head.appendChild(style);
};

// Thêm styles khi component được import
if (typeof window !== 'undefined') {
  addScrollbarHideStyles();
}

export default AddressPopup;