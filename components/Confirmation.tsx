
import React from 'react';
import { CheckCircleIcon } from './icons';

interface ConfirmationProps {
  onGoToDashboard: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ onGoToDashboard }) => {
  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-brand-text mb-2">Help Request Sent!</h1>
        <p className="text-brand-subtle mb-8">
          Your pharmacist has been notified and will contact you within 30 minutes. 
          Your health is our priority.
        </p>
        <button
          onClick={onGoToDashboard}
          className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-accent transition-colors duration-300"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
