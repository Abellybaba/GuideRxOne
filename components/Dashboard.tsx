
import React from 'react';
import { Patient, Medication } from '../types';
import { PillIcon, ClockIcon, CheckCircleIcon, HelpIcon } from './icons';

interface DashboardProps {
  patient: Patient;
  adherence: { [medicationId: string]: boolean };
  onTakeMedication: (medication: Medication) => void;
  onNeedHelp: () => void;
}

const MedicationCard: React.FC<{
  medication: Medication;
  isTaken: boolean;
  onTake: () => void;
}> = ({ medication, isTaken, onTake }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isTaken ? 'opacity-60' : ''}`}>
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <img className="h-48 w-full object-cover md:w-32" src={medication.imageUrl} alt={`Pill for ${medication.name}`} />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="uppercase tracking-wide text-sm text-brand-primary font-semibold">{medication.name}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{medication.dosage}</p>
          <div className="mt-2 text-brand-subtle flex items-center">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>{medication.schedule.time}</span>
          </div>
        </div>
        <div className="mt-4">
          {isTaken ? (
            <div className="flex items-center text-green-500 font-bold py-2 px-4 rounded-lg bg-green-50">
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              Taken
            </div>
          ) : (
            <button
              onClick={onTake}
              className="w-full bg-brand-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary transition-colors duration-300"
            >
              Take Medication
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ patient, adherence, onTakeMedication, onNeedHelp }) => {
  const takenCount = Object.values(adherence).filter(Boolean).length;
  const totalMeds = patient.medications.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-secondary p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-brand-text">Good morning, {patient.name}!</h1>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <img src="https://picsum.photos/id/431/100" alt="Virtual Pharmacist" className="w-20 h-20 rounded-full border-2 border-brand-accent" />
          <div>
            <p className="text-brand-text font-semibold">"I'm here to help you stay on track with your medications. You're doing great!"</p>
          </div>
        </div>
        
        <div className="bg-brand-primary text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">Adherence Progress</h2>
          <div className="w-full bg-brand-accent rounded-full h-4">
            <div 
              className="bg-white rounded-full h-4" 
              style={{ width: `${(takenCount / totalMeds) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2 text-right">{takenCount} of {totalMeds} doses taken today.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-brand-text mb-3">Today's Medications</h2>
          <div className="space-y-4">
            {patient.medications.map(med => (
              <MedicationCard
                key={med.id}
                medication={med}
                isTaken={!!adherence[med.id]}
                onTake={() => onTakeMedication(med)}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
         <button
            onClick={onNeedHelp}
            className="w-full flex items-center justify-center bg-yellow-400 text-yellow-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            <HelpIcon className="h-6 w-6 mr-2" />
            I Need Help
          </button>
      </footer>
    </div>
  );
};
