import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface CouponCardProps {
  // Left side
  discountPercentage?: string;
  discountText?: string;
  promoCodeLabel?: string;
  leftBgColor: string;
  leftTextColor: string;
  leftContent?: React.ReactNode;

  // Right side
  title: string;
  subtitle: string;
  tagText?: string;
  expiryDate?: string;
  isSelected: boolean;
  onSelect?: () => void;
  rightBgColor: string;
  rightFgColorMuted: string;
  rightFgColorNormal: string;
  tagBorderColor?: string;
  tagTextColor?: string;
  checkboxBorderColor?: string;
  checkboxBgColor?: string;
  checkboxCheckColor?: string;
}

const CouponCard: React.FC<CouponCardProps> = ({
  discountPercentage,
  discountText,
  promoCodeLabel = "Mã vận chuyển",
  leftBgColor,
  leftTextColor,
  leftContent,
  title,
  subtitle,
  tagText = "Dành riêng cho bạn",
  expiryDate,
  isSelected,
  onSelect,
  rightBgColor,
  rightFgColorMuted,
  rightFgColorNormal,
  tagBorderColor = "border-primary",
  tagTextColor = "text-primary",
  checkboxBorderColor = "border-slate-500",
  checkboxBgColor = "bg-slate-900",
  checkboxCheckColor = "text-white",
}) => {
  // Define the actual color value for the CSS variable used by scallops
  const rightBgColorValue = rightBgColor === "bg-white" ? "white" : "#f1f5f9";

  // Scallop details (5 scallops, each ~14px diameter)
  const scallops = [
    { top: "6px" },
    { top: "28px" },
    { top: "50px" },
    { top: "72px" },
    { top: "94px" },
  ];

  return (
    <div
      className={`w-full max-w-[387px] h-[110px] flex rounded-lg shadow-md overflow-hidden relative cursor-pointer`}
      style={{ '--right-panel-bg': rightBgColorValue } as React.CSSProperties}
      onClick={onSelect}
    >
      {/* Left Section (110px width) */}
      <div
        className={`w-[110px] h-full ${leftBgColor} ${leftTextColor} flex flex-col items-center justify-center p-1 relative`}
      >
        {leftContent ? (
          leftContent
        ) : (
          <div className="text-center">
            <div className="text-3xl font-bold leading-tight">{discountPercentage}</div>
            <div className="text-xl font-bold leading-tight -mt-1">{discountText}</div>
            <div className="text-[10px] mt-1.5 opacity-90">{promoCodeLabel}</div>
          </div>
        )}

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
      <div className={`flex-1 p-3.5 flex justify-between items-start ${rightBgColor}`}>
        <div className="flex flex-col h-full justify-between">
          {/* Top part of right section */}
          <div>
            <h3 className={`text-lg font-semibold ${rightFgColorNormal} leading-tight`}>
              {title}
            </h3>
            <p className={`text-xs ${rightFgColorMuted} mt-0.5`}>{subtitle}</p>
          </div>
          {/* Bottom part of right section */}
          <div>
            {tagText && (
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0.5 h-auto font-medium ${tagBorderColor} ${tagTextColor} bg-transparent`}
              >
                {tagText}
              </Badge>
            )}
            {expiryDate && (
              <p className={`text-[10px] ${rightFgColorMuted} mt-1`}>{expiryDate}</p>
            )}
          </div>
        </div>

        {/* Checkbox/Radio icon */}
        <div className="pt-0.5">
          {isSelected ? (
            <div
              className={`w-5 h-5 ${checkboxBgColor} rounded-full flex items-center justify-center`}
            >
              <Check className={`w-3 h-3 ${checkboxCheckColor}`} strokeWidth={3} />
            </div>
          ) : (
            <div className={`w-5 h-5 border-2 ${checkboxBorderColor} rounded-full`}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;