import React from 'react';

import { useAuth } from '../../hooks/useAuth';


const Sidebar: React.FC = () => {
  const {adminLogout} = useAuth();
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block min-h-screen fixed top-0 left-0" >
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
      </div>
      <nav className="mt-10">
        <a href="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white">
          Dashboard
        </a>
        <a href="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white">
          Users
        </a>
        <a href="/admin/tickets" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white">
          Tickets
        </a>
        <a href="/admin/purchases" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white">
          Purchase
        </a>
        <a href="/admin/payments" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white">
          Payments
        </a>
        <span onClick={adminLogout} className="block cursor-pointer py-2.5 px-4 rounded transition duration-200 hover:bg-primary hover:text-white">
          Logout
        </span>
      </nav>
    </aside>
  );
};

export default Sidebar;
