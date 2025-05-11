import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description = 'Esta página será implementada próximamente.' 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D18] text-white p-4">
      <div className="text-center p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-400">{title}</h1>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
