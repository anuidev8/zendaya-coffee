// components/ui/alert.jsx

import React from 'react';

const Alert = ({ className, children }) => {
  return (
    <div className={`bg-amber-50 border-l-4 border-amber-500 p-4 ${className}`}>
      {children}
    </div>
  );
};

const AlertDescription = ({ className, children }) => {
  return (
    <div className={`text-sm text-amber-800 ${className}`}>
      {children}
    </div>
  );
};

export { Alert, AlertDescription };