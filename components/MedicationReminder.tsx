
import React from 'react';
import { Medication } from '../types';
import { HelpIcon } from './icons';

interface MedicationReminderProps {
  medication: Medication;
  onTookIt: (medicationId: string) => void;
  onNeedHelp: () => void;
  onBack: () => void;
}

export const MedicationReminder: React.FC<MedicationReminderProps> = ({ medication, onTookIt, onNeedHelp, onBack }) => {
  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <button onClick={onBack} className="absolute top-4 left-4 text-brand-subtle hover:text-brand-primary">&larr; Back to Dashboard</button>
        
        <div className="relative mb-6">
          <img
            src="https://picsum.photos/id/431/150"
            alt="Virtual Pharmacist Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-white shadow-lg"
          />
          <div className="relative bg-brand-primary text-white p-4 rounded-lg shadow-md">
            <p className="text-lg">Time for your {medication.schedule.time} dose of <strong>{medication.name}</strong>!</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-brand-primary"></div>
          </div>
        </div>
        
        <img
          src={medication.imageUrl}
          alt={`Pill for ${medication.name}`}
          className="w-full h-48 object-cover rounded-lg mx-auto mb-6 shadow-lg"
        />

        <div className="space-y-4">
          <button
            onClick={() => onTookIt(medication.id)}
            className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-lg text-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            I Took It!
          </button>
          <button
            onClick={onNeedHelp}
            className="w-full flex items-center justify-center bg-yellow-400 text-yellow-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            <HelpIcon className="h-6 w-6 mr-2" />
            I Need Help With This
          </button>
        </div>
      </div>
    </div>
  );
};
