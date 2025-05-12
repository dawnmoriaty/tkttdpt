import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import axios from 'axios';
import { X, Search } from 'lucide-react';

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
            className="border border-border-secondary rounded-md p-2 hover:bg-theme-surface hover:text-black"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Tab List */}
          <div role="tablist" className="grid grid-cols-3 rounded-full bg-theme-surface border border-border-primary">
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
                  className={`flex justify-center items-center p-2 text-label-md text-theme-text-secondary rounded-full transition-all ${
                    isActive ? 'bg-theme-bg text-theme-text font-medium' : ''
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Address preview */}
          {selectedProvince && selectedDistrict && (
            <p className="text-label-sm mt-2 mb-1 pl-2 text-theme-text">
              {`${selectedDistrict?.name}, ${selectedProvince?.name}`}
            </p>
          )}

          {/* Search Input */}
          <div className="flex items-center border border-border-primary rounded-full bg-theme-bg px-4 py-2">
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
          </div>

          {/* Items */}
          <div className="space-y-2 max-h-[calc(620px-229px)] overflow-y-auto">
            {filteredItems().map(item => (
              <p
                key={item.code}
                onClick={() => handleSelect(item)}
                className="text-body-md text-theme-text px-4 py-2 rounded-md cursor-pointer hover:bg-theme-surface transition"
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressPopup;
