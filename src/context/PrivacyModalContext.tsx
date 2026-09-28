import React, { createContext, useContext, useState } from 'react';

interface PrivacyModalContextType {
  isOpen: boolean;
  openPrivacy: () => void;
  closePrivacy: () => void;
}

const PrivacyModalContext = createContext<PrivacyModalContextType | undefined>(undefined);

export const PrivacyModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPrivacy = () => setIsOpen(true);
  const closePrivacy = () => setIsOpen(false);

  return (
    <PrivacyModalContext.Provider value={{ isOpen, openPrivacy, closePrivacy }}>
      {children}
    </PrivacyModalContext.Provider>
  );
};

export const usePrivacyModal = (): PrivacyModalContextType => {
  const context = useContext(PrivacyModalContext);
  if (!context) {
    throw new Error('usePrivacyModal must be used within a PrivacyModalProvider');
  }
  return context;
};
