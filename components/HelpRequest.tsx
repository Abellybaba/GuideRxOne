
import React, { useState } from 'react';

interface HelpRequestProps {
  onSubmit: () => void;
  onBack: () => void;
}

const PREDEFINED_QUESTIONS = [
  "I'm not sure if I took this already",
  "I'm experiencing side effects",
  "I have a question about this medication",
];

export const HelpRequest: React.FC<HelpRequestProps> = ({ onSubmit, onBack }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');

  const isOtherSelected = selectedQuestion === 'Other';

  const handleSelectQuestion = (question: string) => {
    if (selectedQuestion === question) {
      setSelectedQuestion('');
    } else {
      setSelectedQuestion(question);
    }
  };
  
  const canSubmit = selectedQuestion && (selectedQuestion !== 'Other' || (isOtherSelected && customMessage.trim() !== ''));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      <header className="mb-6">
        <button onClick={onBack} className="text-brand-primary hover:underline">&larr; Back</button>
        <h1 className="text-3xl font-bold text-brand-text mt-2">How can we help?</h1>
        <p className="text-brand-subtle">Select an issue or describe your question below.</p>
      </header>

      <main className="flex-grow space-y-4">
        {PREDEFINED_QUESTIONS.map(q => (
          <button
            key={q}
            onClick={() => handleSelectQuestion(q)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 ${selectedQuestion === q ? 'bg-brand-secondary border-brand-primary text-brand-primary' : 'bg-white border-gray-200 hover:border-brand-accent'}`}
          >
            {q}
          </button>
        ))}
        <button
          onClick={() => handleSelectQuestion('Other')}
          className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200 ${isOtherSelected ? 'bg-brand-secondary border-brand-primary text-brand-primary' : 'bg-white border-gray-200 hover:border-brand-accent'}`}
        >
          Other (please describe)
        </button>

        {isOtherSelected && (
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Describe your question or concern here..."
            className="w-full p-3 border-2 border-gray-300 rounded-lg h-32 focus:border-brand-primary focus:ring-brand-primary"
          />
        )}
      </main>

      <footer className="mt-6">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="w-full bg-brand-primary text-white font-bold py-4 px-6 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-brand-accent transition-colors duration-300"
        >
          Send to Pharmacist
        </button>
      </footer>
    </div>
  );
};
