import React, { useEffect } from 'react';
import Button from '../../components/Button';

import { Link } from 'react-router-dom';
import { getAllTickets } from '../../services/ticketService';

interface Ticket {
  id: number;
  type: string;
  price: string;
  status: string;
  qty: number;
  remaining: number;
}

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  

  // Define columns
  const ticketColumns = ['id', 'type', 'price', 'status', 'Qty', 'Remaining'];

  useEffect(() => {
    const fetchPurchases = async () => {
      const response = await getAllTickets();

      if (response.error) {
        toastr.error(response.error.message, '', {
          positionClass: 'toast-top-right',
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut',
        });
        return;
      }
      if (Array.isArray(response)) {
        //console.log('response', response);
        setTickets(response);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Tickets</h2>

          {/* Add Ticket Button */}
          <Link to={'/admin/tickets/add'} className='md:w-2/12'>
            <Button label="Add New Ticket" onClick={() => { }} />
          </Link>
        </div>

        {/* Tickets Table */}
          <div className='w-full '>
            <table className="table-auto min-w-full bg-white shadow rounded-lg overflow-auto">
              <thead>
                <tr>
                  {ticketColumns.map((col, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 bg-gray-50 border-b text-left text-gray-600 font-semibold"
                    >
                      {col}
                    </th>
                  ))}
                  {<th className="py-2 px-4 bg-gray-50 border-b text-left text-gray-600 font-semibold">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {tickets.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-gray-600">{row.id}</td>
                    <td className="py-2 px-4 text-gray-600">{row.type}</td>
                    <td className="py-2 px-4 text-gray-600">{row.price}</td>
                    <td className="py-2 px-4 text-gray-600">{row.status}</td>
                    <td className="py-2 px-4 text-gray-600">{row.qty}</td>
                    <td className="py-2 px-4 text-gray-600">{row.remaining}</td>
                    
                    <td className="py-2 px-4 text-gray-600">
                      <Link to={`/admin/edit-ticket/${row.id}`} className='hover:text-secondary'>
                        Edit
                      </Link>
                      <button className='hover:text-secondary ml-4'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

      
    </div>

  );
};

export default TicketsPage;
