import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/IMG/logo.png';
import { Bars3Icon } from '@heroicons/react/16/solid';
import MobileNav from './MobileNav';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const{logout} = useAuth();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <div className='flex flex-row w-full h-14 justify-between items-center px-[7%]'>
      <div className="w-[100px] h-[auto]">
        <Link to={'/'}>
          <img src={Logo} className="w-full h-full object-cover" alt="logo" />
        </Link>
      </div>
        <div className="w-[20%] hidden md:flex justify-between text-primary ">
          <Link to='/' className='hover:text-secondary'>Home</Link>
          <Link to={'/mytickets'} className='hover:text-secondary'>My Tickets</Link>
          <Link to={'/purchase'} className='hover:text-secondary'>Purchase</Link>
          {!user.token ?(
            <Link to={'/login'} className='hover:text-secondary'>Login</Link>

          ):(
            <span className='hover:text-secondary cursor-pointer' onClick={logout}>Logout</span>
          )}
        </div>
        <div className="w-[10%] flex items-center md:hidden">
          <Bars3Icon className="w-8 h-8 text-primary cursor-pointer" onClick={handleClick} />
        </div>
        {isOpen && (
          <MobileNav username={user.name} logout={() => {}} close={() => setIsOpen(false)} />
        )}
    </div>
  )
}

export default Header
