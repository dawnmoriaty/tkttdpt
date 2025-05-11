import React from "react";

export type Step = {
  id: number;
  title: string;
  description: string;
};

type StepProcessProps = {
  steps: Step[];
  currentStep: number;
  onStepClick?: (id: number) => void;
};

const StepProcess: React.FC<StepProcessProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav
      className="flex items-center bg-white p-4 border-b border-gray-200 max-w-screen-xl mx-auto"
      style={{ height: 70, gap: 40 }} // gap tăng khoảng cách giữa các bước
    >
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const nextStep = steps[index + 1];
        const nextIsCompleted = nextStep ? nextStep.id < currentStep : false;
        const nextIsActive = nextStep ? nextStep.id === currentStep : false;

        const circleClass = isCompleted
          ? "bg-green-500 text-white border-green-500"
          : isActive
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-400 border-gray-300";

        const titleClass = isCompleted || isActive ? "text-gray-900 font-semibold" : "text-gray-400";

        const descClass = isCompleted || isActive ? "text-gray-500" : "text-gray-300";

        let lineColor = "border-gray-300";
        if (nextIsCompleted) lineColor = "border-green-500";
        else if (nextIsActive) lineColor = "border-blue-600";

        return (
          <React.Fragment key={step.id}>
            <div
              className="flex items-center cursor-pointer min-w-[150px]"
              onClick={() => onStepClick?.(step.id)}
              style={{ gap: 12 }} // gap giữa vòng tròn, text và đường nối
            >
              {/* Vòng tròn số */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full border text-sm font-medium shrink-0 ${circleClass}`}
                aria-current={isActive ? "step" : undefined}
              >
                {step.id}
              </div>

              {/* Tiêu đề + mô tả */}
              <div className="flex flex-col leading-tight">
                <span className={titleClass}>{step.title}</span>
                <small className={descClass}>{step.description}</small>
              </div>

              {/* Đường nối đứt đoạn */}
              {index !== steps.length - 1 && (
                <div
                  className={`border-t-2 border-dashed ${lineColor}`}
                  style={{ width: 50, height: 0, alignSelf: "center" }}
                  aria-hidden="true"
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default StepProcess;
