import { Bars3Icon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import MobileNav from './MobileNav';
import { useAuth } from '../../hooks/useAuth';

const Topbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  const{adminLogout} = useAuth();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4  ">
      <div>
        <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <button className="bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center">A</button>
      </div>
      <div className='md:hidden block' onClick={handleClick}><Bars3Icon  className='w-8 h-8 text-primary'/></div>
      {/** mobile nav */}
      {isOpen && <MobileNav username={user.username} logout={adminLogout} close={() => setIsOpen(false)} />}
      
    </header>
  );
};

export default Topbar;
