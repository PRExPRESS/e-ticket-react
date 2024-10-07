import React from 'react';

interface TicketCardProps {
  ticketType: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticketType, price, selected, onSelect }) => {
  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer ${selected ? 'border-secondary' : 'border-gray-300'}`}
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold">{ticketType}</h3>
      <p className="text-gray-600">Price: LKR {price}</p>
    </div>
  );
};

export default TicketCard;
