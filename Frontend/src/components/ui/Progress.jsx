// src/components/ui/progress.js
import React from 'react';

const Progress = ({ value }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${value}%` }}></div>
    </div>
  );
};

export { Progress };
