// ErrorContext.js
import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorShowen , setIsErrorShowen ]  = useState(false);

  return (
    <ErrorContext.Provider 
    value={{ errorMessage,
        isErrorShowen , 
        setIsErrorShowen ,
     setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}