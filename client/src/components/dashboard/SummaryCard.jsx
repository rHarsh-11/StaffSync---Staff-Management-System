import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg p-5 border border-gray-200">
      <div className={`text-4xl flex items-center justify-center ${color} text-white w-16 h-16 rounded-full`}>
        {icon}
      </div>
      <div className="ml-5">
        <p className="text-lg font-medium text-gray-700">{text}</p>
        <p className="text-2xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
