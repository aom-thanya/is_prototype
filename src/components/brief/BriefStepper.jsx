import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const stages = [
  { id: 1, name: 'Brief Creation', path: 'details' },
  { id: 2, name: 'Creator Sourcing', path: 'buyer' },
  { id: 3, name: 'Planning', path: 'planner' },
  { id: 4, name: 'Sales Handover', path: 'handover' }
];

export function BriefStepper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Determine current stage based on URL
  let currentStep = 1;
  if (location.pathname.includes('/buyer')) currentStep = 2;
  if (location.pathname.includes('/planner')) currentStep = 3;
  if (location.pathname.includes('/handover')) currentStep = 4;

  const handleStepClick = (stage) => {
    // Only navigate if an ID exists
    if (id) {
      navigate(`/brief/${id}/${stage.path}`);
    }
  };

  return (
    <div className="mb-12 mt-4 relative max-w-3xl mx-auto px-4">
      {/* Background Track */}
      <div className="absolute left-9 right-9 top-5 -translate-y-1/2 border-t-2 border-dashed border-gray-300 z-0"></div>
      
      {/* Active Track */}
      <div 
        className="absolute left-9 top-5 -translate-y-1/2 border-t-2 border-solid border-brand-solid z-0 transition-all duration-300" 
        style={{ width: `calc((${currentStep - 1} / ${stages.length - 1}) * (100% - 4.5rem))` }}
      ></div>
      
      <div className="flex items-start justify-between relative z-10">
        {stages.map((stage) => {
          const isActive = currentStep === stage.id;
          const isCompleted = currentStep > stage.id;
          
          return (
            <div 
              key={stage.id} 
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleStepClick(stage)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-200 ${
                  isActive 
                    ? 'bg-white text-brand-solid border-2 border-brand-solid shadow-[0_0_0_4px_rgba(99,91,255,0.1)]' 
                    : isCompleted
                      ? 'bg-brand-solid text-white border-2 border-brand-solid'
                      : 'bg-white text-gray-400 border-2 border-gray-200 group-hover:border-gray-300'
                }`}
              >
                {stage.id}
              </div>
              <span 
                className={`mt-3 text-xs font-medium ${
                  isActive ? 'text-brand-solid' : 'text-gray-500 group-hover:text-gray-700'
                }`}
              >
                {stage.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
