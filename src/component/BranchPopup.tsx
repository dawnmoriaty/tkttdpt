import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import axios from 'axios';
import { Search } from 'lucide-react';

interface BranchPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBranchSelect: (branch: string) => void;
  setDataa: (value: string) => void;
}

type TabKey = 'province' | 'district' | 'branch';

const fakeBranches = [
  { 
    code: 1, 
    name: 'Cửa hàng Hoa Xuân', 
    address: '123 Đường Hoa, Quận 1, TP. Hồ Chí Minh',
    phone: '0901 234 567',
    workingHours: '8:00 - 22:00'
  },
  { 
    code: 2, 
    name: 'Cửa hàng Hoa Nhiệm Màu', 
    address: '456 Đường Hồng, Quận 3, TP. Hồ Chí Minh',
    phone: '0902 345 678',
    workingHours: '7:30 - 21:30'
  },
  { 
    code: 3, 
    name: 'Cửa hàng Hoa Tươi Nguyễn', 
    address: '789 Đường Lan, Quận 5, TP. Hồ Chí Minh',
    phone: '0903 456 789',
    workingHours: '9:00 - 23:00'
  },
  { 
    code: 4, 
    name: 'Cửa hàng Hoa Phương', 
    address: '101 Đường Hướng Dương, Quận Gò Vấp, TP. Hồ Chí Minh',
    phone: '0904 567 890',
    workingHours: '8:30 - 21:00'
  },
  { 
    code: 5, 
    name: 'Cửa hàng Hoa Mỹ Tho', 
    address: '202 Đường Hoa Đào, Quận Bình Thạnh, TP. Hồ Chí Minh',
    phone: '0905 678 901',
    workingHours: '7:00 - 20:30'
  }
];

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
      setSelectedTab('branch');
      setSearchTerm('');
      // Here you would normally fetch branches, but we're using fake data
      const filteredBranches = fakeBranches.filter(branch => 
        branch.address.includes(item.name) && 
        branch.address.includes(selectedProvince.name)
      );
      setBranches(filteredBranches);
    } else if (selectedTab === 'branch') {
      const fullAddress = `${item.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;
      onBranchSelect(item.name);
      setDataa(fullAddress);
      onOpenChange(false);
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
        <div className="flex items-center justify-between border-b border-border-primary p-4">
          <p className="text-heading-md text-theme-text font-medium">Chọn chi nhánh</p>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-hidden">
          {/* Tab List */}
          <div role="tablist" className="grid grid-cols-3 rounded-full bg-gray-100 border border-gray-200 p-1 h-12">
            {[
              { key: 'province', label: 'Tỉnh/TP' },
              { key: 'district', label: 'Quận/Huyện', disabled: !selectedProvince },
              { key: 'branch', label: 'Chi nhánh', disabled: !selectedDistrict },
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
                    ${isActive ? 'bg-[#b2a8da] text-white font-medium' : ''}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Address preview */}
          {selectedProvince && selectedDistrict && (
            <p className="text-label-sm mt-2 mb-1 pl-2 text-theme-text">
              {`${selectedDistrict.name}, ${selectedProvince.name}`}
            </p>
          )}

          {/* Search Input */}
          <div className="flex items-center border border-border-primary rounded-full bg-theme-bg px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder={`Tìm ${
                selectedTab === 'province' ? 'tỉnh/thành' :
                selectedTab === 'district' ? 'quận/huyện' : 'chi nhánh'
              }...`}
              className="w-full ml-2 bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Items */}
          <div className="space-y-2 h-[330px] overflow-y-auto">
            {filteredItems().map(item => (
              <div
                key={item.code}
                onClick={() => handleSelect(item)}
                className={`
                  ${selectedTab === 'branch' 
                    ? 'border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-purple-100 transition duration-200 hover:border-purple-300'
                    : 'text-body-md text-theme-text px-4 py-2 rounded-md cursor-pointer hover:bg-purple-100 transition duration-200'}
                `}
              >
                {selectedTab === 'branch' ? (
                  <>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-body-md font-medium text-theme-text">{item.name}</p>
                    </div>
                    <p className="text-label-sm text-gray-600 mb-1">{item.address}</p>
                    <div className="flex justify-between text-label-xs text-gray-500">
                      <span>{item.phone}</span>
                      <span>{item.workingHours}</span>
                    </div>
                  </>
                ) : (
                  item.name
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BranchPopup;