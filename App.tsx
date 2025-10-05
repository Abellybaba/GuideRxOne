
import React, { useState } from 'react';
import { Screen, Patient, Medication } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { MedicationReminder } from './components/MedicationReminder';
import { HelpRequest } from './components/HelpRequest';
import { Confirmation } from './components/Confirmation';

const MOCK_PATIENT: Patient = {
  id: 'brian-123',
  name: 'Brian',
  email: 'brian@example.com',
  phone: '555-123-4567',
  medications: [
    {
      id: 'med-01',
      name: 'Metformin',
      dosage: '500mg, twice a day',
      schedule: { time: '9:00 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      imageUrl: 'https://picsum.photos/seed/metformin/400/200',
    },
    {
      id: 'med-02',
      name: 'Lisinopril',
      dosage: '10mg, once a day',
      schedule: { time: '9:00 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      imageUrl: 'https://picsum.photos/seed/lisinopril/400/200',
    },
    {
      id: 'med-03',
      name: 'Atorvastatin',
      dosage: '20mg, once a day',
      schedule: { time: '8:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      imageUrl: 'https://picsum.photos/seed/atorvastatin/400/200',
    },
  ],
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Login);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [adherence, setAdherence] = useState<{ [medicationId: string]: boolean }>({});

  const handleLogin = () => setCurrentScreen(Screen.Dashboard);
  const handleGoToDashboard = () => setCurrentScreen(Screen.Dashboard);

  const handleTakeMedication = (medication: Medication) => {
    setSelectedMedication(medication);
    setCurrentScreen(Screen.Reminder);
  };

  const handleTookIt = (medicationId: string) => {
    setAdherence(prev => ({ ...prev, [medicationId]: true }));
    setCurrentScreen(Screen.Dashboard);
    setSelectedMedication(null);
  };
  
  const handleNeedHelp = () => {
    setCurrentScreen(Screen.Help);
  };

  const handleHelpSubmit = () => {
    // In a real app, this would send data to a server.
    // For the MVP, we just move to the confirmation.
    setCurrentScreen(Screen.Confirmation);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Login:
        return <LoginScreen onLogin={handleLogin} />;
      
      case Screen.Dashboard:
        return (
          <Dashboard 
            patient={MOCK_PATIENT}
            adherence={adherence}
            onTakeMedication={handleTakeMedication}
            onNeedHelp={handleNeedHelp}
          />
        );
      
      case Screen.Reminder:
        if (!selectedMedication) {
          setCurrentScreen(Screen.Dashboard); // Should not happen
          return null;
        }
        return (
          <MedicationReminder
            medication={selectedMedication}
            onTookIt={handleTookIt}
            onNeedHelp={handleNeedHelp}
            onBack={handleGoToDashboard}
          />
        );
      
      case Screen.Help:
        return (
          <HelpRequest
            onSubmit={handleHelpSubmit}
            onBack={handleGoToDashboard}
          />
        );
      
      case Screen.Confirmation:
        return <Confirmation onGoToDashboard={handleGoToDashboard} />;

      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return <div className="antialiased font-sans">{renderScreen()}</div>;
};

export default App;
