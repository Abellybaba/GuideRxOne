
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <img
          src="https://picsum.photos/id/431/200"
          alt="Virtual Pharmacist Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-brand-primary shadow-lg"
        />
        <h1 className="text-3xl font-bold text-brand-text mb-2">Welcome to GuideRx Concierge</h1>
        <p className="text-brand-subtle mb-8">Your personal guide to better medication management. Let's get started on your health journey together.</p>
        <button
          onClick={onLogin}
          className="w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-accent transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
        >
          Continue as Demo User
        </button>
      </div>
    </div>
  );
};
