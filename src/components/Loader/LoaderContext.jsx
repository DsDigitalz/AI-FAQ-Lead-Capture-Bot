import React, { createContext, useState, useContext } from "react";

// Create the context
export const LoaderContext = createContext();

// Custom hook for consuming the context
export const useLoader = () => useContext(LoaderContext);

// Provider Component
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  const value = {
    isLoading,
    showLoader,
    hideLoader,
  };

  // 🟢 Semantic Markup: <section> (Implied by context provider)
  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};
