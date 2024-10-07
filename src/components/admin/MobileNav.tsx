
import React from 'react'
import { Link } from 'react-router-dom';

import { XMarkIcon } from '@heroicons/react/16/solid';


interface MobileNavProps {
    username: string;
    logout: () => void;
    close: () => void;
}
const MobileNav: React.FC<MobileNavProps> = ({ username, logout, close }) => {
    return (
        <div className='w-full h-full inset-0 bg-black/50 fixed top-0 left-0 z-10'>
            <div className='w-8/12 h-full min-h-screen bg-white relative'>
                <span className='absolute top-0 right-0'><XMarkIcon className="w-8 h-8 text-primary cursor-pointer hover:stroke-secondary" onClick={close} /></span>
                <div className="w-full h-[auto] ">
                    <Link to={'/admin'}>
                        <span className='text-primary text-3xl font-bold'>Admin</span>
                    </Link>
                    <div className="flex flex-col items-start justify-between w-full h-full p-6">
                        <span className='text-primary text-3xl font-bold  '>Hello, {username}</span>

                        <Link to={'/admin'} className='block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white' onClick={close}>Home</Link>
                        <Link to={'/admin/users'} className='block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white' onClick={close}>Users</Link>
                        <Link to={'/admin/tickets'} className='block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white' onClick={close}>Tickets</Link>

                        <Link to={'/admin/purchases'} className='block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white' onClick={close}>Purchase</Link>
                        <Link to={'/admin/payments'} className='block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white' onClick={close}>Payments</Link>

                        <Link to={'/'} className='block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white ' onClick={() => { logout(); close(); }}>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav;
