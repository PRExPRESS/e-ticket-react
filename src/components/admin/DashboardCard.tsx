import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-gray-600">{value}</p>
    </div>
  );
};

export default DashboardCard;
