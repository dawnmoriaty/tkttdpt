import React from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import { X } from "lucide-react";

export const PaymentPopup: React.FC = () => {
  const { 
    showPaymentPopup, 
    setShowPaymentPopup, 
    selectedPayment, 
    handlePaymentSelect 
  } = useCheckout();

  // Dữ liệu phương thức thanh toán
  const paymentMethods = [
    {
      id: 'COD',
      name: 'Thanh toán khi nhận hàng (COD)',
      image: 'data:image/png;base64,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'
    },
    {
      id: 'zalo',
      name: 'Ví điện tử Zalo',
      image: '/assets/202505131549/method_zalopay-DX7l5k2F.png'
    },
    {
      id: 'momo',
      name: 'Ví điện tử Momo',
      image: '/assets/202505131549/method_momo-Bmqob2xc.png'
    },
    {
      id: 'bank',
      name: 'Thẻ nội địa, ngân hàng',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAYAAADG4PRLAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS9SURBVHgB7d2xbttGGAfw72OKigIagGo6VO0QZmndLtHYUXmC2E9ga+uW5AnsPEHksVPUJ4jHbla3blGWxs1SeiiUxTGLBhBdoP76naosaXikSJ6sk/8/IJCBOzkC/z7y7ijeEQEAAAAAAAAAAAAAAAAAwFpiakAUxRG1P+4T3bhNIh2CfMzneoxeUJZN0jRJqaZaAUafb+0x067+2CeoYixCo/T1yY9UUaUAo+5X20zBE/0xJmhCokEeVAlyqQDNqTJot/aF+CFB45h4+Gb68tFy7ynJhMft1rG+pUfgkExkdnGv7PUxoJK43X6K8FaBe9wOn5WtfaNMpeiLrX1tqt8TrEoc3rz1Z/b27JeiioWnUO1pxtrT/L2onnaPU7mUI/3plCAf810mMWeyuKiqdmzuaMcmsdX5iAoETAdC1g9kgjuk2WzYxLjmuoi6Xz9kDvY1pSivThDQvr4MbL/H2gJLtL5EgmAn/ePXCcHS5sc34Oe2EGWWdWwNo6gT07cVahMfILzqzOlRz1471krt1p6t2Bogs9zPK1vMIIwJajHHUC9RY0uVvqWsoAWy9UJbefoH3iP0OK9IB/d3ycIeoFjGfToZS9CM0HosY0tZ+YH8+9DjbE6aVD+WlQOE9YAAPYcAPVc4E5On090SgiuHFug5BOg5BOg5BOg5BOg5BOg5BOg5BOg5BOi5yjMxYrmHBctjnn//Zfn32Qpt02Xn05NGHoyB/1Q91jiFeg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beg4Beq7yHfkiUfebB0xiluSKaeVkIsLDOovI+cJJC5yvYkgypCtbDI97zDQyS3nQhnMSIAfygNYAE6/F53DJzTVQ1mZNtZg2nKtOTEJrgTd+IQYnAQrJIa0Bkfl1eKM5CTCd/jY0qzhpkFfTAoQS/b8fXYdeqLNhhB68kb6MCJzCQN5zCNBz7mZizF4SYbhNdbryfDlJp6+ICHI5CXCxzugx1R6HBeaZAbMk/72ilWuvKyenULPKLzU3iDZ/DE8JPsjNOJD5PjVKsFp+DnRiPOemBUqzA3i9NYSOTA5Hk9nzldYTakai//A0cA4nvdBFj/GO2SSLJKhz/Uooy46wuGy+yo9YFy2HD+VFcRzxRXieV17nEesktyQM0TNsSmY7lvZbYgUB5ndGqq6qAP+n4+a9vDKhS+tWRtYAhYKfLcV9nXHpE9RijqFep3ZzKwhbdzKzt8DWbGQrZpZnZtqMoJLoy297JWaZbI3IHqBZDl/nIS03RTnSEJ9fh29/NclM9H9qtvQTsc4XL3bHSWy/q7nt5+Ydnvn3MV8Q5AvoNhNv2za8eqfM9nOlVluab5VG/IRgZVjo8ZvXJweF9aikqLt1zNhufCWE+CidvtwpU7f8VFor29E/C+yX5Jwe49lsULZ2qT10jSxNs+yvsx/Cm7c6ejr9jqBxTHIos4vBMjNcpQN8J3t79lP4yWen2rExsweFF2IoJdEB++B8+mqYZWm2zBtrLRlpHmLRl10Ns0+wNO1ljvVlVOf7q42s+bn4AlPP7NCsn6pDkI9ZJ63/OaXZ32PcDAAAAAAAAAAAAAAAAAAA2GD/As1te2MYtG+VAAAAAElFTkSuQmCC'
    },
    {
      id: 'vnpay',
      name: 'Ví điện tử VNPay',
      image: '/assets/202505131549/method_vnpay-Bz5pyml2.png'
    }
  ];

  console.log("PaymentPopup rendered", { showPaymentPopup, selectedPayment });

  // Nếu không dùng Dialog, thử dùng div cơ bản để debug
  if (!showPaymentPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-[420px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <p className="text-gray-800 text-lg font-medium">Chọn phương thức thanh toán</p>
          <button 
            onClick={() => setShowPaymentPopup(false)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Payment options */}
        <div className="p-4 space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`flex items-center p-3 gap-3 border rounded-md cursor-pointer ${
                selectedPayment === method.id ? 'bg-purple-50 border-purple-300' : 'border-gray-200'
              }`}
              onClick={() => handlePaymentSelect(method.id)}
            >
              {/* Simplified radio */}
              <div className="flex items-center justify-center w-4 h-4 rounded-full border border-gray-300">
                {selectedPayment === method.id && (
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                )}
              </div>
              
              <img alt="method" className="w-8 h-8" src={method.image} />
              <span className="text-gray-800 text-sm">{method.name}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => setShowPaymentPopup(false)}
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

