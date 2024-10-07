import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  onTouchStart?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      
      className="w-full py-2 px-4 bg-primary hover:bg-secondary text-white font-medium  rounded-md shadow focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
    >
      {label}
    </button>
  );
};

export default Button;
