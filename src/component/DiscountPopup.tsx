import React, { useState } from 'react';

interface Discount {
  id: number;
  code: string;
  description: string;
}

interface DiscountPopupProps {
  onClose: () => void;
  discounts: Discount[];
}

const DiscountPopup: React.FC<DiscountPopupProps> = ({ onClose, discounts }) => {
  const [search, setSearch] = useState('');

  const filteredDiscounts = discounts.filter((d) =>
    d.code.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md transform overflow-hidden rounded-lg bg-white text-left shadow-xl h-[620px] w-[420px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <p className="text-lg font-semibold text-gray-800">Chọn khuyến mãi</p>
          <button
            onClick={onClose}
            className="rounded border border-gray-300 p-2 hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="relative p-4 space-y-4">
          {/* Search input */}
          <div className="space-y-1">
            <div className="flex items-center border border-gray-300 rounded-full bg-white px-4 py-2 gap-2 h-[44px] focus-within:border-blue-500">
              <span className="w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="flex-grow bg-transparent border-none outline-none"
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Discount List OR Empty State */}
          {filteredDiscounts.length > 0 ? (
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredDiscounts.map((discount) => (
                <div
                  key={discount.id}
                  className="border border-blue-500 rounded-md p-3 cursor-pointer hover:bg-blue-50 transition"
                >
                  <p className="font-medium text-blue-600">{discount.code}</p>
                  <p className="text-sm text-gray-600">{discount.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[460px] flex-col items-center justify-center space-y-3 overflow-auto">
              <svg
                width="84"
                height="84"
                viewBox="0 0 113 112"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[84px] h-[84px]"
              >
                <circle cx="56.5" cy="56" r="56" fill="#FFC84A" />
              </svg>
              <p className="text-gray-500 text-sm text-center">
                Không tìm thấy mã khuyến mãi nào phù hợp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
