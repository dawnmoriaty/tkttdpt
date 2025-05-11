import React from "react";
import { useNavigate } from "react-router-dom";

export type Step = {
  id: number;
  title: string;
  description: string;
};

type StepProcessProps = {
  steps: Step[];
  currentStep: number;
};

const StepProcess: React.FC<StepProcessProps> = ({ steps, currentStep }) => {
  const navigate = useNavigate();
  
  const handleStepClick = (stepId: number) => {
    // Map step ID to corresponding route
    switch (stepId) {
      case 1:
        navigate("/cart");
        break;
      case 2:
        navigate("/checkout");
        break;
      case 3:
        navigate("/payment");
        break;
      default:
        navigate("/cart");
    }
  };

  return (
    <nav
      className="flex items-center bg-white p-4 w-full"
      style={{ gap: 40 }} // Increased gap between steps
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
              onClick={() => handleStepClick(step.id)}
              style={{ gap: 12 }} // Gap between circle and text
            >
              {/* Circle number */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-full border text-sm font-medium shrink-0 ${circleClass}`}
                aria-current={isActive ? "step" : undefined}
              >
                {step.id}
              </div>

              {/* Title + description */}
              <div className="flex flex-col leading-tight">
                <span className={titleClass}>{step.title}</span>
                <small className={descClass}>{step.description}</small>
              </div>

              {/* Dashed line connector */}
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