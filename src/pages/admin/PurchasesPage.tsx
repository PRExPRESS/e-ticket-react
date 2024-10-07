import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPurchases } from '../../services/ticketService';
import toastr from 'toastr';
import ReactSelect from 'react-select';

interface PurchaseData {
  id: number;
  code: string;
  ticket_id: string;
  price: string;
  payment_id: string;
  status: string;
  createdAt: string;
}

const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchaseData[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const ticketColumns = ['ID', 'NIC', 'Ticket ID', 'Price', 'Payment ID', 'Status', 'Date'];

  useEffect(() => {
    const fetchPurchases = async () => {
      const response = await getPurchases();

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
        response.map((purchase) => {
          purchase.createdAt = new Date(purchase.createdAt).toLocaleString();
        });
        setPurchases(response);
      }
    };
    fetchPurchases();
  }, []);

  // Memoized filter logic
  const filteredPurchases = useMemo(() => {
    if (filterStatus === 'all') {
      return purchases;
    }
    return purchases.filter((purchase) => purchase.status === filterStatus);
  }, [filterStatus, purchases]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Purchases</h2>
      <div className="w-full md:w-3/12 mb-4">
        <ReactSelect
          options={[
            { value: 'all', label: 'All' },
            { value: 'verified', label: 'Verified' },
            { value: 'pending', label: 'Pending' },
            { value: 'active', label: 'Active' },
            { value: 'cleared', label: 'Cleared' },
          ]}
          placeholder="Filter by status"
          onChange={(selectedOption) => setFilterStatus(selectedOption?.value || 'all')}
        />
      </div>

      {/* Wrapping the table in a container with overflow-x-auto */}
      <div className="overflow-x-auto w-full ">
      <table className="table-auto w-full relative bg-white shadow rounded-lg">
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
                  <th className="py-2 px-4 bg-gray-50 border-b text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>

        {filteredPurchases.length > 0 &&

          filteredPurchases.map((row, rowIndex) => (
            
                <tr key={rowIndex} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-600">{row.id}</td>
                  <td className="py-2 px-4 text-gray-600">{row.code}</td>
                  <td className="py-2 px-4 text-gray-600">{row.ticket_id}</td>
                  <td className="py-2 px-4 text-gray-600">{row.price}</td>
                  <td className="py-2 px-4 text-gray-600">{row.payment_id}</td>
                  <td className="py-2 px-4 text-gray-600">{row.status}</td>
                  <td className="py-2 px-4 text-gray-600">{row.createdAt}</td>
                  <td className="py-2 px-4 text-gray-600">
                    <Link to={`#`} onClick={() => {}} className="hover:text-secondary">
                      View
                    </Link>
                  </td>
                </tr>
              
          ))}
        
          </tbody>
            </table>
          {filteredPurchases.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No purchases found.</p>
          )}
      </div>
    </div>
  );
};

export default PurchasesPage;
