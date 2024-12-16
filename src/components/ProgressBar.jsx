import PropTypes from 'prop-types';

export default function ProgressBar({ currentStep }) {
  const steps = [1, 2, 3, 4];
  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          {/* Step Circle */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
              currentStep >= step ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          >
            {step}
          </div>
          {/* Line Between Steps */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-16 ${
                currentStep > step ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

// Add PropTypes validation
ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired, // Ensure currentStep is a number and required
};
